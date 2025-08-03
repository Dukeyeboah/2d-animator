import p5 from 'p5'; // Import p5 for type hinting

export const mouseTrailSketch = (p: p5) => {
  p.setup = () => {
    // REMOVE: const canvas = p.createCanvas(800, 600);
    // P5Canvas component already handles canvas creation and parenting.
    // Let P5Canvas handle the parent assignment
    p.background(50);
  };

  p.draw = () => {
    p.background(50, 10); // Fade effect

    // Draw trail at mouse position
    p.fill(100, 200, 255);
    p.noStroke();
    p.ellipse(p.mouseX, p.mouseY, 20, 20);
  };
};
