import { useEffect, useRef, useState } from 'react';

interface WindowWithToggleP5Audio extends Window {
  toggleP5Audio?: (shouldPlay: boolean) => Promise<void>;
  webkitAudioContext?: typeof AudioContext;
}

export function useAudioAnalyser() {
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null); // To store the stream for stopping

  useEffect(() => {
    let animationId: number;
    let isMounted = true;

    // Initialize AudioContext and AnalyserNode once on mount
    async function initAudioComponents() {
      try {
        const audioContext = new (window.AudioContext ||
          (window as WindowWithToggleP5Audio).webkitAudioContext)();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // Good balance for visual responsiveness
        analyserRef.current = analyser;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // This function will continuously update audioData
        // It runs regardless of whether the mic is connected, providing zeroes if silent
        function updateAudioData() {
          if (!isMounted || !analyserRef.current) return;

          // Get frequency data. If no source is connected, this will be mostly zeroes.
          analyserRef.current.getByteFrequencyData(dataArray);
          setAudioData(new Uint8Array(dataArray)); // Create a new array to ensure state update
          animationId = requestAnimationFrame(updateAudioData);
        }

        // Start the data collection loop
        updateAudioData();
      } catch (err) {
        console.error('Error initializing audio components:', err);
        setAudioData(null);
      }
    }

    initAudioComponents();

    return () => {
      isMounted = false;
      if (animationId) cancelAnimationFrame(animationId);
      if (audioContextRef.current) {
        audioContextRef.current
          .close()
          .catch((e) => console.error('Error closing audio context:', e));
      }
      // Stop media stream tracks if they exist
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // Expose a global function for React to control audio stream (microphone)
  useEffect(() => {
    (window as WindowWithToggleP5Audio).toggleP5Audio = async (
      shouldPlay: boolean
    ) => {
      if (!audioContextRef.current || !analyserRef.current) {
        console.warn('Audio components not initialized yet.');
        return;
      }

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      if (shouldPlay) {
        if (!sourceRef.current) {
          // Only request mic if not already obtained
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
            mediaStreamRef.current = stream; // Store stream to stop it later
            const source =
              audioContextRef.current.createMediaStreamSource(stream);
            sourceRef.current = source;
            source.connect(analyserRef.current);
            // analyserRef.current.connect(audioContextRef.current.destination); // Optional: to hear mic input
            console.log('Microphone stream started and connected to analyser.');
          } catch (err) {
            console.error('Error accessing microphone:', err);
            alert(
              'Microphone access denied or an error occurred. Audio reactivity will not work.'
            );
            // Important: If mic access fails, you might want to inform page.tsx to update its isPlaying state
            // For now, we'll rely on the alert.
          }
        } else {
          // If microphone source already exists, just ensure it's connected
          sourceRef.current.connect(analyserRef.current);
          console.log('Microphone reconnected to analyser.');
        }
      } else {
        // Disconnect microphone from analyser
        if (sourceRef.current) {
          sourceRef.current.disconnect(analyserRef.current);
        }
        // Also stop the actual microphone track to release resource
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((track) => track.stop());
          mediaStreamRef.current = null; // Clear the reference
          sourceRef.current = null; // Clear the source reference
        }
        console.log('Microphone disconnected and stopped.');
      }
    };

    return () => {
      // Clean up the global function when component unmounts
      if (
        typeof window !== 'undefined' &&
        (window as WindowWithToggleP5Audio).toggleP5Audio
      ) {
        delete (window as WindowWithToggleP5Audio).toggleP5Audio;
      }
    };
  }, []); // Runs once on mount

  return audioData;
}

// export function useAudioAnalyser(noMusic: boolean) {
//   const [audioData, setAudioData] = useState<Uint8Array | null>(null);
//   const audioContextRef = useRef<AudioContext | null>(null);
//   const analyserRef = useRef<AnalyserNode | null>(null);
//   const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

//   useEffect(() => {
//     if (noMusic) {
//       setAudioData(null);
//       return;
//     }

//     let animationId: number;
//     let isMounted = true;

//     async function setupAnalyser() {
//       try {
//         // Get audio from speakers (system audio) via getDisplayMedia (Chrome/Edge only)
//         // Or fallback to microphone if not supported
//         let stream: MediaStream | null = null;
//         if ((navigator.mediaDevices as any).getDisplayMedia) {
//           try {
//             stream = await (navigator.mediaDevices as any).getDisplayMedia({ audio: true, video: false });
//           } catch {
//             // fallback to mic
//             stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//           }
//         } else {
//           stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         }

//         const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
//         audioContextRef.current = audioContext;
//         const analyser = audioContext.createAnalyser();
//         analyser.fftSize = 256;
//         analyserRef.current = analyser;

//         const source = audioContext.createMediaStreamSource(stream!);
//         sourceRef.current = source;
//         source.connect(analyser);

//         const bufferLength = analyser.frequencyBinCount;
//         const dataArray = new Uint8Array(bufferLength);

//         function update() {
//           if (!isMounted) return;
//           analyser.getByteFrequencyData(dataArray);
//           setAudioData(new Uint8Array(dataArray));
//           animationId = requestAnimationFrame(update);
//         }
//         update();
//       } catch (err) {
//         setAudioData(null);
//       }
//     }

//     setupAnalyser();

//     return () => {
//       isMounted = false;
//       if (animationId) cancelAnimationFrame(animationId);
//       if (audioContextRef.current) audioContextRef.current.close();
//     };
//   }, [noMusic]);

//   return audioData;
// }
