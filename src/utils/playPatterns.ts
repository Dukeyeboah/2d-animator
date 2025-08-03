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
    // NEW: Add size animation properties to AnimationProps
    amplitudeSize?: number;
    frequencySize?: number;
    offsetSize?: number;
    baseSize?: number;
    // NEW: Stroke weight animation properties
    amplitudeStrokeWeight?: number;
    frequencyStrokeWeight?: number;
    offsetStrokeWeight?: number;
    baseStrokeWeight?: number;
    // NEW: Color animation properties (rhythmic)
    amplitudeColorR?: number;
    amplitudeColorG?: number;
    amplitudeColorB?: number;
    amplitudeColorA?: number;
    frequencyColor?: number;
    offsetColor?: number;
    // NEW: Random color animation properties
    randomizeColor?: boolean;
    randomColorInterval?: number;
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
  
// NEW: Generalized ShapeConfig to support various shape types and their specific properties
interface ShapeConfig extends AnimationProps {
  type: 'circle' | 'ellipse' | 'rect' | 'square' | 'line' | 'triangle' | 'quad' | 'point';
  x?: number;
  y?: number;
  size?: number; // For circle, square, point
  width?: number; // For ellipse, rect, quad
  height?: number; // For ellipse, rect, quad
  color: number[];
  strokeWeight?: number;
  strokeColor?: number[];
  // Specific vertex properties for line, triangle, quad (relative to x,y)
  v1x?: number; v1y?: number;
  v2x?: number; v2y?: number;
  v3x?: number; v3y?: number;
  v4x?: number; v4y?: number;
}

interface CreateShapesOptions {
  p: p5;
  shapesArray: Shape[];
  shapeConfigs: ShapeConfig[];
  // Optional: base animation properties that apply to all shapes unless overridden by config
  baseAnimationProps?: AnimationProps;
}

/**
 * Creates a set of concentric shapes.
 * All shapes are initially positioned relative to a common center (centerX, centerY).
 * Individual shape configs can override base animation properties.
 */
export function createConcentricShapes(options: CreateShapesOptions & { centerX: number; centerY: number; }) {
  const { p, shapesArray, centerX, centerY, shapeConfigs, baseAnimationProps } = options;

  shapeConfigs.forEach((config: ShapeConfig) => {
    shapesArray.push(new Shape(p, {
      type: config.type,
      x: centerX, // Concentric shapes share the same center as their initial position
      y: centerY,
      size: config.size,
      width: config.width,
      height: config.height,
      color: config.color,
      strokeWeight: config.strokeWeight !== undefined ? config.strokeWeight : 0,
      strokeColor: config.strokeColor,
      
      // Merge baseAnimationProps with individual shape config animation props
      // Prioritize config's specific values over baseAnimationProps
      rotationSpeed: config.rotationSpeed !== undefined ? config.rotationSpeed : baseAnimationProps?.rotationSpeed,
      amplitudeX: config.amplitudeX !== undefined ? config.amplitudeX : baseAnimationProps?.amplitudeX,
      amplitudeY: config.amplitudeY !== undefined ? config.amplitudeY : baseAnimationProps?.amplitudeY,
      frequencyX: config.frequencyX !== undefined ? config.frequencyX : baseAnimationProps?.frequencyX,
      frequencyY: config.frequencyY !== undefined ? config.frequencyY : baseAnimationProps?.frequencyY,
      offsetX: config.offsetX !== undefined ? config.offsetX : baseAnimationProps?.offsetX,
      offsetY: config.offsetY !== undefined ? config.offsetY : baseAnimationProps?.offsetY,
      amplitudeSize: config.amplitudeSize !== undefined ? config.amplitudeSize : baseAnimationProps?.amplitudeSize,
      frequencySize: config.frequencySize !== undefined ? config.frequencySize : baseAnimationProps?.frequencySize,
      offsetSize: config.offsetSize !== undefined ? config.offsetSize : baseAnimationProps?.offsetSize,
      baseSize: config.baseSize !== undefined ? config.baseSize : baseAnimationProps?.baseSize,
      amplitudeStrokeWeight: config.amplitudeStrokeWeight !== undefined ? config.amplitudeStrokeWeight : baseAnimationProps?.amplitudeStrokeWeight,
      frequencyStrokeWeight: config.frequencyStrokeWeight !== undefined ? config.frequencyStrokeWeight : baseAnimationProps?.frequencyStrokeWeight,
      offsetStrokeWeight: config.offsetStrokeWeight !== undefined ? config.offsetStrokeWeight : baseAnimationProps?.offsetStrokeWeight,
      baseStrokeWeight: config.baseStrokeWeight !== undefined ? config.baseStrokeWeight : baseAnimationProps?.baseStrokeWeight,
      amplitudeColorR: config.amplitudeColorR !== undefined ? config.amplitudeColorR : baseAnimationProps?.amplitudeColorR,
      amplitudeColorG: config.amplitudeColorG !== undefined ? config.amplitudeColorG : baseAnimationProps?.amplitudeColorG,
      amplitudeColorB: config.amplitudeColorB !== undefined ? config.amplitudeColorB : baseAnimationProps?.amplitudeColorB,
      amplitudeColorA: config.amplitudeColorA !== undefined ? config.amplitudeColorA : baseAnimationProps?.amplitudeColorA,
      frequencyColor: config.frequencyColor !== undefined ? config.frequencyColor : baseAnimationProps?.frequencyColor,
      offsetColor: config.offsetColor !== undefined ? config.offsetColor : baseAnimationProps?.offsetColor,
      randomizeColor: config.randomizeColor !== undefined ? config.randomizeColor : baseAnimationProps?.randomizeColor,
      randomColorInterval: config.randomColorInterval !== undefined ? config.randomColorInterval : baseAnimationProps?.randomColorInterval,
      
      v1x: config.v1x, v1y: config.v1y,
      v2x: config.v2x, v2y: config.v2y,
      v3x: config.v3x, v3y: config.v3y,
      v4x: config.v4x, v4y: config.v4y,
    }));
  });
}

/**
 * Creates independent shapes at their specified x, y coordinates.
 * Individual shape configs can override base animation properties.
 */
export function createIndependentShapes(options: CreateShapesOptions) {
  const { p, shapesArray, shapeConfigs, baseAnimationProps } = options;

  shapeConfigs.forEach((config: ShapeConfig) => {
    shapesArray.push(new Shape(p, {
      type: config.type,
      x: config.x, // Independent shapes use their own x, y as initial position
      y: config.y,
      size: config.size,
      width: config.width,
      height: config.height,
      color: config.color,
      strokeWeight: config.strokeWeight !== undefined ? config.strokeWeight : 0,
      strokeColor: config.strokeColor,
      
      // Merge baseAnimationProps with individual shape config animation props
      rotationSpeed: config.rotationSpeed !== undefined ? config.rotationSpeed : baseAnimationProps?.rotationSpeed,
      amplitudeX: config.amplitudeX !== undefined ? config.amplitudeX : baseAnimationProps?.amplitudeX,
      amplitudeY: config.amplitudeY !== undefined ? config.amplitudeY : baseAnimationProps?.amplitudeY,
      frequencyX: config.frequencyX !== undefined ? config.frequencyX : baseAnimationProps?.frequencyX,
      frequencyY: config.frequencyY !== undefined ? config.frequencyY : baseAnimationProps?.frequencyY,
      offsetX: config.offsetX !== undefined ? config.offsetX : baseAnimationProps?.offsetX,
      offsetY: config.offsetY !== undefined ? config.offsetY : baseAnimationProps?.offsetY,
      amplitudeSize: config.amplitudeSize !== undefined ? config.amplitudeSize : baseAnimationProps?.amplitudeSize,
      frequencySize: config.frequencySize !== undefined ? config.frequencySize : baseAnimationProps?.frequencySize,
      offsetSize: config.offsetSize !== undefined ? config.offsetSize : baseAnimationProps?.offsetSize,
      baseSize: config.baseSize !== undefined ? config.baseSize : baseAnimationProps?.baseSize,
      amplitudeStrokeWeight: config.amplitudeStrokeWeight !== undefined ? config.amplitudeStrokeWeight : baseAnimationProps?.amplitudeStrokeWeight,
      frequencyStrokeWeight: config.frequencyStrokeWeight !== undefined ? config.frequencyStrokeWeight : baseAnimationProps?.frequencyStrokeWeight,
      offsetStrokeWeight: config.offsetStrokeWeight !== undefined ? config.offsetStrokeWeight : baseAnimationProps?.offsetStrokeWeight,
      baseStrokeWeight: config.baseStrokeWeight !== undefined ? config.baseStrokeWeight : baseAnimationProps?.baseStrokeWeight,
      amplitudeColorR: config.amplitudeColorR !== undefined ? config.amplitudeColorR : baseAnimationProps?.amplitudeColorR,
      amplitudeColorG: config.amplitudeColorG !== undefined ? config.amplitudeColorG : baseAnimationProps?.amplitudeColorG,
      amplitudeColorB: config.amplitudeColorB !== undefined ? config.amplitudeColorB : baseAnimationProps?.amplitudeColorB,
      amplitudeColorA: config.amplitudeColorA !== undefined ? config.amplitudeColorA : baseAnimationProps?.amplitudeColorA,
      frequencyColor: config.frequencyColor !== undefined ? config.frequencyColor : baseAnimationProps?.frequencyColor,
      offsetColor: config.offsetColor !== undefined ? config.offsetColor : baseAnimationProps?.offsetColor,
      randomizeColor: config.randomizeColor !== undefined ? config.randomizeColor : baseAnimationProps?.randomizeColor,
      randomColorInterval: config.randomColorInterval !== undefined ? config.randomColorInterval : baseAnimationProps?.randomColorInterval,

      v1x: config.v1x, v1y: config.v1y,
      v2x: config.v2x, v2y: config.v2y,
      v3x: config.v3x, v3y: config.v3y,
      v4x: config.v4x, v4y: config.v4y,
    }));
  });
}



  /**
   * Creates a set of concentric circles with individual animation properties.
   * @param options Configuration for the concentric circles.
   */
  export function createConcentricCircles(options: ConcentricCirclesOptions) {
    const {
      p, shapesArray, centerX, centerY,
      circleConfigs,
      ...baseAnimationProps // Base animation properties applied to all circles
    } = options;
  
    circleConfigs.forEach((config,) => {
      shapesArray.push(new Shape(p, {
        type: 'circle',
        x: centerX,
        y: centerY,
        size: config.size,
        color: config.color,
        strokeWeight: config.strokeWeight !== undefined ? config.strokeWeight : 0, // Default to no stroke
        // Merge baseAnimationProps with individual circle config animation props
        ...baseAnimationProps,
        rotationSpeed: config.rotationSpeed !== undefined ? config.rotationSpeed : baseAnimationProps.rotationSpeed,
        amplitudeX: config.amplitudeX !== undefined ? config.amplitudeX : baseAnimationProps.amplitudeX,
        amplitudeY: config.amplitudeY !== undefined ? config.amplitudeY : baseAnimationProps.amplitudeY,
        frequencyX: config.frequencyX !== undefined ? config.frequencyX : baseAnimationProps.frequencyX,
        frequencyY: config.frequencyY !== undefined ? config.frequencyY : baseAnimationProps.frequencyY,
        offsetX: config.offsetX !== undefined ? config.offsetX : baseAnimationProps.offsetX,
        offsetY: config.offsetY !== undefined ? config.offsetY : baseAnimationProps.offsetY,
        // NEW: Explicitly pass size animation properties from config, overriding baseAnimationProps
        amplitudeSize: config.amplitudeSize !== undefined ? config.amplitudeSize : baseAnimationProps.amplitudeSize,
        frequencySize: config.frequencySize !== undefined ? config.frequencySize : baseAnimationProps.frequencySize,
        offsetSize: config.offsetSize !== undefined ? config.offsetSize : baseAnimationProps.offsetSize,
        baseSize: config.baseSize !== undefined ? config.baseSize : baseAnimationProps.baseSize,
      // NEW: Stroke Weight Animation
      amplitudeStrokeWeight: config.amplitudeStrokeWeight !== undefined ? config.amplitudeStrokeWeight : baseAnimationProps.amplitudeStrokeWeight,
      frequencyStrokeWeight: config.frequencyStrokeWeight !== undefined ? config.frequencyStrokeWeight : baseAnimationProps.frequencyStrokeWeight,
      offsetStrokeWeight: config.offsetStrokeWeight !== undefined ? config.offsetStrokeWeight : baseAnimationProps.offsetStrokeWeight,
      baseStrokeWeight: config.baseStrokeWeight !== undefined ? config.baseStrokeWeight : baseAnimationProps.baseStrokeWeight, // Corrected property name

      // NEW: Color Animation (Rhythmic)
      amplitudeColorR: config.amplitudeColorR !== undefined ? config.amplitudeColorR : baseAnimationProps.amplitudeColorR,
      amplitudeColorG: config.amplitudeColorG !== undefined ? config.amplitudeColorG : baseAnimationProps.amplitudeColorG,
      amplitudeColorB: config.amplitudeColorB !== undefined ? config.amplitudeColorB : baseAnimationProps.amplitudeColorB,
      amplitudeColorA: config.amplitudeColorA !== undefined ? config.amplitudeColorA : baseAnimationProps.amplitudeColorA,
      frequencyColor: config.frequencyColor !== undefined ? config.frequencyColor : baseAnimationProps.frequencyColor,
      offsetColor: config.offsetColor !== undefined ? config.offsetColor : baseAnimationProps.offsetColor,
      // NEW: Random Color Animation
      randomizeColor: config.randomizeColor !== undefined ? config.randomizeColor : baseAnimationProps.randomizeColor,
      randomColorInterval: config.randomColorInterval !== undefined ? config.randomColorInterval : baseAnimationProps.randomColorInterval,
   
    }));
    });
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
   * Creates a set of circles, each with its own independent position and animation properties.
   * @param options Configuration for the independent circles.
   */
  export function createIndependentCircles(options: IndependentCirclesOptions) {
    const {
      p, shapesArray,
      circleConfigs,
      ...baseAnimationProps // Base animation properties applied to all circles
    } = options;
  
    circleConfigs.forEach((config,) => {
      shapesArray.push(new Shape(p, {
        type: 'circle',
        x: config.x,
        y: config.y,
        size: config.size,
        color: config.color,
        strokeWeight: config.strokeWeight !== undefined ? config.strokeWeight : 0, // Default to no stroke
        // Merge baseAnimationProps with individual circle config animation props
        ...baseAnimationProps,
        rotationSpeed: config.rotationSpeed !== undefined ? config.rotationSpeed : baseAnimationProps.rotationSpeed,
        amplitudeX: config.amplitudeX !== undefined ? config.amplitudeX : baseAnimationProps.amplitudeX,
        amplitudeY: config.amplitudeY !== undefined ? config.amplitudeY : baseAnimationProps.amplitudeY,
        frequencyX: config.frequencyX !== undefined ? config.frequencyX : baseAnimationProps.frequencyX,
        frequencyY: config.frequencyY !== undefined ? config.frequencyY : baseAnimationProps.frequencyY,
        offsetX: config.offsetX !== undefined ? config.offsetX : baseAnimationProps.offsetX,
        offsetY: config.offsetY !== undefined ? config.offsetY : baseAnimationProps.offsetY,
         // NEW: Explicitly pass size animation properties from config, overriding baseAnimationProps
         amplitudeSize: config.amplitudeSize !== undefined ? config.amplitudeSize : baseAnimationProps.amplitudeSize,
         frequencySize: config.frequencySize !== undefined ? config.frequencySize : baseAnimationProps.frequencySize,
         offsetSize: config.offsetSize !== undefined ? config.offsetSize : baseAnimationProps.offsetSize,
         baseSize: config.baseSize !== undefined ? config.baseSize : baseAnimationProps.baseSize,
       // NEW: Stroke Weight Animation
       amplitudeStrokeWeight: config.amplitudeStrokeWeight !== undefined ? config.amplitudeStrokeWeight : baseAnimationProps.amplitudeStrokeWeight,
       frequencyStrokeWeight: config.frequencyStrokeWeight !== undefined ? config.frequencyStrokeWeight : baseAnimationProps.frequencyStrokeWeight,
       offsetStrokeWeight: config.offsetStrokeWeight !== undefined ? config.offsetStrokeWeight : baseAnimationProps.offsetStrokeWeight,
       baseStrokeWeight: config.baseStrokeWeight !== undefined ? config.baseStrokeWeight : baseAnimationProps.baseStrokeWeight, // Corrected property name

       // NEW: Color Animation (Rhythmic)
       amplitudeColorR: config.amplitudeColorR !== undefined ? config.amplitudeColorR : baseAnimationProps.amplitudeColorR,
       amplitudeColorG: config.amplitudeColorG !== undefined ? config.amplitudeColorG : baseAnimationProps.amplitudeColorG,
       amplitudeColorB: config.amplitudeColorB !== undefined ? config.amplitudeColorB : baseAnimationProps.amplitudeColorB,
       amplitudeColorA: config.amplitudeColorA !== undefined ? config.amplitudeColorA : baseAnimationProps.amplitudeColorA,
       frequencyColor: config.frequencyColor !== undefined ? config.frequencyColor : baseAnimationProps.frequencyColor,
       offsetColor: config.offsetColor !== undefined ? config.offsetColor : baseAnimationProps.offsetColor,
       // NEW: Random Color Animation
       randomizeColor: config.randomizeColor !== undefined ? config.randomizeColor : baseAnimationProps.randomizeColor,
       randomColorInterval: config.randomColorInterval !== undefined ? config.randomColorInterval : baseAnimationProps.randomColorInterval,
     
    }));
    });
  }