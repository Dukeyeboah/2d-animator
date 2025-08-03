// src/sketches/playPractice.ts
import { Shape } from '@/utils/Shape';
import {
  createConcentricCircles,
  createIndependentCircles,
} from '@/utils/playPatterns';
import p5 from 'p5'; // Import p5 for type hinting

export const playPractice = (p: p5) => {
  const shapes: Shape[] = [];

  p.setup = () => {
    p.background(250); // Dark background
    // p.createCanvas(p.windowWidth, p.windowHeight); // Full window canvas
    p.noStroke(); // No stroke for circles by default

    const centerX = p.width / 2;
    const centerY = p.height / 2;
    const baseDiameter = 50; // Starting diameter for the innermost circle

    // Define configurations for the three concentric circles
    const circleConfigurations = [
      {
        size: baseDiameter + 20 * 2, // Outermost circle, 20 units larger
        color: [255, 255, 255, 10], // Blue
        strokeWeight: 6,
        rotationSpeed: 0.008,
        amplitudeX: 250,
        frequencyX: -0.003,
        offsetX: -p.PI, // Horizontal sine wave motion (different phase)
        amplitudeY: 250,
        frequencyY: 0.003,
        offsetY: p.PI / 4, // Vertical cosine wave motion (different phase)
        // NEW: Size animation properties
        // amplitudeSize: 150, // Fluctuate size by 50 units
        // frequencySize: 0.005, // Fluctuate 0.05 cycles per frame
        // offsetSize: 0,
      },
      {
        size: baseDiameter + 20 * 2, // Outermost circle, 20 units larger
        color: [255, 255, 255, 10], // Blue
        strokeWeight: 6,
        rotationSpeed: 0.008,
        amplitudeX: 250,
        frequencyX: -0.003,
        offsetX: p.PI, // Horizontal sine wave motion (different phase)
        amplitudeY: 250,
        frequencyY: 0.003,
        offsetY: -p.PI / 4, // Vertical cosine wave motion (different phase)
      },
      {
        size: baseDiameter + 20 * 2, // Outermost circle, 20 units larger
        color: [255, 255, 255, 10], // Blue
        strokeWeight: 6,
        rotationSpeed: 0.008,
        amplitudeX: 250,
        frequencyX: 0.003,
        offsetX: p.PI, // Horizontal sine wave motion (different phase)
        amplitudeY: 250,
        frequencyY: 0.003,
        offsetY: p.PI / 4, // Vertical cosine wave motion (different phase)
      },
      {
        size: baseDiameter + 20 * 2, // Outermost circle, 20 units larger
        color: [255, 255, 255, 10], // Blue
        strokeWeight: 6,
        rotationSpeed: 0.008,
        amplitudeX: 250,
        frequencyX: 0.003,
        offsetX: p.PI, // Horizontal sine wave motion (different phase)
        amplitudeY: 250,
        frequencyY: 0.003,
        offsetY: -p.PI / 4, // Vertical cosine wave motion (different phase)
      },

      {
        size: baseDiameter + 20 * 2, // Outermost circle, 20 units larger
        color: [255, 255, 255, 80], // Blue
        strokeWeight: 1,
        rotationSpeed: 0.008,
        amplitudeX: 250,
        frequencyX: -0.005,
        offsetX: p.PI, // Horizontal sine wave motion (different phase)
        amplitudeY: 250,
        frequencyY: 0.005,
        offsetY: p.PI / 2, // Vertical cosine wave motion (different phase)
      },
      {
        size: baseDiameter + 20 * 2, // Outermost circle, 20 units larger
        color: [255, 255, 255, 80], // Blue
        strokeWeight: 1,
        rotationSpeed: 0.008,
        amplitudeX: 250,
        frequencyX: 0.005,
        offsetX: p.PI, // Horizontal sine wave motion (different phase)
        amplitudeY: 250,
        frequencyY: 0.005,
        offsetY: p.PI / 2, // Vertical cosine wave motion (different phase)
      },
      {
        size: baseDiameter + 20 * 2, // Outermost circle, 20 units larger
        color: [255, 255, 255, 80], // Blue
        strokeWeight: 1,
        rotationSpeed: 0.008,
        amplitudeX: 205,
        frequencyX: 0.005,
        offsetX: p.PI, // Horizontal sine wave motion (different phase)
        amplitudeY: 205,
        frequencyY: 0.005,
        offsetY: -p.PI / 2, // Vertical cosine wave motion (different phase)
      },
      {
        size: baseDiameter + 20 * 2, // Outermost circle, 20 units larger
        color: [255, 255, 255, 80], // Blue
        strokeWeight: 1,
        rotationSpeed: 0.008,
        amplitudeX: 205,
        frequencyX: -0.005,
        offsetX: -p.PI, // Horizontal sine wave motion (different phase)
        amplitudeY: 205,
        frequencyY: 0.005,
        offsetY: -p.PI / 2, // Vertical cosine wave motion (different phase)
      },

      //thick center
      {
        size: baseDiameter + 20, // Middle circle, 10 units larger
        color: [255, 255, 255, 10], // Green
        strokeWeight: 10,
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
        amplitudeStrokeWeight: 5,
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
      {
        size: baseDiameter + 20 * 8, // Middle circle, 10 units larger
        color: [255, 255, 255, 10], // Green
        strokeWeight: 1,
        rotationSpeed: -5.015,
        amplitudeX: 0,
        frequencyX: 0,
        offsetX: 0, // No horizontal motion
        amplitudeY: 400,
        frequencyY: 0.008,
        offsetY: -p.PI / 2, // Vertical cosine wave motion
      },
      {
        size: baseDiameter + 20 * 8, // Middle circle, 10 units larger
        color: [255, 255, 255, 10], // Green
        strokeWeight: 1,
        rotationSpeed: 5.015,
        amplitudeX: 0,
        frequencyX: 0,
        offsetX: 0, // No horizontal motion
        amplitudeY: 420,
        frequencyY: 0.008,
        offsetY: p.PI / 2, // Vertical cosine wave motion
      },
      {
        size: baseDiameter + 20 * 8, // Middle circle, 10 units larger
        color: [255, 255, 255, 10], // Green
        strokeWeight: 1,
        rotationSpeed: 5.015,
        amplitudeX: 620,
        frequencyX: 0.004,
        offsetX: -p.PI / 4, // No horizontal motion
        amplitudeY: 0,
        frequencyY: 0.0,
        offsetY: 0, // Vertical cosine wave motion
      },
      {
        size: baseDiameter + 20 * 8, // Middle circle, 10 units larger
        color: [255, 255, 255, 10], // Green
        strokeWeight: 1,
        rotationSpeed: 5.015,
        amplitudeX: 620,
        frequencyX: -0.004,
        offsetX: p.PI / 4, // No horizontal motion
        amplitudeY: 0,
        frequencyY: 0.0,
        offsetY: 0, // Vertical cosine wave motion
      },
      //diagonal motion
      {
        size: baseDiameter + 20 * 5, // Middle circle, 10 units larger
        color: [255, 255, 255, 10], // Green
        strokeWeight: 1,
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
        color: [255, 255, 255, 10], // Green
        strokeWeight: 1,
        rotationSpeed: 5.015,
        amplitudeX: 630,
        frequencyX: -0.002,
        offsetX: p.PI, // No horizontal motion
        amplitudeY: 390,
        frequencyY: 0.002,
        offsetY: p.PI, // Vertical cosine wave motion
      },
      {
        size: baseDiameter + 20 * 5, // Middle circle, 10 units larger
        color: [255, 255, 255, 10], // Green
        strokeWeight: 1,
        rotationSpeed: 5.015,
        amplitudeX: 630,
        frequencyX: 0.002,
        offsetX: p.PI, // No horizontal motion
        amplitudeY: 390,
        frequencyY: -0.002,
        offsetY: p.PI, // Vertical cosine wave motion
      },
      {
        size: baseDiameter + 20 * 5, // Middle circle, 10 units larger
        color: [255, 255, 255, 10], // Green
        strokeWeight: 1,
        rotationSpeed: 5.015,
        amplitudeX: 630,
        frequencyX: -0.002,
        offsetX: p.PI, // No horizontal motion
        amplitudeY: 390,
        frequencyY: -0.002,
        offsetY: p.PI, // Vertical cosine wave motion
      },

      {
        size: baseDiameter / 2.5, // Innermost circle
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 90,
        frequencyX: -0.005,
        offsetX: p.PI, // Horizontal sine wave motion
        amplitudeY: 100,
        frequencyY: -0.005,
        offsetY: p.PI / 2, // No vertical motion
      },

      {
        size: baseDiameter / 3, // Innermost circle
        color: [240, 240, 240, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 120,
        frequencyX: 0.0095,
        offsetX: 0, // Horizontal sine wave motion
        amplitudeY: 0,
        frequencyY: 0,
        offsetY: 0, // No vertical motion
      },
      {
        size: baseDiameter / 2, // Innermost circle
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 120,
        frequencyX: 0.005,
        offsetX: p.PI, // Horizontal sine wave motion
        amplitudeY: 120,
        frequencyY: 0.005,
        offsetY: p.PI / 2, // No vertical motion
      },

      //wavy along x
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 600,
        frequencyX: 0.004,
        offsetX: p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 80,
        frequencyY: 0.04,
        offsetY: p.PI, // No vertical motion
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 600,
        frequencyX: 0.004,
        offsetX: -p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 80,
        frequencyY: 0.04,
        offsetY: p.PI, // No vertical motion
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 600,
        frequencyX: 0.004,
        offsetX: p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 80,
        frequencyY: -0.04,
        offsetY: p.PI, // No vertical motion
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 600,
        frequencyX: 0.004,
        offsetX: -p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 80,
        frequencyY: -0.04,
        offsetY: p.PI, // No vertical motion
      },

      //wavy along y
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 80,
        frequencyX: 0.02,
        offsetX: p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 300,
        frequencyY: 0.002,
        offsetY: p.PI, // No vertical motion
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 80,
        frequencyX: 0.02,
        offsetX: -p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 300,
        frequencyY: 0.002,
        offsetY: p.PI, // No vertical motion
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 80,
        frequencyX: 0.02,
        offsetX: p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 300,
        frequencyY: -0.002,
        offsetY: p.PI, // No vertical motion
      },
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 80,
        frequencyX: 0.02,
        offsetX: -p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 300,
        frequencyY: -0.002,
        offsetY: p.PI, // No vertical motion
      },

      //wavy along x
      {
        size: baseDiameter, // Innermost circle
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
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
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
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
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 100,
        frequencyX: -0.02,
        offsetX: p.PI, // Horizontal sine wave motion
        amplitudeY: 320,
        frequencyY: 0.002,
        offsetY: p.PI / 2 + 600, // No vertical motion
      },
      {
        size: baseDiameter, // Innermost circle
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 100,
        frequencyX: 0.02,
        offsetX: p.PI, // Horizontal sine wave motion
        amplitudeY: 320,
        frequencyY: 0.002,
        offsetY: p.PI / 2 + 600, // No vertical motion
      },

      //elliptical
      {
        size: baseDiameter + 20 * 4, // Innermost circle
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
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
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
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
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
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
        color: [255, 255, 255, 10], // Red
        strokeWeight: 2,
        rotationSpeed: 0.01,
        amplitudeX: 430,
        frequencyX: -0.004,
        offsetX: -p.PI / 2, // Horizontal sine wave motion
        amplitudeY: 240,
        frequencyY: -0.004,
        offsetY: p.PI, // No vertical motion
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
      {
        x: p.width * 0.1,
        y: p.height * 0.5,
        size: 60,
        color: [255, 255, 255, 0.1],
        strokeWeight: 2,
        amplitudeX: 40,
        frequencyX: 0.03,
        offsetX: -p.PI / 2, // Vertical wave
        amplitudeY: 120,
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
        size: 60,
        color: [255, 255, 255, 0.1],
        strokeWeight: 2,
        amplitudeX: 40,
        frequencyX: 0.03,
        offsetX: p.PI / 2, // Vertical wave
        amplitudeY: 120,
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
        size: 60,
        color: [255, 255, 255, 0.1],
        strokeWeight: 2,
        amplitudeX: 40,
        frequencyX: 0.03,
        offsetX: -p.PI / 2, // Vertical wave
        amplitudeY: 120,
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
        size: 60,
        color: [255, 255, 255, 0.9],
        strokeWeight: 2,
        amplitudeX: 40,
        frequencyX: 0.03,
        offsetX: p.PI / 2, // Vertical wave
        amplitudeY: 120,
        frequencyY: -0.003,
        offsetY: p.PI,
        rotationSpeed: -0.01,
        amplitudeSize: 60,
        frequencySize: -0.008,
        offsetSize: -p.PI / 2,
      },
      {
        x: p.width * 0.5,
        y: p.height * 0.85,
        size: 30,
        color: [255, 255, 255, 0.1],
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
        color: [255, 255, 255, 0.1],
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

    console.log(
      'playPractice sketch initialized with concentric and independent circles.'
    );

    console.log('playPractice sketch initialized with concentric circles.');
  };

  p.draw = () => {
    p.background(250, 10); // Semi-transparent background for a fading trail effect
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
