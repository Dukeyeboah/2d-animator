'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import p5 from 'p5';

// Extend the window object to include p5.sound types for TypeScript
// This helps TypeScript understand that p5.AudioIn and p5.FFT exist on the p5 instance.
declare global {
  interface Window {
    p5: typeof import('p5'); // Re-declare p5 for clarity
  }
}

// No need to import bouncingBallSketch here if it's only passed via props or sketchName
// import { bouncingBallSketch } from '@/sketches';

interface P5CanvasProps {
  width?: number;
  height?: number;
  sketch?: (p: p5) => void; // Custom sketch function
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
  const p5InstanceRef = useRef<p5 | null>(null); // useRef: Like a sticky note for the actual p5.js "artist" instance
  const [isClient, setIsClient] = useState(false); // useState: To track if we're definitely running in the user's browser
  const [currentSketch, setCurrentSketch] = useState<((p: p5) => void) | null>(
    null
  ); // useState: To hold the sketch function if it's loaded by name
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

    //initiate p5
    const initP5 = async () => {
      try {
        const p5Module = await import('p5');
        const p5Class = p5Module.default;

        // Clean up previously created p5.js instance
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove();
        }

        // Determine which sketch to use:
        // 1. The one passed directly via `sketch` prop
        // 2. The one loaded via `sketchName`
        // 3. A simple default blank sketch if neither is provided
        // Use sketch in this priority: 1. passed sketch, 2. loaded sketch, 3. default- blank canvas setup
        const sketchToUse =
          sketch ||
          currentSketch ||
          ((p: p5) => {
            // Default sketch if no other is provided
            p.setup = () => {
              p.background(0); // Default background
              //p.background(230); // Default background-white
            };
            p.draw = () => {}; // Empty draw for default
          });

        // Create the final sketch function that will be passed to new p5()
        const finalP5Sketch = (p: p5) => {
          // 1. Execute the user's provided sketch function.
          // This will define p.setup, p.draw, and any other p5 event handlers
          // (like mousePressed, keyPressed) directly on the 'p' instance.
          sketchToUse(p);

          // 2. Store references to the user's original setup and draw functions
          //    *after* they have been defined on 'p' by sketchToUse(p).
          const userOriginalSetup = p.setup;
          const userOriginalDraw = p.draw;

          // 3. Override p.setup to always create and parent the canvas
          p.setup = async () => {
            const createdCanvas = p.createCanvas(width, height);
            if (canvasRef.current) {
              createdCanvas.parent(canvasRef.current);
              // Optional: Add some basic styling to the canvas itself if needed
              // createdCanvas.elt.style.display = 'block';
            }

            // Now, call the user's original setup function
            if (typeof userOriginalSetup === 'function') {
              //await userOriginalSetup(); // Call without 'p' since 'p' is already in scope
              try {
                await userOriginalSetup();
              } catch (error) {
                console.error('Error in sketch setup:', error);
              }
            }
          };

          // 4. Override p.draw to always call the user's original draw function
          p.draw = () => {
            if (typeof userOriginalDraw === 'function') {
              userOriginalDraw(); // Call without 'p' since 'p' is already in scope
            }
          };

          // Note: Any other p5.js event functions (like mousePressed, keyPressed)
          // defined by sketchToUse(p) will already be on 'p' and will work as expected
          // because we called sketchToUse(p) at the very beginning of finalP5Sketch.
        };

        // Create new P5 instance with our final wrapped sketch
        p5InstanceRef.current = new p5Class(finalP5Sketch);
      } catch (error) {
        console.error('Failed to initialize P5.js or sketch:', error);
      }
    };

    initP5();

    // Cleanup function
    return () => {
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
    isRunning,
  ]); // Added isRunning dependency

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
      <Box className='m-3 text-center'>
        <Box sx={{ fontFamily: "'Orbitron', monospace", fontSize: 19 }}>
          canvas
        </Box>
      </Box>
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
