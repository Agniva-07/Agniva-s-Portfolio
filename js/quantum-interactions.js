/* =============================================================
   QUANTUM-INTERACTIONS.JS — Enhanced UI interactions for Quantum Badge
   Responsibilities:
     • Quantum Badge 3D tilt and magnetic effects
     • Flip animation (front ↔ back)
     • Cursor glow effect following mouse
     • Enhanced terminal typing loop
     • Micro-interactions and parallax effects
   ============================================================= */

'use strict';

console.log("Quantum JS Loaded 🚀");
/* =============================================================
   QUANTUM BADGE 3D TILT & MAGNETIC EFFECT
   ============================================================= */
function initQuantumBadge() {
  const badge = document.getElementById('identityBadge');
  const container = document.getElementById('identityBadgeContainer');
  if (!badge || !container) return;

  let isHovered = false;
  let isFlipped = false;
  
  // Magnetic effect variables
  let magneticBounds = null;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  // Update magnetic bounds on resize/hover
  function updateMagneticBounds() {
    magneticBounds = container.getBoundingClientRect();
  }

  // Mouse move handler for 3D tilt and magnetic effect
  function handleMouseMove(e) {
    if (!isHovered || !magneticBounds || isFlipped) return;

    const rect = magneticBounds;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Magnetic effect - badge follows cursor slightly within radius
    const magneticRadius = 150;
    const magneticStrength = Math.max(0, 1 - (distance / magneticRadius));
    targetX = (deltaX * magneticStrength) * 0.15;
    targetY = (deltaY * magneticStrength) * 0.15;
    
    // 3D tilt effect
    const maxTilt = 15;
    const tiltX = -((e.clientY - rect.top) / rect.height - 0.5) * maxTilt;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * maxTilt;
    
    // Apply transformations
    badge.style.transform = `
      translateX(${currentX}px) 
      translateY(${currentY}px) 
      rotateX(${tiltX}deg) 
      rotateY(${tiltY}deg) 
      scale(1.03)
    `;
    
    // Update particle positions based on tilt
    updateParticles(tiltX, tiltY);
  }

  // Smooth magnetic animation
  function animateMagnetic() {
    if (isHovered && !isFlipped) {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      requestAnimationFrame(animateMagnetic);
    }
  }

  // Update floating particles based on tilt
  function updateParticles(tiltX, tiltY) {
    const particles = container.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      const speed = 0.5 + (index * 0.1);
      const offsetX = tiltY * speed;
      const offsetY = -tiltX * speed;
      particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  }

  // Mouse enter
  badge.addEventListener('mouseenter', (e) => {
    isHovered = true;
    updateMagneticBounds();
    animateMagnetic();
  });

  // Mouse leave
  badge.addEventListener('mouseleave', () => {
    isHovered = false;
    currentX = 0;
    currentY = 0;
    targetX = 0;
    targetY = 0;
    
    if (!isFlipped) {
      badge.style.transform = '';
      // Reset particles
      const particles = container.querySelectorAll('.particle');
      particles.forEach(particle => {
        particle.style.transform = '';
      });
    }
  });

  // Click to flip
  badge.addEventListener('click', (e) => {
    e.preventDefault();
    isFlipped = !isFlipped;
    
    if (isFlipped) {
      badge.classList.add('flipped');
      badge.style.transform = 'rotateY(180deg)';
    } else {
      badge.classList.remove('flipped');
      badge.style.transform = '';
    }
  });

  // Update bounds on window resize
  window.addEventListener('resize', updateMagneticBounds);
  
  // Track mouse movement for magnetic effect
  document.addEventListener('mousemove', handleMouseMove);
}

/* =============================================================
   CURSOR GLOW EFFECT
   ============================================================= */
function initCursorGlow() {
  const cursor = document.createElement('div');
  cursor.className = 'quantum-cursor-glow';
  cursor.innerHTML = `
    <div class="cursor-glow-inner"></div>
    <div class="cursor-glow-outer"></div>
  `;
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  function updateCursor() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    
    cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(updateCursor);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - 30; // Center the glow
    mouseY = e.clientY - 30;
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  updateCursor();
}

/* =============================================================
   ENHANCED TERMINAL TYPING LOOP
   ============================================================= */
function initTerminalLoop() {
  const terminalBody = document.getElementById('terminalBody');
  if (!terminalBody) return;

  const messages = [
    { text: 'initializing identity...', type: 'prompt' },
    { text: 'loading modules...', type: 'prompt' },
    { text: '[  OK  ] quantum systems ready', type: 'success' },
    { text: 'status: ready', type: 'info' },
    { text: 'awaiting input...', type: 'prompt' }
  ];

  let messageIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentLine = null;

  function typeMessage() {
    if (!currentLine) {
      // Create new line
      currentLine = document.createElement('div');
      currentLine.className = `terminal-line terminal-line--${messages[messageIndex].type}`;
      terminalBody.appendChild(currentLine);
      
      // Clear terminal if too many lines
      if (terminalBody.children.length > 5) {
        terminalBody.removeChild(terminalBody.firstChild);
      }
    }

    const currentMessage = messages[messageIndex].text;
    
    if (!isDeleting) {
      // Typing
      currentLine.textContent = currentMessage.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex >= currentMessage.length) {
        // Finished typing this message
        if (messageIndex < messages.length - 1) {
          setTimeout(() => {
            isDeleting = true;
            typeMessage();
          }, 2000);
        } else {
          // End of loop, restart after delay
          setTimeout(() => {
            messageIndex = 0;
            charIndex = 0;
            isDeleting = false;
            currentLine = null;
            terminalBody.innerHTML = '';
            typeMessage();
          }, 3000);
        }
        return;
      }
    } else {
      // Deleting
      currentLine.textContent = currentMessage.substring(0, charIndex - 1);
      charIndex--;
      
      if (charIndex <= 0) {
        // Move to next message
        messageIndex++;
        charIndex = 0;
        isDeleting = false;
        currentLine = null;
      }
    }

    // Continue typing/deleting
    const delay = isDeleting ? 25 : 70;
    setTimeout(typeMessage, delay);
  }

  // Start the loop after initial boot sequence
  setTimeout(typeMessage, 5000);
}

/* =============================================================
   ENHANCED CARD LIGHTING
   ============================================================= */
function initEnhancedCardLighting() {
  const cards = document.querySelectorAll('.mode-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });
}

/* =============================================================
   MICRO-INTERACTIONS
   ============================================================= */
function initMicroInteractions() {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.card-cta');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'quantum-ripple';
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add parallax effect between panels
  const leftPanel = document.querySelector('.panel--left');
  const rightPanel = document.querySelector('.panel--right');
  
  if (leftPanel && rightPanel) {
    document.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.008;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.008;
      
      leftPanel.style.transform = `translateX(${-moveX}px) translateY(${-moveY}px)`;
      rightPanel.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    });
  }

  // Add subtle scroll-based animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe mode cards for scroll animations
  document.querySelectorAll('.mode-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

/* =============================================================
   ADD QUANTUM CURSOR GLOW STYLES
   ============================================================= */
function addQuantumCursorStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .quantum-cursor-glow {
      position: fixed;
      width: 60px;
      height: 60px;
      pointer-events: none;
      z-index: 9998;
      transition: opacity 0.3s ease;
      mix-blend-mode: screen;
    }
    
    .cursor-glow-inner {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle,
        rgba(124, 58, 237, 0.4) 0%,
        rgba(59, 130, 246, 0.3) 40%,
        rgba(34, 211, 238, 0.2) 70%,
        transparent 100%
      );
      border-radius: 50%;
      filter: blur(12px);
    }
    
    .cursor-glow-outer {
      position: absolute;
      inset: -15px;
      background: radial-gradient(
        circle,
        rgba(124, 58, 237, 0.15) 0%,
        rgba(59, 130, 246, 0.1) 40%,
        transparent 70%
      );
      border-radius: 50%;
      filter: blur(20px);
    }
    
    .quantum-ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      transform: scale(0);
      animation: quantum-ripple-effect 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes quantum-ripple-effect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

/* =============================================================
   SCROLL OPTIMIZATION
   ============================================================= */
function initScrollOptimization() {
  // Ensure no scroll issues
  const checkScroll = () => {
    const body = document.body;
    const html = document.documentElement;
    
    // Check if there's any unwanted scroll
    if (body.scrollHeight > window.innerHeight || html.scrollHeight > window.innerHeight) {
      console.warn('Scroll detected - adjusting layout');
      // You can add specific fixes here if needed
    }
  };

  // Check on load and resize
  checkScroll();
  window.addEventListener('resize', checkScroll);
}

/* =============================================================
   INIT ALL INTERACTIONS
   ============================================================= */
function initQuantumInteractions() {
  initQuantumBadge();
  initCursorGlow();
  initTerminalLoop();
  initEnhancedCardLighting();
  initMicroInteractions();
  addQuantumCursorStyles();
  initScrollOptimization();
}

/* Auto-initialize when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQuantumInteractions);
} else {
  initQuantumInteractions();
}
