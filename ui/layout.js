/**
 * layout.js — Orchestrator + Enhanced Particle Canvas
 */
import { initDashboard } from './dashboard.js';
import { initTerminal } from './terminal.js';

function initParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const DARK_COLORS = ['rgba(0,229,255,', 'rgba(168,85,247,', 'rgba(77,140,255,'];
  const LIGHT_COLORS = ['rgba(2,132,199,', 'rgba(124,58,237,', 'rgba(71,85,105,'];
  let currentColors = document.body.getAttribute('data-theme') === 'light' ? LIGHT_COLORS : DARK_COLORS;

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  function createParticle() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.3,
      color: currentColors[Math.floor(Math.random() * currentColors.length)],
      alpha: Math.random() * 0.45 + 0.08,
    };
  }

  function init() { resize(); particles = Array.from({ length: 100 }, createParticle); }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isLight = document.body.getAttribute('data-theme') === 'light';
    const connectionColor = isLight ? 'rgba(148,163,184,0.08)' : 'rgba(0,229,255,0.05)';

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = connectionColor.replace('0.05', 0.05 * (1 - dist / 130)).replace('0.08', 0.08 * (1 - dist / 130));
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.shadowBlur = isLight ? 0 : 6;
      ctx.shadowColor = `${p.color}0.3)`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('themeChanged', () => {
    currentColors = document.body.getAttribute('data-theme') === 'light' ? LIGHT_COLORS : DARK_COLORS;
    particles.forEach(p => {
      p.color = currentColors[Math.floor(Math.random() * currentColors.length)];
    });
  });

  window.addEventListener('resize', () => { resize(); });
  init();
  draw();
}

function initParallax() {
  const dashboard = document.getElementById('dashboard-panel');
  if (!dashboard) return;
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 4;
    const y = (e.clientY / window.innerHeight - 0.5) * 4;
    dashboard.style.setProperty('--mx', `${x}px`);
    dashboard.style.setProperty('--my', `${y}px`);
  });
}

function initThemeSync() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
  } else {
    document.body.setAttribute('data-theme', 'dark');
  }
}

function initRopeToggle() {
  const canvas = document.getElementById("ropeToggleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let points = [];
  const segmentLength = 12;
  const gravity = 0.6;
  const friction = 0.92;
  const iterations = 5;
  const totalPoints = 12;

  for (let i = 0; i < totalPoints; i++) {
    points.push({ x: canvas.width / 2, y: 0 + i * segmentLength, oldx: canvas.width / 2, oldy: 0 + i * segmentLength });
  }

  let dragging = false;
  let hasToggled = false;

  function setRopeTheme() {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    // Dispatch event for other components (like particles)
    window.dispatchEvent(new Event('themeChanged'));
  }

  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function onDown(e) {
    const pos = getMousePos(e);
    const last = points[points.length - 1];
    if (Math.hypot(pos.x - last.x, pos.y - last.y) < 25) dragging = true;
  }

  canvas.addEventListener("mousedown", onDown);
  canvas.addEventListener("touchstart", onDown, { passive: true });
  window.addEventListener("mouseup", () => dragging = false);
  window.addEventListener("touchend", () => dragging = false);

  window.addEventListener("mousemove", (e) => {
    if (dragging) {
      const pos = getMousePos(e);
      points[points.length - 1].x = pos.x;
      points[points.length - 1].y = pos.y;
    }
  });

  function loop() {
    for (let i = 1; i < points.length; i++) {
      let p = points[i];
      let vx = (p.x - p.oldx) * friction;
      let vy = (p.y - p.oldy) * friction;
      p.oldx = p.x; p.oldy = p.y;
      p.x += vx; p.y += vy + gravity;
    }
    for (let j = 0; j < iterations; j++) {
      for (let i = 0; i < points.length - 1; i++) {
        let p1 = points[i], p2 = points[i + 1];
        let dx = p2.x - p1.x, dy = p2.y - p1.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let diff = (dist - segmentLength) / dist;
        let offsetX = dx * diff * 0.5, offsetY = dy * diff * 0.5;
        if (i !== 0) { p1.x += offsetX; p1.y += offsetY; }
        p2.x -= offsetX; p2.y -= offsetY;
      }
      points[0].x = canvas.width / 2; points[0].y = -10;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isLight = document.body.getAttribute('data-theme') === 'light';
    
    // DRAW ROPE
    ctx.strokeStyle = isLight ? "#94a3b8" : "#4a5268";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.stroke();

    let last = points[points.length - 1];

    // DRAW BULB HOUSING
    ctx.save();
    ctx.translate(last.x, last.y);
    
    // Metallic Base
    ctx.fillStyle = isLight ? "#64748b" : "#334155";
    ctx.fillRect(-6, -14, 12, 8);
    
    // Glass Bulb
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    const bulbGrad = ctx.createRadialGradient(-4, -4, 2, 0, 0, 16);
    if (isLight) {
      bulbGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      bulbGrad.addColorStop(1, "rgba(226, 232, 240, 0.5)");
    } else {
      bulbGrad.addColorStop(0, "rgba(255, 255, 255, 0.25)");
      bulbGrad.addColorStop(1, "rgba(15, 23, 42, 0.7)");
    }
    ctx.fillStyle = bulbGrad;
    ctx.fill();
    ctx.strokeStyle = isLight ? "rgba(148, 163, 184, 0.6)" : "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Filament Glow (Dynamic)
    ctx.beginPath();
    ctx.arc(0, 2, 5, 0, Math.PI * 2);
    ctx.shadowBlur = dragging ? 25 : 12;
    ctx.shadowColor = isLight ? "#fbbf24" : "#22d3ee";
    ctx.fillStyle = isLight ? "#f59e0b" : "#22d3ee";
    ctx.fill();
    
    // Reflection highlight
    ctx.beginPath();
    ctx.arc(-5, -5, 3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fill();
    
    ctx.restore();

    if (last.y > 180 && !hasToggled) { setRopeTheme(); hasToggled = true; }
    else if (last.y < 150) { hasToggled = false; }
    requestAnimationFrame(loop);
  }
  loop();
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeSync();
  initRopeToggle();
  initParticles();
  initParallax();
  initDashboard();
  initTerminal();
});
