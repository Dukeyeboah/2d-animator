'use client';

import P5Canvas from '@/components/P5Canvas';
import {
  bouncingBallSketch,
  firstImage,
  particleSystemSketch,
  waveAnimationSketch,
  reflectingBall,
  randomCircles,
  playPractice,
  playAgain,
  connectNoColor,
  //stocksReaction,
} from '@/sketches';
// import { reflectingBall } from '@/sketches/reflectingBall';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import PausePresentationIcon from '@mui/icons-material/PausePresentation';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // New icon
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // New icon

export default function Home() {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  const [screenHeight, setScreenHeight] = useState<number | null>(null);
  const [canvasWidth] = useState<number>(1000);
  const [canvasHeight] = useState<number>(600);
  const [useScreenSize] = useState(false);
  // --- Music Player States and Ref ---
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  // --- NEW: Sketch Animation Control State ---
  const [isSketchRunning, setIsSketchRunning] = useState(true); // Set to true to start animation on load
  // NEW: State for canvas hover
  const [isCanvasHovered, setIsCanvasHovered] = useState(false);

  // NEW: List of available sketches and current sketch index
  const sketches = [
    connectNoColor,
    playAgain,
    playPractice,
    bouncingBallSketch,
    firstImage,
    particleSystemSketch,
    waveAnimationSketch,
    reflectingBall,
    randomCircles,
    //stocksReaction, // NEW: Added the new sketch to the list
    //reflectingBallSketch
  ];
  const [currentSketchIndex, setCurrentSketchIndex] = useState(0); // Start with playPractice

  const musicTracks = useMemo(
    () => [
      '/music/track1.mp3', // Replace with your actual music file names
      '/music/track2.mp3',
      '/music/track3.mp3',
      '/music/track4.mp3',
      '/music/track5.mp3',
      '/music/track6.mp3',
      '/music/track7.mp3',
      '/music/track8.mp3',
    ],
    []
  ); // `useMemo` is a React hook that "memoizes" (remembers) the result of a function. Here, it ensures that the `musicTracks` array is only created once, when the component first renders, and not on every subsequent re-render. This is an optimization to prevent unnecessary re-creations of the array.

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, []);

  const getCanvasSize = () => {
    if (useScreenSize && screenWidth !== null && screenHeight !== null) {
      return { width: screenWidth, height: screenHeight };
    }
    return { width: canvasWidth, height: canvasHeight };
  };

  const { width, height } = getCanvasSize();

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % musicTracks.length);
  }, [musicTracks.length]);

  const prevTrack = () => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + musicTracks.length) % musicTracks.length
    );
  };

  // Function to load and play the current track
  const loadAndPlayTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.src = musicTracks[currentTrackIndex];
      audioRef.current.load(); // Load the new track
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error: Error) => {
          // FIX: Corrected syntax for error parameter
          console.error('Error playing audio:', error); // FIX: Removed extra colon
          setIsPlaying(false);
          // Inform user if playback failed (e.g., autoplay blocked)
          alert(
            'Audio playback failed. Please ensure your browser allows autoplay or try interacting with the page first.'
          );
        });
    }
  }, [currentTrackIndex, musicTracks]);

  // Effect to load and play track when currentTrackIndex changes
  useEffect(() => {
    if (musicTracks.length > 0) {
      // Only auto-play if it was already playing, otherwise just load
      if (isPlaying) {
        loadAndPlayTrack();
      } else if (audioRef.current) {
        // If not playing, just set the source for the current track
        audioRef.current.src = musicTracks[currentTrackIndex];
        audioRef.current.load();
      }
    }
  }, [currentTrackIndex, isPlaying, loadAndPlayTrack, musicTracks]); // Added missing dependencies

  // Effect to handle audio playback state (play/pause)
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error resuming audio playback:', error);
          setIsPlaying(false); // Revert state if play fails
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]); // Dependency on isPlaying

  // Effect to handle track ending (play next automatically)
  useEffect(() => {
    const audioEl = audioRef.current;
    const handleTrackEnded = () => {
      nextTrack(); // Play the next track automatically
    };

    if (audioEl) {
      audioEl.addEventListener('ended', handleTrackEnded);
    }

    return () => {
      if (audioEl) {
        audioEl.removeEventListener('ended', handleTrackEnded);
      }
    };
  }, [nextTrack]); // Dependency on nextTrack function

  const togglePlayPause = () => {
    if (!isPlaying) {
      loadAndPlayTrack(); // Start playing if currently paused
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };
  // NEW: Toggle function for P5.js sketch animation
  const togglePlayPauseSketch = () => {
    setIsSketchRunning((prev) => !prev);
  };

  // NEW: Functions to navigate between sketches
  const handleNextSketch = useCallback(() => {
    setCurrentSketchIndex((prevIndex) => (prevIndex + 1) % sketches.length);
    setIsSketchRunning(true); // Automatically play when switching sketches
  }, [sketches.length]);

  const handlePrevSketch = useCallback(() => {
    setCurrentSketchIndex(
      (prevIndex) => (prevIndex - 1 + sketches.length) % sketches.length
    );
    setIsSketchRunning(true); // Automatically play when switching sketches
  }, [sketches.length]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#p50p50',
        // 'linear-gradient(to bottom right, #e0e7ff, #c7d2fe, #6366f1)',
      }}
    >
      <Box
        sx={{ fontFamily: "'Orbitron', monospace", fontSize: 19, pb: 1, pt: 2 }}
      >
        canvas
      </Box>
      {/* Screen size toggle Box and button */}
      {/* <Box
        sx={{
          position: 'fixed',
          top: 12,
          right: 24,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          borderRadius: 2,
          px: 0,
          py: 0,
          boxShadow: 2,
        }}
        //onClick={() => setUseScreenSize((prev) => !prev)}
      ></Box> */}
      {/* {useScreenSize ? (
          <ToggleOnIcon  fontSize='medium' />
        ) : (
          <ToggleOffIcon color='secondary' fontSize='medium' />
        )}
        <Box sx={{ ml: 1, fontWeight: 500, fontSize:12, fontFamily: "'Orbitron', monospace",}}>
          {useScreenSize ? 'xl' : 'm'}
        </Box> */}

      {/* Hidden Audio Element */}
      <audio ref={audioRef} />

      {/* NEW: Container for P5Canvas and the Play/Pause button */}
      <Box
        sx={{
          p: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#p50p50',
        }}
      >
        {/* Previous-Sketch ArrowBack Button (Left) */}
        <Button
          variant='contained'
          onClick={handlePrevSketch}
          sx={{
            backgroundColor: 'transparent',
            '&:hover': { backgroundColor: 'transparent', color: 'white' },
            color: 'rgba(255,255,255,0.5)',
            borderRadius: '50%', // Make it circular
            minWidth: '48px', // Ensure it's a decent size
            width: '48px',
            height: '48px',
            padding: 0,
            boxShadow: 'none', // No shadow for these
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ArrowBackIosIcon fontSize='large' />
        </Button>
        <Box
          sx={{
            position: 'relative', // Crucial for absolute positioning of the button
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: '12px',
            boxShadow: '0 8px 20px 3px rgba(0,0,0,0.9)',
            //boxShadow: '5px 4px 4px rgba(200,200,200,0.1)',
            overflow: 'hidden', // Ensures button doesn't spill out
          }}
          onMouseEnter={() => setIsCanvasHovered(true)}
          onMouseLeave={() => setIsCanvasHovered(false)}
        >
          {/* <P5Canvas width={width} height={height} sketch={bouncingBallSketch} /> */}
          {/* <P5Canvas width={width} height={height} sketch={firstImage} /> */}
          {/* <P5Canvas width={width} height={height} sketch={playPractice} isRunning={isSketchRunning}/> */}
          <P5Canvas
            width={width}
            height={height}
            sketch={sketches[currentSketchIndex]}
            isRunning={isSketchRunning}
          />

          {/* Box and Play/Pause Button layered on top of canvas */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0, // Top, right, bottom, left all 0 to cover parent
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent overlay
              opacity: isCanvasHovered ? 1 : 0, // Show on hover, hide otherwise
              transition: 'opacity 0.3s ease-in-out', // Smooth transition
              pointerEvents: isCanvasHovered ? 'auto' : 'none', // Allow clicks only when visible
            }}
          >
            <Button
              variant='contained'
              onClick={togglePlayPauseSketch}
              sx={{
                backgroundColor: isSketchRunning
                  ? 'transparent'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: isSketchRunning ? '#ffccff' : '#66ffcc',
                },
                color: 'black',
                fontFamily: "'Orbitron', monospace",
                fontSize: 'small',
                fontWeight: 700,
                borderRadius: '8px',
                padding: '3px 6px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                minWidth: 'auto', // Adjust minWidth as needed for icon size
              }}
            >
              {isSketchRunning ? <PausePresentationIcon /> : <LiveTvIcon />}
            </Button>
          </Box>
        </Box>
        {/* Next Sketch Button (Right) */}
        <Button
          variant='contained'
          onClick={handleNextSketch}
          sx={{
            backgroundColor: 'transparent',
            '&:hover': { backgroundColor: 'transparent', color: 'white' },
            color: 'rgba(255,255,255,0.5)',
            borderRadius: '50%', // Make it circular
            minWidth: '48px', // Ensure it's a decent size
            width: '48px',
            height: '48px',
            padding: 0,
            boxShadow: 'none', // No shadow for these
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ArrowForwardIosIcon fontSize='large' />
        </Button>
      </Box>
      <Box>
        {/* Music Player Controls at the bottom of the page*/}
        <Box sx={{ mt: 2, mb: 2, display: 'flex', gap: 1 }}>
          <Button
            variant='contained'
            onClick={prevTrack}
            //startIcon={<SkipPreviousIcon />}
            sx={{
              // backgroundColor: '#6c757d',
              backgroundColor: 'transparent',
              '&:hover': { backgroundColor: '#5a6268' },
              color: 'white',
              fontFamily: "'Orbitron', monospace",
              fontWeight: 700,
              borderRadius: '8px',
              // Adjusted padding for better icon centering
              padding: '10px 15px', // Increased horizontal padding
              minWidth: '48px', // Ensure button is wide enough for icon
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              display: 'flex', // Ensure flex for centering
              justifyContent: 'center', // Center content horizontally
              alignItems: 'center', // Center content vertically
            }}
          >
            <SkipPreviousIcon />
          </Button>
          <Button
            variant='contained'
            onClick={togglePlayPause}
            // startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            sx={{
              // backgroundColor: isPlaying ? '#ff4d4d' : '#4CAF50',
              backgroundColor: isPlaying ? 'transparent' : 'transparent',
              '&:hover': {
                backgroundColor: isPlaying ? '#cc0000' : '#45a049',
              },
              color: 'white',
              fontFamily: "'Orbitron', monospace",
              fontWeight: 700,
              borderRadius: '8px',
              // Adjusted padding for better icon centering
              padding: '10px 15px', // Increased horizontal padding
              minWidth: '48px', // Ensure button is wide enough for icon
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              display: 'flex', // Ensure flex for centering
              justifyContent: 'center', // Center content horizontally
              alignItems: 'center', // Center content vertically
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </Button>
          <Button
            variant='contained'
            onClick={nextTrack}
            //startIcon={<SkipNextIcon/>}
            sx={{
              // backgroundColor: '#6c757d',
              backgroundColor: 'transparent',
              '&:hover': { backgroundColor: '#5a6268' },
              color: 'white',
              fontFamily: "'Orbitron', monospace",
              fontWeight: 700,
              borderRadius: '8px',
              // Adjusted padding for better icon centering
              padding: '10px 15px', // Increased horizontal padding
              minWidth: '48px', // Ensure button is wide enough for icon
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              display: 'flex', // Ensure flex for centering
              justifyContent: 'center', // Center content horizontally
              alignItems: 'center', // Center content vertically
            }}
          >
            <SkipNextIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
