import p5 from 'p5';

export const waveAnimationSketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(800, 600);
    p.background(0);
  };

  p.draw = () => {
    p.background(0, 10);
    p.stroke(255);
    p.noFill();

    // Draw multiple sine waves
    for (let x = 0; x < p.width; x += 5) {
      const y = p.height / 2 + p.sin(x * 0.01 + p.frameCount * 0.02) * 50;
      p.point(x, y);
    }

    // Draw cosine waves
    for (let x = 0; x < p.width; x += 5) {
      const y = p.height / 2 + p.cos(x * 0.015 + p.frameCount * 0.03) * 30;
      p.point(x, y);
    }
  };
};
