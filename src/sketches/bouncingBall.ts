import p5 from 'p5'; // Import p5 for type hinting

//SPIRAL
export const bouncingBallSketch = (p: p5) => {
  // Variables for the spiral motion
  let angle = 0; // Current angle in the spiral (radians)
  let radius = 0; // Current radius from the center of the spiral

  // Center of the canvas (where the spiral originates)
  let centerX: number;
  let centerY: number;

  const ballSize = 30; // Define ball size for easier boundary checks

  p.setup = () => {
    // Initialize center coordinates based on the canvas size
    centerX = p.width / 2;
    centerY = p.height / 2;

    // Start radius from a small value to begin the spiral
    radius = 1;

    p.background(10); // Sets a gray background for the initial frame
  };

  p.draw = () => {
    //p.background(110); // IMPORTANT: Clear the background on each frame
    // If you want a "fade" effect, use p.background(110, 10); (alpha value)

    // To get the trail effect, use p.background() with an alpha value.
    // The lower the alpha, the longer the trail.
    // p.background(color, alpha)
    // For example, a very light gray with a low alpha (e.g., 10 or 20) will give a nice trail.
    p.background(10, 2); // Use the same gray background, but with 20 alpha (out of 255)

    // 2. Update the spiral motion parameters
    angle += 0.2; // Increment the angle to make the ball move in a circle
    // (0.05 radians per frame, adjust for faster/slower rotation)

    radius += 0.4 * Math.sin(0.5);

    // 3. Calculate the ball's new position based on spiral motion
    // p.cos(angle) and p.sin(angle) give us points on a unit circle.
    // Multiplying by 'radius' scales it to our desired distance from the center.
    // Adding centerX/Y shifts the origin to the center of the canvas.
    const currentX = centerX + radius * p.cos(0.6 * angle);
    const currentY = centerY + radius * p.sin(0.6 * angle);

    // Check horizontal boundaries (left and right walls)
    if (currentX + ballSize / 2 > p.width || currentX - ballSize / 2 < 0) {
      // Reverse the radius expansion/contraction direction
      // Optional: Slightly adjust radius to prevent sticking to the edge
      // This helps if the ball overshoots the boundary significantly.
      radius += radius * 2;
      p.fill(130, 210 * Math.random(), 5); // Red color
      // We calculate a new radius that would place the ball just inside the boundary.
      if (currentX + ballSize / 2 > p.width) {
        radius = (p.width - ballSize / 2 - centerX) / p.cos(angle);
      } else if (currentX - ballSize / 2 < 0) {
        radius = (0 + ballSize / 2 - centerX) / p.cos(angle);
      }
    }

    // Check vertical boundaries (top and bottom walls)
    if (currentY + ballSize / 2 > p.height || currentY - ballSize / 2 < 0) {
      // Reverse the radius expansion/contraction direction
      // Optional: Slightly adjust radius to prevent sticking to the edge
      radius += radius * 2;
      p.fill(210 * Math.random(), 240, 5); // Red color

      if (currentY + ballSize / 2 > p.height) {
        radius =
          (p.height - ballSize / 2 - centerY) /
          p.sin(3 * angle * Math.random());
      } else if (currentY - ballSize / 2 < 0) {
        radius =
          (0 + ballSize / 2 - centerY) / p.sin(2 * angle * Math.random());
      }
    }

    p.fill(5, 240, 210); // Red color
    // p.fill(220*Math.random(), 240*Math.random(), 210*Math.random()); // Red color
    //p.noStroke(); // No border for the ellipse
    // p.ellipse(x, y, ballSize, ballSize); // Draw the ball
    p.ellipse(currentX, currentY, ballSize, ballSize); // Draw the ball
  };
};

// // MULTI-BALL SPIRAL
// // sketches/bouncingBallSketch.ts
// import { M_PLUS_1 } from "next/font/google"; // This import is not used here, can be removed.

// export const bouncingBallSketch = (p: any) => {
//   // Define a type for our spiral ball objects for better type safety and organization
//   type SpiralBall = {
//     angle: number;       // Current angular position for this ball (radians)
//     radius: number;      // Current distance from its center for this ball
//     radiusSpeed: number; // How fast this ball's radius expands/contracts
//     centerX: number;     // X-coordinate of this ball's spiral center
//     centerY: number;     // Y-coordinate of this ball's spiral center
//     ballSize: number;    // Diameter of this ball
//     color: number[];     // RGB color array for this ball [R, G, B]
//     direction: 1 | -1;   // 1 for clockwise, -1 for counter-clockwise rotation
//   };

//   let spiralBalls: SpiralBall[] = []; // Array to hold all our individual spiral ball objects

//   p.setup = () => {
//     // Initialize the background for the entire canvas
//     p.background(250); // Sets a light gray background for the initial frame

//     // --- Define and Add Each Spiral Ball to the Array ---

//    // Ball 1: Original (now slowed down), centered
//     spiralBalls.push({
//       angle: 0,             // Start at 0 radians
//       radius: 0.5,            // Start with a very small radius
//       radiusSpeed: 0.5,     // SLOW DOWN: Smaller value for slower expansion/contraction
//       centerX: p.width / 2, // Center of the canvas horizontally
//       centerY: p.height / 4, // Center of the canvas vertically
//       ballSize: 40,
//       color: [255, 10, 0],   // Red color
//       direction: 1,         // Clockwise rotation
//     });

//     spiralBalls.push({
//       angle: 0,             // Start at 0 radians
//       radius: 0.5,            // Start with a very small radius
//       radiusSpeed: 0.5,     // SLOW DOWN: Smaller value for slower expansion/contraction
//       centerX: p.width / 2, // Center of the canvas horizontally
//       centerY: p.height * 0.75, // Center of the canvas vertically
//       ballSize: 40,
//       color: [215, 210, 0],   // Red color
//       direction: -1,         // Clockwise rotation
//     });

//     // Ball 2: Starts at 3/4 width, clockwise, blue color
//     spiralBalls.push({
//       angle: p.PI / 4,      // Start at a different initial angle for visual offset
//       radius: 0.5,
//       radiusSpeed: 0.5,     // SLOW DOWN: Same speed as ball 1
//       centerX: p.width * 3 / 4, // Starts at 3/4 of the canvas width
//       centerY: p.height / 2,
//       ballSize: 30,
//       color: [0, 0, 255],   // Blue color
//       direction: 1,         // Clockwise rotation
//     });

//     // Ball 3: Starts at 1/4 width, counter-clockwise, green color
//     spiralBalls.push({
//       angle: p.PI / 4,      // Start at yet another initial angle
//       radius: 0.5,
//       radiusSpeed: 0.5,     // SLOW DOWN: Same speed as others
//       centerX: p.width * 1 / 4, // Starts at 1/4 of the canvas width
//       centerY: p.height / 2,
//       ballSize: 30,
//       color: [0, 200, 0],   // Green color
//       direction: -1,        // COUNTER-CLOCKWISE: Negative direction for angle increment
//     });
//   };

//   p.draw = () => {
//     // Clear the background with a low alpha for the trail effect.
//     // This applies to the entire canvas, creating a unified fade for all balls.
//     p.background(230, 5); // Light gray background, very transparent for a long trail

//     // --- Loop through each spiral ball and update its state ---
//     spiralBalls.forEach(ball => {
//       // 1. Update the spiral motion parameters for the current 'ball'
//       // Multiply angle increment by 'ball.direction' (1 or -1) for clockwise/counter-clockwise
//       // SLOW DOWN: Adjust this value to control rotational speed. Smaller value = slower rotation.
//       ball.angle += 0.01 * ball.direction; // Changed from 0.2 to 0.01 for very slow rotation

//       // Update the radius based on its speed
//       ball.radius += ball.radiusSpeed*Math.sin(0.5);

//       // 2. Calculate the ball's new position based on spiral motion (Polar to Cartesian)
//       // Math: x = center_x + radius * cos(angle)
//       //       y = center_y + radius * sin(angle)
//       let currentX = ball.centerX + ball.radius * p.cos(ball.angle);
//       let currentY = ball.centerY + ball.radius * p.sin(ball.angle);

//       // 3. Implement the "bounce off walls" logic for the spiral
//       // We check if the ball's edge is outside the canvas boundaries.
//       // If it is, we reverse its 'radiusSpeed' to make the spiral contract/expand.

//       let bouncedThisFrame = false; // Flag to prevent double-bouncing if hitting a corner

//       // Check horizontal boundaries (left and right walls)
//       if (currentX + ball.ballSize / 2 > p.width || currentX - ball.ballSize / 2 < 0) {
//         ball.radiusSpeed *= -1; // Reverse the radius expansion/contraction direction
//         bouncedThisFrame = true;

//         // Optional: Recalculate radius to snap the ball exactly to the boundary.
//         // This makes the bounce more precise, preventing slight overshoots.
//         if (currentX + ball.ballSize / 2 > p.width) {
//           // If hit right wall, calculate radius to place ball at right edge
//           // Ensure p.cos(ball.angle) is not zero to avoid division by zero
//           if (p.abs(p.cos(ball.angle)) > 0.001) { // Check for near-zero to avoid issues
//             ball.radius = (p.width - ball.ballSize / 2 - ball.centerX) / p.cos(ball.angle);
//           }
//         } else if (currentX - ball.ballSize / 2 < 0) {
//           // If hit left wall, calculate radius to place ball at left edge
//           if (p.abs(p.cos(ball.angle)) > 0.001) {
//             ball.radius = (0 + ball.ballSize / 2 - ball.centerX) / p.cos(ball.angle);
//           }
//         }
//       }

//       // Check vertical boundaries (top and bottom walls)
//       // Only check vertical bounce if a horizontal bounce didn't already occur this frame
//       // (to prevent reversing radiusSpeed twice if hitting a corner)
//       if (!bouncedThisFrame && (currentY + ball.ballSize / 2 > p.height || currentY - ball.ballSize / 2 < 0)) {
//         ball.radiusSpeed *= -1; // Reverse the radius expansion/contraction direction

//         // Optional: Recalculate radius to snap the ball exactly to the boundary.
//         if (currentY + ball.ballSize / 2 > p.height) {
//           // If hit bottom wall, calculate radius to place ball at bottom edge
//           if (p.abs(p.sin(ball.angle)) > 0.001) {
//             ball.radius = (p.height - ball.ballSize / 2 - ball.centerY) / p.sin(ball.angle);
//           }
//         } else if (currentY - ball.ballSize / 2 < 0) {
//           // If hit top wall, calculate radius to place ball at top edge
//           if (p.abs(p.sin(ball.angle)) > 0.001) {
//             ball.radius = (0 + ball.ballSize / 2 - ball.centerY) / p.sin(ball.angle);
//           }
//         }
//       }

//       // 4. Draw the ball at its new calculated position
//       p.fill(ball.color[0], ball.color[1], ball.color[2]); // Set the ball's specific color
//       //p.noStroke(); // No border for the ellipse
//       p.ellipse(currentX, currentY, ball.ballSize, ball.ballSize); // Draw the ball
//     });
//   };
// };
