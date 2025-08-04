// src/sketches/playPractice.ts
import { Shape } from '@/utils/Shape';
import {
  createConcentricCircles,
  createIndependentCircles,
  createIndependentShapes,
} from '@/utils/playPatterns';
import p5 from 'p5'; // Import p5 for type hinting

// Define a local ShapeConfig interface to ensure literal types are used
// This mirrors the ShapeConfig in playPatterns.ts but ensures explicit typing here.
interface LocalShapeConfig {
  type:
    | 'circle'
    | 'ellipse'
    | 'rect'
    | 'square'
    | 'line'
    | 'triangle'
    | 'quad'
    | 'point'
    | 'image';
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  size?: number;
  image?: p5.Image;
  color: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  rotation?: number;
  rotationSpeed?: number;
  amplitudeX?: number;
  amplitudeY?: number;
  frequencyX?: number;
  frequencyY?: number;
  offsetX?: number;
  offsetY?: number;
  baseSize?: number;
  amplitudeSize?: number;
  frequencySize?: number;
  offsetSize?: number;
  amplitudeStrokeWeight?: number;
  frequencyStrokeWeight?: number;
  offsetStrokeWeight?: number;
  baseStrokeWeight?: number;
  amplitudeColorR?: number;
  amplitudeColorG?: number;
  amplitudeColorB?: number;
  amplitudeColorA?: number;
  frequencyColor?: number;
  offsetColor?: number;
  randomizeColor?: boolean;
  randomColorInterval?: number;
  v1x?: number;
  v1y?: number;
  v2x?: number;
  v2y?: number;
  v3x?: number;
  v3y?: number;
  v4x?: number;
  v4y?: number;
}

export const connectNoColor = (p: p5) => {
  const shapes: Shape[] = [];
  //let connectShapeImage: p5.Image; // Declare a variable to hold the loaded image

  //   // Preload function to load assets before setup
  //   p.preload = () => {
  //     // Load the image from the public directory
  //     // Ensure the image 'connect.jpg' is in your 'public' folder
  //     connectShapeImage = p.loadImage('/connect.jpg',
  //       () => console.log('Image loaded successfully!'),
  //       (e) => console.error('Failed to load image:', e)
  //     );
  //   };

  p.setup = () => {
    p.background(0); // Dark background
    // p.createCanvas(p.windowWidth, p.windowHeight); // Full window canvas
    p.noStroke(); // No stroke for circles by default

    const centerX = p.width / 2;
    const centerY = p.height / 2;
    const baseDiameter = 50; // Starting diameter for the innermost circle

    // Define configurations for the three concentric circles
    const circleConfigurations = [
      //thick center
      //   left eye expanding stokes
      {
        size: baseDiameter + 20, // Middle circle, 10 units larger
        color: [255, 25, 255, 10], // Green
        strokeWeight: 3,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: -5.015,
        amplitudeX: 0,
        frequencyX: 0,
        offsetX: 0, // No horizontal motion
        amplitudeY: 60,
        frequencyY: 0.02,
        offsetY: p.PI / 2, // Vertical cosine wave motion
        // amplitudeSize: 50,
        // frequencySize: -0.008,
        // offsetSize: p.PI ,
        // NEW: Size animation properties
        amplitudeSize: 150, // Fluctuate size by 150 units
        frequencySize: 0.005, // Fluctuate 0.005 cycles per frame
        offsetSize: 0,
        // NEW: Stroke weight animation
        amplitudeStrokeWeight: 2,
        frequencyStrokeWeight: 0.008,
        offsetStrokeWeight: p.PI / 2,
        // NEW: Rhythmic Color Animation (animating alpha and red)
        // amplitudeColorR: 100,
        // amplitudeColorG: 0,
        // amplitudeColorB: 0,
        // amplitudeColorA: 150, // Making it pulse transparency
        // frequencyColor: 0.01,
        // offsetColor: 0,
      },
      //left right up down
      //big top to down circle
      {
        size: baseDiameter + 20 * 8, // Middle circle, 10 units larger
        color: [25, 255, 255, 10], // Green

        strokeWeight: 1,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: -5.015,
        amplitudeX: 0,
        frequencyX: 0,
        offsetX: 0, // No horizontal motion
        amplitudeY: 400,
        frequencyY: 0.008,
        offsetY: -p.PI / 2, // Vertical cosine wave motion
      },

      {
        size: baseDiameter - 10, // Middle circle, 10 units larger
        color: [250, 200, 0, 30], // Green
        strokeWeight: 1,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: -5.015,
        amplitudeX: 80,
        frequencyX: 0.04,
        offsetX: 0, // No horizontal motion
        amplitudeY: 400,
        frequencyY: 0.008,
        offsetY: -p.PI / 2, // Vertical cosine wave motion
      },
      {
        size: baseDiameter - 10, // Middle circle, 10 units larger
        color: [250, 200, 0, 30], // Green
        strokeWeight: 1,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: -5.015,
        amplitudeX: 80,
        frequencyX: -0.04,
        offsetX: 0, // No horizontal motion
        amplitudeY: 400,
        frequencyY: 0.008,
        offsetY: -p.PI / 2, // Vertical cosine wave motion
      },
      //big down to top circle
      {
        size: baseDiameter + 20 * 8, // Middle circle, 10 units larger
        color: [25, 255, 255, 10], // Green
        strokeWeight: 1,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 5.015,
        amplitudeX: 0,
        frequencyX: 0,
        offsetX: 0, // No horizontal motion
        amplitudeY: 420,
        frequencyY: 0.008,
        offsetY: p.PI / 2, // Vertical cosine wave motion
      },

      {
        size: baseDiameter - 20, // Middle circle, 10 units larger
        color: [250, 2, 2, 10], // Green
        strokeWeight: 1,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 5.015,
        amplitudeX: 80,
        frequencyX: -0.04,
        offsetX: 0, // No horizontal motion
        amplitudeY: 420,
        frequencyY: 0.008,
        offsetY: p.PI / 2, // Vertical cosine wave motion
      },
      {
        size: baseDiameter - 20, // Middle circle, 10 units larger
        color: [250, 2, 2, 10], // Green
        strokeWeight: 1,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 5.015,
        amplitudeX: 80,
        frequencyX: 0.04,
        offsetX: 0, // No horizontal motion
        amplitudeY: 420,
        frequencyY: 0.008,
        offsetY: p.PI / 2, // Vertical cosine wave motion
      },

      //diagonal motion
      {
        size: baseDiameter + 20 * 5, // Middle circle, 10 units larger
        color: [255, 255, 25, 10], // Green
        strokeWeight: 1,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 5.015,
        amplitudeX: 630,
        frequencyX: 0.002,
        offsetX: p.PI, // No horizontal motion
        amplitudeY: 390,
        frequencyY: 0.002,
        offsetY: p.PI, // Vertical cosine wave motion
      },
      {
        size: baseDiameter + 20 * 5, // Middle circle, 10 units larger
        color: [255, 255, 25, 10], // Green
        strokeWeight: 1,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 5.015,
        amplitudeX: 630,
        frequencyX: -0.002,
        offsetX: p.PI, // No horizontal motion
        amplitudeY: 390,
        frequencyY: 0.002,
        offsetY: p.PI, // Vertical cosine wave motion
      },
      //wavy along x snake right to left
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 255, 25, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 600,
        frequencyX: 0.004,
        offsetX: p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 80,
        frequencyY: 0.04,
        offsetY: p.PI, // No vertical motion
        // NEW: Size animation properties
        amplitudeSize: 100, // Fluctuate size by 150 units
        frequencySize: 0.01, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 4,
      },

      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 255, 25, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 600,
        frequencyX: 0.004,
        offsetX: -p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 80,
        frequencyY: 0.04,
        offsetY: p.PI, // No vertical motion
        // NEW: Size animation properties
        amplitudeSize: 100, // Fluctuate size by 150 units
        frequencySize: 0.01, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 4,
      },

      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 0, 25, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 600,
        frequencyX: 0.004,
        offsetX: p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 80,
        frequencyY: -0.04,
        offsetY: p.PI, // No vertical motion
        // NEW: Size animation properties
        amplitudeSize: 100, // Fluctuate size by 150 units
        frequencySize: -0.01, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 4,
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 0, 25, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 600,
        frequencyX: 0.004,
        offsetX: -p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 80,
        frequencyY: -0.04,
        offsetY: p.PI, // No vertical motion
        // NEW: Size animation properties
        amplitudeSize: 100, // Fluctuate size by 150 units
        frequencySize: -0.01, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 4,
      },

      //wavy along y
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [2, 255, 255, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 360,
        frequencyX: 0.02,
        offsetX: p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 300,
        frequencyY: 0.002,
        offsetY: p.PI, // No vertical motion
        // NEW: Size animation properties
        amplitudeSize: 100, // Fluctuate size by 150 units
        frequencySize: 0.01, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 4,
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [2, 255, 255, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 360,
        frequencyX: 0.02,
        offsetX: -p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 300,
        frequencyY: 0.002,
        offsetY: p.PI, // No vertical motion
        // NEW: Size animation properties
        amplitudeSize: 100, // Fluctuate size by 150 units
        frequencySize: 0.01, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 4,
      },

      //wavy along x
      {
        size: baseDiameter, // Innermost circle
        color: [0, 0, 120, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 100,
        frequencyX: 0.02,
        offsetX: p.PI, // Horizontal sine wave motion
        amplitudeY: 320,
        frequencyY: 0.002,
        offsetY: p.PI / 2, // No vertical motion
      },
      {
        size: baseDiameter, // Innermost circle
        color: [0, 0, 120, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 100,
        frequencyX: -0.02,
        offsetX: p.PI, // Horizontal sine wave motion
        amplitudeY: 320,
        frequencyY: 0.002,
        offsetY: p.PI / 2, // No vertical motion
      },
      {
        size: baseDiameter, // Innermost circle
        color: [255, 0, 0, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 100,
        frequencyX: 0.02,
        offsetX: p.PI, // Horizontal sine wave motion
        amplitudeY: 320,
        frequencyY: 0.002,
        offsetY: p.PI / 2, // No vertical motion
        // NEW: Size animation properties
        amplitudeSize: 60, // Fluctuate size by 150 units
        frequencySize: 0.01, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 4,
      },
      {
        size: baseDiameter, // Innermost circle
        color: [255, 0, 0, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 100,
        frequencyX: -0.02,
        offsetX: p.PI, // Horizontal sine wave motion
        amplitudeY: 320,
        frequencyY: 0.002,
        offsetY: p.PI / 2, // No vertical motion
        // NEW: Size animation properties
        amplitudeSize: 60, // Fluctuate size by 150 units
        frequencySize: 0.01, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 4,
      },

      //elliptical motion - circle all wound
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 2, 2, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 430,
        frequencyX: 0.004,
        offsetX: -p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 240,
        frequencyY: 0.004,
        offsetY: -p.PI, // No vertical motion
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 2, 2, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 430,
        frequencyX: 0.004,
        offsetX: p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 240,
        frequencyY: 0.004,
        offsetY: -p.PI, // No vertical motion
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 255, 0, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 430,
        frequencyX: 0.004,
        offsetX: -p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 240,
        frequencyY: 0.004,
        offsetY: -p.PI, // No vertical motion
        // NEW: Size animation properties
        amplitudeSize: 60, // Fluctuate size by 150 units
        frequencySize: 0.01, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 4,
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 255, 0, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 430,
        frequencyX: 0.004,
        offsetX: p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 240,
        frequencyY: 0.004,
        offsetY: -p.PI, // No vertical motion
        // NEW: Size animation properties
        amplitudeSize: 60, // Fluctuate size by 150 units
        frequencySize: 0.01, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 4,
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 2, 2, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 430,
        frequencyX: 0.004,
        offsetX: -p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 240,
        frequencyY: -0.004,
        offsetY: -p.PI, // No vertical motion
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 2, 2, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 430,
        frequencyX: 0.004,
        offsetX: p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 240,
        frequencyY: -0.004,
        offsetY: -p.PI, // No vertical motion
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [2, 2, 255, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 430,
        frequencyX: 0.004,
        offsetX: -p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 240,
        frequencyY: -0.004,
        offsetY: -p.PI, // No vertical motion
        // NEW: Size animation properties
        amplitudeSize: 60, // Fluctuate size by 150 units
        frequencySize: 0.01, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 4,
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [2, 2, 255, 10], // Red
        strokeWeight: 2,
        strokeColor: [255, 255, 255, 90],
        rotationSpeed: 0.01,
        amplitudeX: 430,
        frequencyX: 0.004,
        offsetX: p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 240,
        frequencyY: -0.004,
        offsetY: -p.PI, // No vertical motion
        // NEW: Size animation properties
        amplitudeSize: 60, // Fluctuate size by 150 units
        frequencySize: 0.01, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 4,
      },
    ];

    // Create the concentric circles using the new function
    createConcentricCircles({
      p,
      shapesArray: shapes,
      centerX,
      centerY,
      circleConfigs: circleConfigurations,
      // You can also add base animation properties here that apply to all circles
      // For example, a general rotation speed or overall amplitude
      // rotationSpeed: 0.001,
    });

    // --- Example 2: Independent Circles (demonstrating different starting points) ---
    const independentCircleConfigurations = [
      //MAIN SYMBOL CIRCLES - CONNECT
      {
        x: p.width * 0.32,
        y: p.height * 0.29,
        size: baseDiameter + 20 * 1.2, // Middle circle, 10 units larger
        color: [230, 2, 2, 100], // Green
        strokeWeight: 15,
        rotationSpeed: -5.015,
        amplitudeSize: 8, // Fluctuate size by 150 units
        frequencySize: 0.085, // Fluctuate 0.005 cycles per frame
        offsetSize: 0,
        // NEW: Stroke weight animation
        amplitudeStrokeWeight: 5,
        frequencyStrokeWeight: 0.008,
        offsetStrokeWeight: p.PI / 2,
        // NEW: Rhythmic Color Animation (animating alpha and red)
        amplitudeColorR: 200,
        amplitudeColorG: 120,
        amplitudeColorB: 100,
        amplitudeColorA: 20, // Making it pulse transparency
        frequencyColor: 2.01,
        // offsetColor: 0,
      },
      {
        x: p.width * 0.68,
        y: p.height * 0.29,
        size: baseDiameter + 20 * 1.2, // Middle circle, 10 units larger
        color: [230, 230, 2, 20], // Green
        strokeWeight: 15,
        rotationSpeed: -5.015,
        amplitudeSize: 8, // Fluctuate size by 150 units
        frequencySize: 0.085, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 2,
        // NEW: Stroke weight animation
        amplitudeStrokeWeight: 5,
        frequencyStrokeWeight: 0.008,
        offsetStrokeWeight: p.PI / 2,
        // NEW: Rhythmic Color Animation (animating alpha and red)
        amplitudeColorR: 200,
        amplitudeColorG: 120,
        amplitudeColorB: 10,
        amplitudeColorA: 20, // Making it pulse transparency
        frequencyColor: 2.01,
        // offsetColor: 0,
      },
      {
        x: p.width * 0.5,
        y: p.height * 0.9,
        size: baseDiameter + 20 * 1.2, // Middle circle, 10 units larger
        color: [2, 230, 2, 20], // Green
        strokeWeight: 15,
        rotationSpeed: -5.015,
        amplitudeSize: 8, // Fluctuate size by 150 units
        frequencySize: 0.085, // Fluctuate 0.005 cycles per frame
        offsetSize: p.PI / 2,
        // NEW: Stroke weight animation
        amplitudeStrokeWeight: 5,
        frequencyStrokeWeight: 0.008,
        offsetStrokeWeight: p.PI / 2,
        // NEW: Rhythmic Color Animation (animating alpha and red)
        amplitudeColorR: 20,
        amplitudeColorG: 220,
        amplitudeColorB: 180,
        amplitudeColorA: 20, // Making it pulse transparency
        frequencyColor: 1.01,
        // offsetColor: 0,
      },

      {
        x: p.width * 0.3,
        y: p.height * 0.3,
        size: baseDiameter + 20, // Middle circle, 10 units larger
        color: [255, 0, 0, 10], // Green
        strokeWeight: 4,
        rotationSpeed: -5.015,
        amplitudeX: 80,
        frequencyX: 0.04,
        offsetX: 0, // No horizontal motion
        // amplitudeY: 60,
        // frequencyY: 0.02,
        offsetY: p.PI / 2, // Vertical cosine wave motion
        // amplitudeSize: 50,
        // frequencySize: -0.008,
        // offsetSize: p.PI ,
        // NEW: Size animation properties
        amplitudeSize: 150, // Fluctuate size by 150 units
        frequencySize: 0.005, // Fluctuate 0.005 cycles per frame
        offsetSize: 0,
        // NEW: Stroke weight animation
        amplitudeStrokeWeight: 2,
        frequencyStrokeWeight: 0.008,
        offsetStrokeWeight: p.PI / 2,
        // NEW: Rhythmic Color Animation (animating alpha and red)
        // amplitudeColorR: 100,
        // amplitudeColorG: 0,
        // amplitudeColorB: 0,
        // amplitudeColorA: 150, // Making it pulse transparency
        // frequencyColor: 0.01,
        // offsetColor: 0,
      },
      {
        x: p.width * 0.3,
        y: p.height * 0.7,
        size: baseDiameter + 20, // Middle circle, 10 units larger
        color: [255, 255, 2, 10], // Green
        strokeWeight: 4,
        rotationSpeed: -5.015,
        amplitudeX: 80,
        frequencyX: -0.04,
        offsetX: 0, // No horizontal motion
        // amplitudeY: 0,
        // frequencyY: 2,
        offsetY: -p.PI / 2, // Vertical cosine wave motion
        // amplitudeSize: 50,
        // frequencySize: -0.008,
        // offsetSize: p.PI ,
        // NEW: Size animation properties
        amplitudeSize: 150, // Fluctuate size by 150 units
        frequencySize: 0.005, // Fluctuate 0.005 cycles per frame
        offsetSize: 0,
        // NEW: Stroke weight animation
        amplitudeStrokeWeight: 2,
        frequencyStrokeWeight: 0.008,
        offsetStrokeWeight: p.PI / 2,
        // NEW: Rhythmic Color Animation (animating alpha and red)
        // amplitudeColorR: 100,
        // amplitudeColorG: 0,
        // amplitudeColorB: 0,
        // amplitudeColorA: 150, // Making it pulse transparency
        // frequencyColor: 0.01,
        // offsetColor: 0,
      },
      {
        x: p.width * 0.7,
        y: p.height * 0.7,
        size: baseDiameter + 20, // Middle circle, 10 units larger
        color: [255, 255, 2, 10], // Green
        strokeWeight: 4,
        rotationSpeed: -5.015,
        amplitudeX: 80,
        frequencyX: 0.04,
        offsetX: 0, // No horizontal motion
        // amplitudeY: 0,
        // frequencyY: 2,
        offsetY: -p.PI / 2, // Vertical cosine wave motion
        // amplitudeSize: 50,
        // frequencySize: -0.008,
        // offsetSize: p.PI ,
        // NEW: Size animation properties
        amplitudeSize: 150, // Fluctuate size by 150 units
        frequencySize: 0.005, // Fluctuate 0.005 cycles per frame
        offsetSize: 0,
        // NEW: Stroke weight animation
        amplitudeStrokeWeight: 2,
        frequencyStrokeWeight: 0.008,
        offsetStrokeWeight: p.PI / 2,
        // NEW: Rhythmic Color Animation (animating alpha and red)
        // amplitudeColorR: 100,
        // amplitudeColorG: 0,
        // amplitudeColorB: 0,
        // amplitudeColorA: 150, // Making it pulse transparency
        // frequencyColor: 0.01,
        // offsetColor: 0,
      },
      {
        x: p.width * 0.7,
        y: p.height * 0.3,
        size: baseDiameter + 20, // Middle circle, 10 units larger
        color: [255, 0, 0, 10], // Green
        strokeWeight: 4,
        rotationSpeed: -5.015,
        amplitudeX: 80,
        frequencyX: -0.04,
        offsetX: 0, // No horizontal motion
        // amplitudeY: 60,
        // frequencyY: 0.02,
        offsetY: p.PI / 2, // Vertical cosine wave motion
        // amplitudeSize: 50,
        // frequencySize: -0.008,
        // offsetSize: p.PI ,
        // NEW: Size animation properties
        amplitudeSize: 150, // Fluctuate size by 150 units
        frequencySize: 0.005, // Fluctuate 0.005 cycles per frame
        offsetSize: 0,
        // NEW: Stroke weight animation
        amplitudeStrokeWeight: 2,
        frequencyStrokeWeight: 0.008,
        offsetStrokeWeight: p.PI / 2,
        // NEW: Rhythmic Color Animation (animating alpha and red)
        // amplitudeColorR: 100,
        // amplitudeColorG: 0,
        // amplitudeColorB: 0,
        // amplitudeColorA: 150, // Making it pulse transparency
        // frequencyColor: 0.01,
        // offsetColor: 0,
      },

      //on sides up and down and in and out
      {
        x: p.width * 0.1,
        y: p.height * 0.5,
        size: 100,
        color: [20, 240, 1, 5],
        strokeWeight: 2,
        amplitudeX: 40,
        frequencyX: 0.03,
        offsetX: -p.PI / 2, // Vertical wave
        amplitudeY: 150,
        frequencyY: -0.003,
        offsetY: p.PI,
        rotationSpeed: -0.01,
        amplitudeSize: 60,
        frequencySize: -0.008,
        offsetSize: -p.PI / 2,
      },
      {
        x: p.width * 0.9,
        y: p.height * 0.5,
        size: 100,
        color: [20, 240, 1, 5],
        strokeWeight: 2,
        amplitudeX: 40,
        frequencyX: 0.03,
        offsetX: p.PI / 2, // Vertical wave
        amplitudeY: 150,
        frequencyY: 0.003,
        offsetY: p.PI,
        rotationSpeed: -0.01,
        amplitudeSize: 60,
        frequencySize: -0.008,
        offsetSize: -p.PI / 2,
      },

      {
        x: p.width * 0.1,
        y: p.height * 0.5,
        size: 100,
        color: [20, 240, 1, 5],
        strokeWeight: 2,
        amplitudeX: 40,
        frequencyX: 0.03,
        offsetX: -p.PI / 2, // Vertical wave
        amplitudeY: 150,
        frequencyY: 0.003,
        offsetY: p.PI,
        rotationSpeed: -0.01,
        amplitudeSize: 60,
        frequencySize: -0.008,
        offsetSize: -p.PI / 2,
      },
      {
        x: p.width * 0.9,
        y: p.height * 0.5,
        size: 100,
        color: [20, 240, 1, 5],
        strokeWeight: 2,
        amplitudeX: 40,
        frequencyX: 0.03,
        offsetX: p.PI / 2, // Vertical wave
        amplitudeY: 150,
        frequencyY: -0.003,
        offsetY: p.PI,
        rotationSpeed: -0.01,
        amplitudeSize: 60,
        frequencySize: -0.008,
        offsetSize: -p.PI / 2,
      },

      //Same as above with unchanging sizes amplitude
      {
        x: p.width * 0.1,
        y: p.height * 0.5,
        size: 30,
        color: [2, 20, 180, 25],
        strokeWeight: 2,
        amplitudeX: 40,
        frequencyX: 0.03,
        offsetX: -p.PI / 2, // Vertical wave
        amplitudeY: 150,
        frequencyY: -0.003,
        offsetY: p.PI,
        rotationSpeed: -0.01,
        // amplitudeSize: 60,
        // frequencySize: -0.008,
        // offsetSize: -p.PI / 2,
      },
      {
        x: p.width * 0.9,
        y: p.height * 0.5,
        size: 30,
        color: [250, 1, 20, 30],
        strokeWeight: 2,
        amplitudeX: 40,
        frequencyX: 0.03,
        offsetX: p.PI / 2, // Vertical wave
        amplitudeY: 150,
        frequencyY: 0.003,
        offsetY: p.PI,
        rotationSpeed: -0.01,
        // amplitudeSize: 60,
        // frequencySize: -0.008,
        // offsetSize: -p.PI / 2,
      },

      {
        x: p.width * 0.1,
        y: p.height * 0.5,
        size: 30,
        color: [2, 20, 180, 25],
        strokeWeight: 2,
        amplitudeX: 40,
        frequencyX: 0.03,
        offsetX: -p.PI / 2, // Vertical wave
        amplitudeY: 150,
        frequencyY: 0.003,
        offsetY: p.PI,
        rotationSpeed: -0.01,
        // amplitudeSize: 60,
        // frequencySize: -0.008,
        // offsetSize: -p.PI / 2,
      },
      {
        x: p.width * 0.9,
        y: p.height * 0.5,
        size: 30,
        color: [250, 1, 20, 30],
        strokeWeight: 2,
        amplitudeX: 40,
        frequencyX: 0.03,
        offsetX: p.PI / 2, // Vertical wave
        amplitudeY: 150,
        frequencyY: -0.003,
        offsetY: p.PI,
        rotationSpeed: -0.01,
        // amplitudeSize: 60,
        // frequencySize: -0.008,
        // offsetSize: -p.PI / 2,
      },
      //Top an dbottom in and out spiral

      {
        x: p.width * 0.5,
        y: p.height * 0.85,
        size: 30,
        color: [255, 255, 2, 10],
        strokeWeight: 2,
        amplitudeX: 30,
        frequencyX: 0.04,
        offsetX: 0, // Circular motion
        amplitudeY: 30,
        frequencyY: 0.04,
        offsetY: p.PI / 2,
        rotationSpeed: 0.015,
        amplitudeSize: 40,
        frequencySize: 0.008,
        offsetSize: p.PI,
      },
      {
        x: p.width * 0.5,
        y: p.height * 0.15,
        size: 30,
        color: [255, 2, 2, 10],
        strokeWeight: 2,
        amplitudeX: 30,
        frequencyX: -0.04,
        offsetX: 0, // Circular motion
        amplitudeY: 30,
        frequencyY: 0.04,
        offsetY: p.PI / 2,
        rotationSpeed: 0.015,
        amplitudeSize: 40,
        frequencySize: -0.008,
        offsetSize: p.PI,
      },
    ];

    createIndependentCircles({
      p,
      shapesArray: shapes,
      circleConfigs: independentCircleConfigurations,
    });

    // // --- NEW: Central Triangle ---
    // // A simple triangle at the center -  isoosceles triangle
    // shapes.push(
    //   new Shape(p, {
    //     type: 'triangle',
    //     x: centerX,
    //     y: centerY,
    //     color: [255, 255, 255, 12], // Yellowish, semi-transparent
    //     //strokeColor: [255, 255, 0, 200],
    //     strokeWeight: 1,
    //     // Vertices relative to centerX, centerY
    //     v1x: -25,
    //     v1y: 25,
    //     v2x: 25,
    //     v2y: 25,
    //     v3x: 0,
    //     v3y: -43.3/2,
    //     // --- Positional Animation (Sine Wave Motion) ---
    //     amplitudeX: 30, // How far the shape oscillates horizontally from its initialX. (e.g., 50, 100)
    //     amplitudeY: 50, // How far the shape oscillates vertically from its initialY. (e.g., 50, 100)
    //     frequencyX: -0.01, // How fast the horizontal oscillation repeats. Higher value = faster. (e.g., 0.01, 0.05)
    //     frequencyY: 0.01, // How fast the vertical oscillation repeats. Higher value = faster. (e.g., 0.01, 0.05)
    //     offsetX: p.PI / 2, // Phase offset for horizontal oscillation (in radians, like p.PI, p.PI/2). Shifts the starting point of the wave.
    //     offsetY: p.PI , // Phase offset for vertical oscillation (in radians).

    //     // --- Rotational Animation ---
    //     //rotation: 0.005, // Initial rotation angle of the shape (in radians, e.g., p.PI / 4 for 45 degrees).
    //     rotationSpeed: 0.01, // Slow rotation
    //     // size animation
    //     amplitudeSize: 20, // Pulsating size
    //     frequencySize: 0.03,
    //     offsetSize: 0,
    //     //baseSize: 12, // The original size for 'circle', 'square', 'point' types before animation. If not set, uses initial 'size'.

    //     // --- Stroke Weight Animation (Sine Wave Motion) ---
    //     //amplitudeStrokeWeight: 12, // How much the stroke weight fluctuates from its baseStrokeWeight. (e.g., 2, 5)
    //     //frequencyStrokeWeight: 20, // How fast the stroke weight fluctuation repeats. (e.g., 0.01, 0.03)
    //     //offsetStrokeWeight: p.P1/2, // Phase offset for stroke weight fluctuation (in radians).
    //     //baseStrokeWeight: 1, // The original stroke weight before animation. If not set, uses initial 'strokeWeight'.

    //     // --- Rhythmic Color Animation (Sine Wave Motion for RGB/A channels) ---
    //     //amplitudeColorR: 12, // How much the Red component of the color fluctuates (0-255).
    //     //amplitudeColorG: 24, // How much the Green component fluctuates (0-255).
    //     //amplitudeColorB: 200, // How much the Blue component fluctuates (0-255).
    //     //amplitudeColorA: 13, // How much the Alpha (transparency) component fluctuates (0-255).
    //     //frequencyColor: 24, // How fast the rhythmic color change repeats (common for all channels). (e.g., 0.008, 0.015)
    //     //offsetColor: p.PI/4, // Phase offset for rhythmic color change (common for all channels).

    //     // --- Random Color Animation ---
    //     //randomizeColor: true, // If set to true, the shape's color will randomly change at intervals.
    //     //randomColorInterval: 10, // How often (in frames) to pick a new random color if `randomizeColor` is true. (e.g., 30, 120)
    //   })
    // );

    // // --- Central Equilateral Triangle ---
    // const triangleSideLength = 150; // Side length of the equilateral triangle
    // const triangleHeight = triangleSideLength * (p.sqrt(3) / 2); // Calculate height using P5.js sqrt()
    // const halfSide = triangleSideLength / 2;
    // const halfHeight = triangleHeight / 2;
    // --- NEW: Lines from the center of the equilateral triangle ---
    const lineLength = 150;
    const lineColor = [0, 0, 0, 200]; // Dark lines
    const lineWeight = 12;

    // Line 1: 45 degrees to the right (down-right from center)
    shapes.push(
      new Shape(p, {
        type: 'line',
        x: centerX, // Lines originate from the triangle's center
        y: centerY + 50,
        color: lineColor,
        strokeColor: lineColor,
        strokeWeight: lineWeight,
        v1x: 0,
        v1y: 0, // Start at the shape's center (relative to its x,y)
        v2x: lineLength * p.cos(p.HALF_PI * 4), // End point X
        v2y: lineLength * p.cos(p.HALF_PI * 2), // End point Y
        // NEW: Stroke weight animation
        amplitudeStrokeWeight: 5,
        frequencyStrokeWeight: 0.008,
        offsetStrokeWeight: p.PI / 2,
      })
    );

    // Line 2: 45 degrees to the left (down-left from center)
    shapes.push(
      new Shape(p, {
        type: 'line',
        x: centerX, // Lines originate from the triangle's center
        y: centerY + 50,
        color: lineColor,
        strokeColor: lineColor,
        strokeWeight: lineWeight,
        v1x: 0,
        v1y: 0, // Start at the shape's center (relative to its x,y)
        v2x: -lineLength * p.cos(p.PI - p.HALF_PI * 2), // End point X (135 degrees)
        v2y: -lineLength * p.sin(p.PI - p.HALF_PI * 1), // End point Y
        // NEW: Stroke weight animation
        amplitudeStrokeWeight: 5,
        frequencyStrokeWeight: 0.008,
        offsetStrokeWeight: p.PI / 4,
      })
    );

    // Line 3: Vertically down from the center
    shapes.push(
      new Shape(p, {
        type: 'line',
        x: centerX, // Lines originate from the triangle's center
        y: centerY + 50,
        color: lineColor,
        strokeColor: lineColor,
        strokeWeight: lineWeight,
        v1x: 0,
        v1y: 0, // Start at the shape's center (relative to its x,y)
        v2x: 0, // X-coordinate remains 0
        v2y: lineLength, // Y-coordinate moves down by lineLength
        // NEW: Stroke weight animation
        amplitudeStrokeWeight: 5,
        frequencyStrokeWeight: 0.004,
        offsetStrokeWeight: p.PI / 2,
      })
    );
    const triangleShapesConfig: LocalShapeConfig[] = [
      //Main:
      {
        type: 'triangle',
        x: centerX, // Shape's center
        y: centerY, // Shape's center
        color: [20, 250, 205, 12],
        strokeWeight: 18,
        // Vertices relative to centerX, centerY for an equilateral triangle
        v1x: -50 * 3, // X-coordinate of bottom-left vertex
        v1y: 43.3 * 3, // Y-coordinate of bottom-left vertex
        v2x: 50 * 3, // X-coordinate of bottom-right vertex
        v2y: 43.3 * 3, // Y-coordinate of bottom-right vertex
        v3x: 0, // X-coordinate of top-center vertex
        v3y: -43.3 * 3, // Y-coordinate of top-center vertex
        //rotationSpeed: 0.003, // Slow rotation
        amplitudeStrokeWeight: 6,
        frequencyStrokeWeight: 0.039, // How fast the stroke weight fluctuation repeats. (e.g., 0.01, 0.03)
        offsetStrokeWeight: p.PI, // Phase offset for stroke weight fluctuation (in radians).
        baseStrokeWeight: 15, // The original stroke weight before animation. If not set, uses initial 'strokeWeight'.

        // NEW: Rhythmic Color Animation (animating alpha and red
        amplitudeColorR: 120,
        amplitudeColorG: 250,
        amplitudeColorB: 100,
        amplitudeColorA: 10, // Making it pulse transparency
        frequencyColor: 0.01,
      },
      //   {
      //     type: 'triangle',
      //     x: centerX, // Shape's center
      //     y: centerY, // Shape's center
      //     color: [20, 250, 205, 12],
      //     strokeWeight: 8,
      //     // Vertices relative to centerX, centerY for an equilateral triangle
      //     v1x: -50 * 4, // X-coordinate of bottom-left vertex
      //     v1y: 43.3 * 4, // Y-coordinate of bottom-left vertex
      //     v2x: 50 * 4, // X-coordinate of bottom-right vertex
      //     v2y: 43.3 * 4, // Y-coordinate of bottom-right vertex
      //     v3x: 0, // X-coordinate of top-center vertex
      //     v3y: -43.3 * 4, // Y-coordinate of top-center vertex
      //     //rotationSpeed: 0.003, // Slow rotation
      //   },
      //equilateralTriangles
      {
        type: 'triangle',
        x: centerX,
        y: centerY,
        color: [255, 255, 1, 12], // Yellowish, semi-transparent
        //strokeColor: [255, 255, 0, 200],
        strokeWeight: 1,
        // Vertices relative to centerX, centerY
        v1x: -25,
        v1y: 25,
        v2x: 25,
        v2y: 25,
        v3x: 0,
        v3y: -43.3 / 2,
        // --- Positional Animation (Sine Wave Motion) ---
        amplitudeX: 275, // How far the shape oscillates horizontally from its initialX. (e.g., 50, 100)
        amplitudeY: 275, // How far the shape oscillates vertically from its initialY. (e.g., 50, 100)
        frequencyX: -0.006, // How fast the horizontal oscillation repeats. Higher value = faster. (e.g., 0.01, 0.05)
        frequencyY: 0.006, // How fast the vertical oscillation repeats. Higher value = faster. (e.g., 0.01, 0.05)
        offsetX: p.PI / 2, // Phase offset for horizontal oscillation (in radians, like p.PI, p.PI/2). Shifts the starting point of the wave.
        offsetY: p.PI, // Phase offset for vertical oscillation (in radians).

        // --- Rotational Animation ---
        rotationSpeed: 0.01, // Slow rotation
      },
      {
        type: 'triangle',
        x: centerX,
        y: centerY,
        color: [2, 255, 2, 12], // Yellowish, semi-transparent
        //strokeColor: [255, 255, 0, 200],
        strokeWeight: 1,
        // Vertices relative to centerX, centerY
        v1x: -25,
        v1y: 25,
        v2x: 25,
        v2y: 25,
        v3x: 0,
        v3y: -43.3 / 2,
        // --- Positional Animation (Sine Wave Motion) ---
        amplitudeX: 275, // How far the shape oscillates horizontally from its initialX. (e.g., 50, 100)
        amplitudeY: 275, // How far the shape oscillates vertically from its initialY. (e.g., 50, 100)
        frequencyX: -0.006, // How fast the horizontal oscillation repeats. Higher value = faster. (e.g., 0.01, 0.05)
        frequencyY: 0.006, // How fast the vertical oscillation repeats. Higher value = faster. (e.g., 0.01, 0.05)
        offsetX: -p.PI / 2, // Phase offset for horizontal oscillation (in radians, like p.PI, p.PI/2). Shifts the starting point of the wave.
        offsetY: p.PI, // Phase offset for vertical oscillation (in radians).

        // --- Rotational Animation ---
        rotationSpeed: 0.01, // Slow rotation
      },
      {
        type: 'triangle',
        x: centerX,
        y: centerY,
        color: [1, 255, 255, 12], // Yellowish, semi-transparent
        //strokeColor: [255, 255, 0, 200],
        strokeWeight: 2,
        // Vertices relative to centerX, centerY
        v1x: -25,
        v1y: 25,
        v2x: 25,
        v2y: 25,
        v3x: 0,
        v3y: -43.3 / 2,
        // --- Positional Animation (Sine Wave Motion) ---
        amplitudeX: 275, // How far the shape oscillates horizontally from its initialX. (e.g., 50, 100)
        amplitudeY: 275, // How far the shape oscillates vertically from its initialY. (e.g., 50, 100)
        frequencyX: 0.006, // How fast the horizontal oscillation repeats. Higher value = faster. (e.g., 0.01, 0.05)
        frequencyY: -0.006, // How fast the vertical oscillation repeats. Higher value = faster. (e.g., 0.01, 0.05)
        offsetX: p.PI / 2, // Phase offset for horizontal oscillation (in radians, like p.PI, p.PI/2). Shifts the starting point of the wave.
        offsetY: p.PI, // Phase offset for vertical oscillation (in radians).
        //rotation: 0.005, // Initial rotation angle of the shape (in radians, e.g., p.PI / 4 for 45 degrees).
        rotationSpeed: -0.01, // Slow rotation
      },
      {
        type: 'triangle',
        x: centerX,
        y: centerY,
        color: [255, 2, 2, 12], // Yellowish, semi-transparent
        //strokeColor: [255, 255, 0, 200],
        strokeWeight: 2,
        // Vertices relative to centerX, centerY
        v1x: -25,
        v1y: 25,
        v2x: 25,
        v2y: 25,
        v3x: 0,
        v3y: -43.3 / 2,
        // --- Positional Animation (Sine Wave Motion) ---
        amplitudeX: 275, // How far the shape oscillates horizontally from its initialX. (e.g., 50, 100)
        amplitudeY: 275, // How far the shape oscillates vertically from its initialY. (e.g., 50, 100)
        frequencyX: -0.006, // How fast the horizontal oscillation repeats. Higher value = faster. (e.g., 0.01, 0.05)
        frequencyY: -0.006, // How fast the vertical oscillation repeats. Higher value = faster. (e.g., 0.01, 0.05)
        offsetX: -p.PI / 2, // Phase offset for horizontal oscillation (in radians, like p.PI, p.PI/2). Shifts the starting point of the wave.
        offsetY: p.PI, // Phase offset for vertical oscillation (in radians).
        //rotation: 0.005, // Initial rotation angle of the shape (in radians, e.g., p.PI / 4 for 45 degrees).
        rotationSpeed: -0.01, // Slow rotation
      },

      //center triangles
      //   {
      //     type: 'triangle',
      //     x: centerX, // Shape's center
      //     y: centerY, // Shape's center
      //     color: [2, 2, 255, 12],
      //     strokeWeight: 2,
      //     // Vertices relative to centerX, centerY for an equilateral triangle
      //     v1x: -50 * 2, // X-coordinate of bottom-left vertex
      //     v1y: 43.3 * 2, // Y-coordinate of bottom-left vertex
      //     v2x: 50 * 2, // X-coordinate of bottom-right vertex
      //     v2y: 43.3 * 2, // Y-coordinate of bottom-right vertex
      //     v3x: 0, // X-coordinate of top-center vertex
      //     v3y: -43.3 * 2, // Y-coordinate of top-center vertex
      //     rotationSpeed: 0.003, // Slow rotation
      //   },
      //   {
      //     type: 'triangle',
      //     x: centerX, // Shape's center
      //     y: centerY, // Shape's center
      //     color: [2, 222, 255, 12],
      //     strokeWeight: 2,
      //     // Vertices relative to centerX, centerY for an equilateral triangle
      //     v1x: -50 * 2, // X-coordinate of bottom-left vertex
      //     v1y: 43.3 * 2, // Y-coordinate of bottom-left vertex
      //     v2x: 50 * 2, // X-coordinate of bottom-right vertex
      //     v2y: 43.3 * 2, // Y-coordinate of bottom-right vertex
      //     v3x: 0, // X-coordinate of top-center vertex
      //     v3y: -43.3 * 2, // Y-coordinate of top-center vertex
      //     rotationSpeed: -0.003, // Slow rotation
      //   },
      //   {
      //     type: 'triangle',
      //     x: centerX, // Shape's center
      //     y: centerY, // Shape's center
      //     color: [222, 2, 2, 12],
      //     strokeWeight: 2,
      //     // Vertices relative to centerX, centerY for an equilateral triangle
      //     v3x: -50 * 2, // X-coordinate of bottom-left vertex
      //     v3y: -43.3 * 2, // Y-coordinate of bottom-left vertex
      //     v2x: 50 * 2, // X-coordinate of bottom-right vertex
      //     v2y: -43.3 * 2, // Y-coordinate of bottom-right vertex
      //     v1x: 0, // X-coordinate of top-center vertex
      //     v1y: 43.3 * 2, // Y-coordinate of top-center vertex
      //     rotationSpeed: -0.003, // Slow rotation
      //     //     amplitudeStrokeWeight: 9, // How much the stroke weight fluctuates from its baseStrokeWeight. (e.g., 2, 5)
      //     // frequencyStrokeWeight: 0.02, // How fast the stroke weight fluctuation repeats. (e.g., 0.01, 0.03)
      //     // offsetStrokeWeight: p.PI/2, // Phase offset for stroke weight fluctuation (in radians).
      //     // baseStrokeWeight: 3, // The original stroke weight before animation. If not set, uses initial 'strokeWeight'.
      //   },
      //   {
      //     type: 'triangle',
      //     x: centerX, // Shape's center
      //     y: centerY, // Shape's center
      //     color: [222, 255, 2, 12],
      //     strokeWeight: 2,
      //     // Vertices relative to centerX, centerY for an equilateral triangle
      //     v3x: -50 * 2, // X-coordinate of bottom-left vertex
      //     v3y: -43.3 * 2, // Y-coordinate of bottom-left vertex
      //     v2x: 50 * 2, // X-coordinate of bottom-right vertex
      //     v2y: -43.3 * 2, // Y-coordinate of bottom-right vertex
      //     v1x: 0, // X-coordinate of top-center vertex
      //     v1y: 43.3 * 2, // Y-coordinate of top-center vertex
      //     rotationSpeed: 0.003, // Slow rotation
      //     //     amplitudeStrokeWeight: 9, // How much the stroke weight fluctuates from its baseStrokeWeight. (e.g., 2, 5)
      //     // frequencyStrokeWeight: 0.02, // How fast the stroke weight fluctuation repeats. (e.g., 0.01, 0.03)
      //     // offsetStrokeWeight: p.PI/2, // Phase offset for stroke weight fluctuation (in radians).
      //     // baseStrokeWeight: 3, // The original stroke weight before animation. If not set, uses initial 'strokeWeight'.
      //   },

      //Isosceles triangle
      //   {
      //     type: 'triangle',
      //     x: centerX,
      //     y: centerY,
      //     color: [255, 2, 2, 12], // Yellowish, semi-transparent
      //     //strokeColor: [255, 255, 0, 200],
      //     strokeWeight: 2,
      //     // Vertices relative to centerX, centerY
      //     v1x: -50,
      //     v1y: -50,
      //     v2x: 50,
      //     v2y: -50,
      //     v3x: 0,
      //     v3y: 50,
      //     // --- Positional Animation (Sine Wave Motion) ---
      //     //amplitudeX: 30, // How far the shape oscillates horizontally from its initialX. (e.g., 50, 100)
      //     //amplitudeY: 50, // How far the shape oscillates vertically from its initialY. (e.g., 50, 100)
      //     //frequencyX: -0.04, // How fast the horizontal oscillation repeats. Higher value = faster. (e.g., 0.01, 0.05)
      //     //frequencyY: 0.04, // How fast the vertical oscillation repeats. Higher value = faster. (e.g., 0.01, 0.05)
      //     //offsetX: p.PI / 2, // Phase offset for horizontal oscillation (in radians, like p.PI, p.PI/2). Shifts the starting point of the wave.
      //     //offsetY: p.PI / 2, // Phase offset for vertical oscillation (in radians).

      //     // --- Rotational Animation ---
      //     //rotation: 0.005, // Initial rotation angle of the shape (in radians, e.g., p.PI / 4 for 45 degrees).
      //     rotationSpeed: -0.005, // Slow rotation
      //     // size animation
      //     amplitudeSize: 20, // Pulsating size
      //     frequencySize: 0.03,
      //     offsetSize: 0,
      //     //baseSize: 12, // The original size for 'circle', 'square', 'point' types before animation. If not set, uses initial 'size'.

      //     // --- Stroke Weight Animation (Sine Wave Motion) ---
      //     //amplitudeStrokeWeight: 12, // How much the stroke weight fluctuates from its baseStrokeWeight. (e.g., 2, 5)
      //     //frequencyStrokeWeight: 20, // How fast the stroke weight fluctuation repeats. (e.g., 0.01, 0.03)
      //     //offsetStrokeWeight: p.P1/2, // Phase offset for stroke weight fluctuation (in radians).
      //     //baseStrokeWeight: 1, // The original stroke weight before animation. If not set, uses initial 'strokeWeight'.

      //     // --- Rhythmic Color Animation (Sine Wave Motion for RGB/A channels) ---
      //     //amplitudeColorR: 12, // How much the Red component of the color fluctuates (0-255).
      //     //amplitudeColorG: 24, // How much the Green component fluctuates (0-255).
      //     //amplitudeColorB: 200, // How much the Blue component fluctuates (0-255).
      //     //amplitudeColorA: 13, // How much the Alpha (transparency) component fluctuates (0-255).
      //     //frequencyColor: 24, // How fast the rhythmic color change repeats (common for all channels). (e.g., 0.008, 0.015)
      //     //offsetColor: p.PI/4, // Phase offset for rhythmic color change (common for all channels).

      //     // --- Random Color Animation ---
      //     //randomizeColor: true, // If set to true, the shape's color will randomly change at intervals.
      //     //randomColorInterval: 10, // How often (in frames) to pick a new random color if `randomizeColor` is true. (e.g., 30, 120)
      //   },

      //Isosceles on the outside causing streak
      {
        type: 'triangle',
        x: centerX,
        y: centerY,
        color: [200, 245, 2, 8], // Yellowish, semi-transparent
        //strokeColor: [255, 255, 0, 200],
        strokeWeight: 1,
        // Vertices relative to centerX, centerY
        v1x: -150,
        v1y: 190,
        v2x: 150,
        v2y: 190,
        v3x: 0,
        v3y: -200,
        //rotation: -p.PI/4,
        rotationSpeed: -0.02, // Slow rotation
        amplitudeSize: 120, // Pulsating size
        frequencySize: 3.03,
        offsetSize: p.PI / 4,
      },
      {
        type: 'triangle',
        x: centerX,
        y: centerY,
        color: [200, 25, 2, 8], // Yellowish, semi-transparent
        //strokeColor: [255, 255, 0, 200],
        strokeWeight: 1,
        // Vertices relative to centerX, centerY
        v1x: -150,
        v1y: -200,
        v2x: 150,
        v2y: -200,
        v3x: 0,
        v3y: 190,
        //rotation: -p.PI/4,
        rotationSpeed: 0.02, // Slow rotation
      },
      {
        type: 'triangle',
        x: centerX,
        y: centerY,
        color: [200, 245, 2, 8], // Yellowish, semi-transparent
        //strokeColor: [255, 255, 0, 200],
        strokeWeight: 1,
        // Vertices relative to centerX, centerY
        v1x: -150,
        v1y: 190,
        v2x: 150,
        v2y: 190,
        v3x: 0,
        v3y: -200,
        //rotation: -p.PI/4,
        rotationSpeed: 0.02, // Slow rotation
        amplitudeSize: 120, // Pulsating size
        frequencySize: 3.03,
        offsetSize: p.PI / 4,
      },
      {
        type: 'triangle',
        x: centerX,
        y: centerY,
        color: [200, 25, 2, 8], // Yellowish, semi-transparent
        //strokeColor: [255, 255, 0, 200],
        strokeWeight: 1,
        // Vertices relative to centerX, centerY
        v1x: -150,
        v1y: -200,
        v2x: 150,
        v2y: -200,
        v3x: 0,
        v3y: 190,
        //rotation: -p.PI/4,
        rotationSpeed: -0.02, // Slow rotation
      },
      // {
      //     type: 'triangle',
      //     x: centerX,
      //     y: centerY,
      //     color: [2, 205, 245, 12], // Yellowish, semi-transparent
      //     //strokeColor: [255, 255, 0, 200],
      //     strokeWeight: 2,
      //     // Vertices relative to centerX, centerY
      //     v1x: 150,
      //     v1y: 0,
      //     v2x: -150,
      //     v2y: -200,
      //     v3x: -150,
      //     v3y: 190,
      //     //rotation: -p.PI/4,
      //     rotationSpeed: -0.005, // Slow rotation
      // },
      // {
      //     type: 'triangle',
      //     x: centerX,
      //     y: centerY,
      //     color: [2, 245, 2, 12], // Yellowish, semi-transparent
      //     //strokeColor: [255, 255, 0, 200],
      //     strokeWeight: 2,
      //     // Vertices relative to centerX, centerY
      //     v1x: -150,
      //     v1y: 0,
      //     v2x: 150,
      //     v2y: -200,
      //     v3x: 150,
      //     v3y: 190,
      //     //rotation: -p.PI/4,
      //     rotationSpeed: 0.005, // Slow rotation
      // },
    ];

    createIndependentShapes({
      p,
      shapesArray: shapes,
      shapeConfigs: triangleShapesConfig,
    });

    // --- NEW: Mirrored Shapes (Rectangle, Ellipse, Quad) ---
    // Define properties for the shapes on the left side
    // const mirroredShapeConfigs: LocalShapeConfig[] = [
    //   // Left Rectangle
    //   {
    //     type: 'rect',
    //     x: p.width * 0.25, // 25% from left edge
    //     y: p.height * 0.3,
    //     width: 80,
    //     height: 80,
    //     color: [0, 150, 255, 180], // Blue, semi-transparent
    //     strokeColor: [0, 200, 255, 200],
    //     strokeWeight: 3,
    //     rotationSpeed: -0.007,
    //     amplitudeY: 50, // Vertical oscillation
    //     frequencyY: 0.02,
    //     offsetY: p.PI / 2,
    //   },
    //   // Left Ellipse
    //   {
    //     type: 'ellipse',
    //     x: p.width * 0.25,
    //     y: p.height * 0.7,
    //     width: 120,
    //     height: 60,
    //     color: [255, 0, 150, 180], // Pink, semi-transparent
    //     strokeColor: [255, 50, 200, 200],
    //     strokeWeight: 3,
    //     rotationSpeed: 0.006,
    //     amplitudeX: 40, // Horizontal oscillation
    //     frequencyX: 0.015,
    //     offsetX: p.PI,
    //   },
    //   // Left Quad (a diamond shape)
    //   {
    //     type: 'quad',
    //     x: p.width * 0.25,
    //     y: p.height * 0.5,
    //     color: [100, 255, 0, 180], // Green, semi-transparent
    //     strokeColor: [150, 255, 50, 200],
    //     strokeWeight: 3,
    //     rotationSpeed: 0.008,
    //     amplitudeSize: 30, // Pulsating size
    //     frequencySize: 0.025,
    //     offsetSize: p.PI / 4,
    //     // Vertices relative to its (x,y) center
    //     v1x: -50,
    //     v1y: 0,
    //     v2x: 0,
    //     v2y: -50,
    //     v3x: 50,
    //     v3y: 0,
    //     v4x: 0,
    //     v4y: 50,
    //   },
    // ];

    // // Create the left-side shapes
    // createIndependentShapes({
    //   p,
    //   shapesArray: shapes,
    //   shapeConfigs: mirroredShapeConfigs,
    // });

    // // Create the right-side (mirrored) shapes
    // mirroredShapeConfigs.forEach((config) => {
    //   shapes.push(
    //     new Shape(p, {
    //       ...(config as LocalShapeConfig), // Copy all properties from the left-side config
    //       x: p.width - config.x!, // Mirror the X position
    //       rotationSpeed: -config.rotationSpeed!, // Reverse rotation for mirrored effect
    //       // You might need to adjust offsets for mirrored animation if they look odd
    //       // For simple sine waves, reversing rotation speed often works well for mirroring.
    //     })
    //   );
    // });

    console.log(
      'playAgain sketch initialized with concentric and independent circles.'
    );

    console.log('playPractice sketch initialized with concentric circles.');
  };

  p.draw = () => {
    p.background(10, 5); // Semi-transparent background for a fading trail effect
    shapes.forEach((shape) => {
      //   shape.update(p.deltaTime); // Update animation properties
      // shape.update(p.deltaTime); // Update animation properties
      shape.update(); // Update animation properties
      shape.display(); // Draw the shape
    });
  };

  p.windowResized = () => {
    // p.resizeCanvas(p.windowWidth, p.windowHeight); // REMOVED: Resizing is handled by P5Canvas component
    // Re-calculate positions if they are relative to canvas dimensions
    // For this simple example, shapes are centered, so no explicit re-positioning is strictly needed
    // but if you had elements at fixed pixel positions, you'd adjust them here.
    // const centerX = p.width / 2;
    // const centerY = p.height / 2;
    // Example: if you wanted to re-center existing shapes:
    // shapes.forEach(shape => {
    //   if (shape.type === 'circle') { // Or other types that need re-centering
    //     shape.x = centerX;
    //     shape.y = centerY;
    //   }
    // });
    // p.resizeCanvas(p.windowWidth, p.windowHeight);
    // Re-center shapes if needed, or adjust their positions based on new dimensions
    // For this simple example, they are centered so no specific re-positioning is needed
  };
};
