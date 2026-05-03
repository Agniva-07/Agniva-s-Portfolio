'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('nexusCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Canvas sizing
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Configuration
  const config = {
    particleCount: 90,
    connectionDistance: 140,
    particleSpeed: 0.4,
    attractionRadius: 200,
    attractionForce: 0.03,
    burstForce: 8,
    colors: {
      particle: 'rgba(34, 211, 238, 0.6)', // cyan
      particleGlow: 'rgba(59, 130, 246, 0.4)', // blue
      line: 'rgba(124, 58, 237, 0.12)', // violet
      lineActive: 'rgba(34, 211, 238, 0.25)'
    }
  };

  // Mouse state
  const mouse = {
    x: null,
    y: null,
    isDown: false,
    burstActive: false,
    burstX: 0,
    burstY: 0
  };

  // Track mouse
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Burst effect on click
  document.addEventListener('mousedown', (e) => {
    mouse.isDown = true;
    mouse.burstActive = true;
    mouse.burstX = e.clientX;
    mouse.burstY = e.clientY;
    
    // Reset burst after animation
    setTimeout(() => {
      mouse.burstActive = false;
    }, 400);
  });

  document.addEventListener('mouseup', () => {
    mouse.isDown = false;
  });

  // Particle class
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * config.particleSpeed * 2;
      this.vy = (Math.random() - 0.5) * config.particleSpeed * 2;
      this.radius = 1 + Math.random() * 1.5;
      this.baseRadius = this.radius;
      this.glowIntensity = 0.3 + Math.random() * 0.4;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      // Normal movement
      this.x += this.vx;
      this.y += this.vy;

      // Bounce at edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Keep within bounds
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));

      // Mouse attraction
      if (mouse.x !== null && mouse.y !== null && !mouse.burstActive) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.attractionRadius) {
          const force = (1 - dist / config.attractionRadius) * config.attractionForce;
          this.vx += dx * force * 0.02;
          this.vy += dy * force * 0.02;
          this.glowIntensity = Math.min(1, this.glowIntensity + 0.02);
        } else {
          this.glowIntensity = Math.max(0.3, this.glowIntensity - 0.01);
        }
      }

      // Burst repulsion
      if (mouse.burstActive) {
        const dx = this.x - mouse.burstX;
        const dy = this.y - mouse.burstY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 250 && dist > 0) {
          const force = (1 - dist / 250) * config.burstForce;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }
      }

      // Speed limit
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      const maxSpeed = mouse.burstActive ? 6 : 1.5;
      if (speed > maxSpeed) {
        this.vx = (this.vx / speed) * maxSpeed;
        this.vy = (this.vy / speed) * maxSpeed;
      }

      // Damping (return to normal speed)
      if (!mouse.burstActive) {
        this.vx *= 0.99;
        this.vy *= 0.99;
      }

      // Pulse animation
      this.pulsePhase += 0.02;
      this.radius = this.baseRadius + Math.sin(this.pulsePhase) * 0.3;
    }

    draw() {
      // Glow effect
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius * 4
      );
      gradient.addColorStop(0, `rgba(34, 211, 238, ${this.glowIntensity})`);
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${this.glowIntensity * 0.5})`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.fillStyle = config.colors.particle;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Create particles
  const particles = Array.from({ length: config.particleCount }, () => new Particle());

  // Draw connections between particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.connectionDistance) {
          const opacity = (1 - dist / config.connectionDistance) * 0.5;
          
          // Check if near mouse for brighter lines
          let lineColor = config.colors.line;
          if (mouse.x !== null && mouse.y !== null) {
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const mouseDist = Math.sqrt(
              (mouse.x - midX) ** 2 + (mouse.y - midY) ** 2
            );
            if (mouseDist < 150) {
              lineColor = config.colors.lineActive;
            }
          }

          ctx.beginPath();
          ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${opacity})`);
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  let lastTime = 0;
  function animate(timestamp) {
    // Throttle to ~60fps
    if (timestamp - lastTime < 16) {
      requestAnimationFrame(animate);
      return;
    }
    lastTime = timestamp;

    // Clear with slight fade for trail effect
    ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();

    requestAnimationFrame(animate);
  }

  // Start animation
  animate(0);

  console.log('✨ Nexus particle network initialized');
});
