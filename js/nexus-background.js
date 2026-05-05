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
    particleCount: 80,
    connectionDist: 140,
    connectionDistSq: 140 * 140,
    particleSpeed: 0.4,
    repulsionRadius: 180,
    repulsionForce: 0.6,
    friction: 0.94,
    particleRadius: 1.8,
    lineOpacityScale: 0.3,
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
          
          // Gradient color: violet to cyan based on distance
          const violetInfluence = distNorm / 140;
          const cyanInfluence = 1 - violetInfluence;
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${124 + (cyanInfluence * 50)}, ${58 + (cyanInfluence * 100)}, ${237 - (cyanInfluence * 50)}, ${opacity})`;
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
      
      // Particle glow (outer halo)
      ctx.fillStyle = 'rgba(34, 211, 238, 0.15)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, CONFIG.particleRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Particle core (bright center)
      ctx.fillStyle = 'rgba(34, 211, 238, 0.85)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, CONFIG.particleRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  // Start immediately — runs continuously via requestAnimationFrame
  animate();
})();