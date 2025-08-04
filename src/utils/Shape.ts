import p5 from 'p5'; // Import p5 for type hinting
// src/utils/Shape.ts
// This file defines the blueprint for our customizable shapes.

// Define an interface for the properties passed to the Shape constructor
interface ShapeProps {
  type?:
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
  image?: p5.Image; // p5.Image type
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
  amplitudeSize?: number; // Optional. How much the size of the shape fluctuates during animation.
  frequencySize?: number; // Optional. How fast the size fluctuation happens.
  offsetSize?: number; // Optional. A starting point (phase offset) for the size fluctuation.
  amplitudeStrokeWeight?: number; // Optional. How much the stroke weight fluctuates.
  frequencyStrokeWeight?: number; // Optional. How fast the stroke weight fluctuation happens.
  offsetStrokeWeight?: number; // Optional. A starting point (phase offset) for the stroke weight fluctuation.

  baseStrokeWeight?: number;
  amplitudeColorR?: number; // Optional. How much the Red (or Hue) component of the color fluctuates.
  amplitudeColorG?: number; // Optional. How much the Green (or Saturation) component fluctuates.
  amplitudeColorB?: number; // Optional. How much the Blue (or Brightness) component fluctuates.
  amplitudeColorA?: number; // Optional. How much the Alpha (transparency) component fluctuates.
  frequencyColor?: number; // Optional. How fast the color fluctuation happens.
  offsetColor?: number; // Optional. A starting point (phase offset) for the color fluctuation.

  randomizeColor?: boolean; // Optional. If true, the color will change randomly instead of rhythmically.
  randomColorInterval?: number; // Optional. How often (in frames) the random color should change.

  // Vertex coordinates for complex shapes (lines, triangles, quads).
  // These are relative to the shape's main (x, y) position.
  v1x?: number;
  v1y?: number;
  v2x?: number;
  v2y?: number;
  v3x?: number;
  v3y?: number;
  v4x?: number;
  v4y?: number;
}

export class Shape {
  p: p5; // The p5.js instance
  type: string; // 'circle', 'ellipse', 'rect', 'square', 'line', 'triangle', 'quad', 'point'
  x: number;
  y: number;
  width?: number; // For rect, ellipse, quad
  height?: number; // For rect, ellipse, quad
  baseWidth?: number; // NEW: Store original width for animation reference
  baseHeight?: number; // NEW: Store original height for animation reference
  size: number; // For circle, square, point (diameter/side length)
  baseSize: number; // The original, non-animated size for circle/square/point
  image?: p5.Image; // Add property for p5.Image (for type: 'image')
  // Color properties
  color: number[]; // [R, G, B, A] or [H, S, B, A] for fill - this will be the *current* animated color
  baseColor: number[]; // The original, non-animated color
  strokeColor: number[]; // [R, G, B, A] or [H, S, B, A] for stroke - this will be the *current* animated stroke color
  baseStrokeColor: number[]; // The original, non-animated stroke color
  // Stroke Weight properties
  strokeWeight: number; // The current animated stroke weight
  baseStrokeWeight: number; // The original, non-animated stroke weight
  rotation: number; // The shape's current rotation angle. In radians
  // Specific parameters for complex shapes (vertices relative to this.x, this.y)
  // These will define the shape's form, assuming (this.x, this.y) is its anchor point.
  v1x: number;
  v1y: number; // Vertex 1
  v2x: number;
  v2y: number; // Vertex 2
  v3x: number;
  v3y: number; // Vertex 3 (for triangle, quad)
  v4x: number;
  v4y: number; // Vertex 4 (for quad)

  // Animation properties
  rotationSpeed: number; // How fast this shape rotates (radians per frame)
  amplitudeX: number; // For sine wave motion in X. Max horizontal movement from its `initialX`.
  amplitudeY: number; // For sine wave motion in Y. Max vertical movement from its `initialY`.
  frequencyX: number; // For sine wave motion in X. Speed of horizontal oscillation.
  frequencyY: number; // For sine wave motion in Y. Speed of vertical oscillation.
  offsetX: number; // Initial X offset for horizontalsine wave motion
  offsetY: number; // Initial Y offset for vertical sine wave motion

  // Store initial position for animation reset or relative movement
  initialX: number; // The shape's starting X-coordinate (used as the center for oscillations).
  initialY: number; // The shape's starting Y-coordinate.
  // NEW: Properties for size animation

  amplitudeSize: number; // How much the size fluctuate. Max size change from `baseSize`.s
  frequencySize: number; // How fast the size fluctuates. Speed of size oscillation.
  offsetSize: number; // Phase offset for the size fluctuation. Used to control when the size starts changing.

  // NEW: Properties for stroke weight animation
  amplitudeStrokeWeight: number; // How much the stroke weight fluctuates. Max stroke weight change from `baseStrokeWeight`.
  frequencyStrokeWeight: number; // How fast the stroke weight fluctuates. Speed of stroke weight oscillation.
  offsetStrokeWeight: number; // Phase offset for stroke weight fluctuation

  // NEW: Properties for color animation (rhythmic)
  amplitudeColorR: number; // Amplitude for Red channel
  amplitudeColorG: number; // Amplitude for Green channel
  amplitudeColorB: number; // Amplitude for Blue channel
  amplitudeColorA: number; // Amplitude for Alpha channel
  frequencyColor: number; // How fast the color fluctuates (common for all channels)
  offsetColor: number; // Phase offset for color fluctuation (common for all channels)

  // NEW: Properties for random color animation
  randomizeColor: boolean; // If true, color will randomly change
  randomColorInterval: number; // How often to change color (in frames)
  private lastRandomColorChangeFrame: number; // Internal: tracks last frame of random color change

  // NEW: Internal time tracking for consistent animation across different frame rates
  private elapsedTime: number;

  constructor(p: p5, props: ShapeProps) {
    this.p = p;
    this.type = props.type || 'circle';
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.initialX = this.x; // Store initial position
    this.initialY = this.y; // Store initial position

    this.width = props.width;
    this.height = props.height;
    this.baseWidth = props.width !== undefined ? props.width : 50; // Default base width
    this.baseHeight = props.height !== undefined ? props.height : 50; // Default base height

    // this.size = props.size;
    // this.baseSize = props.baseSize !== undefined ? props.baseSize : this.size; // Use props.baseSize if provided, else use the calculated size

    // FIX: Ensure 'size' is always a number, using 'props.size' or a default of 50
    this.size = props.size !== undefined ? props.size : 50;
    // FIX: Ensure 'baseSize' is always a number, using 'props.baseSize' or the now-guaranteed 'this.size'
    this.baseSize = props.baseSize !== undefined ? props.baseSize : this.size;

    this.image = props.image; // Store the p5.Image object
    this.color = props.color || [255, 255, 255];
    this.baseColor = [...this.color]; // Copy initial color to baseColor

    this.strokeColor = props.strokeColor || [0, 0, 0];
    this.baseStrokeColor = [...this.strokeColor]; // Copy initial stroke color to baseStrokeColor

    this.strokeWeight =
      props.strokeWeight !== undefined ? props.strokeWeight : 1;
    this.baseStrokeWeight =
      props.baseStrokeWeight !== undefined
        ? props.baseStrokeWeight
        : this.strokeWeight;

    this.rotation = props.rotation || 0;

    // Animation properties defaults
    this.rotationSpeed = props.rotationSpeed || 0; // Default no rotation
    this.amplitudeX = props.amplitudeX || 0;
    this.amplitudeY = props.amplitudeY || 0;
    this.frequencyX = props.frequencyX || 0;
    this.frequencyY = props.frequencyY || 0;
    this.offsetX = props.offsetX || 0; // Used as phase offset for sine waves
    this.offsetY = props.offsetY || 0; // Used as phase offset for sine waves

    // NEW: Size animation properties defaults
    this.amplitudeSize = props.amplitudeSize || 0;
    this.frequencySize = props.frequencySize || 0;
    this.offsetSize = props.offsetSize || 0;

    // Assign specific vertex coordinates for line, triangle, quad
    // These are now explicitly named v1x, v1y etc. to avoid confusion with x,y
    // And they are relative to the shape's (this.x, this.y) anchor
    this.v1x = props.v1x !== undefined ? props.v1x : 0;
    this.v1y = props.v1y !== undefined ? props.v1y : 0;
    this.v2x = props.v2x !== undefined ? props.v2x : 0;
    this.v2y = props.v2y !== undefined ? props.v2y : 0;
    this.v3x = props.v3x !== undefined ? props.v3x : 0;
    this.v3y = props.v3y !== undefined ? props.v3y : 0;
    this.v4x = props.v4x !== undefined ? props.v4x : 0;
    this.v4y = props.v4y !== undefined ? props.v4y : 0;

    // NEW: Stroke weight animation properties defaults
    this.amplitudeStrokeWeight = props.amplitudeStrokeWeight || 0;
    this.frequencyStrokeWeight = props.frequencyStrokeWeight || 0;
    this.offsetStrokeWeight = props.offsetStrokeWeight || 0;

    // NEW: Color animation properties defaults (rhythmic)
    this.amplitudeColorR = props.amplitudeColorR || 0;
    this.amplitudeColorG = props.amplitudeColorG || 0;
    this.amplitudeColorB = props.amplitudeColorB || 0;
    this.amplitudeColorA = props.amplitudeColorA || 0;
    this.frequencyColor = props.frequencyColor || 0;
    this.offsetColor = props.offsetColor || 0;

    // NEW: Random color animation properties defaults
    this.randomizeColor = props.randomizeColor || false;
    this.randomColorInterval = props.randomColorInterval || 60; // Default to change every 60 frames (1 second at 60fps)
    this.lastRandomColorChangeFrame = 0;

    this.elapsedTime = 0; // Initialize elapsed time for this shape (in milliseconds)
  }

  // --- Animation Update Method ---
  update() {
    // The 'update' method is like giving the toy its movement and appearance instructions for the CURRENT moment.
    // It's called repeatedly (typically once per frame in P5.js's draw loop) to calculate the shape's new state.

    //update(deltaTime: number) {
    // Accumulate elapsed time (deltaTime is in milliseconds)
    // this.elapsedTime += deltaTime*45;

    // Convert elapsedTime to seconds for frequency calculations
    // This makes animation speed independent of frame rate
    //const timeInSeconds = this.elapsedTime / 1000;
    this.rotation += this.rotationSpeed; // // Rotation animation
    // Rotation animation using deltaTime: rotationSpeed is now in radians per second
    //this.rotation += this.rotationSpeed * (deltaTime / 1000);

    // Sine wave motion animation for X and Y (if amplitude is set). // This creates a smooth, oscillating (back-and-forth) movement.
    if (this.amplitudeX > 0) {
      this.x =
        this.initialX +
        this.p.sin(this.p.frameCount * this.frequencyX + this.offsetX) *
          this.amplitudeX;
    }
    if (this.amplitudeY > 0) {
      this.y =
        this.initialY +
        this.p.sin(this.p.frameCount * this.frequencyY + this.offsetY) *
          this.amplitudeY;
    }
    // NEW: Sine wave motion animation for Size // This makes the shape grow and shrink rhythmically.
    if (this.amplitudeSize > 0) {
      const sizeOffset =
        this.p.sin(this.p.frameCount * this.frequencySize + this.offsetSize) *
        this.amplitudeSize;
      if (
        this.type === 'circle' ||
        this.type === 'square' ||
        this.type === 'point'
      ) {
        this.size = this.baseSize + sizeOffset; // Apply offset to base size for circles/squares.
        this.size = this.p.max(1, this.size); // Ensure size doesn't go below 1 (to avoid errors or invisible shapes).
      } else if (this.type === 'ellipse' || this.type === 'rect') {
        // Apply size animation to both width and height for ellipses/rectangles.
        // `(this.baseWidth || 50)`: Uses `baseWidth` if it exists, otherwise defaults to 50. This handles cases where `baseWidth` might be undefined.
        this.width = (this.baseWidth || 50) + sizeOffset;
        this.height = (this.baseHeight || 50) + sizeOffset;
        this.width = this.p.max(1, this.width); // Ensure width/height don't go below 1.
        this.height = this.p.max(1, this.height);
      }
    } else {
      // If no size animation (amplitudeSize is 0), revert to base size
      // If no size animation, revert to base size/dimensions
      if (
        this.type === 'circle' ||
        this.type === 'square' ||
        this.type === 'point'
      ) {
        this.size = this.baseSize;
      } else if (this.type === 'ellipse' || this.type === 'rect') {
        this.width = this.baseWidth;
        this.height = this.baseHeight;
      }
    }
    // Sine wave motion animation for strokeweight (if amplitude is set)
    // Makes the outline thickness fluctuate rhythmically.
    if (this.amplitudeStrokeWeight > 0) {
      const strokeWeightOffset =
        this.p.sin(
          this.p.frameCount * this.frequencyStrokeWeight +
            this.offsetStrokeWeight
        ) * this.amplitudeStrokeWeight;
      this.strokeWeight = this.baseStrokeWeight + strokeWeightOffset;
      this.strokeWeight = this.p.max(0, this.strokeWeight); // Ensure stroke weight is not negative
    } else {
      this.strokeWeight = this.baseStrokeWeight; // Revert to base stroke weight if animation is off
    }

    // NEW: Update/Animate color (either rhythmic or random)
    if (this.randomizeColor) {
      if (
        this.p.frameCount % this.randomColorInterval === 0 && // Check if it's time to change color (e.g., every 60 frames).
        this.p.frameCount !== this.lastRandomColorChangeFrame // Prevent changing color multiple times on the same frame.
      ) {
        // Generate new random color components (0-255)
        // Generate RGB color values
        this.color = [
          this.p.random(255),
          this.p.random(255),
          this.p.random(255),
          this.p.random(50, 255), //Random Alpha (transparency) value (between 50 and 255).
        ];
        this.lastRandomColorChangeFrame = this.p.frameCount; // Record the frame this change happened.
      }
    } else if (
      // If not random, check for rhythmic color animation.
      this.frequencyColor > 0 ||
      this.amplitudeColorR > 0 ||
      this.amplitudeColorG > 0 ||
      this.amplitudeColorB > 0 ||
      this.amplitudeColorA > 0
    ) {
      // Rhythmic color animation: makes colors pulse or shift smoothly.
      const colorTime =
        this.p.frameCount * this.frequencyColor + this.offsetColor; // Calculate the 'time' for the color wave.
      // Use RGB color animation // Apply sine wave to each color component (R, G, B, A).
      // `p.constrain`: Ensures the color values stay within the valid range (0-255 for RGB, 0-360 for Hues, etc.).
      // `p.PI / 3` and `(2 * p.PI) / 3` are phase offsets to make the R, G, B channels animate slightly out of sync, creating interesting color shifts.
      this.color[0] = this.p.constrain(
        this.baseColor[0] + this.p.sin(colorTime) * this.amplitudeColorR,
        0,
        255
      );
      this.color[1] = this.p.constrain(
        this.baseColor[1] +
          this.p.sin(colorTime + this.p.PI / 3) * this.amplitudeColorG,
        0,
        255
      );
      this.color[2] = this.p.constrain(
        this.baseColor[2] +
          this.p.sin(colorTime + (2 * this.p.PI) / 3) * this.amplitudeColorB,
        0,
        255
      );
      this.color[3] = this.p.constrain(
        this.baseColor[3] + this.p.sin(colorTime) * this.amplitudeColorA,
        0,
        255
      );
    } else {
      // If no color animation, revert to base color
      this.color = [...this.baseColor]; // Ensure a new array is assigned to avoid mutation issues
    }
  }

  display() {
    // The 'display' method is like giving the toy its final instructions for how to DRAW itself right NOW.
    // It uses the P5.js drawing tools to put the shape on the canvas based on its current animated properties.

    const p = this.p; //shortcut to access the p5.js instance

    p.push(); // Save the current drawing style and transformation matrix
    // 'p.push()' is like taking a snapshot of the current drawing settings (like color, stroke, rotation, translation).
    // It's like saying, "Remember how everything is set up right now, because I'm about to change things just for this one toy."

    // Apply translation and rotation for the current shape
    // Translate to the shape's anchor point (this.x, this.y)
    // These transformations affect everything drawn *after* them until 'p.pop()'.
    p.translate(this.x, this.y); // Moves the origin (0,0) of the drawing canvas to the shape's current (x,y) position.
    // Now, when we draw the shape at (0,0) relative to this new origin, it will appear at (this.x, this.y) on the actual canvas.
    p.rotate(this.rotation); // Apply rotation around this translated point // Rotates the drawing space around the new origin (which is now at this.x, this.y).

    // Set fill and stroke properties
    if (this.color && this.type !== 'image') {
      // If the shape has a color and is not an image (images handle their own color).
      p.fill(this.color[0], this.color[1], this.color[2], this.color[3] || 255);
    } else {
      p.noFill(); // If no color or it's an image, don't fill the shape.
    }

    if (this.strokeWeight > 0 && this.type !== 'image') {
      // If stroke weight is positive and not an image.
      p.stroke(
        this.strokeColor[0],
        this.strokeColor[1],
        this.strokeColor[2],
        this.strokeColor[3] || 255
      );
      p.strokeWeight(this.strokeWeight); // Set the stroke thickness.
    } else {
      p.noStroke(); // If no stroke weight or it's an image, don't draw an outline.
    }

    // Draw the shape based on its type
    switch (this.type) {
      case 'image':
        if (this.image) {
          // Center the image at (0,0) after translation
          p.imageMode(p.CENTER);
          p.image(this.image, 0, 0, this.width || 100, this.height || 100);
          p.imageMode(p.CORNER); // Reset to default
        }
        break;
      case 'circle':
        p.ellipse(0, 0, this.size || 50, this.size || 50);
        break;
      case 'ellipse':
        p.ellipse(0, 0, this.width || 50, this.height || 50);
        break;
      case 'rect':
        p.rectMode(p.CENTER); // Tells P5.js to draw rectangles with their center at (x,y).
        p.rect(0, 0, this.width || 50, this.height || 50);
        p.rectMode(p.CORNER); // Resets rectangle drawing mode to default (top-left corner at x,y).
        break;
      case 'square':
        p.rectMode(p.CENTER);
        p.rect(0, 0, this.size || 50, this.size || 50);
        p.rectMode(p.CORNER);
        break;
      case 'line':
        // Line coordinates are relative to (this.x, this.y)
        // So, if this.x, this.y is (100,100) and v1x,v1y is (0,0), the line starts at (100,100) on canvas.
        // Since `p.translate(this.x, this.y)` was called, these (v1x, v1y) are offsets from the shape's main (x,y).
        p.line(this.v1x, this.v1y, this.v2x, this.v2y);
        break;
      case 'triangle':
        // Triangle vertices are relative to (this.x, this.y)
        p.triangle(this.v1x, this.v1y, this.v2x, this.v2y, this.v3x, this.v3y);
        break;
      case 'quad':
        // Draws a quadrilateral (4-sided polygon) using four relative vertex coordinates.
        // Quad vertices are relative to (this.x, this.y)
        p.quad(
          this.v1x,
          this.v1y,
          this.v2x,
          this.v2y,
          this.v3x,
          this.v3y,
          this.v4x,
          this.v4y
        );
        break;
      case 'point':
        p.point(0, 0);
        break;
      default:
        console.warn(`Unknown shape type: ${this.type}`);
        break;
    }

    p.pop(); // Restore the previous drawing style and transformation matrix
    // 'p.pop()' is like restoring the drawing settings to the snapshot taken by 'p.push()'.
    // It's like saying, "Okay, I'm done drawing this toy. Put all the drawing tools back to how they were before I started, so the next toy can be drawn without being affected by my changes."
  }
}
