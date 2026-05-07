/**
 * nexus-background.js — Continuous particle nexus background
 *
 * Fixes applied:
 *  - Runs continuously via requestAnimationFrame (not just on load)
 *  - Smooth cursor reactivity with proper repulsion physics
 *  - Optimized particle count (80) for 60fps on mid-range GPUs
 *  - Uses clearRect for clean frame rendering
 *  - Enhanced particle glow and connection colors
 *  - Efficient distance checks without spatial grid overhead
 *  - No DOMContentLoaded dependencies
 *  - Canvas always visible, never flickers
 */

'use strict';

(function () {
  const canvas = document.getElementById('nexusCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

const CONFIG = {
  particleCount: 100,       // was 80 — more particles = denser web
  connectionDist: 160,      // was 140 — longer connections = more visible web
  connectionDistSq: 160 * 160,
  particleSpeed: 0.4,
  repulsionRadius: 180,
  repulsionForce: 0.6,
  friction: 0.94,
  particleRadius: 2.2,      // was 1.8 — slightly bigger dots
  lineOpacityScale: 0.7,    // was 0.3 — much more visible connection lines
};

  const mouse = { x: -9999, y: -9999 };

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Particle pool
  const particles = [];

  function createParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * CONFIG.particleSpeed,
      vy: (Math.random() - 0.5) * CONFIG.particleSpeed,
    };
  }

  for (let i = 0; i < CONFIG.particleCount; i++) {
    particles.push(createParticle());
  }

  function updateParticle(p) {
    p.x += p.vx;
    p.y += p.vy;

    // Wrap around edges (smoother than bounce)
    if (p.x < -10) p.x = w + 10;
    else if (p.x > w + 10) p.x = -10;
    if (p.y < -10) p.y = h + 10;
    else if (p.y > h + 10) p.y = -10;

    // Cursor repulsion with smooth easing
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const distSq = dx * dx + dy * dy;
    const rr = CONFIG.repulsionRadius * CONFIG.repulsionRadius;

    if (distSq < rr && distSq > 1) {
      const dist = Math.sqrt(distSq);
      const force = (1 - dist / CONFIG.repulsionRadius) * CONFIG.repulsionForce;
      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force;
    }

    // Friction (prevents infinite acceleration)
    p.vx *= CONFIG.friction;
    p.vy *= CONFIG.friction;
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    // Update all particles
    for (let i = 0; i < particles.length; i++) {
      updateParticle(particles[i]);
    }

    // Draw connections with gradient colors
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const connectionColor = isLight ? [2, 132, 199] : [124, 58, 237]; // Cyan in light, Violet in dark
    const secondaryColor = isLight ? [124, 58, 237] : [34, 211, 238]; // Violet in light, Cyan in dark

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < CONFIG.connectionDistSq) {
          const distNorm = Math.sqrt(distSq);
          const opacity = (1 - distSq / CONFIG.connectionDistSq) * CONFIG.lineOpacityScale;
          
          const influence = distNorm / 140;
          const r = Math.round(connectionColor[0] * influence + secondaryColor[0] * (1 - influence));
          const g = Math.round(connectionColor[1] * influence + secondaryColor[1] * (1 - influence));
          const b_ = Math.round(connectionColor[2] * influence + secondaryColor[2] * (1 - influence));
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b_}, ${opacity * (isLight ? 0.4 : 1)})`;
          ctx.lineWidth = 0.9;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles with glow effect
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dotColor = isLight ? 'rgba(2, 132, 199,' : 'rgba(34, 211, 238,';
      
      ctx.fillStyle = dotColor + (isLight ? '0.15)' : '0.35)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, CONFIG.particleRadius * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = dotColor + '1)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, CONFIG.particleRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  // Start immediately — runs continuously via requestAnimationFrame
  animate();
})();