// src/sketches/firstImage.ts
import { Shape } from '@/utils/Shape'; // Import the Shape class
import { createQuadGrid } from '@/utils/patterns'; // Import the new function
import {
  createVerticalPipe,
  createLongNeckPair,
  createSingleTriangleMouth,
  createNestedTriangleMouths,
  createQuadEyePair,
  createAdinkraheneFace,
  createEllipseMouthPair,
  createStrangeAdinkraBeing,
  createCentralAdinkraGroup,
  createCentralForeheadRects,
  createComplexEye,
  createSimpleEye,
  createNestedRectPillar,
  createVerticalRectStack,
  createNestedDiamondSquares,
  createDiamondSquareEye,
  createBeingNeckPair,
  createNestedRectEye,
  createConnectingVerticalRect,
  createLongRectNeckWithMouth,
  createConcentricBottomTriangles,
  createSingleInvertedTriangle,
  createPyramidTriangles,
  createConcentricTopInvertedTriangles,
  createConcentricBottomEllipses,
  createHorizontalLine,
  createEyeDots,
} from '@/utils/patterns';
import p5 from 'p5'; // Import p5 for type hinting

export const firstImage = (p: p5) => {
  const shapes: Shape[] = []; // Array to hold all our custom shape instances
  let loadedImage: p5.Image | null = null; // Variable to hold the loaded SVG image

  p.setup = async () => {
    p.background(10); // Dark background for contrast
    try {
      console.log('Attempting to load PNG: /images/adinkrahene.png');
      loadedImage = await new Promise<p5.Image>((resolve, reject) => {
        p.loadImage('/images/adinkrahene.png', resolve, reject);
      });
      console.log('SVG loaded successfully');
    } catch (error) {
      console.error('Failed to load SVG image:', error);
    }
    // --- Refactored: Middle Vertical Pipes ---
    createVerticalPipe({
      p: p,
      shapesArray: shapes,
      x: p.width * 0.5,
      y: p.height * 0.5,
      width: 20,
      height: 550,
      color: [255, 255, 255],
      strokeColor: [0, 0, 0],
      strokeWeight: 2,
      rotation: p.PI,
      amplitudeY: 20,
      frequencyY: 0.01,
      offsetY: 0.3,
    });
    createVerticalPipe({
      p: p,
      shapesArray: shapes,
      x: p.width * 0.5,
      y: p.height * 0.5,
      width: 8,
      height: 550,
      color: [12, 12, 12, 80], // Semi-transparent black
      strokeColor: [0, 0, 0],
      strokeWeight: 2,
      rotation: p.PI,
      amplitudeY: 30,
      frequencyY: 0.005,
      offsetY: p.PI * 0.5,
    });

    // --- Refactored: LONG VERTICAL NECKS ---
    // Positions based on your original code
    const neckBaseY = p.height * 0.55;
    const neckWidth = 390;
    const neckHeightThick = 15;
    const neckHeightThin = 3;

    createLongNeckPair({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.1,
      baseY: neckBaseY,
      width: neckWidth,
      heightThick: neckHeightThick,
      heightThin: neckHeightThin,
      rotation: p.PI / 2,
      amplitudeY: 15,
      frequencyY: 0.02,
      offsetY: p.PI * 0.1,
      //rotationSpeed: 0.001,
    });
    createLongNeckPair({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.275,
      baseY: neckBaseY,
      width: neckWidth,
      heightThick: neckHeightThick,
      heightThin: neckHeightThin,
      rotation: p.PI / 2,
      amplitudeY: 15,
      frequencyY: 0.03,
      offsetY: p.PI * 0.06,
      //rotationSpeed: -0.001,
    });
    createLongNeckPair({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.42,
      baseY: neckBaseY,
      width: neckWidth,
      heightThick: neckHeightThick,
      heightThin: neckHeightThin,
      rotation: p.PI / 2,
      amplitudeY: 10,
      frequencyY: 0.025,
      offsetY: p.PI * 0.25,
      //rotationSpeed: 0.001,
    });
    createLongNeckPair({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.58,
      baseY: neckBaseY,
      width: neckWidth,
      heightThick: neckHeightThick,
      heightThin: neckHeightThin,
      rotation: p.PI / 2,
      amplitudeY: 15,
      frequencyY: 0.02,
      offsetY: p.PI * 0.15,
      //rotationSpeed: -0.001,
    });
    createLongNeckPair({
      p,
      shapesArray: shapes,
      baseX: p.width * (1 - 0.1),
      baseY: neckBaseY,
      width: neckWidth,
      heightThick: neckHeightThick,
      heightThin: neckHeightThin,
      rotation: p.PI / 2,
      amplitudeY: 12,
      frequencyY: 0.05,
      offsetY: p.PI * 0.5,
      //rotationSpeed: 0.001,
    });
    createLongNeckPair({
      p,
      shapesArray: shapes,
      baseX: p.width * (1 - 0.275),
      baseY: neckBaseY,
      width: neckWidth,
      heightThick: neckHeightThick,
      heightThin: neckHeightThin,
      rotation: p.PI / 2,
      amplitudeY: 15,
      frequencyY: 0.04,
      offsetY: p.PI * 0.6,
      //rotationSpeed: -0.001,
    });

    // --- Refactored: LEFT BOTTOM triangle MOUTHS ---
    // Left side - Single large triangle
    createSingleTriangleMouth({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.1875,
      baseY: p.height * 0.92,
      isRightSide: false,
      //rotationSpeed: 0.005,
      amplitudeY: 8,
      frequencyY: 0.025,
      offsetY: p.PI * 0.1,
    });

    // Left side - Nested group of three triangles
    createNestedTriangleMouths({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.35,
      baseY: p.height * 0.86,
      isRightSide: false,
      //rotationSpeed: 0.005,
      amplitudeY: 10,
      frequencyY: 0.03,
      offsetY: p.PI * 0.1,
      // Specific offsets for inner triangles for subtle animation differences
      offsetYInner1: 0,
      frequencyYInner1: 0, // Largest black
      offsetYInner2: p.PI * 0.05,
      frequencyYInner2: 0.001, // Medium black
      offsetYInner3: p.PI * 0.1,
      frequencyYInner3: 0.002, // Smallest white
    });

    // --- Refactored: RIGHT BOTTOM triangle mouths ---
    // Right side - Single large triangle
    createSingleTriangleMouth({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.1875, // Use the same base X, but it will be mirrored
      baseY: p.height * 0.92,
      isRightSide: true, // Explicitly right side
      //rotationSpeed: -0.005, // Opposite rotation
      amplitudeY: 7,
      frequencyY: 0.03,
      offsetY: p.PI * 0.3,
    });

    // Right side - Nested group of three triangles
    createNestedTriangleMouths({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.35, // Use the same base X, but it will be mirrored
      baseY: p.height * 0.86,
      isRightSide: true,
      //rotationSpeed: -0.005,
      amplitudeY: 8,
      frequencyY: 0.03,
      offsetY: p.PI * 1.4,
      // Specific offsets for inner triangles for subtle animation differences
      offsetYInner1: 0,
      frequencyYInner1: 0, // Largest black
      offsetYInner2: p.PI * 0.06,
      frequencyYInner2: 0.001, // Medium black
      offsetYInner3: p.PI * 0.15,
      frequencyYInner3: 0.002, // Smallest white
    });

    // --- Refactored: TOP QUAD EYES ---
    const quadEyeY = p.height * 0.24;

    // Leftside-left-Quad Eyes
    createQuadEyePair({
      p,
      shapesArray: shapes,
      x: p.width * 0.12,
      y: quadEyeY,
      outerV1x: 0,
      outerV1y: -5,
      outerV2x: 60,
      outerV2y: -5,
      outerV3x: 46.6,
      outerV3y: 15.55,
      outerV4x: 15,
      outerV4y: 15.55,
      innerV1x: 10,
      innerV1y: 0,
      innerV2x: 50,
      innerV2y: 0,
      innerV3x: 44,
      innerV3y: 10.55,
      innerV4x: 17,
      innerV4y: 10.55,
      amplitudeY: 2,
      //   amplitudeX:3,
      frequencyY: 0.03,
      //innerFrequency
      offsetY: p.PI * 0.1, // Base bobbing
      offsetYInner: p.PI * 1.05, // Inner quad slightly out of phase
    });

    // Leftside-right-Quad Eyes
    createQuadEyePair({
      p,
      shapesArray: shapes,
      x: p.width * 0.195,
      y: quadEyeY,
      outerV1x: 0,
      outerV1y: -5,
      outerV2x: 60,
      outerV2y: -5,
      outerV3x: 46.6,
      outerV3y: 15.55,
      outerV4x: 15,
      outerV4y: 15.55,
      innerV1x: 10,
      innerV1y: 0,
      innerV2x: 50,
      innerV2y: 0,
      innerV3x: 44,
      innerV3y: 10.55,
      innerV4x: 17,
      innerV4y: 10.55,
      amplitudeY: 2,
      frequencyY: -0.03,
      offsetY: p.PI * 0.2,
      offsetYInner: p.PI * 1.05,
    });

    // Middle-left-Quad Eyes
    createQuadEyePair({
      p,
      shapesArray: shapes,
      x: p.width * 0.44,
      y: quadEyeY,
      outerV1x: 0,
      outerV1y: -5,
      outerV2x: 45,
      outerV2y: -5,
      outerV3x: 45,
      outerV3y: 15.55,
      outerV4x: 15,
      outerV4y: 15.55,
      innerV1x: 10,
      innerV1y: 0,
      innerV2x: 40,
      innerV2y: 0,
      innerV3x: 40,
      innerV3y: 10.55,
      innerV4x: 17,
      innerV4y: 10.55,
      amplitudeY: 2.5,
      frequencyY: 0.01,
      offsetY: p.PI * 0.3,
      offsetYInner: p.PI * 1.25,
    });

    // Middle-right-Quad Eyes
    createQuadEyePair({
      p,
      shapesArray: shapes,
      x: p.width * 0.5,
      y: quadEyeY,
      outerV1x: 15,
      outerV1y: -5,
      outerV2x: 60,
      outerV2y: -5,
      outerV3x: 46.6,
      outerV3y: 15.55,
      outerV4x: 15,
      outerV4y: 15.55,
      innerV1x: 20,
      innerV1y: 0,
      innerV2x: 50,
      innerV2y: 0,
      innerV3x: 44,
      innerV3y: 10.55,
      innerV4x: 20,
      innerV4y: 10.55,
      amplitudeY: 2,
      frequencyY: -0.01,
      offsetY: p.PI * 0.4,
      offsetYInner: -p.PI * 1.05,
    });

    // Rightside-left-Quad Eyes
    createQuadEyePair({
      p,
      shapesArray: shapes,
      x: p.width * 0.745,
      y: quadEyeY,
      outerV1x: 0,
      outerV1y: -5,
      outerV2x: 60,
      outerV2y: -5,
      outerV3x: 46.6,
      outerV3y: 15.55,
      outerV4x: 15,
      outerV4y: 15.55,
      innerV1x: 10,
      innerV1y: 0,
      innerV2x: 50,
      innerV2y: 0,
      innerV3x: 44,
      innerV3y: 10.55,
      innerV4x: 17,
      innerV4y: 10.55,
      amplitudeY: 3,
      frequencyY: -0.01,
      offsetY: p.PI * 0.5,
      offsetYInner: p.PI * 1.45,
    });

    // Rightside-right-Quad Eyes
    createQuadEyePair({
      p,
      shapesArray: shapes,
      x: p.width * 0.82,
      y: quadEyeY,
      outerV1x: 0,
      outerV1y: -5,
      outerV2x: 60,
      outerV2y: -5,
      outerV3x: 46.6,
      outerV3y: 15.55,
      outerV4x: 15,
      outerV4y: 15.55,
      innerV1x: 10,
      innerV1y: 0,
      innerV2x: 50,
      innerV2y: 0,
      innerV3x: 44,
      innerV3y: 10.55,
      innerV4x: 17,
      innerV4y: 10.55,
      amplitudeY: 4,
      frequencyY: 0.01,
      offsetY: p.PI * 0.6,
      offsetYInner: p.PI * 1.05,
    });

    //ADINKRAHENES
    // --- NEW: Refactored Adinkrahene Faces at the back ---
    if (loadedImage) {
      // Face 1 (Right side)
      createAdinkraheneFace({
        p,
        shapesArray: shapes,
        loadedImage: loadedImage,
        faceCenterX: p.width * 0.65, // Corresponds to original mouth x
        faceCenterY: p.height * 0.5, // Corresponds to original mouth y
        eyeWidth: 50,
        eyeHeight: 50,
        mouthWidth: 160,
        mouthHeight: 160,
        eyeOffsetFactorX: 0.045, // Based on (0.695 - 0.65) or (0.65 - 0.605)
        eyeOffsetFactorY: -0.15, // Based on (0.35 - 0.5)
        //rotationSpeed: 0.01,
        amplitudeX: 12,
        frequencyX: 0.015,
        offsetX: p.PI * 1.25,
        // Individual eye/mouth animation overrides can go here if needed
      });

      // Face 2 (Left side)
      createAdinkraheneFace({
        p,
        shapesArray: shapes,
        loadedImage: loadedImage,
        faceCenterX: p.width * 0.35, // Corresponds to original mouth x
        faceCenterY: p.height * 0.5, // Corresponds to original mouth y
        eyeWidth: 50,
        eyeHeight: 50,
        mouthWidth: 160,
        mouthHeight: 160,
        eyeOffsetFactorX: 0.045,
        eyeOffsetFactorY: -0.15,
        rotationSpeed: 0.01,
        amplitudeX: 11,
        frequencyX: -0.015,
        offsetX: p.PI * 1.25, // Stagger this face's animation
      });

      // --- NEW: Refactored Ellipse Mouths ---
      createEllipseMouthPair({
        p,
        shapesArray: shapes,
        baseX: p.width * 0.188, // Left side X
        baseY: p.height * 0.42,
        isRightSide: false,
        outerWidth: 190,
        outerHeight: 50,
        innerWidth: 180,
        innerHeight: 30,
        outerColor: [255, 255, 255],
        innerColor: [20, 20, 20],
        strokeWeight: 2,
        rotation: p.PI,
        // rotationSpeed: 0.01,
        amplitudeX: 25,
        frequencyX: 0.0075,
        offsetX: p.PI / 2, // Base animation
        offsetYInner: p.PI * 1.05, // Subtle phase offset for inner ellipse
      });

      createEllipseMouthPair({
        p,
        shapesArray: shapes,
        baseX: p.width * 0.188, // Use same baseX, but it will be mirrored
        baseY: p.height * 0.42,
        isRightSide: true, // Explicitly right side
        outerWidth: 190,
        outerHeight: 50,
        innerWidth: 180,
        innerHeight: 30,
        outerColor: [255, 255, 255],
        innerColor: [20, 20, 20],
        strokeWeight: 2,
        rotation: p.PI,
        // rotationSpeed: 0.01,
        amplitudeX: 30,
        frequencyX: 0.009,
        offsetX: p.PI / 2 + p.PI, // Stagger animation for right side
        offsetYInner: p.PI * 1.5,
      });

      // --- NEW: Refactored Strange Adinkrahene Being ---
      // Left Adinkra Being
      createStrangeAdinkraBeing({
        p,
        shapesArray: shapes,
        loadedImage: loadedImage,
        baseX: p.width * 0.125, // Left-most eye's X for this group
        baseY: p.height * 0.5, // Top row eye's Y for this group
        isRightSide: false,
        rotationSpeed: 0.002,
        amplitudeX: 20,
        frequencyX: 0.015,
        offsetX: p.PI * 1.5,
        // You can add specific overrides here if needed:
        // stretchedEyeRotationSpeed: 0.015,
        // midEyeRotationSpeed: -0.005,
      });

      // Right Adinkra Being (mirrored)
      createStrangeAdinkraBeing({
        p,
        shapesArray: shapes,
        loadedImage: loadedImage,
        baseX: p.width * 0.125, // Use the same baseX, but it will be mirrored
        baseY: p.height * 0.5,
        isRightSide: true, // Explicitly right side
        rotationSpeed: -0.001, // Opposite rotation
        amplitudeX: 18,
        frequencyX: -0.012,
        offsetX: p.PI * 1.2, // Stagger animation for the right side
      });
      // --- NEW: Refactored Central Adinkra Eyes (Group) ---
      createCentralAdinkraGroup({
        p,
        shapesArray: shapes,
        loadedImage: loadedImage,
        centerX: p.width * 0.5,
        centerY: p.height * 0.5, // Central point for the large image
        largeImageWidth: 210,
        largeImageHeight: 210,
        bottomEyeWidth: 80,
        bottomEyeHeight: 80,
        longEyeWidth: 100,
        longEyeHeight: 200,
        rotationSpeed: 0.0009, // Base rotation for the group
        amplitudeY: 10,
        frequencyY: 0.01,
        offsetY: p.PI * 1.1, // Base bobbing
        amplitudeX: 10,
        frequencyX: -0.02,
        offsetX: p.PI * 0.9, // Base side-to-side
        // Specific overrides for individual parts can be added here if needed
      });

      // --- NEW: Refactored Central Rectangle Forehead ---
      createCentralForeheadRects({
        p,
        shapesArray: shapes,
        centerX: p.width * 0.5,
        baseY: p.height * 0.29,
        thickWidth: 20,
        thickHeight: 80,
        thinWidth: 10,
        thinHeight: 980, // Using 980 as per original code
        thickColor: [255, 255, 255],
        thinColor: [255, 255, 255],
        strokeColor: [0, 0, 0],
        strokeWeight: 2,
        rotation: p.PI / 2, // Horizontal
        amplitudeY: 8,
        frequencyY: 0.015,
        offsetY: p.PI * 1.2, // Bobbing
        amplitudeX: 6,
        frequencyX: -0.01,
        offsetX: p.PI / 2, // Side-to-side
        offsetYThin: p.PI * 0.1, // Stagger thin rect's vertical animation
      });
    } else {
      console.warn('Adinkrahene image not loaded.');
    }
    //Quad bricks at top
    createQuadGrid({
      p: p,
      shapesArray: shapes,
      numRows: 2, // You can change this
      numQuadsPerRow: 9, // You can change this
      quadWidth: 90,
      quadHeight: 6,
      horizontalSpacing: 120,
      verticalPadding: 9,
      initialX: p.width * 0.001,
      initialY: p.height * 0.66,
      // You can override base animation speeds here if needed for this grid
      baseRotationSpeed: 0.0008,
      baseAmplitudeY: 13,
      frequencyX: -0.01,
      //   frequencyY: -0.01,
    });

    // --- NEW: Refactored EYES AT THE TOP ---
    // Top left eyes - left eye:
    createComplexEye({
      p,
      shapesArray: shapes,
      eyeCenterX: p.width * 0.1,
      eyeCenterY: p.height * 0.29,
      eyelidRotation: -p.PI, // Horizontal eyelids
      rotationSpeed: 0.0001,
      amplitudeX: 9,
      frequencyX: 0.012,
      offsetX: p.PI * 1.4,
      insideEyelidOffsetX: p.PI * 0.5, // Subtle inner eyelid stagger
    });

    // Top left eyes - right eye:
    createComplexEye({
      p,
      shapesArray: shapes,
      eyeCenterX: p.width * 0.275,
      eyeCenterY: p.height * 0.29,
      eyelidRotation: -p.PI,
      rotationSpeed: -0.0001,
      amplitudeX: 9,
      frequencyX: 0.012,
      offsetX: -p.PI * 1.4,
      insideEyelidOffsetX: p.PI * 0.5,
    });

    // Top right eyes - right eye:
    createComplexEye({
      p,
      shapesArray: shapes,
      eyeCenterX: p.width * 0.9,
      eyeCenterY: p.height * 0.29,
      eyelidRotation: -p.PI,
      rotationSpeed: -0.0002,
      amplitudeX: 9,
      frequencyX: 0.013,
      offsetX: p.PI * 1.4,
      insideEyelidOffsetX: p.PI * 0.5,
    });

    // Top right eyes - left eye:
    createComplexEye({
      p,
      shapesArray: shapes,
      eyeCenterX: p.width * (1 - 0.275), // Mirrored X
      eyeCenterY: p.height * 0.29,
      eyelidRotation: -p.PI,
      rotationSpeed: 0.0002,
      amplitudeX: 9,
      frequencyX: 0.013,
      offsetX: -p.PI * 1.4,
      insideEyelidOffsetX: p.PI * 0.5,
    });

    // Top Middle eyes - Right eye:
    createComplexEye({
      p,
      shapesArray: shapes,
      eyeCenterX: p.width * 0.58,
      eyeCenterY: p.height * 0.29,
      ovalEyelidColor: [10, 10, 10, 90], // Darker eyelid
      eyelidRotation: -p.PI / 2, // Vertical eyelids
      rotationSpeed: 0.0008,
      amplitudeX: 8,
      frequencyX: 0.001,
      offsetX: p.PI * 1.1,
      insideEyelidOffsetX: p.PI * 0,
    });

    // Top Middle eyes - Left eye:
    createComplexEye({
      p,
      shapesArray: shapes,
      eyeCenterX: p.width * (1 - 0.58), // Mirrored X
      eyeCenterY: p.height * 0.29,
      ovalEyelidColor: [10, 10, 10, 90],
      eyelidRotation: -p.PI / 2,
      rotationSpeed: -0.0008, // Opposite rotation
      amplitudeX: 8,
      frequencyX: 0.001,
      offsetX: p.PI * 1.1,
      insideEyelidOffsetX: p.PI * 0.0,
    });

    // --- NEW: Refactored Mid Circle Elements ---
    // Mid Circle righthandside (eye)
    createSimpleEye({
      p,
      shapesArray: shapes,
      centerX: p.width * 0.55,
      centerY: p.height * 0.5,
      outerSize: 80,
      innerSize: 40,
      outerColor: [255, 255, 255],
      innerColor: [2, 2, 2],
      strokeWeightOuter: 0,
      strokeWeightInner: 1,
      rotationSpeed: 0.001,
      amplitudeX: 12,
      frequencyX: 0.005,
      offsetX: p.PI * 1.5,
    });

    // Mid Circle leftthandside (eye)
    createSimpleEye({
      p,
      shapesArray: shapes,
      centerX: p.width * 0.45,
      centerY: p.height * 0.5,
      outerSize: 80,
      innerSize: 40,
      outerColor: [255, 255, 255],
      innerColor: [2, 2, 2],
      strokeWeightOuter: 0,
      strokeWeightInner: 1,
      rotationSpeed: 0.001,
      amplitudeX: 12,
      frequencyX: -0.005,
      offsetX: -p.PI * 1.5,
    });

    // Mid circle mouth
    createSimpleEye({
      p,
      shapesArray: shapes,
      centerX: p.width * 0.5,
      centerY: p.height * 0.65,
      outerSize: 80,
      innerSize: 40,
      outerColor: [255, 255, 255],
      innerColor: [2, 2, 2],
      strokeWeightOuter: 0,
      strokeWeightInner: 1,
      rotationSpeed: -0.015,
      amplitudeY: 15,
      frequencyY: 0.006,
      offsetY: p.PI * 2.5, // Mouth bobbing
    });

    // --- Refactored VERTICAL PILLARS ---
    // FAR LEFT pillar RECTANGLES
    createNestedRectPillar({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.025,
      baseY: p.height * 0.55,
      isRightSide: false,
      outerWidth: 390,
      outerHeight: 40,
      middleWidth: 360,
      middleHeight: 25,
      innerWidth: 320,
      innerHeight: 12,
      innerColor: [25, 25, 25],
      rotation: p.PI / 2,
      amplitudeY: 20,
      frequencyY: 0.005,
      offsetY: 0,
      middleOffsetY: p.PI * 0.1,
      innerOffsetY: p.PI * 0.2,
    });
    // far left small white boxes
    createVerticalRectStack({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.025,
      initialY: p.height * 0.35,
      count: 5,
      spacingY: p.height * 0.1,
      isRightSide: false,
      rectWidth: 25,
      rectHeight: 8,
      rotation: p.PI / 2,
      amplitudeY: 10,
      frequencyY: 0.008,
      offsetY: 0,
      staggerOffsetY: p.PI * 0.05,
    });

    // FAR right INNER PILLAR RECTANGLES
    createNestedRectPillar({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.025,
      baseY: p.height * 0.55,
      isRightSide: true,
      outerWidth: 390,
      outerHeight: 40,
      middleWidth: 360,
      middleHeight: 25,
      innerWidth: 320,
      innerHeight: 12,
      innerColor: [25, 25, 25],
      rotation: p.PI / 2,
      amplitudeY: 20,
      frequencyY: 0.005,
      offsetY: p.PI,
      middleOffsetY: p.PI * 0.1,
      innerOffsetY: p.PI * 0.2,
    });
    // far right white smaller boxes
    createVerticalRectStack({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.025,
      initialY: p.height * 0.35,
      count: 5,
      spacingY: p.height * 0.1,
      isRightSide: true,
      rectWidth: 25,
      rectHeight: 8,
      rotation: p.PI / 2,
      amplitudeY: 10,
      frequencyY: 0.02,
      offsetY: p.PI,
      staggerOffsetY: p.PI * 0.05,
    });

    // pillar - mid right
    createNestedRectPillar({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.65,
      baseY: p.height * 0.55,
      isRightSide: false,
      outerWidth: 390,
      outerHeight: 40,
      outerColor: [255, 255, 255, 0],
      middleWidth: 360,
      middleHeight: 25,
      innerWidth: 320,
      innerHeight: 12,
      innerColor: [25, 25, 25],
      rotation: p.PI / 2,
      amplitudeY: 20,
      frequencyY: 0.006,
      offsetY: p.PI * 0.25,
      middleOffsetY: p.PI * 0.1,
      innerOffsetY: p.PI * 0.2,
    });
    // white small boxes (mid right)
    createVerticalRectStack({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.65,
      initialY: p.height * 0.3,
      count: 6,
      spacingY: p.height * 0.1,
      isRightSide: false,
      rectWidth: 20,
      rectHeight: 8,
      rotation: p.PI / 2,
      amplitudeY: 10,
      frequencyY: 0.008,
      offsetY: p.PI * 0.25,
      staggerOffsetY: p.PI * 0.05,
    });

    // mid left pillar
    createNestedRectPillar({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.35,
      baseY: p.height * 0.55,
      isRightSide: false,
      outerWidth: 390,
      outerHeight: 40,
      outerColor: [255, 255, 255, 0],
      middleWidth: 360,
      middleHeight: 25,
      innerWidth: 320,
      innerHeight: 12,
      innerColor: [25, 25, 25],
      rotation: p.PI / 2,
      amplitudeY: 20,
      frequencyY: 0.005,
      offsetY: p.PI * 1.25,
      middleOffsetY: p.PI * 0.1,
      innerOffsetY: p.PI * 0.2,
    });
    // white small boxes (mid left)
    createVerticalRectStack({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.35,
      initialY: p.height * 0.3,
      count: 6,
      spacingY: p.height * 0.1,
      isRightSide: false,
      rectWidth: 20,
      rectHeight: 8,
      rotation: p.PI / 2,
      amplitudeY: 10,
      frequencyY: 0.008,
      offsetY: p.PI * 0.75,
      staggerOffsetY: p.PI * 0.05,
    });

    // --- Refactored MIDDLE NOSE SQUARE - diamond ---
    createNestedDiamondSquares({
      p,
      shapesArray: shapes,
      centerX: p.width * 0.5,
      centerY: p.height * 0.575,
      outerSize: 80,
      middleSquareSize: 70,
      middleDiamondSize: 40,
      innerSquareSize: 40,
      innerSquareColor: [255, 255, 255, 80],
      innerDiamondSize: 15,
      innerDiamondColor: [20, 20, 20],
      strokeColor: [0, 0, 0],
      strokeWeight: 1,
      amplitudeY: 10,
      frequencyY: 0.005,
      offsetY: 0,
      rotationSpeed: 0.001,
      staggerOffsetX: p.PI * 1.02,
      staggerOffsetY: p.PI * 0.02,
    });

    // --- Refactored square eyes in space ---
    createDiamondSquareEye({
      p,
      shapesArray: shapes,
      x: p.width * 0.31,
      y: p.height * 0.725,
      size: 15,
      color: [255, 255, 255],
      strokeColor: [0, 0, 0],
      strokeWeight: 1,
      rotation: p.PI / 4,
      rotationSpeed: 0.002,
      amplitudeY: 10,
      frequencyY: 0.007,
      offsetY: 0,
    });
    createDiamondSquareEye({
      p,
      shapesArray: shapes,
      x: p.width * 0.385,
      y: p.height * 0.725,
      size: 15,
      color: [255, 255, 255],
      strokeColor: [0, 0, 0],
      strokeWeight: 1,
      rotation: p.PI / 4,
      rotationSpeed: -0.002,
      amplitudeY: 10,
      frequencyY: 0.007,
      offsetY: p.PI,
    });
    // NEW: Right side square eyes in space
    createDiamondSquareEye({
      p,
      shapesArray: shapes,
      x: p.width * 0.615,
      y: p.height * 0.725,
      size: 15,
      color: [255, 255, 255],
      strokeColor: [0, 0, 0],
      strokeWeight: 1,
      rotation: p.PI / 4,
      rotationSpeed: -0.002,
      amplitudeY: 10,
      frequencyY: 0.007,
      offsetY: p.PI * 0.5,
    });
    createDiamondSquareEye({
      p,
      shapesArray: shapes,
      x: p.width * 0.69,
      y: p.height * 0.725,
      size: 15,
      color: [255, 255, 255],
      strokeColor: [0, 0, 0],
      strokeWeight: 1,
      rotation: p.PI / 4,
      rotationSpeed: 0.002,
      amplitudeY: 10,
      frequencyY: 0.007,
      offsetY: p.PI * 1.5,
    });

    // --- NEW: Refactored middle being neck ---
    createBeingNeckPair({
      p,
      shapesArray: shapes,
      centerX: p.width * 0.5,
      centerY: p.height * 0.75,
      width: 145,
      height: 10,
      color: [255, 255, 255, 90],
      strokeColor: [0, 0, 0],
      strokeWeight: 0,
      rotation: p.PI / 2,
      horizontalOffset: p.width * 0.05, // (0.55 - 0.5)
      amplitudeY: 10,
      frequencyY: 0.008,
      offsetY: p.PI * 1.1,
      leftOffsetX: p.PI * 1.1,
      rightOffsetX: p.PI * 0.2, // Stagger animation
    });

    // --- NEW: Refactored Left Being Horizontal Arms and Side Eyes ---
    // Left eye 1
    createNestedRectEye({
      p,
      shapesArray: shapes,
      eyeCenterX: p.width * 0.12,
      eyeCenterY: p.height * 0.62,
      outerColor: [255, 255, 255],
      middleColor: [20, 20, 20, 80],
      innerColor: [20, 20, 20],
      pupilColor: [255, 255, 255],
      strokeWeightOuter: 0,
      strokeWeightMiddle: 1,
      strokeWeightInner: 0,
      strokeWeightPupil: 0,
      rotation: p.PI / 2,
      rotationSpeed: 0.002,
      amplitudeY: 8,
      frequencyY: 0.008,
      offsetY: p.PI * 1.1,
      middleOffsetY: p.PI * 0.15,
      innerOffsetY: p.PI * 0.1,
      pupilOffsetY: p.PI * 0.19,
    });
    // Left eye 2
    createNestedRectEye({
      p,
      shapesArray: shapes,
      eyeCenterX: p.width * 0.255,
      eyeCenterY: p.height * 0.62,
      outerColor: [255, 255, 255],
      middleColor: [20, 20, 20, 80],
      innerColor: [20, 20, 20],
      pupilColor: [255, 255, 255],
      strokeWeightOuter: 0,
      strokeWeightMiddle: 1,
      strokeWeightInner: 0,
      strokeWeightPupil: 0,
      rotation: p.PI / 2,
      rotationSpeed: -0.002,
      amplitudeY: 8,
      frequencyY: 0.008,
      offsetY: p.PI * 1.25, // Stagger animation
      middleOffsetY: p.PI * 0.05,
      innerOffsetY: p.PI * 0.1,
      pupilOffsetY: p.PI * 0.19,
    });
    // Connecting vertical rect (left)
    createConnectingVerticalRect({
      p,
      shapesArray: shapes,
      x: p.width * 0.186,
      y: p.height * 0.62,
      width: 20,
      height: 88,
      color: [255, 255, 255],
      strokeWeight: 0,
      rotation: p.PI / 2,
      //rotationSpeed: 0.002,
      amplitudeY: 12,
      frequencyY: 0.008,
      offsetY: p.PI / 2, // Stagger animation
    });

    // --- NEW: Refactored Long Neck Part (Left Guy) ---
    createLongRectNeckWithMouth({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.1875,
      baseY: p.height * 0.57,
      isRightSide: false,
      neckWidth: 170,
      neckHeight: 30,
      mouthOuterWidth: 40,
      mouthOuterHeight: 20,
      mouthInnerWidth: 30,
      mouthInnerHeight: 20,
      neckColor: [255, 255, 255],
      mouthOuterColor: [255, 255, 255],
      mouthInnerColor: [25, 25, 25],
      strokeWeight: 0, // Neck has no stroke
      rotation: p.PI / 2,
      amplitudeY: 4,
      frequencyY: 0.008,
      offsetY: p.PI * 1.25, // Stagger animation
      mouthOuterOffsetY: p.PI * 0.25,
      mouthInnerOffsetY: p.PI * 0.1,
    });

    // --- NEW: Refactored Right Being Horizontal Arms and Side Eyes ---
    // Right eye 1
    createNestedRectEye({
      p,
      shapesArray: shapes,
      eyeCenterX: p.width * (1 - 0.12), // Mirrored X
      eyeCenterY: p.height * 0.62,
      outerColor: [255, 255, 255],
      middleColor: [20, 20, 20, 80],
      innerColor: [20, 20, 20],
      pupilColor: [255, 255, 255],
      strokeWeightOuter: 0,
      strokeWeightMiddle: 1,
      strokeWeightInner: 0,
      strokeWeightPupil: 0,
      rotation: p.PI / 2,
      rotationSpeed: -0.001,
      amplitudeY: 8,
      frequencyY: 0.009,
      offsetY: p.PI * 0.5, // Stagger animation
      middleOffsetY: p.PI * 0.05,
      innerOffsetY: p.PI * 0.1,
      pupilOffsetY: p.PI * 0.15,
    });
    // Right eye 2
    createNestedRectEye({
      p,
      shapesArray: shapes,
      eyeCenterX: p.width * (1 - 0.255), // Mirrored X
      eyeCenterY: p.height * 0.62,
      outerColor: [255, 255, 255],
      middleColor: [20, 20, 20, 80],
      innerColor: [20, 20, 20],
      pupilColor: [255, 255, 255],
      strokeWeightOuter: 0,
      strokeWeightMiddle: 1,
      strokeWeightInner: 0,
      strokeWeightPupil: 0,
      rotation: p.PI / 2,
      rotationSpeed: 0.001,
      amplitudeY: 8,
      frequencyY: 0.009,
      offsetY: p.PI * 1.5, // Stagger animation
      middleOffsetY: p.PI * 0.05,
      innerOffsetY: p.PI * 0.1,
      pupilOffsetY: p.PI * 0.15,
    });
    // Connecting vertical rect (right)
    createConnectingVerticalRect({
      p,
      shapesArray: shapes,
      x: p.width * (1 - 0.186), // Mirrored X
      y: p.height * 0.62,
      width: 20,
      height: 88,
      color: [255, 255, 255],
      strokeWeight: 0,
      rotation: p.PI / 2,
      amplitudeY: 12,
      frequencyY: 0.005,
      offsetY: p.PI * 1.25, // Stagger animation
    });

    // --- NEW: Refactored Long Neck Part (Right Guy) ---
    createLongRectNeckWithMouth({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.1875, // Use same baseX, but mirrored
      baseY: p.height * 0.57,
      isRightSide: true, // Mirrored
      neckWidth: 150,
      neckHeight: 30, // Note: width is 150 here, not 170
      mouthOuterWidth: 40,
      mouthOuterHeight: 20,
      mouthInnerWidth: 30,
      mouthInnerHeight: 20,
      neckColor: [255, 255, 255],
      mouthOuterColor: [255, 255, 255],
      mouthInnerColor: [25, 25, 25],
      strokeWeight: 0,
      rotation: p.PI / 2,
      amplitudeY: 4,
      frequencyY: -0.008,
      offsetY: p.PI * 1.15, // Stagger animation
      mouthOuterOffsetY: -p.PI * 0.25,
      mouthInnerOffsetY: p.PI * 0.1,
    });

    // --- Refactored TRIANGLES ---
    // 5 concentric triangle - left bottom
    createConcentricBottomTriangles({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.1875, // Corrected: Use left-side base X
      baseY: p.height * 0.75,
      triangleConfigs: [
        {
          v2x: -80,
          v2y: 80,
          v3x: 80,
          v3y: 80,
          color: [255, 255, 255, 25],
          strokeWeight: 0,
        },
        {
          v2x: -60,
          v2y: 60,
          v3x: 60,
          v3y: 60,
          color: [255, 255, 255, 25],
          strokeWeight: 0,
        },
        {
          v2x: -40,
          v2y: 40,
          v3x: 40,
          v3y: 40,
          color: [255, 255, 255],
          strokeWeight: 0,
        },
        {
          v2x: -20,
          v2y: 20,
          v3x: 20,
          v3y: 20,
          color: [20, 20, 20, 90],
          strokeWeight: 0,
        },
        {
          v2x: -10,
          v2y: 10,
          v3x: 10,
          v3y: 10,
          color: [20, 20, 20],
          strokeWeight: 0,
        },
      ],
      //rotationSpeed: 0.005,
    });

    // 5 concentric triangle - right bottom
    createConcentricBottomTriangles({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.1875, // Corrected: Use left-side base X
      baseY: p.height * 0.75,
      isRightSide: true, // Set to true to mirror
      triangleConfigs: [
        {
          v2x: -80,
          v2y: 80,
          v3x: 80,
          v3y: 80,
          color: [255, 255, 255, 25],
          strokeWeight: 0,
        },
        {
          v2x: -60,
          v2y: 60,
          v3x: 60,
          v3y: 60,
          color: [255, 255, 255, 25],
          strokeWeight: 0,
        },
        {
          v2x: -40,
          v2y: 40,
          v3x: 40,
          v3y: 40,
          color: [255, 255, 255],
          strokeWeight: 0,
        },
        {
          v2x: -20,
          v2y: 20,
          v3x: 20,
          v3y: 20,
          color: [20, 20, 20, 90],
          strokeWeight: 0,
        },
        {
          v2x: -10,
          v2y: 10,
          v3x: 10,
          v3y: 10,
          color: [20, 20, 20],
          strokeWeight: 0,
        },
      ],
      //rotationSpeed: 0.005,
    });

    // 1 white Upside down triangles - topleft
    createSingleInvertedTriangle({
      p,
      shapesArray: shapes,
      x: p.width * 0.1875,
      y: p.height * 0.42,
      v1x: 0,
      v1y: -60,
      v2x: -60,
      v2y: 60,
      v3x: 60,
      v3y: 60,
      color: [255, 255, 255, 30],
      strokeWeight: 2,
      //rotationSpeed: 0.005,
    });

    // 1 white Upside down triangles - topright
    createSingleInvertedTriangle({
      p,
      shapesArray: shapes,
      x: p.width * 0.8125,
      y: p.height * 0.41, // This X is already correctly mirrored for a direct placement
      v1x: 0,
      v1y: -60,
      v2x: -60,
      v2y: 50,
      v3x: 60,
      v3y: 50,
      color: [255, 255, 255, 30],
      strokeWeight: 2,
      //rotationSpeed: 0.005,
    });

    // LEFT PYRAMID triangles
    createPyramidTriangles({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.1875, // Corrected: Use left-side base X
      baseY: p.height * 0.42,
      triangleConfigs: [
        {
          v1y: -120,
          v2x: -60,
          v2y: 1,
          v3x: 60,
          v3y: 1,
          color: [255, 255, 255],
          strokeWeight: 3,
        },
        {
          v1y: -120,
          v2x: -40,
          v2y: 1,
          v3x: 40,
          v3y: 1,
          color: [180, 180, 180, 80],
          strokeWeight: 1,
        },
        {
          v1y: -120,
          v2x: -20,
          v2y: 1,
          v3x: 20,
          v3y: 1,
          color: [25, 25, 25, 80],
          strokeWeight: 0,
        },
      ],
      //rotationSpeed: 0.005,
    });

    // RIGHT PYRAMIDS TRIANGLES
    createPyramidTriangles({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.1875, // Corrected: Use left-side base X
      baseY: p.height * 0.42,
      isRightSide: true, // Set to true to mirror
      triangleConfigs: [
        {
          v1y: -120,
          v2x: -60,
          v2y: 1,
          v3x: 60,
          v3y: 1,
          color: [255, 255, 255],
          strokeWeight: 3,
        },
        {
          v1y: -120,
          v2x: -40,
          v2y: 1,
          v3x: 40,
          v3y: 1,
          color: [180, 180, 180, 80],
          strokeWeight: 1,
        },
        {
          v1y: -120,
          v2x: -20,
          v2y: 1,
          v3x: 20,
          v3y: 1,
          color: [25, 25, 25, 80],
          strokeWeight: 0,
        },
      ],
      //rotationSpeed: 0.005,
    });

    // top upside down concentric triangles - Left
    createConcentricTopInvertedTriangles({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.1875, // Corrected: Use left-side base X
      baseY: p.height * 0.42,
      triangleConfigs: [
        {
          v2x: -30,
          v2y: 30,
          v3x: 30,
          v3y: 30,
          color: [25, 25, 25, 80],
          strokeWeight: 1,
        },
        {
          v2x: -15,
          v2y: 15,
          v3x: 15,
          v3y: 15,
          color: [25, 25, 25, 80],
          strokeWeight: 1,
        },
        {
          v2x: -5,
          v2y: 5,
          v3x: 5,
          v3y: 5,
          color: [25, 25, 25],
          strokeWeight: 1,
        },
      ],
      //rotationSpeed: 0.005,
    });

    // top upside down concentric triangles - right
    createConcentricTopInvertedTriangles({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.1875, // Corrected: Use left-side base X
      baseY: p.height * 0.41, // Keep original Y offset for this specific group
      isRightSide: true, // Set to true to mirror
      triangleConfigs: [
        {
          v2x: -30,
          v2y: 30,
          v3x: 30,
          v3y: 30,
          color: [25, 25, 25, 80],
          strokeWeight: 1,
        },
        {
          v2x: -15,
          v2y: 15,
          v3x: 15,
          v3y: 15,
          color: [25, 25, 25, 80],
          strokeWeight: 1,
        },
        {
          v2x: -5,
          v2y: 5,
          v3x: 5,
          v3y: 5,
          color: [25, 25, 25],
          strokeWeight: 1,
        },
      ],
      //rotationSpeed: 0.005,
    });

    // --- NEW ELLIPSES ---
    // Ellipse 1: bottom center
    createConcentricBottomEllipses({
      p,
      shapesArray: shapes,
      baseX: p.width * 0.49, // Base X for the left set, right set will be mirrored
      baseY: p.height * 0.8,
      leftEllipseConfigs: [
        { width: 120, height: 50, color: [255, 255, 255], rotation: -p.PI / 4 },
        { width: 120, height: 20, color: [12, 12, 12], rotation: -p.PI / 4 },
        { width: 120, height: 8, color: [250, 250, 250], rotation: -p.PI / 4 },
      ],
      rightEllipseConfigs: [
        { width: 120, height: 50, color: [255, 255, 255], rotation: p.PI / 4 },
        { width: 120, height: 20, color: [12, 12, 12], rotation: p.PI / 4 },
        { width: 120, height: 8, color: [255, 255, 255], rotation: p.PI / 4 },
      ],
      amplitudeX: 12,
      frequencyX: 0.001,
      offsetX: p.PI / 4,
    });

    // --- NEW LINES ---
    // Horizontal lines
    // createHorizontalLine({
    //   p,
    //   shapesArray: shapes,
    //   y: p.height * 0.22,
    //   strokeColor: [255, 255, 255],
    //   strokeWeight: 3,
    // });
    createHorizontalLine({
      p,
      shapesArray: shapes,
      y: p.height * 0.5,
      strokeColor: [255, 255, 255],
      strokeWeight: 2,
    });
    // createHorizontalLine({
    //   p,
    //   shapesArray: shapes,
    //   y: p.height * 0.875,
    //   strokeColor: [255, 255, 255],
    //   strokeWeight: 3,
    // });

    // --- NEW EYE DOTS ---
    // CENTER EYE_DOTS
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.55,
      y: p.height * 0.5,
      strokeWeight: 8,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: 0.01,
      frequencyY: 0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.45,
      y: p.height * 0.5,
      strokeWeight: 8,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: -0.01,
      frequencyY: -0.01,
    });

    // TOP CENTER EYE_DOTS - ABOVE
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.42,
      y: p.height * 0.29,
      strokeWeight: 3,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: 0.01,
      frequencyY: 0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.58,
      y: p.height * 0.29,
      strokeWeight: 3,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: -0.01,
      frequencyY: -0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.465,
      y: p.height * 0.25,
      strokeWeight: 3,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: -0.01,
      frequencyY: -0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.535,
      y: p.height * 0.25,
      strokeWeight: 3,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: 0.01,
      frequencyY: 0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.47,
      y: p.height * 0.325,
      strokeWeight: 11,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: 0.01,
      frequencyY: 0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.53,
      y: p.height * 0.325,
      strokeWeight: 11,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: -0.01,
      frequencyY: -0.01,
    });

    // LEFT EYE_DOTS
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.25,
      y: p.height * 0.5,
      strokeWeight: 5,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: -0.01,
      frequencyY: -0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.125,
      y: p.height * 0.5,
      strokeWeight: 5,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: 0.01,
      frequencyY: 0.01,
    });

    // TOP LEFT EYE_DOTS - ABOVE
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.275,
      y: p.height * 0.29,
      strokeWeight: 3,
      amplitudeX: 2,
      amplitudeY: 2,
      frequencyX: 0.01,
      frequencyY: 0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.1,
      y: p.height * 0.29,
      strokeWeight: 3,
      amplitudeX: 2,
      amplitudeY: 2,
      frequencyX: -0.01,
      frequencyY: -0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.225,
      y: p.height * 0.25,
      strokeWeight: 5,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: -0.01,
      frequencyY: -0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * 0.15,
      y: p.height * 0.25,
      strokeWeight: 5,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: 0.01,
      frequencyY: 0.01,
    });

    // RIGHT EYE_DOTS
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * (1 - 0.25),
      y: p.height * 0.5,
      strokeWeight: 5,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: 0.01,
      frequencyY: 0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * (1 - 0.125),
      y: p.height * 0.5,
      strokeWeight: 5,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: -0.01,
      frequencyY: -0.01,
    });

    // TOP RIGHT EYE_DOTS - ABOVE
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * (1 - 0.275),
      y: p.height * 0.29,
      strokeWeight: 3,
      amplitudeX: 2,
      amplitudeY: 2,
      frequencyX: -0.01,
      frequencyY: -0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * (1 - 0.1),
      y: p.height * 0.29,
      strokeWeight: 3,
      amplitudeX: 2,
      amplitudeY: 2,
      frequencyX: 0.01,
      frequencyY: 0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * (1 - 0.225),
      y: p.height * 0.25,
      strokeWeight: 5,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: 0.01,
      frequencyY: 0.01,
    });
    createEyeDots({
      p,
      shapesArray: shapes,
      x: p.width * (1 - 0.15),
      y: p.height * 0.25,
      strokeWeight: 5,
      amplitudeX: 3,
      amplitudeY: 3,
      frequencyX: -0.01,
      frequencyY: -0.01,
    });
    // --- Call the reusable function for quads ---
    createQuadGrid({
      p: p,
      shapesArray: shapes,
      numRows: 4, // You can change this
      numQuadsPerRow: 8, // You can change this
      quadWidth: 80,
      quadHeight: 20,
      horizontalSpacing: 100,
      verticalPadding: 10,
      initialX: p.width * 0.001,
      initialY: p.height * 0.008,
      // You can override base animation speeds here if needed for this grid
      baseRotationSpeed: 0.008,
      baseAmplitudeY: 3,
    });

    createQuadGrid({
      p: p,
      shapesArray: shapes,
      numRows: 3, // You can change this
      numQuadsPerRow: 9, // You can change this
      quadWidth: 60,
      quadHeight: 24,
      horizontalSpacing: 120,
      verticalPadding: 9,
      initialX: p.width * 0.001,
      initialY: p.height * 0.89,
      // You can override base animation speeds here if needed for this grid
      baseRotationSpeed: 0.008,
      baseAmplitudeY: 4,
    });
    shapes.push(
      new Shape(p, {
        type: 'rect',
        x: p.width * 0.5,
        y: p.height * 0.95,
        width: 1000,
        height: 90,
        color: [25, 25, 25, 80], // White
        strokeColor: [0, 0, 0], // Black stroke
        strokeWeight: 1,
        rotation: p.PI, // Initial rotation
        amplitudeY: 8, // Move up and down
        frequencyY: 0.005, // Speed of up/down motion
        offsetY: 0, // Phase offset
      })
    );
  };

  p.draw = () => {
    p.background(10, 50); // Fade effect for background (dark gray with alpha)

    // Loop through each shape instance and call its display method
    shapes.forEach((shape) => {
      // If you add an update method to the Shape class for animation:
      // shape.update();
      shape.update(); // Update animation properties (like rotation, sine wave motion
      shape.display();
    });
  };
};
