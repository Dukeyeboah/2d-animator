import p5 from 'p5'; // Import p5 for type hinting
// src/sketches/randomCircles.ts
// This sketch draws random circles with random colors over time to form a colorful background.

export const randomCircles = (p: p5) => {
    p.setup = () => {
      // Canvas size is handled by P5Canvas.tsx
      p.background(10); // Start with a black background
      //p.noStroke(); // No stroke for the circles
    };
  
    p.draw = () => {
        p.background(50, 20)
      // Draw a semi-transparent rectangle over the entire canvas
      // This creates a fading trail effect, making older circles slowly disappear
      p.fill(10, 10, 10, 10); // Black with low alpha (more alpha means faster fade)
      p.rect(0, 0, p.width, p.height);
  
      // Generate random properties for a new circle
      const x = p.random(p.width); // Random X position
      const y = p.random(p.height); // Random Y position
      const size = p.random(10, 30); // Random size between 10 and 100
      
      // Random color with some transparency
      const r = p.random(255);
      const g = p.random(255);
      const b = p.random(255);
      const alpha = p.random(50, 150); // Random transparency between 50 and 150
  
      // Set fill color for the new circle
      p.fill(r, g, b, alpha);
  
      // Draw the circle
      p.ellipse(x, y, size, size);
      p.noStroke()
    };
  
    p.windowResized = () => {
      // No specific logic needed here as circles are drawn randomly based on current canvas size.
    };
  };
  