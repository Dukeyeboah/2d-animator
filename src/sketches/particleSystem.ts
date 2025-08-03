import p5 from 'p5'; // Import p5 for type hinting

export const particleSystemSketch = (p: p5) => {
  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
  }> = [];

  p.setup = () => {
    p.createCanvas(800, 600);
    p.background(0);
  };

  p.draw = () => {
    p.background(0, 10);

    // Add new particles
    if (p.frameCount % 5 === 0) {
      particles.push({
        x: p.mouseX,
        y: p.mouseY,
        vx: p.random(-2, 2),
        vy: p.random(-2, 2),
        life: 255,
        maxLife: 255,
      });
    }

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 2;

      if (particle.life <= 0) {
        particles.splice(i, 1);
      } else {
        p.fill(255, particle.life);
        p.noStroke();
        p.ellipse(particle.x, particle.y, 4);
      }
    }
  };
};
