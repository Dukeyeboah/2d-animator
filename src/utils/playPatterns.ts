import { Shape } from './Shape'; // Import the Shape class
import p5 from 'p5'; // Import p5 for type hinting

// --- Common Interface for Animation Properties ---
// This helps keep options consistent across different pattern functions
interface AnimationProps {
  // This is like a standard "Features Checklist" for any animated toy.
  // It lists all the possible animation settings that a 'Shape' can have.
  // By defining it once, we ensure consistency across different functions and make it easier to add new animation types later.
  rotationSpeed?: number; // Optional: How fast the toy spins.
  amplitudeX?: number; // Optional: How much the toy swings left/right.
  amplitudeY?: number; // Optional: How much the toy swings up/down.
  frequencyX?: number; // Optional: How fast the left/right swing repeats.
  frequencyY?: number; // Optional: How fast the up/down swing repeats.
  offsetX?: number; // Optional: The starting point of the horizontal swing.
  offsetY?: number; // Optional: The starting point of the vertical swing.
  rotation?: number; // Optional: The toy's initial spin angle.
  // NEW: Add size animation properties to AnimationProps
  amplitudeSize?: number; // Optional: How much the toy grows and shrinks.
  frequencySize?: number; // Optional: How fast the growth/shrink cycle repeats.
  offsetSize?: number; // Optional: The starting point of the growth/shrink cycle.
  baseSize?: number; // Optional: The toy's original size before animation.
  // NEW: Stroke weight animation properties
  amplitudeStrokeWeight?: number; // Optional: How much the toy's outline thickness changes.
  frequencyStrokeWeight?: number; // Optional: How fast the outline thickness changes.
  offsetStrokeWeight?: number; // Optional: The starting point of the outline thickness cycle.
  baseStrokeWeight?: number; // Optional: The toy's original outline thickness.

  // NEW: Color animation properties (rhythmic)
  amplitudeColorR?: number; // Optional: How much the Red (or Hue) color component changes.
  amplitudeColorG?: number; // Optional: How much the Green (or Saturation) color component changes.
  amplitudeColorB?: number; // Optional: How much the Blue (or Brightness) color component changes.
  amplitudeColorA?: number; // Optional: How much the Alpha (transparency) color component changes.
  frequencyColor?: number; // Optional: How fast the color changes rhythmically.
  offsetColor?: number; // Optional: The starting point of the color change cycle.

  // NEW: Random color animation properties
  randomizeColor?: boolean; // Optional: True if the color should change randomly.
  randomColorInterval?: number; // Optional: How often (in frames) the random color should be picked.
}

// NEW: Generalized ShapeConfig to support various shape types and their specific properties
interface ShapeConfig extends AnimationProps {
  // This is like a specific "Toy Order Form" for a single toy.
  // It extends (`extends AnimationProps`) the general 'Features Checklist', meaning it includes ALL those animation options.
  // Plus, it adds properties specific to the toy's basic appearance (its type, base position, color, etc.).

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
  // REQUIRED: The basic shape of the toy.
  x?: number; // Optional: Initial X position.
  y?: number; // Optional: Initial Y position.
  size?: number; // Optional: Size for circular/square toys.
  width?: number; // Optional: Width for rectangular/elliptical toys.
  height?: number; // Optional: Height for rectangular/elliptical toys.
  color: number[]; // REQUIRED: The toy's base color.
  strokeWeight?: number; // Optional: The toy's outline thickness.
  strokeColor?: number[]; // Optional: The toy's outline color.
  // Specific vertex properties for line, triangle, quad (relative to x,y)
  // These are like extra instructions for complex toys, telling them where their corners are relative to their main position.
  v1x?: number;
  v1y?: number;
  v2x?: number;
  v2y?: number;
  v3x?: number;
  v3y?: number;
  v4x?: number;
  v4y?: number;
}

interface CreateShapesOptions {
  // This is like the "Overall Production Plan" for a batch of toys.
  // It contains everything needed to create a group of 'Shape' objects.
  p: p5;
  shapesArray: Shape[]; // An array where the newly created 'Shape' objects (toys) will be added.
  shapeConfigs: ShapeConfig[]; // An array of individual 'Toy Order Forms' for each toy in the batch.
  // Optional: base animation properties that apply to all shapes unless overridden by config
  baseAnimationProps?: AnimationProps;
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
    strokeColor?: number[];
    rotationSpeed?: number;
    amplitudeX?: number;
    amplitudeY?: number;
    frequencyX?: number;
    frequencyY?: number;
    offsetX?: number;
    offsetY?: number;
    // NEW: Add size animation properties to individual circle configs
    amplitudeSize?: number;
    frequencySize?: number;
    offsetSize?: number;
    baseSize?: number;
    // NEW: Stroke weight animation properties for individual configs
    amplitudeStrokeWeight?: number;
    frequencyStrokeWeight?: number;
    offsetStrokeWeight?: number;
    baseStrokeWeight?: number;
    // NEW: Color animation properties (rhythmic) for individual configs
    amplitudeColorR?: number;
    amplitudeColorG?: number;
    amplitudeColorB?: number;
    amplitudeColorA?: number;
    frequencyColor?: number;
    offsetColor?: number;
    // NEW: Random color animation properties for individual configs
    randomizeColor?: boolean;
    randomColorInterval?: number;
  }>;
}

// --- NEW FUNCTION: createIndependentCircles ---
interface IndependentCirclesOptions extends AnimationProps {
  p: p5;
  shapesArray: Shape[];
  circleConfigs: Array<{
    x: number;
    y: number;
    size: number;
    color: number[];
    strokeWeight?: number;
    strokeColor?: number[];
    rotationSpeed?: number;
    amplitudeX?: number;
    amplitudeY?: number;
    frequencyX?: number;
    frequencyY?: number;
    offsetX?: number;
    offsetY?: number;
    // NEW: Add size animation properties to individual circle configs
    amplitudeSize?: number;
    frequencySize?: number;
    offsetSize?: number;
    baseSize?: number;
    // NEW: Stroke weight animation properties for individual configs
    amplitudeStrokeWeight?: number;
    frequencyStrokeWeight?: number;
    offsetStrokeWeight?: number;
    baseStrokeWeight?: number;
    // NEW: Color animation properties (rhythmic) for individual configs
    amplitudeColorR?: number;
    amplitudeColorG?: number;
    amplitudeColorB?: number;
    amplitudeColorA?: number;
    frequencyColor?: number;
    offsetColor?: number;
    // NEW: Random color animation properties for individual configs
    randomizeColor?: boolean;
    randomColorInterval?: number;
  }>;
}

/**
 * Creates a set of concentric shapes.
 * All shapes are initially positioned relative to a common center (centerX, centerY).
 * Individual shape configs can override base animation properties.
 */
export function createConcentricShapes(
  options: CreateShapesOptions & { centerX: number; centerY: number }
) {
  // This is like the "Concentric Toy Production Line" in your factory.
  // It takes the 'Overall Production Plan' and specifically makes toys that are arranged around a single center point.
  const { p, shapesArray, centerX, centerY, shapeConfigs, baseAnimationProps } =
    options;
  shapeConfigs.forEach((config: ShapeConfig) => {
    // This loops through each 'Toy Order Form' in the 'shapeConfigs' list.
    // For each order form, we're going to create one new toy.
    shapesArray.push(
      // We use the 'Shape' blueprint to create a new toy.
      // 'shapesArray.push()' adds the newly made toy to the list that your sketch will use to draw them.
      new Shape(p, {
        type: config.type,
        x: centerX, // IMPORTANT: All concentric toys share the same central X position.
        y: centerY, // IMPORTANT: All concentric toys share the same central Y position.
        size: config.size, // The size of the toy.
        width: config.width,
        height: config.height,
        color: config.color,
        strokeWeight:
          config.strokeWeight !== undefined ? config.strokeWeight : 0,
        strokeColor: config.strokeColor,

        // --- The Magic of Merging Properties (Default Features vs. Specific Orders) ---
        // This is where the 'baseAnimationProps' (default features for the batch) are combined with the 'config' (individual toy's specific orders).
        // Analogy: Imagine you have a general rule for all toys on this line: "All toys should spin at speed X." But then an individual toy's order form says: "THIS toy should spin at speed Y."
        // The individual order form (config) always wins! If a specific value is provided in 'config', it's used.Otherwise, it falls back to the 'baseAnimationProps' (the general rule).
        // Merge baseAnimationProps with individual shape config animation props
        // Prioritize config's specific values over baseAnimationProps
        rotationSpeed:
          config.rotationSpeed !== undefined
            ? config.rotationSpeed
            : baseAnimationProps?.rotationSpeed,
        amplitudeX:
          config.amplitudeX !== undefined
            ? config.amplitudeX
            : baseAnimationProps?.amplitudeX,
        amplitudeY:
          config.amplitudeY !== undefined
            ? config.amplitudeY
            : baseAnimationProps?.amplitudeY,
        frequencyX:
          config.frequencyX !== undefined
            ? config.frequencyX
            : baseAnimationProps?.frequencyX,
        frequencyY:
          config.frequencyY !== undefined
            ? config.frequencyY
            : baseAnimationProps?.frequencyY,
        offsetX:
          config.offsetX !== undefined
            ? config.offsetX
            : baseAnimationProps?.offsetX,
        offsetY:
          config.offsetY !== undefined
            ? config.offsetY
            : baseAnimationProps?.offsetY,
        amplitudeSize:
          config.amplitudeSize !== undefined
            ? config.amplitudeSize
            : baseAnimationProps?.amplitudeSize,
        frequencySize:
          config.frequencySize !== undefined
            ? config.frequencySize
            : baseAnimationProps?.frequencySize,
        offsetSize:
          config.offsetSize !== undefined
            ? config.offsetSize
            : baseAnimationProps?.offsetSize,
        baseSize:
          config.baseSize !== undefined
            ? config.baseSize
            : baseAnimationProps?.baseSize,
        amplitudeStrokeWeight:
          config.amplitudeStrokeWeight !== undefined
            ? config.amplitudeStrokeWeight
            : baseAnimationProps?.amplitudeStrokeWeight,
        frequencyStrokeWeight:
          config.frequencyStrokeWeight !== undefined
            ? config.frequencyStrokeWeight
            : baseAnimationProps?.frequencyStrokeWeight,
        offsetStrokeWeight:
          config.offsetStrokeWeight !== undefined
            ? config.offsetStrokeWeight
            : baseAnimationProps?.offsetStrokeWeight,
        baseStrokeWeight:
          config.baseStrokeWeight !== undefined
            ? config.baseStrokeWeight
            : baseAnimationProps?.baseStrokeWeight,
        amplitudeColorR:
          config.amplitudeColorR !== undefined
            ? config.amplitudeColorR
            : baseAnimationProps?.amplitudeColorR,
        amplitudeColorG:
          config.amplitudeColorG !== undefined
            ? config.amplitudeColorG
            : baseAnimationProps?.amplitudeColorG,
        amplitudeColorB:
          config.amplitudeColorB !== undefined
            ? config.amplitudeColorB
            : baseAnimationProps?.amplitudeColorB,
        amplitudeColorA:
          config.amplitudeColorA !== undefined
            ? config.amplitudeColorA
            : baseAnimationProps?.amplitudeColorA,
        frequencyColor:
          config.frequencyColor !== undefined
            ? config.frequencyColor
            : baseAnimationProps?.frequencyColor,
        offsetColor:
          config.offsetColor !== undefined
            ? config.offsetColor
            : baseAnimationProps?.offsetColor,
        randomizeColor:
          config.randomizeColor !== undefined
            ? config.randomizeColor
            : baseAnimationProps?.randomizeColor,
        randomColorInterval:
          config.randomColorInterval !== undefined
            ? config.randomColorInterval
            : baseAnimationProps?.randomColorInterval,

        v1x: config.v1x,
        v1y: config.v1y,
        v2x: config.v2x,
        v2y: config.v2y,
        v3x: config.v3x,
        v3y: config.v3y,
        v4x: config.v4x,
        v4y: config.v4y,
      })
    );
  });
}

/**
 * Creates independent shapes at their specified x, y coordinates.
 * Individual shape configs can override base animation properties.
 */
export function createIndependentShapes(options: CreateShapesOptions) {
  // It's similar to the concentric line, but each toy gets its OWN starting X and Y position,
  // rather than all sharing a common center.
  const { p, shapesArray, shapeConfigs, baseAnimationProps } = options;

  shapeConfigs.forEach((config: ShapeConfig) => {
    shapesArray.push(
      new Shape(p, {
        type: config.type,
        x: config.x, // IMPORTANT: Independent shapes use their OWN X position from their config.
        y: config.y, // IMPORTANT: Independent shapes use their OWN Y position from their config.
        size: config.size,
        width: config.width,
        height: config.height,
        color: config.color,
        strokeWeight:
          config.strokeWeight !== undefined ? config.strokeWeight : 0,
        strokeColor: config.strokeColor,

        // Merge baseAnimationProps with individual shape config animation props
        rotationSpeed:
          config.rotationSpeed !== undefined
            ? config.rotationSpeed
            : baseAnimationProps?.rotationSpeed,
        amplitudeX:
          config.amplitudeX !== undefined
            ? config.amplitudeX
            : baseAnimationProps?.amplitudeX,
        amplitudeY:
          config.amplitudeY !== undefined
            ? config.amplitudeY
            : baseAnimationProps?.amplitudeY,
        frequencyX:
          config.frequencyX !== undefined
            ? config.frequencyX
            : baseAnimationProps?.frequencyX,
        frequencyY:
          config.frequencyY !== undefined
            ? config.frequencyY
            : baseAnimationProps?.frequencyY,
        offsetX:
          config.offsetX !== undefined
            ? config.offsetX
            : baseAnimationProps?.offsetX,
        offsetY:
          config.offsetY !== undefined
            ? config.offsetY
            : baseAnimationProps?.offsetY,
        amplitudeSize:
          config.amplitudeSize !== undefined
            ? config.amplitudeSize
            : baseAnimationProps?.amplitudeSize,
        frequencySize:
          config.frequencySize !== undefined
            ? config.frequencySize
            : baseAnimationProps?.frequencySize,
        offsetSize:
          config.offsetSize !== undefined
            ? config.offsetSize
            : baseAnimationProps?.offsetSize,
        baseSize:
          config.baseSize !== undefined
            ? config.baseSize
            : baseAnimationProps?.baseSize,
        amplitudeStrokeWeight:
          config.amplitudeStrokeWeight !== undefined
            ? config.amplitudeStrokeWeight
            : baseAnimationProps?.amplitudeStrokeWeight,
        frequencyStrokeWeight:
          config.frequencyStrokeWeight !== undefined
            ? config.frequencyStrokeWeight
            : baseAnimationProps?.frequencyStrokeWeight,
        offsetStrokeWeight:
          config.offsetStrokeWeight !== undefined
            ? config.offsetStrokeWeight
            : baseAnimationProps?.offsetStrokeWeight,
        baseStrokeWeight:
          config.baseStrokeWeight !== undefined
            ? config.baseStrokeWeight
            : baseAnimationProps?.baseStrokeWeight,
        amplitudeColorR:
          config.amplitudeColorR !== undefined
            ? config.amplitudeColorR
            : baseAnimationProps?.amplitudeColorR,
        amplitudeColorG:
          config.amplitudeColorG !== undefined
            ? config.amplitudeColorG
            : baseAnimationProps?.amplitudeColorG,
        amplitudeColorB:
          config.amplitudeColorB !== undefined
            ? config.amplitudeColorB
            : baseAnimationProps?.amplitudeColorB,
        amplitudeColorA:
          config.amplitudeColorA !== undefined
            ? config.amplitudeColorA
            : baseAnimationProps?.amplitudeColorA,
        frequencyColor:
          config.frequencyColor !== undefined
            ? config.frequencyColor
            : baseAnimationProps?.frequencyColor,
        offsetColor:
          config.offsetColor !== undefined
            ? config.offsetColor
            : baseAnimationProps?.offsetColor,
        randomizeColor:
          config.randomizeColor !== undefined
            ? config.randomizeColor
            : baseAnimationProps?.randomizeColor,
        randomColorInterval:
          config.randomColorInterval !== undefined
            ? config.randomColorInterval
            : baseAnimationProps?.randomColorInterval,

        v1x: config.v1x,
        v1y: config.v1y,
        v2x: config.v2x,
        v2y: config.v2y,
        v3x: config.v3x,
        v3y: config.v3y,
        v4x: config.v4x,
        v4y: config.v4y,
      })
    );
  });
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
        strokeColor: config.strokeColor,
          // Merge baseAnimationProps with individual circle config animation props
        // --- Merging using Spread Operator and Ternary for Specificity ---// This is a common pattern for merging default properties with specific overrides.
        // `...baseAnimationProps`: This "spreads" all the properties from `baseAnimationProps` first.
        // Think of it as laying down the general rules for the whole batch.// `rotationSpeed: config.rotationSpeed !== undefined ? config.rotationSpeed : baseAnimationProps.rotationSpeed,`
        // This then checks if the *individual* `config` has a `rotationSpeed`.// If `config.rotationSpeed` is *not* `undefined` (meaning it was explicitly set), use that value.
        // Otherwise, fall back to the `baseAnimationProps.rotationSpeed` (the general rule).// This pattern is repeated for every animation property.
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
        // NEW: Explicitly pass size animation properties from config, overriding baseAnimationProps
        amplitudeSize:
          config.amplitudeSize !== undefined
            ? config.amplitudeSize
            : baseAnimationProps.amplitudeSize,
        frequencySize:
          config.frequencySize !== undefined
            ? config.frequencySize
            : baseAnimationProps.frequencySize,
        offsetSize:
          config.offsetSize !== undefined
            ? config.offsetSize
            : baseAnimationProps.offsetSize,
        baseSize:
          config.baseSize !== undefined
            ? config.baseSize
            : baseAnimationProps.baseSize,
        // NEW: Stroke Weight Animation
        amplitudeStrokeWeight:
          config.amplitudeStrokeWeight !== undefined
            ? config.amplitudeStrokeWeight
            : baseAnimationProps.amplitudeStrokeWeight,
        frequencyStrokeWeight:
          config.frequencyStrokeWeight !== undefined
            ? config.frequencyStrokeWeight
            : baseAnimationProps.frequencyStrokeWeight,
        offsetStrokeWeight:
          config.offsetStrokeWeight !== undefined
            ? config.offsetStrokeWeight
            : baseAnimationProps.offsetStrokeWeight,
        baseStrokeWeight:
          config.baseStrokeWeight !== undefined
            ? config.baseStrokeWeight
            : baseAnimationProps.baseStrokeWeight, // Corrected property name

        // NEW: Color Animation (Rhythmic)
        amplitudeColorR:
          config.amplitudeColorR !== undefined
            ? config.amplitudeColorR
            : baseAnimationProps.amplitudeColorR,
        amplitudeColorG:
          config.amplitudeColorG !== undefined
            ? config.amplitudeColorG
            : baseAnimationProps.amplitudeColorG,
        amplitudeColorB:
          config.amplitudeColorB !== undefined
            ? config.amplitudeColorB
            : baseAnimationProps.amplitudeColorB,
        amplitudeColorA:
          config.amplitudeColorA !== undefined
            ? config.amplitudeColorA
            : baseAnimationProps.amplitudeColorA,
        frequencyColor:
          config.frequencyColor !== undefined
            ? config.frequencyColor
            : baseAnimationProps.frequencyColor,
        offsetColor:
          config.offsetColor !== undefined
            ? config.offsetColor
            : baseAnimationProps.offsetColor,
        // NEW: Random Color Animation
        randomizeColor:
          config.randomizeColor !== undefined
            ? config.randomizeColor
            : baseAnimationProps.randomizeColor,
        randomColorInterval:
          config.randomColorInterval !== undefined
            ? config.randomColorInterval
            : baseAnimationProps.randomColorInterval,
      })
    );
  });
}

/**
 * Creates a set of circles, each with its own independent position and animation properties.
 * @param options Configuration for the independent circles.
 */
export function createIndependentCircles(options: IndependentCirclesOptions) {
  const {
    p,
    shapesArray,
    circleConfigs,
    ...baseAnimationProps // Base animation properties applied to all circles
  } = options;

  circleConfigs.forEach((config) => {
    shapesArray.push(
      new Shape(p, {
        type: 'circle',
        x: config.x,
        y: config.y,
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
        // NEW: Explicitly pass size animation properties from config, overriding baseAnimationProps
        amplitudeSize:
          config.amplitudeSize !== undefined
            ? config.amplitudeSize
            : baseAnimationProps.amplitudeSize,
        frequencySize:
          config.frequencySize !== undefined
            ? config.frequencySize
            : baseAnimationProps.frequencySize,
        offsetSize:
          config.offsetSize !== undefined
            ? config.offsetSize
            : baseAnimationProps.offsetSize,
        baseSize:
          config.baseSize !== undefined
            ? config.baseSize
            : baseAnimationProps.baseSize,
        // NEW: Stroke Weight Animation
        amplitudeStrokeWeight:
          config.amplitudeStrokeWeight !== undefined
            ? config.amplitudeStrokeWeight
            : baseAnimationProps.amplitudeStrokeWeight,
        frequencyStrokeWeight:
          config.frequencyStrokeWeight !== undefined
            ? config.frequencyStrokeWeight
            : baseAnimationProps.frequencyStrokeWeight,
        offsetStrokeWeight:
          config.offsetStrokeWeight !== undefined
            ? config.offsetStrokeWeight
            : baseAnimationProps.offsetStrokeWeight,
        baseStrokeWeight:
          config.baseStrokeWeight !== undefined
            ? config.baseStrokeWeight
            : baseAnimationProps.baseStrokeWeight, // Corrected property name

        // NEW: Color Animation (Rhythmic)
        amplitudeColorR:
          config.amplitudeColorR !== undefined
            ? config.amplitudeColorR
            : baseAnimationProps.amplitudeColorR,
        amplitudeColorG:
          config.amplitudeColorG !== undefined
            ? config.amplitudeColorG
            : baseAnimationProps.amplitudeColorG,
        amplitudeColorB:
          config.amplitudeColorB !== undefined
            ? config.amplitudeColorB
            : baseAnimationProps.amplitudeColorB,
        amplitudeColorA:
          config.amplitudeColorA !== undefined
            ? config.amplitudeColorA
            : baseAnimationProps.amplitudeColorA,
        frequencyColor:
          config.frequencyColor !== undefined
            ? config.frequencyColor
            : baseAnimationProps.frequencyColor,
        offsetColor:
          config.offsetColor !== undefined
            ? config.offsetColor
            : baseAnimationProps.offsetColor,
        // NEW: Random Color Animation
        randomizeColor:
          config.randomizeColor !== undefined
            ? config.randomizeColor
            : baseAnimationProps.randomizeColor,
        randomColorInterval:
          config.randomColorInterval !== undefined
            ? config.randomColorInterval
            : baseAnimationProps.randomColorInterval,
      })
    );
  });
}
