// src/utils/patterns.ts
import { Shape } from './Shape'; // Import the Shape class
import p5 from 'p5'; // Import p5 for type hinting

// --- Common Interface for Animation Properties ---
// This helps keep options consistent across different pattern functions
interface AnimationProps {
  rotationSpeed?: number;
  amplitudeX?: number;
  amplitudeY?: number;
  frequencyX?: number;
  frequencyY?: number;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
}

interface QuadGridOptions extends AnimationProps {
  // Extends AnimationProps
  p: p5; // The p5.js instance
  shapesArray: Shape[]; // The array to push new shapes into
  numRows: number;
  numQuadsPerRow: number;
  quadWidth: number;
  quadHeight: number;
  horizontalSpacing: number;
  verticalPadding: number; // Additional vertical space between rows
  initialX: number; // Top-left X for the very first quad
  initialY: number; // Top-left Y for the very first quad
  baseAmplitudeY?: number;
  baseFrequencyY?: number;
  baseAmplitudeX?: number;
  frequencyX?: number;
  baseRotationSpeed?: number;
}

export function createQuadGrid(options: QuadGridOptions) {
  const {
    p,
    shapesArray,
    numRows,
    numQuadsPerRow,
    quadWidth,
    quadHeight,
    horizontalSpacing,
    verticalPadding,
    initialX,
    initialY,
    // Remove unused baseRotationSpeed
    baseAmplitudeY = 0,
    baseFrequencyY = 0,
    baseAmplitudeX = 0,
    frequencyX = 0,
  } = options;

  // Create quads in a grid pattern
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numQuadsPerRow; col++) {
      const x = initialX + col * horizontalSpacing;
      const y = initialY + row * (quadHeight + verticalPadding);

      // Create the quad shape
      shapesArray.push(
        new Shape(p, {
          type: 'quad',
          x: x,
          y: y,
          v1x: 0,
          v1y: 0,
          v2x: quadWidth,
          v2y: 0,
          v3x: quadWidth,
          v3y: quadHeight,
          v4x: 0,
          v4y: quadHeight,
          color: [255, 255, 255, 50], // Semi-transparent white
          strokeColor: [0, 0, 0],
          strokeWeight: 1,
          rotation: 0,
          rotationSpeed: 0.001, // Slow rotation
          amplitudeX: baseAmplitudeX,
          amplitudeY: baseAmplitudeY,
          frequencyX: frequencyX,
          frequencyY: baseFrequencyY,
          offsetX: (row + col) * 0.1, // Stagger animation
          offsetY: (row + col) * 0.2,
        })
      );
    }
  }
}

// --- NEW REFACTORED FUNCTIONS ---

interface VerticalPipeOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  x: number;
  y: number;
  width: number;
  height: number;
  color: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  rotation?: number;
}

/**
 * Creates a single vertical pipe (rectangle) with customizable properties and animation.
 * @param options Configuration for the pipe.
 */
export function createVerticalPipe(options: VerticalPipeOptions) {
  const {
    p,
    shapesArray,
    x,
    y,
    width,
    height,
    color,
    strokeColor = [0, 0, 0],
    strokeWeight = 2,
    rotation = p.PI, // Default to PI (upside down) for vertical alignment
    ...animationProps // Capture all animation properties
  } = options;

  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x,
      y,
      width,
      height,
      color,
      strokeColor,
      strokeWeight,
      rotation,
      ...animationProps, // Spread animation properties here
      //color: [255, 255, 255, 255],
    })
  );
}

interface LongNeckPairOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  baseX: number; // Base X position for the pair
  baseY: number; // Base Y position for the pair
  width: number; // Width of the rects
  heightThick: number; // Height of the thicker rect
  heightThin: number; // Height of the thinner rect
  colorThick?: number[];
  colorThin?: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  rotation?: number; // Default to p.PI / 2 for vertical
  // Specific offsets for the thin rect relative to the thick one
  offsetYThin?: number;
  offsetXThin?: number;
}

/**
 * Creates a pair of long neck rectangles (one thick, one thin) at a given base position.
 * @param options Configuration for the long neck pair.
 */
export function createLongNeckPair(options: LongNeckPairOptions) {
  const {
    p,
    shapesArray,
    baseX,
    baseY,
    width,
    heightThick,
    heightThin,
    colorThick = [255, 255, 255],
    colorThin = [255, 255, 255],
    strokeColor = [0, 0, 0],
    strokeWeight = 2,
    rotation = p.PI / 2, // Default to PI/2 for vertical
    offsetYThin = 0,
    offsetXThin = 0,
    ...animationProps // Capture all animation properties for the base (thick) rect
  } = options;

  // Thicker rect
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: baseX,
      y: baseY,
      width: width,
      height: heightThick,
      color: colorThick,
      strokeColor,
      strokeWeight,
      rotation,
      ...animationProps, // Spread animation properties here
    })
  );

  // Thinner rect (usually slightly offset or just drawn on top)
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: baseX,
      y: baseY,
      width: width,
      height: heightThin,
      color: colorThin,
      strokeColor,
      strokeWeight,
      rotation,
      // Apply additional offset for the thin one's animation phase
      offsetY: (animationProps.offsetY || 0) + offsetYThin,
      offsetX: (animationProps.offsetX || 0) + offsetXThin,
      // Other animation properties remain the same as the thick one
      amplitudeY: animationProps.amplitudeY,
      frequencyY: animationProps.frequencyY,
      amplitudeX: animationProps.amplitudeX,
      frequencyX: animationProps.frequencyX,
      rotationSpeed: animationProps.rotationSpeed,
    })
  );
}

// --- NEW REFACTORED TRIANGLE MOUTH FUNCTIONS ---

interface SingleTriangleMouthOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  baseX: number; // Base X position for the triangle
  baseY: number; // Base Y position for the triangle
  isRightSide?: boolean; // If true, mirrors the X position for the right side
  color?: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  rotation?: number;
}

/**
 * Creates a single, larger triangle mouth shape.
 * @param options Configuration for the triangle.
 */
export function createSingleTriangleMouth(options: SingleTriangleMouthOptions) {
  const {
    p,
    shapesArray,
    baseX,
    baseY,
    isRightSide = false,
    // color = [255, 255, 255],
    strokeColor = [0, 0, 0],
    strokeWeight = 2,
    rotation = p.PI, // Default to PI (upside down)
    ...animationProps
  } = options;

  // Adjust X position based on whether it's left or right side
  const finalX = isRightSide ? p.width - baseX : baseX;

  shapesArray.push(
    new Shape(p, {
      type: 'triangle',
      x: finalX,
      y: baseY,
      color: [255, 255, 255, 255], // Default white color
      v1x: 0,
      v1y: -60, // Top point
      v2x: -60,
      v2y: 60, // Bottom-left point
      v3x: 60,
      v3y: 60, // Bottom-right point
      strokeColor,
      strokeWeight,
      rotation,
      ...animationProps,
      //color,
    })
  );
}

interface NestedTriangleMouthsOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  baseX: number; // Base X position for the group
  baseY: number; // Base Y position for the group
  isRightSide?: boolean; // If true, mirrors the X positions for the right side
  // Base colors for the nested triangles
  outerColor?: number[]; // For the largest black triangle
  middleColor?: number[]; // For the medium black triangle
  innerColor?: number[]; // For the smallest white triangle
  strokeColor?: number[];
  strokeWeight?: number;
  rotation?: number;
  // Specific animation offsets for the nested elements if they should be different
  offsetYInner1?: number;
  frequencyYInner1?: number;
  offsetYInner2?: number;
  frequencyYInner2?: number;
  offsetYInner3?: number;
  frequencyYInner3?: number;
}

/**
 * Creates a group of three nested triangle mouth shapes.
 * Can be configured for left or right side mirroring.
 * @param options Configuration for the nested triangle mouth group.
 */
export function createNestedTriangleMouths(
  options: NestedTriangleMouthsOptions
) {
  const {
    p,
    shapesArray,
    baseX,
    baseY,
    isRightSide = false,
    outerColor = [0, 0, 0, 80],
    middleColor = [0, 0, 0, 80],
    innerColor = [255, 255, 255],
    strokeColor = [255, 255, 255],
    strokeWeight = 4,
    rotation = p.PI,
    offsetYInner1 = 0,
    frequencyYInner1 = 0,
    offsetYInner2 = 0,
    frequencyYInner2 = 0,
    offsetYInner3 = 0,
    frequencyYInner3 = 0,
    ...animationProps // Capture base animation properties for the group
  } = options;

  // Adjust X positions based on whether it's left or right side
  const getX = (offset: number) =>
    isRightSide ? p.width - (baseX + offset) : baseX + offset;

  // Triangle 1 (Largest, black, outer)
  shapesArray.push(
    new Shape(p, {
      type: 'triangle',
      x: getX(0), // No additional offset for the baseX
      y: baseY,
      v1x: 0,
      v1y: -60,
      v2x: -80,
      v2y: 60,
      v3x: 80,
      v3y: 60,
      color: outerColor,
      strokeColor,
      strokeWeight,
      rotation,
      ...animationProps, // Apply base animation
      offsetY: (animationProps.offsetY || 0) + offsetYInner1, // Apply specific inner offset
      frequencyY: (animationProps.frequencyY || 0) + frequencyYInner1, // Apply specific inner frequency
    })
  );

  // Triangle 2 (Medium, black, middle)
  shapesArray.push(
    new Shape(p, {
      type: 'triangle',
      x: getX(0),
      y: baseY,
      v1x: 0,
      v1y: -60,
      v2x: -50,
      v2y: 40,
      v3x: 50,
      v3y: 40,
      color: middleColor,
      strokeColor,
      strokeWeight,
      rotation,
      ...animationProps,
      offsetY: (animationProps.offsetY || 0) + offsetYInner2,
      frequencyY: (animationProps.frequencyY || 0) + frequencyYInner2,
    })
  );

  // Triangle 3 (Smallest, white, inner)
  shapesArray.push(
    new Shape(p, {
      type: 'triangle',
      x: getX(0),
      y: baseY,
      v1x: 0,
      v1y: -60,
      v2x: -35,
      v2y: 40,
      v3x: 35,
      v3y: 40,
      color: innerColor,
      strokeColor,
      strokeWeight,
      rotation,
      ...animationProps,
      offsetY: (animationProps.offsetY || 0) + offsetYInner3,
      frequencyY: (animationProps.frequencyY || 0) + frequencyYInner3,
    })
  );
}

interface QuadEyePairOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  x: number; // Base X position for the pair
  y: number; // Base Y position for the pair
  outerColor?: number[];
  innerColor?: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  // Define vertices for the specific eye shape
  outerV1x: number;
  outerV1y: number;
  outerV2x: number;
  outerV2y: number;
  outerV3x: number;
  outerV3y: number;
  outerV4x: number;
  outerV4y: number;
  innerV1x: number;
  innerV1y: number;
  innerV2x: number;
  innerV2y: number;
  innerV3x: number;
  innerV3y: number;
  innerV4x: number;
  innerV4y: number;
  // Specific animation offsets for the inner quad
  offsetYInner?: number;
  offsetXInner?: number;
}

/**
 * Creates a pair of nested quad eye shapes (outer white, inner black).
 * @param options Configuration for the quad eye pair.
 */
export function createQuadEyePair(options: QuadEyePairOptions) {
  const {
    p,
    shapesArray,
    x,
    y,
    outerColor = [255, 255, 255],
    innerColor = [25, 25, 25],
    strokeColor = [0, 0, 0],
    strokeWeight = 1,
    outerV1x,
    outerV1y,
    outerV2x,
    outerV2y,
    outerV3x,
    outerV3y,
    outerV4x,
    outerV4y,
    innerV1x,
    innerV1y,
    innerV2x,
    innerV2y,
    innerV3x,
    innerV3y,
    innerV4x,
    innerV4y,
    offsetYInner = 0,
    offsetXInner = 0,
    ...animationProps // Capture all animation properties for the outer quad
  } = options;

  // Outer quad (white)
  shapesArray.push(
    new Shape(p, {
      type: 'quad',
      x,
      y,
      v1x: outerV1x,
      v1y: outerV1y,
      v2x: outerV2x,
      v2y: outerV2y,
      v3x: outerV3x,
      v3y: outerV3y,
      v4x: outerV4x,
      v4y: outerV4y,
      color: outerColor,
      strokeColor,
      strokeWeight,
      ...animationProps, // Apply base animation to this one
    })
  );

  // Inner quad (black)
  shapesArray.push(
    new Shape(p, {
      type: 'quad',
      x,
      y,
      v1x: innerV1x,
      v1y: innerV1y,
      v2x: innerV2x,
      v2y: innerV2y,
      v3x: innerV3x,
      v3y: innerV3y,
      v4x: innerV4x,
      v4y: innerV4y,
      color: innerColor,
      strokeColor,
      strokeWeight,
      // Apply additional offset for the inner quad's animation phase
      offsetY: (animationProps.offsetY || 0) + offsetYInner,
      offsetX: (animationProps.offsetX || 0) + offsetXInner,
      // Other animation properties remain the same as the outer one
      amplitudeY: animationProps.amplitudeY,
      frequencyY: animationProps.frequencyY,
      amplitudeX: animationProps.amplitudeX,
      frequencyX: animationProps.frequencyX,
      rotationSpeed: animationProps.rotationSpeed,
    })
  );
}

// --- NEW ADINKRAHENE FACE FUNCTIONS ---

interface AdinkraheneFaceOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  loadedImage: p5.Image; // The loaded p5.Image for the Adinkrahene symbol
  faceCenterX: number;
  faceCenterY: number;
  // Optional: specific sizes or animation overrides for eyes/mouth
  eyeWidth?: number;
  eyeHeight?: number;
  mouthWidth?: number;
  mouthHeight?: number;
  eyeOffsetFactorX?: number; // How far eyes are from center (e.g., 0.045)
  eyeOffsetFactorY?: number; // How far eyes are from center (e.g., -0.15)
  // Animation props specific to eyes/mouth if they deviate from face's base animation
  eyeRotationSpeed?: number;
  mouthRotationSpeed?: number;
  eyeAmplitudeX?: number;
  eyeFrequencyX?: number;
  eyeOffsetX?: number;
  eyeAmplitudeY?: number;
  eyeFrequencyY?: number;
  eyeOffsetY?: number;
  mouthAmplitudeX?: number;
  mouthFrequencyX?: number;
  mouthOffsetX?: number;
  mouthAmplitudeY?: number;
  mouthFrequencyY?: number;
  mouthOffsetY?: number;
}

/**
 * Creates a single Adinkrahene "face" composed of two eyes and one mouth.
 * All positions are relative to faceCenterX and faceCenterY.
 * @param options Configuration for the Adinkrahene face.
 */
export function createAdinkraheneFace(options: AdinkraheneFaceOptions) {
  const {
    p,
    shapesArray,
    loadedImage,
    faceCenterX,
    faceCenterY,
    eyeWidth = 50,
    eyeHeight = 50,
    mouthWidth = 160,
    mouthHeight = 160,
    eyeOffsetFactorX = 0.045, // Default based on original code's relative spacing
    eyeOffsetFactorY = -0.15, // Default based on original code's relative spacing
    eyeRotationSpeed,
    mouthRotationSpeed,
    eyeAmplitudeX,
    eyeFrequencyX,
    eyeOffsetX,
    eyeAmplitudeY,
    eyeFrequencyY,
    eyeOffsetY,
    mouthAmplitudeX,
    mouthFrequencyX,
    mouthOffsetX,
    mouthAmplitudeY,
    mouthFrequencyY,
    mouthOffsetY,
    ...baseAnimationProps // Base animation properties for the whole face
  } = options;

  // Calculate absolute eye Y position
  const eyeY = faceCenterY + p.height * eyeOffsetFactorY;
  const eyeHorizontalOffset = p.width * eyeOffsetFactorX;

  // Left Eye
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: faceCenterX - eyeHorizontalOffset,
      y: eyeY,
      width: eyeWidth,
      height: eyeHeight,
      color: [255, 255, 255, 255], // Default white color for image
      // Apply base animation props, then specific eye overrides
      ...baseAnimationProps,
      rotationSpeed:
        eyeRotationSpeed !== undefined
          ? eyeRotationSpeed
          : baseAnimationProps.rotationSpeed,
      amplitudeX:
        eyeAmplitudeX !== undefined
          ? eyeAmplitudeX
          : baseAnimationProps.amplitudeX,
      frequencyX:
        eyeFrequencyX !== undefined
          ? eyeFrequencyX
          : baseAnimationProps.frequencyX,
      offsetX:
        eyeOffsetX !== undefined ? eyeOffsetX : baseAnimationProps.offsetX,
      amplitudeY:
        eyeAmplitudeY !== undefined
          ? eyeAmplitudeY
          : baseAnimationProps.amplitudeY,
      frequencyY:
        eyeFrequencyY !== undefined
          ? eyeFrequencyY
          : baseAnimationProps.frequencyY,
      offsetY:
        eyeOffsetY !== undefined ? eyeOffsetY : baseAnimationProps.offsetY,
    })
  );

  // Right Eye
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: faceCenterX + eyeHorizontalOffset,
      y: eyeY,
      width: eyeWidth,
      height: eyeHeight,
      color: [255, 255, 255, 255], // Default white color for image
      // Apply base animation props, then specific eye overrides
      ...baseAnimationProps,
      rotationSpeed:
        eyeRotationSpeed !== undefined
          ? eyeRotationSpeed
          : baseAnimationProps.rotationSpeed,
      amplitudeX:
        eyeAmplitudeX !== undefined
          ? eyeAmplitudeX
          : baseAnimationProps.amplitudeX,
      frequencyX:
        eyeFrequencyX !== undefined
          ? eyeFrequencyX
          : baseAnimationProps.frequencyX,
      offsetX:
        eyeOffsetX !== undefined
          ? eyeOffsetX
          : (baseAnimationProps.offsetX || 0) + p.PI, // Stagger right eye phase
      amplitudeY:
        eyeAmplitudeY !== undefined
          ? eyeAmplitudeY
          : baseAnimationProps.amplitudeY,
      frequencyY:
        eyeFrequencyY !== undefined
          ? eyeFrequencyY
          : baseAnimationProps.frequencyY,
      offsetY:
        eyeOffsetY !== undefined ? eyeOffsetY : baseAnimationProps.offsetY,
    })
  );

  // Mouth
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: faceCenterX,
      y: faceCenterY,
      width: mouthWidth,
      height: mouthHeight,
      color: [255, 255, 255, 255], // Default white color for image
      // Apply base animation props, then specific mouth overrides
      ...baseAnimationProps,
      rotationSpeed:
        mouthRotationSpeed !== undefined
          ? mouthRotationSpeed
          : baseAnimationProps.rotationSpeed,
      amplitudeX:
        mouthAmplitudeX !== undefined
          ? mouthAmplitudeX
          : baseAnimationProps.amplitudeX,
      frequencyX:
        mouthFrequencyX !== undefined
          ? mouthFrequencyX
          : baseAnimationProps.frequencyX,
      offsetX:
        mouthOffsetX !== undefined
          ? mouthOffsetX
          : (baseAnimationProps.offsetX || 0) + p.PI / 2, // Stagger mouth phase
      amplitudeY:
        mouthAmplitudeY !== undefined
          ? mouthAmplitudeY
          : baseAnimationProps.amplitudeY,
      frequencyY:
        mouthFrequencyY !== undefined
          ? mouthFrequencyY
          : baseAnimationProps.frequencyY,
      offsetY:
        mouthOffsetY !== undefined
          ? mouthOffsetY
          : (baseAnimationProps.offsetY || 0) + p.PI / 2, // Stagger mouth phase
    })
  );
}

// --- NEW REFACTORED FUNCTIONS ---

interface EllipseMouthPairOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  baseX: number;
  baseY: number;
  isRightSide?: boolean; // If true, mirrors the X position for the right side
  outerWidth?: number;
  outerHeight?: number;
  innerWidth?: number;
  innerHeight?: number;
  outerColor?: number[];
  innerColor?: number[];
  strokeWeight?: number;
  rotation?: number;
  // Specific animation offsets for the inner ellipse
  offsetYInner?: number;
  offsetXInner?: number;
}

/**
 * Creates a pair of nested ellipses (outer white, inner dark) for the "mouth" pattern.
 * Can be configured for left or right side mirroring.
 * @param options Configuration for the ellipse mouth pair.
 */
export function createEllipseMouthPair(options: EllipseMouthPairOptions) {
  const {
    p,
    shapesArray,
    baseX,
    baseY,
    isRightSide = false,
    outerWidth = 190,
    outerHeight = 50,
    innerWidth = 180,
    innerHeight = 30,
    outerColor = [255, 255, 255],
    innerColor = [20, 20, 20],
    strokeWeight = 2,
    rotation = p.PI,
    offsetYInner = 0,
    offsetXInner = 0,
    ...animationProps // Base animation properties for the pair
  } = options;

  // Adjust X position based on whether it's left or right side
  const finalX = isRightSide ? p.width - baseX : baseX;

  // Outer Ellipse
  shapesArray.push(
    new Shape(p, {
      type: 'ellipse',
      x: finalX,
      y: baseY,
      width: outerWidth,
      height: outerHeight,
      color: outerColor,
      strokeWeight,
      rotation,
      ...animationProps, // Apply base animation
    })
  );

  // Inner Ellipse
  shapesArray.push(
    new Shape(p, {
      type: 'ellipse',
      x: finalX,
      y: baseY,
      width: innerWidth,
      height: innerHeight,
      color: innerColor,
      strokeWeight,
      rotation,
      ...animationProps, // Inherit base animation
      offsetY: (animationProps.offsetY || 0) + offsetYInner, // Apply specific inner offset
      offsetX: (animationProps.offsetX || 0) + offsetXInner,
    })
  );
}

interface StrangeAdinkraBeingOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  loadedImage: p5.Image; // The loaded p5.Image for the Adinkrahene symbol
  baseX: number; // Base X position for the left-most eye of the group
  baseY: number; // Base Y position for the top row of eyes
  isRightSide?: boolean; // If true, mirrors the X positions for the right side
  // Optional animation overrides for specific parts of the being
  stretchedEyeRotationSpeed?: number;
  midEyeRotationSpeed?: number;
  bottomEyeRotationSpeed?: number;
}

/**
 * Creates a "Strange Adinkrahene Being" composed of 6 Adinkrahene images.
 * Can be configured for left or right side mirroring.
 * @param options Configuration for the strange Adinkrahene being.
 */
export function createStrangeAdinkraBeing(options: StrangeAdinkraBeingOptions) {
  const {
    p,
    shapesArray,
    loadedImage,
    baseX,
    baseY,
    isRightSide = false,
    stretchedEyeRotationSpeed,
    midEyeRotationSpeed,
    bottomEyeRotationSpeed,
    ...baseAnimationProps // Base animation properties for the entire being
  } = options;

  // Calculate relative offsets based on original code's spacing
  const horizontalEyeOffset = p.width * 0.125; // Difference between 0.25 and 0.125
  const bottomEyeYOffset = p.height * 0.26; // Difference between 0.76 and 0.5

  // Helper to adjust X position for mirroring
  const getX = (currentBaseX: number, offset: number) => {
    if (isRightSide) {
      // For right side, calculate position relative to the right edge
      // (p.width - original_left_x_position) + offset
      // Original left-most eye for left side was at p.width * 0.125
      // So, if currentBaseX is p.width * 0.125, we want it to be p.width * (1 - 0.125)
      // And then add the offset relative to that new base
      return p.width - (baseX + offset);
    }
    return currentBaseX + offset;
  };

  // Stretched Right Eye (relative to its own group's left-most eye)
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: getX(baseX, horizontalEyeOffset),
      y: baseY,
      color: [255, 255, 255, 255], // Default white color
      width: 160,
      height: 100,
      ...baseAnimationProps,
      rotationSpeed:
        stretchedEyeRotationSpeed !== undefined
          ? stretchedEyeRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + p.PI * 0.1, // Stagger animation
      offsetY: (baseAnimationProps.offsetY || 0) + p.PI * 0.1,
    })
  );

  // Stretched Left Eye (left-most in its group)
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: getX(baseX, 0),
      y: baseY,
      color: [255, 255, 255, 255], // Default white color
      width: 160,
      height: 100,
      ...baseAnimationProps,
      rotationSpeed:
        stretchedEyeRotationSpeed !== undefined
          ? stretchedEyeRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + p.PI * 0.2,
      offsetY: (baseAnimationProps.offsetY || 0) + p.PI * 0.2,
    })
  );

  // Mid Adinkrahene Right Eye (relative to its own group's left-most eye)
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: getX(baseX, horizontalEyeOffset),
      y: baseY, // Same Y as stretched eyes
      color: [255, 255, 255, 255], // Default white color
      width: 100,
      height: 100,
      ...baseAnimationProps,
      rotationSpeed:
        midEyeRotationSpeed !== undefined
          ? midEyeRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + p.PI * 0.3,
      offsetY: (baseAnimationProps.offsetY || 0) + p.PI * 0.3,
    })
  );

  // Mid Adinkrahene Left Eye (left-most in its group)
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: getX(baseX, 0),
      y: baseY,
      color: [255, 255, 255, 255], // Default white color
      width: 100,
      height: 100,
      ...baseAnimationProps,
      rotationSpeed:
        midEyeRotationSpeed !== undefined
          ? midEyeRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + p.PI * 0.4,
      offsetY: (baseAnimationProps.offsetY || 0) + p.PI * 0.4,
    })
  );

  // Bottom Adinkrahene Right Eye (relative to its own group's left-most eye)
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: getX(baseX, horizontalEyeOffset),
      y: baseY + bottomEyeYOffset,
      color: [255, 255, 255, 255], // Default white color
      width: 80,
      height: 80,
      ...baseAnimationProps,
      rotationSpeed:
        bottomEyeRotationSpeed !== undefined
          ? bottomEyeRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + p.PI * 0.5,
      offsetY: (baseAnimationProps.offsetY || 0) + p.PI * 0.5,
    })
  );

  // Bottom Adinkrahene Left Eye (left-most in its group)
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: getX(baseX, 0),
      y: baseY + bottomEyeYOffset,
      color: [255, 255, 255, 255], // Default white color
      width: 80,
      height: 80,
      ...baseAnimationProps,
      rotationSpeed:
        bottomEyeRotationSpeed !== undefined
          ? bottomEyeRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + p.PI * 0.6,
      offsetY: (baseAnimationProps.offsetY || 0) + p.PI * 0.6,
    })
  );
}

// --- NEW REFACTORED CENTRAL ELEMENTS ---

interface CentralAdinkraGroupOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  loadedImage: p5.Image;
  centerX: number; // Center X for the entire group
  centerY: number; // Center Y for the large central image
  // Optional overrides for specific elements
  largeImageWidth?: number;
  largeImageHeight?: number;
  bottomEyeWidth?: number;
  bottomEyeHeight?: number;
  longEyeWidth?: number;
  longEyeHeight?: number;
  // Animation overrides for specific parts
  largeRotationSpeed?: number;
  bottomEyeRotationSpeed?: number;
  longEyeRotationSpeed?: number;
}

/**
 * Creates the central group of Adinkrahene images:
 * - One large central image
 * - Two smaller "eyes" below it
 * - Two elongated "vertical eyes"
 * @param options Configuration for the central Adinkra group.
 */
export function createCentralAdinkraGroup(options: CentralAdinkraGroupOptions) {
  const {
    p,
    shapesArray,
    loadedImage,
    centerX,
    centerY,
    largeImageWidth = 210,
    largeImageHeight = 210,
    bottomEyeWidth = 80,
    bottomEyeHeight = 80,
    longEyeWidth = 100,
    longEyeHeight = 200,
    largeRotationSpeed,
    bottomEyeRotationSpeed,
    longEyeRotationSpeed,
    ...baseAnimationProps // Base animation for the whole group
  } = options;

  // Relative X offsets from the centerX
  const bottomEyeOffsetX = p.width * 0.07; // (0.57 - 0.5) or (0.5 - 0.43)
  const longEyeOffsetX = p.width * 0.05; // (0.55 - 0.5) or (0.5 - 0.45)
  // Relative Y offset for bottom eyes from central image's Y
  const bottomEyeOffsetY = p.height * 0.26; // (0.76 - 0.5)

  // ONE BIG ADINKRAHENE IN MIDDLE
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: centerX,
      y: centerY,
      color: [255, 255, 255, 255], // Default white color
      width: largeImageWidth,
      height: largeImageHeight,
      ...baseAnimationProps,
      rotationSpeed:
        largeRotationSpeed !== undefined
          ? largeRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + p.PI * 0.1, // Stagger animation
      offsetY: (baseAnimationProps.offsetY || 0) + p.PI * 0.1,
    })
  );

  // Central Adinkra Eyes (bottom pair)
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: centerX + bottomEyeOffsetX,
      y: centerY + bottomEyeOffsetY,
      color: [255, 255, 255, 255], // Default white color
      width: bottomEyeWidth,
      height: bottomEyeHeight,
      ...baseAnimationProps,
      rotationSpeed:
        bottomEyeRotationSpeed !== undefined
          ? bottomEyeRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + p.PI * 0.2,
      offsetY: (baseAnimationProps.offsetY || 0) + p.PI * 0.2,
    })
  );
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: centerX - bottomEyeOffsetX,
      y: centerY + bottomEyeOffsetY,
      color: [255, 255, 255, 255], // Default white color
      width: bottomEyeWidth,
      height: bottomEyeHeight,
      ...baseAnimationProps,
      rotationSpeed:
        bottomEyeRotationSpeed !== undefined
          ? bottomEyeRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + p.PI * 0.3,
      offsetY: (baseAnimationProps.offsetY || 0) + p.PI * 0.3,
    })
  );

  // LONG VERTICAL ADINKRA EYES (mid-height pair)
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: centerX + longEyeOffsetX,
      y: centerY,
      color: [255, 255, 255, 255], // Default white color
      width: longEyeWidth,
      height: longEyeHeight,
      ...baseAnimationProps,
      rotationSpeed:
        longEyeRotationSpeed !== undefined
          ? longEyeRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + p.PI * 0.4,
      offsetY: (baseAnimationProps.offsetY || 0) + p.PI * 0.4,
    })
  );
  shapesArray.push(
    new Shape(p, {
      type: 'image',
      image: loadedImage,
      x: centerX - longEyeOffsetX,
      y: centerY,
      color: [255, 255, 255, 255], // Default white color
      width: longEyeWidth,
      height: longEyeHeight,
      ...baseAnimationProps,
      rotationSpeed:
        longEyeRotationSpeed !== undefined
          ? longEyeRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + p.PI * 0.5,
      offsetY: (baseAnimationProps.offsetY || 0) + p.PI * 0.5,
    })
  );
}

interface CentralForeheadRectsOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  centerX: number;
  baseY: number; // Y position for the rects
  thickWidth?: number;
  thickHeight?: number;
  thinWidth?: number;
  thinHeight?: number;
  thickColor?: number[];
  thinColor?: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  rotation?: number; // Default to PI / 2 for horizontal
  // Specific animation offsets for the thin rect
  offsetYThin?: number;
  offsetXThin?: number;
}

/**
 * Creates the central forehead rectangle pattern (one thick, one thin).
 * @param options Configuration for the forehead rectangles.
 */
export function createCentralForeheadRects(
  options: CentralForeheadRectsOptions
) {
  const {
    p,
    shapesArray,
    centerX,
    baseY,
    thickWidth = 20,
    thickHeight = 80,
    // Original thin rect had height 980, which is very long.
    // Assuming it's meant to be a long horizontal line.
    thinWidth = 10,
    thinHeight = 980,
    thickColor = [255, 255, 255],
    thinColor = [255, 255, 255],
    strokeColor = [0, 0, 0],
    strokeWeight = 2,
    rotation = p.PI / 2, // Default to PI/2 for horizontal alignment
    offsetYThin = 0,
    offsetXThin = 0,
    ...animationProps
  } = options;

  // Thick rect horizontal - forehead
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: centerX,
      y: baseY,
      width: thickWidth,
      height: thickHeight,
      color: thickColor,
      strokeColor,
      strokeWeight,
      rotation,
      ...animationProps,
    })
  );

  // Thin rect horizontal - forehead (very long)
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: centerX,
      y: baseY,
      width: thinWidth,
      height: thinHeight,
      color: thinColor,
      strokeColor,
      strokeWeight,
      rotation,
      ...animationProps,
      offsetY: (animationProps.offsetY || 0) + offsetYThin,
      offsetX: (animationProps.offsetX || 0) + offsetXThin,
    })
  );
}

// --- NEW REFACTORED CIRCLE FUNCTIONS ---

interface ComplexEyeOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  eyeCenterX: number;
  eyeCenterY: number;
  mainEyeballSize?: number;
  ovalEyelidWidth?: number;
  ovalEyelidHeight?: number;
  insideEyelidWidth?: number;
  insideEyelidHeight?: number;
  pupilSize?: number;
  mainEyeballColor?: number[];
  ovalEyelidColor?: number[];
  insideEyelidColor?: number[];
  pupilColor?: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  eyelidRotation?: number; // Rotation for the ellipse eyelids (e.g., p.PI or p.PI/2)
  // Animation overrides for individual parts of the eye
  mainEyeballRotationSpeed?: number;
  pupilRotationSpeed?: number;
  eyelidAmplitudeX?: number;
  eyelidFrequencyX?: number;
  eyelidOffsetX?: number;
  eyelidAmplitudeY?: number;
  eyelidFrequencyY?: number;
  eyelidOffsetY?: number;
  insideEyelidOffsetX?: number; // Additional offset for inner eyelid
  insideEyelidOffsetY?: number;
}

/**
 * Creates a complex eye composed of a main eyeball, two ellipses for eyelids, and a pupil.
 * @param options Configuration for the complex eye.
 */
export function createComplexEye(options: ComplexEyeOptions) {
  const {
    p,
    shapesArray,
    eyeCenterX,
    eyeCenterY,
    mainEyeballSize = 60,
    ovalEyelidWidth = 80,
    ovalEyelidHeight = 40,
    insideEyelidWidth = 80,
    insideEyelidHeight = 20,
    pupilSize = 20,
    mainEyeballColor = [255, 255, 255],
    ovalEyelidColor = [255, 255, 255, 90], // Semi-transparent
    insideEyelidColor = [255, 255, 255],
    pupilColor = [12, 12, 12],
    strokeColor = [0, 0, 0],
    strokeWeight = 1,
    eyelidRotation = p.PI, // Default to horizontal eyelid
    mainEyeballRotationSpeed,
    pupilRotationSpeed,
    eyelidAmplitudeX,
    eyelidFrequencyX,
    eyelidOffsetX,
    eyelidAmplitudeY,
    eyelidFrequencyY,
    eyelidOffsetY,
    insideEyelidOffsetX = 0,
    insideEyelidOffsetY = 0,
    ...baseAnimationProps // Base animation for the whole eye
  } = options;

  // Main Eyeball
  shapesArray.push(
    new Shape(p, {
      type: 'circle',
      x: eyeCenterX,
      y: eyeCenterY,
      size: mainEyeballSize,
      color: mainEyeballColor,
      strokeWeight: 0,
      ...baseAnimationProps,
      rotationSpeed:
        mainEyeballRotationSpeed !== undefined
          ? mainEyeballRotationSpeed
          : baseAnimationProps.rotationSpeed,
    })
  );

  // Oval Eyelid (outer)
  shapesArray.push(
    new Shape(p, {
      type: 'ellipse',
      x: eyeCenterX,
      y: eyeCenterY,
      width: ovalEyelidWidth,
      height: ovalEyelidHeight,
      color: ovalEyelidColor,
      strokeColor,
      strokeWeight,
      rotation: eyelidRotation,
      ...baseAnimationProps,
      amplitudeX:
        eyelidAmplitudeX !== undefined
          ? eyelidAmplitudeX
          : baseAnimationProps.amplitudeX,
      frequencyX:
        eyelidFrequencyX !== undefined
          ? eyelidFrequencyX
          : baseAnimationProps.frequencyX,
      offsetX:
        eyelidOffsetX !== undefined
          ? eyelidOffsetX
          : baseAnimationProps.offsetX,
      amplitudeY:
        eyelidAmplitudeY !== undefined
          ? eyelidAmplitudeY
          : baseAnimationProps.amplitudeY,
      frequencyY:
        eyelidFrequencyY !== undefined
          ? eyelidFrequencyY
          : baseAnimationProps.frequencyY,
      offsetY:
        eyelidOffsetY !== undefined
          ? eyelidOffsetY
          : baseAnimationProps.offsetY,
    })
  );

  // Inside Eyelid (inner)
  shapesArray.push(
    new Shape(p, {
      type: 'ellipse',
      x: eyeCenterX,
      y: eyeCenterY,
      width: insideEyelidWidth,
      height: insideEyelidHeight,
      color: insideEyelidColor,
      strokeColor,
      strokeWeight,
      rotation: eyelidRotation,
      ...baseAnimationProps,
      amplitudeX:
        eyelidAmplitudeX !== undefined
          ? eyelidAmplitudeX
          : baseAnimationProps.amplitudeX,
      frequencyX:
        eyelidFrequencyX !== undefined
          ? eyelidFrequencyX
          : baseAnimationProps.frequencyX,
      offsetX:
        (eyelidOffsetX !== undefined
          ? eyelidOffsetX
          : baseAnimationProps.offsetX || 0) + insideEyelidOffsetX,
      amplitudeY:
        eyelidAmplitudeY !== undefined
          ? eyelidAmplitudeY
          : baseAnimationProps.amplitudeY,
      frequencyY:
        eyelidFrequencyY !== undefined
          ? eyelidFrequencyY
          : baseAnimationProps.frequencyY,
      offsetY:
        (eyelidOffsetY !== undefined
          ? eyelidOffsetY
          : baseAnimationProps.offsetY || 0) + insideEyelidOffsetY,
    })
  );

  // Eyeball Pupil
  shapesArray.push(
    new Shape(p, {
      type: 'circle',
      x: eyeCenterX,
      y: eyeCenterY,
      size: pupilSize,
      color: pupilColor,
      strokeWeight: 0,
      ...baseAnimationProps,
      rotationSpeed:
        pupilRotationSpeed !== undefined
          ? pupilRotationSpeed
          : baseAnimationProps.rotationSpeed,
      // Pupils might have slightly different animation offsets for subtle movement
      offsetX: (baseAnimationProps.offsetX || 0) + p.PI * 0.05,
      offsetY: (baseAnimationProps.offsetY || 0) + p.PI * 0.05,
    })
  );
}

interface SimpleEyeOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  centerX: number;
  centerY: number;
  outerSize?: number;
  innerSize?: number;
  outerColor?: number[];
  innerColor?: number[];
  strokeWeightOuter?: number;
  strokeWeightInner?: number;
  // Animation overrides for inner circle
  innerRotationSpeed?: number;
  innerAmplitudeX?: number;
  innerFrequencyX?: number;
  innerOffsetX?: number;
  innerAmplitudeY?: number;
  innerFrequencyY?: number;
  innerOffsetY?: number;
}

/**
 * Creates a simple eye or mouth composed of two nested circles (outer and inner).
 * @param options Configuration for the simple eye/mouth.
 */
export function createSimpleEye(options: SimpleEyeOptions) {
  const {
    p,
    shapesArray,
    centerX,
    centerY,
    outerSize = 80,
    innerSize = 40,
    outerColor = [255, 255, 255],
    innerColor = [2, 2, 2],
    strokeWeightOuter = 0,
    strokeWeightInner = 1,
    innerRotationSpeed,
    innerAmplitudeX,
    innerFrequencyX,
    innerOffsetX,
    innerAmplitudeY,
    innerFrequencyY,
    innerOffsetY,
    ...baseAnimationProps // Base animation for the outer circle
  } = options;

  // Outer Circle (eyeball/mouth)
  shapesArray.push(
    new Shape(p, {
      type: 'circle',
      x: centerX,
      y: centerY,
      size: outerSize,
      color: outerColor,
      strokeWeight: strokeWeightOuter,
      ...baseAnimationProps,
    })
  );

  // Inner Circle (iris/mouth entry)
  shapesArray.push(
    new Shape(p, {
      type: 'circle',
      x: centerX,
      y: centerY,
      size: innerSize,
      color: innerColor,
      strokeWeight: strokeWeightInner,
      ...baseAnimationProps, // Inherit base animation
      rotationSpeed:
        innerRotationSpeed !== undefined
          ? innerRotationSpeed
          : baseAnimationProps.rotationSpeed,
      amplitudeX:
        innerAmplitudeX !== undefined
          ? innerAmplitudeX
          : baseAnimationProps.amplitudeX,
      frequencyX:
        innerFrequencyX !== undefined
          ? innerFrequencyX
          : baseAnimationProps.frequencyX,
      offsetX:
        innerOffsetX !== undefined
          ? innerOffsetX
          : (baseAnimationProps.offsetX || 0) + p.PI * 0.1, // Stagger inner circle phase
      amplitudeY:
        innerAmplitudeY !== undefined
          ? innerAmplitudeY
          : baseAnimationProps.amplitudeY,
      frequencyY:
        innerFrequencyY !== undefined
          ? innerFrequencyY
          : baseAnimationProps.frequencyY,
      offsetY:
        innerOffsetY !== undefined
          ? innerOffsetY
          : (baseAnimationProps.offsetY || 0) + p.PI * 0.1, // Stagger inner circle phase
    })
  );
}

// --- Existing createNestedRectPillar function ---
interface NestedRectPillarOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  baseX: number;
  baseY: number;
  isRightSide?: boolean;
  outerWidth?: number;
  outerHeight?: number;
  middleWidth?: number;
  middleHeight?: number;
  innerWidth?: number;
  innerHeight?: number;
  outerColor?: number[];
  middleColor?: number[];
  innerColor?: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  rotation?: number;
  middleOffsetX?: number;
  middleOffsetY?: number;
  innerOffsetX?: number;
  innerOffsetY?: number;
}

export function createNestedRectPillar(options: NestedRectPillarOptions) {
  const {
    p,
    shapesArray,
    baseX,
    baseY,
    isRightSide = false,
    outerWidth = 390,
    outerHeight = 40,
    middleWidth = 360,
    middleHeight = 25,
    innerWidth = 320,
    innerHeight = 12,
    outerColor = [255, 255, 255],
    middleColor = [255, 255, 255],
    innerColor = [25, 25, 25],
    strokeColor = [0, 0, 0],
    strokeWeight = 2,
    rotation = p.PI / 2,
    middleOffsetX = 0,
    middleOffsetY = 0,
    innerOffsetX = 0,
    innerOffsetY = 0,
    ...baseAnimationProps
  } = options;

  const finalX = isRightSide ? p.width - baseX : baseX;

  // Determine stroke weight for outer based on transparency
  const actualOuterStrokeWeight =
    outerColor.length === 4 && outerColor[3] === 0 ? 0 : strokeWeight;

  // Outer rectangle
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: finalX,
      y: baseY,
      width: outerWidth,
      height: outerHeight,
      color: outerColor,
      strokeColor,
      strokeWeight: actualOuterStrokeWeight,
      rotation,
      ...baseAnimationProps,
    })
  );

  // Middle rectangle
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: finalX,
      y: baseY,
      width: middleWidth,
      height: middleHeight,
      color: middleColor,
      strokeColor,
      strokeWeight,
      rotation,
      ...baseAnimationProps,
      offsetX: (baseAnimationProps.offsetX || 0) + middleOffsetX,
      offsetY: (baseAnimationProps.offsetY || 0) + middleOffsetY,
    })
  );

  // Inner rectangle
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: finalX,
      y: baseY,
      width: innerWidth,
      height: innerHeight,
      color: innerColor,
      strokeColor,
      strokeWeight,
      rotation,
      ...baseAnimationProps,
      offsetX: (baseAnimationProps.offsetX || 0) + innerOffsetX,
      offsetY: (baseAnimationProps.offsetY || 0) + innerOffsetY,
    })
  );
}

// --- Existing createVerticalRectStack function ---
interface VerticalRectStackOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  baseX: number;
  initialY: number;
  count: number;
  spacingY: number;
  rectWidth?: number;
  rectHeight?: number;
  color?: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  rotation?: number;
  isRightSide?: boolean;
  staggerOffsetX?: number;
  staggerOffsetY?: number;
  staggerRotationSpeed?: number;
}

export function createVerticalRectStack(options: VerticalRectStackOptions) {
  const {
    p,
    shapesArray,
    baseX,
    initialY,
    count,
    spacingY,
    rectWidth = 25,
    rectHeight = 8,
    //color = [255, 255, 255],
    strokeColor = [0, 0, 0],
    strokeWeight = 2,
    rotation = p.PI / 2,
    isRightSide = false,
    staggerOffsetX = 0,
    staggerOffsetY = 0,
    staggerRotationSpeed = 0,
    ...baseAnimationProps
  } = options;

  const finalBaseX = isRightSide ? p.width - baseX : baseX;

  for (let i = 0; i < count; i++) {
    shapesArray.push(
      new Shape(p, {
        type: 'rect',
        x: finalBaseX,
        y: initialY + i * spacingY,
        color: [255, 255, 255, 255], // Default white color
        width: rectWidth,
        height: rectHeight,
        strokeColor,
        strokeWeight,
        rotation,
        ...baseAnimationProps,
        offsetX: (baseAnimationProps.offsetX || 0) + i * staggerOffsetX,
        offsetY: (baseAnimationProps.offsetY || 0) + i * staggerOffsetY,
        rotationSpeed:
          (baseAnimationProps.rotationSpeed || 0) + i * staggerRotationSpeed,
      })
    );
  }
}

// --- Existing createNestedDiamondSquares function ---
interface NestedDiamondSquaresOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  centerX: number;
  centerY: number;
  outerSize?: number;
  middleSquareSize?: number;
  middleDiamondSize?: number;
  innerSquareSize?: number;
  innerDiamondSize?: number;
  outerColor?: number[];
  middleSquareColor?: number[];
  middleDiamondColor?: number[];
  innerSquareColor?: number[];
  innerDiamondColor?: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  middleSquareRotationSpeed?: number;
  middleDiamondRotationSpeed?: number;
  innerSquareRotationSpeed?: number;
  innerDiamondRotationSpeed?: number;
  staggerOffsetX?: number;
  staggerOffsetY?: number;
}

export function createNestedDiamondSquares(
  options: NestedDiamondSquaresOptions
) {
  const {
    p,
    shapesArray,
    centerX,
    centerY,
    outerSize = 80,
    middleSquareSize = 70,
    middleDiamondSize = 40,
    innerSquareSize = 40,
    innerDiamondSize = 15,
    outerColor = [255, 255, 255],
    middleSquareColor = [255, 255, 255],
    middleDiamondColor = [255, 255, 255],
    innerSquareColor = [255, 255, 255, 80],
    innerDiamondColor = [20, 20, 20],
    strokeColor = [0, 0, 0],
    strokeWeight = 1,
    middleSquareRotationSpeed,
    middleDiamondRotationSpeed,
    innerSquareRotationSpeed,
    innerDiamondRotationSpeed,
    staggerOffsetX = 0,
    staggerOffsetY = 0,
    ...baseAnimationProps
  } = options;

  // Outer Diamond (rect rotated PI/4)
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: centerX,
      y: centerY,
      width: outerSize,
      height: outerSize,
      color: outerColor,
      strokeColor,
      strokeWeight,
      rotation: p.PI / 4,
      ...baseAnimationProps,
    })
  );

  // Middle Square (rect rotated PI/2, or 0, original was PI/2)
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: centerX,
      y: centerY,
      width: middleSquareSize,
      height: middleSquareSize,
      color: middleSquareColor,
      strokeColor,
      strokeWeight,
      rotation: p.PI / 2,
      ...baseAnimationProps,
      rotationSpeed:
        middleSquareRotationSpeed !== undefined
          ? middleSquareRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + staggerOffsetX,
      offsetY: (baseAnimationProps.offsetY || 0) + staggerOffsetY,
    })
  );

  // Middle Diamond (rect rotated PI/4)
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: centerX,
      y: centerY,
      width: middleDiamondSize,
      height: middleDiamondSize,
      color: middleDiamondColor,
      strokeColor,
      strokeWeight,
      rotation: p.PI / 4,
      ...baseAnimationProps,
      rotationSpeed:
        middleDiamondRotationSpeed !== undefined
          ? middleDiamondRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + staggerOffsetX * 2,
      offsetY: (baseAnimationProps.offsetY || 0) + staggerOffsetY * 2,
    })
  );

  // Inner Square (rect rotated PI/2, original was PI/2, semi-transparent)
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: centerX,
      y: centerY,
      width: innerSquareSize,
      height: innerSquareSize,
      color: innerSquareColor,
      strokeColor,
      strokeWeight,
      rotation: p.PI / 2,
      ...baseAnimationProps,
      rotationSpeed:
        innerSquareRotationSpeed !== undefined
          ? innerSquareRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + staggerOffsetX * 3,
      offsetY: (baseAnimationProps.offsetY || 0) + staggerOffsetY * 3,
    })
  );

  // Innermost Diamond (rect rotated PI/2, original was PI/2, dark)
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: centerX,
      y: centerY,
      width: innerDiamondSize,
      height: innerDiamondSize,
      color: innerDiamondColor,
      strokeColor,
      strokeWeight,
      rotation: p.PI / 2,
      ...baseAnimationProps,
      rotationSpeed:
        innerDiamondRotationSpeed !== undefined
          ? innerDiamondRotationSpeed
          : baseAnimationProps.rotationSpeed,
      offsetX: (baseAnimationProps.offsetX || 0) + staggerOffsetX * 4,
      offsetY: (baseAnimationProps.offsetY || 0) + staggerOffsetY * 4,
    })
  );
}

// --- Existing createDiamondSquareEye function ---
interface DiamondSquareEyeOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  x: number;
  y: number;
  size?: number;
  color?: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  rotation?: number;
}

export function createDiamondSquareEye(options: DiamondSquareEyeOptions) {
  const {
    p,
    shapesArray,
    x,
    y,
    size = 15,
    color = [255, 255, 255],
    strokeColor = [0, 0, 0],
    strokeWeight = 1,
    rotation = p.PI / 4,
    ...animationProps
  } = options;

  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x,
      y,
      width: size,
      height: size,
      color,
      strokeColor,
      strokeWeight,
      rotation,
      ...animationProps,
    })
  );
}

// --- NEW REFACTORED FUNCTION ---

interface BeingNeckPairOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  centerX: number;
  centerY: number;
  width?: number;
  height?: number;
  color?: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  rotation?: number;
  horizontalOffset?: number; // Distance from centerX for each neck
  leftOffsetX?: number; // Additional offset for left neck
  leftOffsetY?: number;
  rightOffsetX?: number; // Additional offset for right neck
  rightOffsetY?: number;
}

/**
 * Creates a pair of mirrored rectangles for the "middle being neck" pattern.
 * @param options Configuration for the being neck pair.
 */
export function createBeingNeckPair(options: BeingNeckPairOptions) {
  const {
    p,
    shapesArray,
    centerX,
    centerY,
    width = 145,
    height = 10,
    // color = [255, 255, 255, 90],
    strokeColor = [0, 0, 0],
    strokeWeight = 1,
    rotation = p.PI / 2, // Vertical
    horizontalOffset = p.width * 0.05, // (0.55 - 0.5)
    leftOffsetX = 0,
    leftOffsetY = 0,
    rightOffsetX = 0,
    rightOffsetY = 0,
    ...baseAnimationProps
  } = options;

  // Left Neck
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: centerX - horizontalOffset,
      y: centerY,
      color: [255, 255, 255, 255], // Default white color
      width,
      height,
      strokeColor,
      strokeWeight,
      rotation,
      ...baseAnimationProps,
      offsetX: (baseAnimationProps.offsetX || 0) + leftOffsetX,
      offsetY: (baseAnimationProps.offsetY || 0) + leftOffsetY,
    })
  );

  // Right Neck
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: centerX + horizontalOffset,
      y: centerY,
      color: [255, 255, 255, 255], // Default white color
      width,
      height,
      strokeColor,
      strokeWeight,
      rotation,
      ...baseAnimationProps,
      offsetX: (baseAnimationProps.offsetX || 0) + rightOffsetX,
      offsetY: (baseAnimationProps.offsetY || 0) + rightOffsetY,
    })
  );
}

// --- NEW REFACTORED FUNCTIONS ---

interface NestedRectEyeOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  eyeCenterX: number;
  eyeCenterY: number;
  outerWidth?: number;
  outerHeight?: number;
  middleWidth?: number;
  middleHeight?: number;
  innerWidth?: number;
  innerHeight?: number;
  pupilSize?: number;
  outerColor?: number[];
  middleColor?: number[];
  innerColor?: number[];
  pupilColor?: number[];
  strokeColor?: number[];
  strokeWeightOuter?: number;
  strokeWeightMiddle?: number;
  strokeWeightInner?: number;
  strokeWeightPupil?: number;
  rotation?: number; // Default to p.PI / 2 for horizontal
  // Animation offsets for nested elements
  middleOffsetX?: number;
  middleOffsetY?: number;
  innerOffsetX?: number;
  innerOffsetY?: number;
  pupilOffsetX?: number;
  pupilOffsetY?: number;
}

/**
 * Creates a complex eye composed of four nested rectangles (outer, middle, inner, and pupil).
 * @param options Configuration for the nested rectangular eye.
 */
export function createNestedRectEye(options: NestedRectEyeOptions) {
  const {
    p,
    shapesArray,
    eyeCenterX,
    eyeCenterY,
    outerWidth = 40,
    outerHeight = 50,
    middleWidth = 30,
    middleHeight = 40,
    innerWidth = 20,
    innerHeight = 25,
    pupilSize = 6,
    outerColor = [255, 255, 255],
    middleColor = [20, 20, 20, 80],
    innerColor = [20, 20, 20],
    pupilColor = [255, 255, 255],
    strokeColor = [0, 0, 0],
    strokeWeightOuter = 0,
    strokeWeightMiddle = 1,
    strokeWeightInner = 0,
    strokeWeightPupil = 0,
    rotation = p.PI / 2, // Horizontal
    middleOffsetX = 0,
    middleOffsetY = 0,
    innerOffsetX = 0,
    innerOffsetY = 0,
    pupilOffsetX = 0,
    pupilOffsetY = 0,
    ...baseAnimationProps
  } = options;

  // Outer rectangle
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: eyeCenterX,
      y: eyeCenterY,
      width: outerWidth,
      height: outerHeight,
      color: outerColor,
      strokeColor,
      strokeWeight: strokeWeightOuter,
      rotation,
      ...baseAnimationProps,
    })
  );

  // Middle rectangle (semi-transparent)
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: eyeCenterX,
      y: eyeCenterY,
      width: middleWidth,
      height: middleHeight,
      color: middleColor,
      strokeColor,
      strokeWeight: strokeWeightMiddle,
      rotation,
      ...baseAnimationProps,
      offsetX: (baseAnimationProps.offsetX || 0) + middleOffsetX,
      offsetY: (baseAnimationProps.offsetY || 0) + middleOffsetY,
    })
  );

  // Inner rectangle (solid dark)
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: eyeCenterX,
      y: eyeCenterY,
      width: innerWidth,
      height: innerHeight,
      color: innerColor,
      strokeColor,
      strokeWeight: strokeWeightInner,
      rotation,
      ...baseAnimationProps,
      offsetX: (baseAnimationProps.offsetX || 0) + innerOffsetX,
      offsetY: (baseAnimationProps.offsetY || 0) + innerOffsetY,
    })
  );

  // Pupil (small white square/rect)
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: eyeCenterX,
      y: eyeCenterY,
      width: pupilSize,
      height: pupilSize,
      color: pupilColor,
      strokeColor,
      strokeWeight: strokeWeightPupil,
      rotation,
      ...baseAnimationProps,
      offsetX: (baseAnimationProps.offsetX || 0) + pupilOffsetX,
      offsetY: (baseAnimationProps.offsetY || 0) + pupilOffsetY,
    })
  );
}

interface ConnectingVerticalRectOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  rotation?: number; // Default to p.PI / 2 for horizontal
}

/**
 * Creates a single vertical rectangle connecting two elements.
 * @param options Configuration for the connecting vertical rectangle.
 */
export function createConnectingVerticalRect(
  options: ConnectingVerticalRectOptions
) {
  const {
    p,
    shapesArray,
    x,
    y,
    width = 20,
    height = 88,
    color = [255, 255, 255],
    strokeColor = [0, 0, 0],
    strokeWeight = 0,
    rotation = p.PI / 2, // Horizontal
    ...animationProps
  } = options;

  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x,
      y,
      width,
      height,
      color,
      strokeColor,
      strokeWeight,
      rotation,
      ...animationProps,
    })
  );
}

interface LongRectNeckWithMouthOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  baseX: number; // Center X for the entire neck/mouth group
  baseY: number; // Center Y for the entire neck/mouth group
  isRightSide?: boolean; // If true, mirrors the X position
  neckWidth?: number;
  neckHeight?: number;
  mouthOuterWidth?: number;
  mouthOuterHeight?: number;
  mouthInnerWidth?: number;
  mouthInnerHeight?: number;
  neckColor?: number[];
  mouthOuterColor?: number[];
  mouthInnerColor?: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  rotation?: number; // Default to p.PI / 2 for horizontal
  // Animation offsets for mouth parts
  mouthOuterOffsetX?: number;
  mouthOuterOffsetY?: number;
  mouthInnerOffsetX?: number;
  mouthInnerOffsetY?: number;
}

/**
 * Creates a long rectangular neck with a nested rectangular mouth.
 * @param options Configuration for the long rectangular neck with mouth.
 */
export function createLongRectNeckWithMouth(
  options: LongRectNeckWithMouthOptions
) {
  const {
    p,
    shapesArray,
    baseX,
    baseY,
    isRightSide = false,
    neckWidth = 170,
    neckHeight = 30,
    mouthOuterWidth = 40,
    mouthOuterHeight = 20,
    mouthInnerWidth = 30,
    mouthInnerHeight = 20,
    neckColor = [255, 255, 255],
    mouthOuterColor = [255, 255, 255],
    mouthInnerColor = [25, 25, 25],
    strokeColor = [0, 0, 0],
    strokeWeight = 0,
    rotation = p.PI / 2, // Horizontal
    mouthOuterOffsetX = 0,
    mouthOuterOffsetY = 0,
    mouthInnerOffsetX = 0,
    mouthInnerOffsetY = 0,
    ...baseAnimationProps
  } = options;

  const finalX = isRightSide ? p.width - baseX : baseX;

  // Long neck rectangle
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: finalX,
      y: baseY,
      width: neckWidth,
      height: neckHeight,
      color: neckColor,
      strokeColor,
      strokeWeight,
      rotation,
      ...baseAnimationProps,
    })
  );

  // Mouth outer
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: finalX,
      y: baseY,
      width: mouthOuterWidth,
      height: mouthOuterHeight,
      color: mouthOuterColor,
      strokeColor,
      strokeWeight: 2, // Mouth always has stroke
      rotation,
      ...baseAnimationProps,
      offsetX: (baseAnimationProps.offsetX || 0) + mouthOuterOffsetX,
      offsetY: (baseAnimationProps.offsetY || 0) + mouthOuterOffsetY,
    })
  );

  // Mouth inner
  shapesArray.push(
    new Shape(p, {
      type: 'rect',
      x: finalX,
      y: baseY,
      width: mouthInnerWidth,
      height: mouthInnerHeight,
      color: mouthInnerColor,
      strokeColor,
      strokeWeight: 2, // Mouth always has stroke
      rotation,
      ...baseAnimationProps,
      offsetX: (baseAnimationProps.offsetX || 0) + mouthInnerOffsetX,
      offsetY: (baseAnimationProps.offsetY || 0) + mouthInnerOffsetY,
    })
  );
}

// --- NEW REFACTORED TRIANGLE FUNCTIONS ---

// interface NestedBottomTrianglesOptions extends AnimationProps {
//     p: p5;
//     shapesArray: Shape[];
//     baseX: number;
//     baseY: number;
//     isRightSide?: boolean;
//     triangleConfigs: Array<{
//       v2x: number; v2y: number; v3x: number; v3y: number;
//       color: number[];
//       strokeWeight?: number;
//       rotation?: number; // Optional rotation for individual triangles
//       offsetX?: number; // Optional animation offsets for individual triangles
//       offsetY?: number;
//     }>;
//   }
// --- Existing createPyramidTriangles function ---
interface PyramidTrianglesOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  baseX: number;
  baseY: number;
  isRightSide?: boolean;
  triangleConfigs: Array<{
    v1y: number;
    v2x: number;
    v2y: number;
    v3x: number;
    v3y: number;
    color: number[];
    strokeWeight?: number;
    rotation?: number;
    offsetX?: number;
    offsetY?: number;
  }>;
}

export function createPyramidTriangles(options: PyramidTrianglesOptions) {
  const {
    p,
    shapesArray,
    baseX,
    baseY,
    isRightSide = false,
    triangleConfigs,
    ...baseAnimationProps
  } = options;

  const finalX = isRightSide ? p.width - baseX : baseX;

  triangleConfigs.forEach((config, index) => {
    shapesArray.push(
      new Shape(p, {
        type: 'triangle',
        x: finalX,
        y: baseY,
        v1x: 0,
        v1y: config.v1y,
        v2x: config.v2x,
        v2y: config.v2y,
        v3x: config.v3x,
        v3y: config.v3y,
        color: config.color,
        strokeColor: [0, 0, 0],
        strokeWeight:
          config.strokeWeight !== undefined ? config.strokeWeight : 0,
        rotation:
          config.rotation !== undefined
            ? config.rotation
            : baseAnimationProps.rotation,
        ...baseAnimationProps,
        offsetX: (baseAnimationProps.offsetX || 0) + (config.offsetX || 0),
        offsetY: (baseAnimationProps.offsetY || 0) + (config.offsetY || 0),
        rotationSpeed: (baseAnimationProps.rotationSpeed || 0) + index * 0.0001,
      })
    );
  });
}

// --- NEW REFACTORED TRIANGLE FUNCTIONS ---

interface ConcentricBottomTrianglesOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  baseX: number;
  baseY: number;
  isRightSide?: boolean;
  triangleConfigs: Array<{
    v2x: number;
    v2y: number;
    v3x: number;
    v3y: number;
    color: number[];
    strokeWeight?: number;
  }>;
}

/**
 * Creates a set of concentric upright triangles for bottom-aligned patterns.
 * The top vertex (v1x, v1y) is fixed at (0, -60) relative to the triangle's center.
 * @param options Configuration for the concentric bottom triangles.
 */
export function createConcentricBottomTriangles(
  options: ConcentricBottomTrianglesOptions
) {
  const {
    p,
    shapesArray,
    baseX,
    baseY,
    isRightSide = false,
    triangleConfigs,
    ...baseAnimationProps
  } = options;

  const finalX = isRightSide ? p.width - baseX : baseX;

  triangleConfigs.forEach((config, index) => {
    shapesArray.push(
      new Shape(p, {
        type: 'triangle',
        x: finalX,
        y: baseY,
        v1x: 0,
        v1y: -60, // Consistent top point
        v2x: config.v2x,
        v2y: config.v2y,
        v3x: config.v3x,
        v3y: config.v3y,
        color: config.color,
        strokeColor: [0, 0, 0],
        strokeWeight:
          config.strokeWeight !== undefined ? config.strokeWeight : 0,
        ...baseAnimationProps,
        // Apply stagger to animation properties if needed
        rotationSpeed: (baseAnimationProps.rotationSpeed || 0) + index * 0.0001,
        amplitudeY: baseAnimationProps.amplitudeY || 0,
        frequencyY: baseAnimationProps.frequencyY || 0,
        offsetX: baseAnimationProps.offsetX || 0,
        offsetY: baseAnimationProps.offsetY || 0,
      })
    );
  });
}

interface SingleInvertedTriangleOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  x: number;
  y: number;
  v1x?: number;
  v1y?: number;
  v2x?: number;
  v2y?: number;
  v3x?: number;
  v3y?: number;
  color?: number[];
  strokeColor?: number[];
  strokeWeight?: number;
  rotation?: number; // Default to p.PI for upside down
}

/**
 * Creates a single inverted triangle.
 * @param options Configuration for the inverted triangle.
 */
export function createSingleInvertedTriangle(
  options: SingleInvertedTriangleOptions
) {
  const {
    p,
    shapesArray,
    x,
    y,
    v1x = 0,
    v1y = -60,
    v2x = -60,
    v2y = 60,
    v3x = 60,
    v3y = 60,
    //color = [255, 255, 255, 30], // Default to translucent white
    strokeColor = [0, 0, 0],
    strokeWeight = 4,
    rotation = p.PI, // Upside down
    ...animationProps
  } = options;

  shapesArray.push(
    new Shape(p, {
      type: 'triangle',
      color: [255, 255, 255, 255], // Default white color
      x,
      y,
      v1x,
      v1y,
      v2x,
      v2y,
      v3x,
      v3y,
      strokeColor,
      strokeWeight,
      rotation,
      ...animationProps,
    })
  );
}

interface ConcentricTopInvertedTrianglesOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  baseX: number;
  baseY: number;
  isRightSide?: boolean;
  triangleConfigs: Array<{
    v2x: number;
    v2y: number;
    v3x: number;
    v3y: number;
    color: number[];
    strokeWeight?: number;
  }>;
}

/**
 * Creates a set of concentric inverted triangles for top-aligned patterns.
 * The top vertex (v1x, v1y) is fixed at (0, -60) relative to the triangle's center.
 * @param options Configuration for the concentric top inverted triangles.
 */
export function createConcentricTopInvertedTriangles(
  options: ConcentricTopInvertedTrianglesOptions
) {
  const {
    p,
    shapesArray,
    baseX,
    baseY,
    isRightSide = false,
    triangleConfigs,
    ...baseAnimationProps
  } = options;

  const finalX = isRightSide ? p.width - baseX : baseX;

  triangleConfigs.forEach((config, index) => {
    shapesArray.push(
      new Shape(p, {
        type: 'triangle',
        x: finalX,
        y: baseY,
        v1x: 0,
        v1y: -60, // Consistent top point
        v2x: config.v2x,
        v2y: config.v2y,
        v3x: config.v3x,
        v3y: config.v3y,
        color: config.color,
        strokeColor: [0, 0, 0],
        strokeWeight:
          config.strokeWeight !== undefined ? config.strokeWeight : 1,
        rotation: p.PI, // Always inverted for this group
        ...baseAnimationProps,
        // Apply stagger to animation properties if needed
        rotationSpeed: (baseAnimationProps.rotationSpeed || 0) + index * 0.0001,
        amplitudeY: baseAnimationProps.amplitudeY || 0,
        frequencyY: baseAnimationProps.frequencyY || 0,
        offsetX: baseAnimationProps.offsetX || 0,
        offsetY: baseAnimationProps.offsetY || 0,
      })
    );
  });
}

// --- NEW ELLIPSE FUNCTION ---
interface ConcentricBottomEllipsesOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  baseX: number;
  baseY: number;
  leftEllipseConfigs: Array<{
    width: number;
    height: number;
    color: number[];
    rotation: number;
  }>;
  rightEllipseConfigs: Array<{
    width: number;
    height: number;
    color: number[];
    rotation: number;
  }>;
}

/**
 * Creates two sets of concentric ellipses at the bottom, mirrored horizontally.
 * @param options Configuration for the concentric bottom ellipses.
 */
export function createConcentricBottomEllipses(
  options: ConcentricBottomEllipsesOptions
) {
  const {
    p,
    shapesArray,
    baseX,
    baseY,
    leftEllipseConfigs,
    rightEllipseConfigs,
    ...baseAnimationProps
  } = options;

  // Left set of ellipses
  leftEllipseConfigs.forEach((config, index) => {
    shapesArray.push(
      new Shape(p, {
        type: 'ellipse',
        x: baseX,
        y: baseY,
        width: config.width,
        height: config.height,
        color: config.color,
        strokeWeight: 2, // Consistent stroke for these ellipses
        rotation: config.rotation,
        ...baseAnimationProps,
        // Apply stagger to animation properties if needed
        amplitudeX: baseAnimationProps.amplitudeX || 0,
        frequencyX: baseAnimationProps.frequencyX || 0,
        offsetX: (baseAnimationProps.offsetX || 0) + (index * p.PI) / 8, // Small phase offset for inner ellipses
      })
    );
  });

  // Right set of ellipses
  rightEllipseConfigs.forEach((config, index) => {
    shapesArray.push(
      new Shape(p, {
        type: 'ellipse',
        x: p.width - baseX,
        y: baseY, // Mirrored X
        width: config.width,
        height: config.height,
        color: config.color,
        strokeWeight: 2, // Consistent stroke for these ellipses
        rotation: config.rotation,
        ...baseAnimationProps,
        // Apply stagger to animation properties if needed
        amplitudeX: baseAnimationProps.amplitudeX || 0,
        frequencyX: baseAnimationProps.frequencyX || 0,
        offsetX: (baseAnimationProps.offsetX || 0) + (index * p.PI) / 8, // Small phase offset for inner ellipses
      })
    );
  });
}

// --- NEW LINE FUNCTION ---
interface HorizontalLineOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  y: number;
  strokeColor?: number[];
  strokeWeight?: number;
}

/**
 * Creates a horizontal line spanning the full width of the canvas.
 * @param options Configuration for the horizontal line.
 */
export function createHorizontalLine(options: HorizontalLineOptions) {
  const {
    p,
    shapesArray,
    y,
    strokeColor = [255, 255, 255],
    strokeWeight = 3,
    ...animationProps
  } = options;

  shapesArray.push(
    new Shape(p, {
      type: 'line',
      x: 0, // Start X of the line (absolute)
      y: y, // Start Y of the line (absolute)
      color: [255, 255, 255, 255], // Default white color
      v1x: 0,
      v1y: 0, // Line starts at anchor
      v2x: p.width,
      v2y: 0, // Line ends relative to anchor, spanning full width
      strokeColor,
      strokeWeight,
      ...animationProps,
    })
  );
}

// --- NEW EYE DOTS FUNCTION ---
interface EyeDotsOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  x: number;
  y: number;
  strokeColor?: number[];
  strokeWeight?: number;
  isPaired?: boolean;
  pairOffsetX?: number; // Offset for the second dot if paired
}

/**
 * Creates one or two eye dots (points) with jittering motion.
 * @param options Configuration for the eye dots.
 */
export function createEyeDots(options: EyeDotsOptions) {
  const {
    p,
    shapesArray,
    x,
    y,
    strokeColor = [255, 255, 255],
    strokeWeight = 8, // Default to larger for main eye dots
    isPaired = false,
    pairOffsetX = 0,
    ...animationProps
  } = options;

  // First dot
  shapesArray.push(
    new Shape(p, {
      type: 'point',
      color: [255, 255, 255, 255], // Default white color
      x,
      y,
      strokeColor,
      strokeWeight,
      ...animationProps,
    })
  );

  // Second dot if paired
  if (isPaired) {
    shapesArray.push(
      new Shape(p, {
        type: 'point',
        x: x + pairOffsetX,
        color: [255, 255, 255, 255], // Default white color
        y,
        strokeColor,
        strokeWeight,
        ...animationProps,
        offsetX: (animationProps.offsetX || 0) + p.PI, // Offset phase for paired dot
      })
    );
  }
}

// --- NEW FUNCTION: createConcentricCircles ---
interface ConcentricCirclesOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  centerX: number;
  centerY: number;
  circleConfigs: Array<{
    size: number;
    color: number[];
    strokeWeight?: number;
    rotationSpeed?: number;
    amplitudeX?: number;
    amplitudeY?: number;
    frequencyX?: number;
    frequencyY?: number;
    offsetX?: number;
    offsetY?: number;
  }>;
}

/**
 * Creates a set of concentric circles with individual animation properties.
 * @param options Configuration for the concentric circles.
 */
export function createConcentricCircles(options: ConcentricCirclesOptions) {
  const {
    p,
    shapesArray,
    centerX,
    centerY,
    circleConfigs,
    ...baseAnimationProps // Base animation properties applied to all circles
  } = options;

  circleConfigs.forEach((config) => {
    shapesArray.push(
      new Shape(p, {
        type: 'circle',
        x: centerX,
        y: centerY,
        size: config.size,
        color: config.color,
        strokeWeight:
          config.strokeWeight !== undefined ? config.strokeWeight : 0, // Default to no stroke
        // Merge baseAnimationProps with individual circle config animation props
        ...baseAnimationProps,
        rotationSpeed:
          config.rotationSpeed !== undefined
            ? config.rotationSpeed
            : baseAnimationProps.rotationSpeed,
        amplitudeX:
          config.amplitudeX !== undefined
            ? config.amplitudeX
            : baseAnimationProps.amplitudeX,
        amplitudeY:
          config.amplitudeY !== undefined
            ? config.amplitudeY
            : baseAnimationProps.amplitudeY,
        frequencyX:
          config.frequencyX !== undefined
            ? config.frequencyX
            : baseAnimationProps.frequencyX,
        frequencyY:
          config.frequencyY !== undefined
            ? config.frequencyY
            : baseAnimationProps.frequencyY,
        offsetX:
          config.offsetX !== undefined
            ? config.offsetX
            : baseAnimationProps.offsetX,
        offsetY:
          config.offsetY !== undefined
            ? config.offsetY
            : baseAnimationProps.offsetY,
      })
    );
  });
}
