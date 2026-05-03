'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('nexusCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const config = {
    particleCount: 120,              // 🔥 balanced
    connectionDistance: 110,        // 🔥 optimized
    particleSpeed: 0.4,
    attractionRadius: 140,
    attractionForce: 0.08
  };

  const mouse = { x: null, y: null };

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * config.particleSpeed;
      this.vy = (Math.random() - 0.5) * config.particleSpeed;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // bounce
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // 🔥 DIRECT ATTRACTION (FAST RESPONSE)
      if (mouse.x !== null) {
  const dx = this.x - mouse.x;
  const dy = this.y - mouse.y;
  const distSq = dx * dx + dy * dy;

  const radius = config.attractionRadius;

  if (distSq < radius * radius && distSq > 0.0001) {
    const dist = Math.sqrt(distSq);

    // 🔥 REPULSION (instant push)
    const force = (1 - dist / radius);

    this.vx += (dx / dist) * force * 0.6;
    this.vy += (dy / dist) * force * 0.6;

    // 🔥 SMALL RANDOM CHAOS (alive feel)
    this.vx += (Math.random() - 0.5) * 0.05;
    this.vy += (Math.random() - 0.5) * 0.05;
  }
}
// 🔥 friction (prevents runaway speed)
this.vx *= 0.95;
this.vy *= 0.95;
    }

    draw() {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(34, 211, 238, 0.8)';
      ctx.arc(this.x, this.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particles = Array.from(
    { length: config.particleCount },
    () => new Particle()
  );

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {

        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < config.connectionDistance * config.connectionDistance) {
          const opacity = 1 - distSq / (config.connectionDistance ** 2);

          ctx.beginPath();
          ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.fillStyle = 'rgba(5,5,5,0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawLines();

    requestAnimationFrame(animate);
  }

  animate();

  console.log("🔥 SMOOTH NEXUS RUNNING");
});