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
    const opacity = window.location.pathname.includes('portfolio.html') ? '0.55' : '0.85';
    canvas.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:${opacity};`;
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
    // Slightly higher opacity on landing page to support the intensity
    canvas.style.opacity = window.location.pathname.includes('portfolio.html') ? '0.55' : '0.85';
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

  // Determine if we are on the portfolio (Story Mode) page
  const isPortfolio = window.location.pathname.includes('portfolio.html');

  // Adaptive particle count based on screen area
  const screenArea = window.innerWidth * window.innerHeight;
  
  // Higher intensity for Landing/Terminal, lower for Portfolio
  const baseCount = isPortfolio
    ? Math.min(80, Math.max(40, Math.floor(screenArea / 18000)))
    : Math.min(100, Math.max(50, Math.floor(screenArea / 14000)));

  const CONFIG = {
    particleCount: baseCount,
    connectionDist: isPortfolio ? 130 : 150,
    connectionDistSq: isPortfolio ? (130 * 130) : (150 * 150),
    particleSpeed: isPortfolio ? 0.25 : 0.3,
    repulsionRadius: isPortfolio ? 140 : 150,
    repulsionForce: isPortfolio ? 0.4 : 0.5,
    friction: 0.95,
    particleRadius: isPortfolio ? 1.5 : 1.8,
    lineOpacityScale: isPortfolio ? 0.35 : 0.55,
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

  const particles = [];
  
  // Pre-calculate color variations to avoid string allocations in the render loop
  const colorCache = [];
  for(let i=0; i<=10; i++) {
    const yRatio = i / 10;
    const r = Math.round(34 + yRatio * 105);
    const g = Math.round(211 - yRatio * 119);
    const bl = Math.round(238 + yRatio * 8);
    colorCache.push({
      glow: `rgba(${r}, ${g}, ${bl}, 0.15)`,
      core: `rgba(${r}, ${g}, ${bl}, 0.8)`,
      r, g, bl
    });
  }

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

    for (let i = 0; i < particles.length; i++) {
      updateParticle(particles[i]);
    }

    // Set line settings once
    ctx.lineWidth = 0.8;

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < CONFIG.connectionDistSq) {
          const opacity = (1 - distSq / CONFIG.connectionDistSq) * CONFIG.lineOpacityScale;
          const yAvg = (a.y + b.y) / (2 * h);
          const cacheIdx = Math.max(0, Math.min(10, Math.floor(yAvg * 10)));
          const c = colorCache[cacheIdx];
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.bl}, ${opacity.toFixed(2)})`;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const cacheIdx = Math.max(0, Math.min(10, Math.floor((p.y / h) * 10)));
      const c = colorCache[cacheIdx];

      // Bright core only (removed outer glow for perf)
      ctx.fillStyle = c.core;
      ctx.beginPath();
      ctx.arc(p.x, p.y, CONFIG.particleRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  // Start animation
  animate();
})();
