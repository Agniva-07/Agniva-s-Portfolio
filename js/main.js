/* =============================================================
   MAIN.JS — Landing page controller (v2)
   Responsibilities:
     • Populate DOM from portfolio data (zero hardcoded strings)
     • Typewriter role cycling
     • Terminal boot sequence (data-driven)
     • Cursor-based card lighting
     • 3D tilt on identity card
     • Mode switching with overlay → real navigation
     • Keyboard navigation + localStorage persistence
   Depends on: data/portfolio.js  (ES module export `portfolio`)
   ============================================================= */

import { portfolio } from '../data/portfolio.js';

'use strict';

/* =============================================================
   SAFE DATA ACCESSORS — fail-silent helpers
   ============================================================= */
const _get = (obj, ...keys) =>
  keys.reduce((o, k) => (o != null && o[k] != null ? o[k] : null), obj);

const _str  = (v, fallback = '') => (typeof v === 'string' && v.trim() ? v.trim() : fallback);
const _arr  = (v, fallback = []) => (Array.isArray(v) && v.length ? v : fallback);

/* =============================================================
   DATA BINDINGS — Populate DOM from portfolio object
   ============================================================= */
function populateIdentity() {
  const profile = _get(portfolio, 'profile') ?? {};
  const meta    = _get(portfolio, 'meta')    ?? {};

  /* Page title */
  const siteTitle = _str(_get(meta, 'siteTitle'), 'Portfolio');
  document.title  = siteTitle;

  /* Meta description */
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', _str(_get(meta, 'description'), siteTitle));
  }

  /* Badge name */
  const nameEl = document.getElementById('badgeName');
  if (nameEl) nameEl.textContent = _str(_get(profile, 'name'), 'Agniva');

  /* Badge status */
  const statusEl = document.getElementById('badgeStatus');
  if (statusEl) statusEl.textContent = _str(_get(profile, 'status'), 'Open to opportunities');

  /* Avatar initial */
  const avatarEl = document.querySelector('.avatar-text');
  if (avatarEl) {
    const name = _str(_get(profile, 'name'), 'A');
    avatarEl.textContent = name.charAt(0).toUpperCase();
  }

  /* aria-label on badge */
  const badge = document.getElementById('identityBadge');
  if (badge) {
    const name = _str(_get(profile, 'name'), 'Developer');
    badge.setAttribute('aria-label', `${name} — AI Developer identity`);
  }

  /* Terminal title bar */
  const termTitle = document.getElementById('termTitle');
  if (termTitle) {
    const handle = _str(_get(profile, 'name'), 'dev').toLowerCase();
    termTitle.textContent = `${handle}.dev — bash`;
  }
}


/* =============================================================
   TYPEWRITER — cycles through portfolio.profile.roles (for badge role)
   ============================================================= */
let _roleIndex   = 0;
let _currentText = '';
let _typeTimer   = null;

function _typeString(text, roleEl, onDone) {
  let i = 0;
  _currentText = '';
  clearInterval(_typeTimer);

  _typeTimer = setInterval(() => {
    if (i < text.length) {
      _currentText += text[i];
      roleEl.textContent = _currentText;
      i++;
    } else {
      clearInterval(_typeTimer);
      setTimeout(() => _eraseString(roleEl, onDone), 1900);
    }
  }, 55);
}

function _eraseString(roleEl, onDone) {
  clearInterval(_typeTimer);

  _typeTimer = setInterval(() => {
    if (_currentText.length > 0) {
      _currentText = _currentText.slice(0, -1);
      roleEl.textContent = _currentText;
    } else {
      clearInterval(_typeTimer);
      if (typeof onDone === 'function') onDone();
    }
  }, 28);
}

function startTypewriter() {
  const roleEl = document.querySelector('.badge-role');
  if (!roleEl) return;

  const roles = _arr(_get(portfolio, 'profile', 'roles'), ['AI Developer']);

  function next() {
    _typeString(roles[_roleIndex], roleEl, () => {
      _roleIndex = (_roleIndex + 1) % roles.length;
      next();
    });
  }

  next();
}


/* =============================================================
   TERMINAL BOOT SEQUENCE — data-driven
   ============================================================= */

/** Build the boot sequence from portfolio data at runtime. */
function _buildBootSequence() {
  const name    = _str(_get(portfolio, 'profile', 'name'), 'dev').toLowerCase();
  const status  = _str(_get(portfolio, 'profile', 'status'), 'ready');
  const projCount = _arr(_get(portfolio, 'projects')).length;

  return [
    { text: `initializing ${name}.dev...`,             type: 'prompt',  delay: 0    },
    { text: 'loading core modules...',                  type: 'prompt',  delay: 600  },
    { text: '[  OK  ] identity module loaded',          type: 'success', delay: 1200 },
    { text: 'fetching profile data...',                 type: 'prompt',  delay: 1650 },
    { text: `[  OK  ] ${projCount} project(s) indexed`, type: 'success', delay: 2300 },
    { text: 'calibrating experience engine...',         type: 'prompt',  delay: 2700 },
    { text: `[  OK  ] status: ${status}`,               type: 'success', delay: 3200 },
    { text: 'system ready_',                            type: 'prompt',  delay: 3700 },
  ];
}

function _typeLine(text, el) {
  return new Promise(resolve => {
    let i = 0;
    const t = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        clearInterval(t);
        resolve();
      }
    }, 22);
  });
}

async function runBootSequence() {
  const terminalBody = document.getElementById('terminalBody');
  if (!terminalBody) return;

  const sequence = _buildBootSequence();
  const startMs  = Date.now();

  for (const entry of sequence) {
    const elapsed = Date.now() - startMs;
    const wait    = Math.max(0, entry.delay - elapsed + 300);

    await new Promise(r => setTimeout(r, wait));

    const line = document.createElement('div');
    line.className = `terminal-line terminal-line--${entry.type}`;
    terminalBody.appendChild(line);
    await _typeLine(entry.text, line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  /* Park blinking block cursor on final line */
  const cursorLine = document.createElement('div');
  cursorLine.className = 'terminal-line';
  cursorLine.innerHTML = '<span class="terminal-cursor" aria-hidden="true"></span>';
  terminalBody.appendChild(cursorLine);
}


/* =============================================================
   CURSOR-BASED RADIAL GLOW inside cards
   ============================================================= */
function _initCardLighting() {
  const cards = document.querySelectorAll('.mode-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
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
   3D TILT on quantum badge (moved to quantum-interactions.js)
   ============================================================= */
function _initCardTilt() {
  // Tilt functionality is now handled by quantum-interactions.js
  // Keeping this as a placeholder for compatibility
}


/* =============================================================
   MODE SWITCHING — real navigation
   ============================================================= */
function _cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function _setActiveCard(mode) {
  document.querySelectorAll('.mode-card').forEach(card => {
    card.classList.remove('is-selected');
    card.removeAttribute('aria-selected');
  });

  const card = document.getElementById(`card${_cap(mode)}`);
  if (card) {
    card.classList.add('is-selected');
    card.setAttribute('aria-selected', 'true');
  }
}

function switchMode(mode) {
  if (mode === 'desktop' && window.innerWidth < 1024) return;

  try { localStorage.setItem('portfolio_mode', mode); } catch (_) {}

  _setActiveCard(mode);

  const labels = {
    story:    '> loading story_mode...',
    terminal: '> launching terminal_mode...',
    desktop:  '> booting desktop_mode...',
  };

  const modeOverlay  = document.getElementById('modeOverlay');
  const overlayText  = document.getElementById('modeOverlayText');

  if (overlayText) overlayText.textContent = labels[mode] ?? '> loading...';
  if (modeOverlay) {
    modeOverlay.classList.add('is-active');
    modeOverlay.removeAttribute('aria-hidden');
  }

  /* Navigate after overlay completes */
  setTimeout(() => {
    const routes = {
  story: 'portfolio.html',
  terminal: '../ui/dashboard.html',
  desktop: 'desktop.html'
};

window.location.href = `./${routes[mode]}`;
  }, 900);
}


/* =============================================================
   KEYBOARD NAVIGATION
   ============================================================= */
function _initKeyboard() {
  document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const mode = card.dataset.mode;
        if (mode) switchMode(mode);
      }
    });
  });
}


/* =============================================================
   RESTORE SAVED MODE
   ============================================================= */
function _restoreMode() {
  try {
    const saved = localStorage.getItem('portfolio_mode');
    if (saved) _setActiveCard(saved);
  } catch (_) {}
}


/* =============================================================
   INIT
   ============================================================= */
function init() {
  populateIdentity();
  startTypewriter();
  runBootSequence();
  _initCardLighting();
  _initCardTilt();
  _initKeyboard();
  _restoreMode();
}

/* Expose for onclick attributes that run before module resolution */
window.switchMode = switchMode;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

