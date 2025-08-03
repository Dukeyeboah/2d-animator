'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
//import p5 from 'p5';

// Extend the window object to include p5.sound types for TypeScript
// This helps TypeScript understand that p5.AudioIn and p5.FFT exist on the p5 instance.
declare global {
  interface Window {
    p5: typeof import('p5'); // Re-declare p5 for clarity
  }
}

interface WindowWithP5 extends Window {
  p5: typeof import('p5');
}

// No need to import bouncingBallSketch here if it's only passed via props or sketchName
// import { bouncingBallSketch } from '@/sketches';

interface P5CanvasProps {
  width?: number;
  height?: number;
  sketch?: (p: import('p5')) => void; // Custom sketch function
  sketchName?: string; // Name of sketch to import directly
  isRunning?: boolean; // NEW: Control if the sketch should be running
}

// Dynamically import P5 to avoid SSR issues - main React component function
const P5CanvasComponent = ({
  width = 1000,
  height = 600,
  sketch,
  sketchName,
  isRunning = true, // NEW: Default to true
}: P5CanvasProps) => {
  // --- React State and Refs (Internal Tools for the Frame) ---
  // useRef: Like a sticky note for a specific HTML element (our canvas container)
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<import('p5') | null>(null); // useRef: Like a sticky note for the actual p5.js "artist" instance
  const [isClient, setIsClient] = useState(false); // useState: To track if we're definitely running in the user's browser
  const [currentSketch, setCurrentSketch] = useState<
    ((p: import('p5')) => void) | null
  >(null); // useState: To hold the sketch function if it's loaded by name
  const [isSketchLoaded, setIsSketchLoaded] = useState(false); // useState: To track if the sketch (either passed or loaded by name) is ready

  useEffect(() => {
    setIsClient(true);
  }, []); // 1. Effect to confirm we are on the client

  // Load sketch by name if provided
  useEffect(() => {
    if (sketchName && isClient) {
      const loadSketch = async () => {
        try {
          const sketches = await import('@/sketches');
          const sketchFunction = sketches[sketchName as keyof typeof sketches];
          if (sketchFunction) {
            // setCurrentSketch(sketchFunction);
            setCurrentSketch(() => sketchFunction);
            setIsSketchLoaded(true);
          } else {
            console.error(
              `Sketch function "${sketchName}" not found in '@/sketches'.`
            );
            // Still set to true to proceed with default sketch or no sketch
            setIsSketchLoaded(true);
          }
        } catch (error) {
          console.error('Failed to load sketch:', error);
          setIsSketchLoaded(true); // Set to true even on error to prevent infinite loading
        }
      };
      loadSketch();
    } else if (!sketchName) {
      setIsSketchLoaded(true); // No sketch to load, so consider it "loaded"
    }
  }, [sketchName, isClient]);

  // 3. Effect to initialize p5.js and run the sketch
  useEffect(() => {
    // Only proceed if we're on the client, the canvas container is ready, AND the sketch is loaded
    if (!isClient || !canvasRef.current || !isSketchLoaded) return;

    // Function to check if p5.js is available
    const checkP5Available = () => {
      return typeof window !== 'undefined' && (window as WindowWithP5).p5;
    };

    //initiate p5
    const initP5 = async () => {
      try {
        // Use globally loaded p5.js from CDN to avoid import conflicts
        let p5Class;
        if (checkP5Available()) {
          p5Class = (window as WindowWithP5).p5;
          console.log('Using globally loaded p5.js from CDN');
        } else {
          console.error('P5.js not available from CDN');
          return;
        }

        // Clean up previously created p5.js instance
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove();
          p5InstanceRef.current = null;
        }

        // Determine which sketch to use:
        // 1. The one passed directly via `sketch` prop
        // 2. The one loaded via `sketchName`
        // 3. A simple default blank sketch if neither is provided
        const sketchToUse =
          sketch ||
          currentSketch ||
          ((p: import('p5')) => {
            // Default sketch if no other is provided
            p.setup = () => {
              p.background(0); // Default background
            };
            p.draw = () => {}; // Empty draw for default
          });

        // Create the final sketch function that will be passed to new p5()
        const finalP5Sketch = (p: import('p5')) => {
          // Ensure p5 instance is properly initialized
          if (!p) {
            console.error('P5 instance is undefined');
            return;
          }

          // 1. Execute the user's provided sketch function.
          try {
            sketchToUse(p);
          } catch (error) {
            console.error('Error executing sketch:', error);
          }

          // 2. Store references to the user's original setup and draw functions
          const userOriginalSetup = p.setup;
          const userOriginalDraw = p.draw;
          const userOriginalWindowResized = p.windowResized; // Capture user's windowResized if it exists

          // 3. Override p.setup to always create and parent the canvas
          p.setup = () => {
            try {
              // Create canvas first
              const createdCanvas = p.createCanvas(width, height);

              // Ensure canvas was created successfully
              if (!createdCanvas || !p.width || !p.height) {
                console.error('Canvas was not created properly');
                return;
              }

              if (canvasRef.current) {
                createdCanvas.parent(canvasRef.current);
                // Ensure the canvas element itself has no default margins and is a block element
                createdCanvas.elt.style.display = 'block';
                createdCanvas.elt.style.margin = '0';
                createdCanvas.elt.style.padding = '0';
                createdCanvas.elt.style.width = '100%';
                createdCanvas.elt.style.height = '100%';
              }

              // Now that canvas is created, p.width and p.height are available
              // Call the user's original setup function
              if (typeof userOriginalSetup === 'function') {
                try {
                  userOriginalSetup();
                } catch (error) {
                  console.error('Error in sketch setup:', error);
                }
              }
            } catch (error) {
              console.error('Error in p5 setup:', error);
            }
          };

          // 4. Override p.draw to always call the user's original draw function
          p.draw = () => {
            try {
              if (typeof userOriginalDraw === 'function') {
                userOriginalDraw();
              }
            } catch (error) {
              console.error('Error in p5 draw:', error);
            }
          };
          // Handle windowResized
          p.windowResized = () => {
            // Only resize canvas if the sketch doesn't handle it or if it needs to be explicitly resized
            // p.resizeCanvas(width, height); // This might be redundant if sketch handles it
            if (typeof userOriginalWindowResized === 'function') {
              try {
                userOriginalWindowResized();
              } catch (error) {
                console.error('Error in sketch windowResized:', error);
              }
            }
          };
        };

        // Create new P5 instance with our final wrapped sketch
        if (p5Class && typeof p5Class === 'function') {
          p5InstanceRef.current = new p5Class(finalP5Sketch);
        } else {
          console.error('P5 class is not properly defined');
        }
      } catch (error) {
        console.error('Failed to initialize P5.js or sketch:', error);
      }
    };

    // Function to wait for p5.js to be available and then initialize
    const waitForP5AndInit = () => {
      if (checkP5Available()) {
        initP5();
      } else {
        // Retry after a short delay
        setTimeout(waitForP5AndInit, 100);
      }
    };

    // Start waiting for p5.js to be available
    const timer = setTimeout(() => {
      waitForP5AndInit();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [
    isClient,
    width,
    height,
    sketch,
    currentSketch,
    isSketchLoaded,
    // REMOVED: isRunning from dependencies to prevent recreation
  ]);

  // NEW: Effect to handle play/pause functionality
  useEffect(() => {
    if (p5InstanceRef.current) {
      if (isRunning) {
        // Resume the sketch
        p5InstanceRef.current.loop();
      } else {
        // Pause the sketch
        p5InstanceRef.current.noLoop();
      }
    }
  }, [isRunning]); // Only depend on isRunning

  if (!isClient) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className='mb-4 text-center'>
          <h2 className='text-xl font-bold text-gray-800 mb-2'>Canvas</h2>
          <p className='text-sm text-gray-600'>
            {width} × {height} pixels
          </p>
        </div>

        <div
          className='border-2 border-gray-300 rounded-lg shadow-lg bg-white'
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <div className='flex items-center justify-center h-full text-gray-500'>
            Loading canvas...
          </div>
        </div>
      </div>
    );
  }

  if (!isSketchLoaded && sketchName) {
    // Only show "Loading sketch" if a sketchName was provided and not yet loaded
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className='mb-4 text-center'>
          <h2 className='text-xl font-bold text-gray-800 mb-2'>P5.js Canvas</h2>
          <p className='text-sm text-gray-600'>
            {width} × {height} pixels
          </p>
        </div>
        <div
          className='border-2 border-gray-300 rounded-lg shadow-lg bg-white'
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <div className='flex items-center justify-center h-full text-gray-500'>
            Loading sketch...
          </div>
        </div>
      </div>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none', // Allow parent to control background
      }}
    >
      <Box
        ref={canvasRef}
        sx={{
          width: `${width}px`,
          height: `${height}px`,
          border: '2px solid gray',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          background: 'white',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </Box>
  );
};

// Export with no SSR to prevent window errors
export default dynamic(() => Promise.resolve(P5CanvasComponent), {
  ssr: false,
});
