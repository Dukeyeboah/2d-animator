import p5 from 'p5'; // Import p5 for type hinting

// This sketch creates a simple ball that bounces off the canvas edges.

export const reflectingBall = (p: p5) => {
  // Renamed from bouncingBallSketch to reflectingBall
  let x: number;
  let y: number;
  let xSpeed: number;
  let ySpeed: number;
  let ballSize: number;
  let ballColor: number[]; // [R, G, B]
  // let bounceSound: any; // For a simple sound effect (commented out as p5.sound is not integrated)

  // p.preload = () => {
  //   // Optionally load a sound effect for bouncing
  //   // p.loadSound is not available directly in p5 instance without p5.sound library
  //   // For simplicity, we'll skip sound for now or use a placeholder if needed.
  //   // If you add p5.sound, you would do: bounceSound = p.loadSound('path/to/bounce.mp3');
  // };

  p.setup = () => {
    // Create the canvas. Its size will be set by P5Canvas.tsx
    p.background(200); // Dark grey background
    //p.noStroke(); // No outline for the ball

    // Initialize ball properties
    ballSize = 40;
    x = p.width / 2; // Start in the middle of the canvas
    y = p.height / 2;
    xSpeed = p.random(-5, 5); // Initial horizontal speed
    ySpeed = p.random(-3, 3); // Initial vertical speed
    ballColor = [255, 100, 100]; // Reddish color
  };

  p.draw = () => {
    p.background(200, 4); // Semi-transparent background for a slight trail effect

    // Update ball position
    x += xSpeed;
    y += ySpeed;

    // Check for collisions with horizontal walls (left/right)
    if (x + ballSize / 2 > p.width || x - ballSize / 2 < 0) {
      xSpeed *= -1; // Reverse horizontal direction
      // Optionally play sound if loaded
      // if (bounceSound) bounceSound.play();
    }

    // Check for collisions with vertical walls (top/bottom)
    if (y + ballSize / 2 > p.height || y - ballSize / 2 < 0) {
      ySpeed *= -1; // Reverse vertical direction
      // Optionally play sound if loaded
      // if (bounceSound) bounceSound.play();
    }

    // Draw the ball
    p.fill(ballColor[0], ballColor[1], ballColor[2]);
    p.ellipse(x, y, ballSize, ballSize);
  };

  p.windowResized = () => {
    // The canvas resizing is handled by the P5Canvas component,
    // but if the ball's position needs to be adjusted relative to new dimensions,
    // you would do it here. For a bouncing ball, it adapts automatically.
  };
};
