/* =============================================================
   INTERACTIONS.JS — Enhanced UI interactions for AI Badge
   Responsibilities:
     • 3D tilt on AI identity badge with magnetic effect
     • Flip animation (front ↔ back)
     • Cursor glow effect following mouse
     • Enhanced terminal typing loop
     • Micro-interactions and polish
   ============================================================= */

'use strict';
console.log("Interactions JS Loaded 🚀");

/* =============================================================
   AI BADGE 3D TILT & MAGNETIC EFFECT
   ============================================================= */
function initAIBadge() {
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
    if (!isHovered || !magneticBounds) return;

    const rect = magneticBounds;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Magnetic effect - badge follows cursor slightly
    const magneticStrength = Math.min(distance / 200, 1);
    targetX = (deltaX * magneticStrength) * 0.1;
    targetY = (deltaY * magneticStrength) * 0.1;
    
    // 3D tilt effect
    const maxTilt = 12;
    const tiltX = -((e.clientY - rect.top) / rect.height - 0.5) * maxTilt;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * maxTilt;
    
    // Apply transformations
    if (!isFlipped) {
      badge.style.transform = `
        translateX(${currentX}px) 
        translateY(${currentY}px) 
        rotateX(${tiltX}deg) 
        rotateY(${tiltY}deg) 
        scale(1.03)
      `;
    }
  }

  // Smooth magnetic animation
  function animateMagnetic() {
    if (isHovered) {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      requestAnimationFrame(animateMagnetic);
    }
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
  cursor.className = 'cursor-glow';
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
    mouseX = e.clientX - 20; // Center the glow
    mouseY = e.clientY - 20;
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
    { text: 'loading projects...', type: 'prompt' },
    { text: '[  OK  ] systems ready', type: 'success' },
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
    const delay = isDeleting ? 30 : 80;
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
      ripple.className = 'ripple';
      
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
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      
      leftPanel.style.transform = `translateX(${-moveX}px) translateY(${-moveY}px)`;
      rightPanel.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    });
  }
}

/* =============================================================
   ADD CURSOR GLOW STYLES
   ============================================================= */
function addCursorGlowStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .cursor-glow {
      position: fixed;
      width: 40px;
      height: 40px;
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
        rgba(124, 58, 237, 0.3) 0%,
        rgba(59, 130, 246, 0.2) 40%,
        transparent 70%
      );
      border-radius: 50%;
      filter: blur(8px);
    }
    
    .cursor-glow-outer {
      position: absolute;
      inset: -10px;
      background: radial-gradient(
        circle,
        rgba(34, 211, 238, 0.1) 0%,
        transparent 50%
      );
      border-radius: 50%;
      filter: blur(12px);
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple-effect 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple-effect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

/* =============================================================
   INIT ALL INTERACTIONS
   ============================================================= */
function initInteractions() {
  initAIBadge();
  initCursorGlow();
  initTerminalLoop();
  initEnhancedCardLighting();
  initMicroInteractions();
  addCursorGlowStyles();
}

/* Auto-initialize when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInteractions);
} else {
  initInteractions();
}
