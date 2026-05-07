/**
 * particles.js — Universal Particle Background System
 *
 * Lightweight connected-dot network with interactive cursor repulsion.
 * Designed to work on ALL portfolio pages for visual continuity.
 *
 * Features:
 *  - Floating particles with connected dot network
 *  - Subtle cursor repulsion effect
 *  - GPU-optimized with transform-based rendering
 *  - Adaptive particle count based on screen size
 *  - Smooth 60fps animation
 *  - Cinematic cyan + purple palette
 */

'use strict';

(function () {
  // Find or create canvas
  let canvas = document.getElementById('nexusCanvas') || document.getElementById('bg-canvas');
  
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.55;';
    document.body.prepend(canvas);
  } else {
    // Ensure canvas has correct styles
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.55';
  }

  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener('resize', resize);

  // Adaptive particle count based on screen area
  const screenArea = window.innerWidth * window.innerHeight;
  const baseCount = Math.min(120, Math.max(50, Math.floor(screenArea / 15000)));

  const CONFIG = {
    particleCount: baseCount,
    connectionDist: 150,
    connectionDistSq: 150 * 150,
    particleSpeed: 0.35,
    repulsionRadius: 160,
    repulsionForce: 0.5,
    friction: 0.95,
    particleRadius: 1.8,
    lineOpacityScale: 0.5,
  };

  const mouse = { x: -9999, y: -9999 };

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

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

    // Wrap around edges
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

    // Friction
    p.vx *= CONFIG.friction;
    p.vy *= CONFIG.friction;
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    // Update all particles
    for (let i = 0; i < particles.length; i++) {
      updateParticle(particles[i]);
    }

    // Draw connections — cyan to purple gradient based on position
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < CONFIG.connectionDistSq) {
          const opacity = (1 - distSq / CONFIG.connectionDistSq) * CONFIG.lineOpacityScale;
          
          // Color blend: cyan near top, purple near bottom
          const yAvg = (a.y + b.y) / (2 * h);
          const r = Math.round(34 + yAvg * 105);   // 34 → 139
          const g = Math.round(211 - yAvg * 119);   // 211 → 92
          const bl = Math.round(238 + yAvg * 8);     // 238 → 246

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${opacity.toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Position-based color shift
      const yRatio = p.y / h;
      const r = Math.round(34 + yRatio * 105);
      const g = Math.round(211 - yRatio * 119);
      const bl = Math.round(238 + yRatio * 8);

      // Outer glow halo
      ctx.fillStyle = `rgba(${r}, ${g}, ${bl}, 0.2)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, CONFIG.particleRadius * 3, 0, Math.PI * 2);
      ctx.fill();

      // Bright core
      ctx.fillStyle = `rgba(${r}, ${g}, ${bl}, 0.9)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, CONFIG.particleRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  // Start animation
  animate();
})();
