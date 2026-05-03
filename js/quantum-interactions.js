'use strict';

console.log("Quantum Interactions Loaded");

document.addEventListener('DOMContentLoaded', () => {
  /* =============================================================
     QUANTUM BADGE FLIP ONLY (Tilt removed - now handled by Nexus)
     ============================================================= */
  const badge = document.getElementById('identityBadge');
  if (badge) {
    let flipped = false;

    badge.addEventListener('click', () => {
      flipped = !flipped;
      badge.style.transform = flipped ? 'rotateY(180deg)' : '';
      badge.classList.toggle('flipped', flipped);
    });
  }

  /* =============================================================
     CURSOR GLOW
     ============================================================= */
  if (!document.querySelector('.quantum-cursor-glow')) {
    const cursor = document.createElement('div');
    cursor.className = 'quantum-cursor-glow';
    cursor.innerHTML = '<div class="cursor-glow-inner"></div><div class="cursor-glow-outer"></div>';
    document.body.appendChild(cursor);

    let mx = 0, my = 0, cx = 0, cy = 0;

    function update() {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(update);
    }

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX - 25;
      my = e.clientY - 25;
    });

    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

    update();
  }

  /* =============================================================
     TERMINAL TYPING LOOP
     ============================================================= */
  const terminalBody = document.getElementById('terminalBody');
  if (terminalBody) {
    const messages = [
      { text: 'initializing identity...', type: 'prompt' },
      { text: 'loading modules...', type: 'prompt' },
      { text: '[  OK  ] quantum systems ready', type: 'success' },
      { text: 'status: ready', type: 'info' },
      { text: 'awaiting input...', type: 'prompt' }
    ];

    let msgIdx = 0, charIdx = 0, deleting = false, line = null;

    function type() {
      if (!line) {
        line = document.createElement('div');
        line.className = `terminal-line terminal-line--${messages[msgIdx].type}`;
        terminalBody.appendChild(line);
        if (terminalBody.children.length > 5) {
          terminalBody.removeChild(terminalBody.firstChild);
        }
      }

      const msg = messages[msgIdx].text;

      if (!deleting) {
        line.textContent = msg.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx >= msg.length) {
          if (msgIdx < messages.length - 1) {
            setTimeout(() => { deleting = true; type(); }, 1800);
          } else {
            setTimeout(() => {
              msgIdx = 0; charIdx = 0; deleting = false; line = null;
              terminalBody.innerHTML = '';
              type();
            }, 2500);
          }
          return;
        }
      } else {
        line.textContent = msg.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx <= 0) {
          msgIdx++; charIdx = 0; deleting = false; line = null;
        }
      }
      setTimeout(type, deleting ? 20 : 65);
    }
    setTimeout(type, 4000);
  }

  /* =============================================================
     CARD LIGHTING
     ============================================================= */
  document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });

  /* =============================================================
     BUTTON RIPPLES
     ============================================================= */
  document.querySelectorAll('.card-cta').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const r = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const s = Math.max(r.width, r.height);
      ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px;transform:scale(0);animation:quantum-ripple 0.5s ease-out;pointer-events:none;`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  /* =============================================================
     ADD STYLES
     ============================================================= */
  if (!document.getElementById('quantum-interaction-styles')) {
    const s = document.createElement('style');
    s.id = 'quantum-interaction-styles';
    s.textContent = `
      .quantum-cursor-glow { position: fixed; width: 50px; height: 50px; pointer-events: none; z-index: 9998; transition: opacity 0.3s; }
      .cursor-glow-inner { position: absolute; inset: 0; background: radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(59,130,246,0.25) 50%, transparent 80%); border-radius: 50%; filter: blur(10px); }
      .cursor-glow-outer { position: absolute; inset: -10px; background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%); border-radius: 50%; filter: blur(15px); }
      @keyframes quantum-ripple { to { transform: scale(3); opacity: 0; } }
      #identityBadge { transform-style: preserve-3d; transition: transform 0.6s ease; }
    `;
    document.head.appendChild(s);
  }
});