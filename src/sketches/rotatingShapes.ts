import p5 from 'p5'; // Import p5 for type hinting
export const rotatingShapesSketch = (p: p5) => {
  let angle = 0;

  p.setup = () => {
    // REMOVE: const canvas = p.createCanvas(800, 600);
    // P5Canvas component already handles canvas creation and parenting.
    // Let P5Canvas handle the parent assignment
    p.background(240);
  };

  p.draw = () => {
    p.background(240);

    // Draw rotating shapes
    p.push();
    p.translate(p.width / 2, p.height / 2);
    p.rotate(angle);

    p.fill(255, 100, 100);
    p.rect(-25, -25, 50, 50);

    p.rotate(p.PI / 4);
    p.fill(100, 255, 100);
    p.ellipse(0, 0, 40, 40);

    p.pop();

    angle += 0.02;
  };
};
