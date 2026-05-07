import { portfolio } from '../data/portfolio.js';

'use strict';

const _get = (obj, ...keys) =>
  keys.reduce((o, k) => (o != null && o[k] != null ? o[k] : null), obj);

const _str = (value, fallback = '') =>
  typeof value === 'string' && value.trim() ? value.trim() : fallback;

const _arr = (value, fallback = []) =>
  Array.isArray(value) && value.length ? value : fallback;

const _clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const SKILL_STYLES = {
  'JavaScript': { icon: 'JS', accent: '#F7DF1E', fg: '#111111', glow: 'rgba(247, 223, 30, 0.35)' },
  React: { icon: 'R', accent: '#61DAFB', fg: '#061018', glow: 'rgba(97, 218, 251, 0.34)' },
  'Node.js': { icon: 'N', accent: '#7DDC5A', fg: '#081108', glow: 'rgba(125, 220, 90, 0.32)' },
  Python: { icon: 'Py', accent: '#FACC15', fg: '#111111', glow: 'rgba(250, 204, 21, 0.28)' },
  MongoDB: { icon: 'DB', accent: '#22C55E', fg: '#041108', glow: 'rgba(34, 197, 94, 0.28)' },
  HTML: { icon: 'H', accent: '#FB7185', fg: '#190509', glow: 'rgba(251, 113, 133, 0.28)' },
  CSS: { icon: 'C', accent: '#38BDF8', fg: '#061018', glow: 'rgba(56, 189, 248, 0.28)' },
  'Express.js': { icon: 'EX', accent: '#E5E7EB', fg: '#111111', glow: 'rgba(229, 231, 235, 0.22)' },
  'Tailwind CSS': { icon: 'TW', accent: '#22D3EE', fg: '#041317', glow: 'rgba(34, 211, 238, 0.28)' },
  'Vanilla JS': { icon: 'VJ', accent: '#FDE047', fg: '#161303', glow: 'rgba(253, 224, 71, 0.28)' },
  TypeScript: { icon: 'TS', accent: '#60A5FA', fg: '#08111D', glow: 'rgba(96, 165, 250, 0.3)' },
  'Next.js': { icon: 'NX', accent: '#E5E7EB', fg: '#111111', glow: 'rgba(229, 231, 235, 0.22)' },
  FastAPI: { icon: 'FA', accent: '#2DD4BF', fg: '#051312', glow: 'rgba(45, 212, 191, 0.28)' },
  Docker: { icon: 'DK', accent: '#60A5FA', fg: '#08111D', glow: 'rgba(96, 165, 250, 0.28)' },
  Git: { icon: 'G', accent: '#FB7185', fg: '#190509', glow: 'rgba(251, 113, 133, 0.28)' },
  GitHub: { icon: 'GH', accent: '#E5E7EB', fg: '#111111', glow: 'rgba(229, 231, 235, 0.22)' },
};

let cubeData = null;
let cubeCleanup = null;
let roleIndex = 0;
let typeTimer = null;
let currentRoleText = '';

function getSkillStyle(label) {
  const preset = SKILL_STYLES[label];
  if (preset) return preset;

  return {
    icon: label.slice(0, 2).toUpperCase(),
    accent: '#A78BFA',
    fg: '#10091B',
    glow: 'rgba(167, 139, 250, 0.28)',
  };
}

function buildProjectIcon(title) {
  return _str(title).split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase() || 'PR';
}

function buildProjectProgress(project) {
  const status = _str(_get(project, 'status')).toLowerCase();
  if (status === 'completed') return 94;
  if (status === 'in-progress') return 72;
  return 80;
}

function buildCubeData() {
  const profile = _get(portfolio, 'profile') ?? {};
  const about = _get(portfolio, 'about') ?? {};
  const terminal = _get(portfolio, 'terminal') ?? {};
  const contact = _get(portfolio, 'contact') ?? {};
  const education = _get(portfolio, 'education') ?? {};
  const projects = _arr(_get(portfolio, 'projects'));
  const skillGroups = _arr(_get(portfolio, 'skills'));
  const highlights = _arr(_get(about, 'highlights'));

  const skills = [...new Set(skillGroups.flatMap(group => _arr(_get(group, 'items'))))]
    .slice(0, 8)
    .map(label => {
      const style = getSkillStyle(label);
      return { label, ...style };
    });

  const featuredProjects = [...projects]
    .sort((a, b) => {
      const aFeatured = _get(a, 'featured') ? 0 : 1;
      const bFeatured = _get(b, 'featured') ? 0 : 1;
      if (aFeatured !== bFeatured) return aFeatured - bFeatured;
      return (_get(a, 'order') ?? 999) - (_get(b, 'order') ?? 999);
    })
    .slice(0, 3)
    .map(project => ({
      title: _str(_get(project, 'title'), 'Untitled Project'),
      link:
        _str(_get(project, 'links', 'live')) ||
        _str(_get(project, 'links', 'github')) ||
        '#',
      meta:
        _arr(_get(project, 'tech')).slice(0, 3).join(' / ') ||
        _str(_get(project, 'tagline'), 'System build'),
      icon: buildProjectIcon(_get(project, 'title')),
      progress: buildProjectProgress(project),
    }));

  const dsaHighlight = highlights.find(item =>
    _str(_get(item, 'label')).toLowerCase().includes('dsa')
  );

  const yearText = _str(_get(education, 'year'));
  const yearNumber = yearText.match(/\d+/)?.[0];

  return {
    name: _str(_get(profile, 'name'), 'Agniva'),
    roles: _arr(_get(profile, 'roles'), ['AI Integration Enthusiast']),
    image: _str(_get(profile, 'avatar')),
    about:
      _str(_get(about, 'summary')) ||
      _str(_get(about, 'short')) ||
      _str(_get(profile, 'tagline')) ||
      'I build interactive and useful systems, not just apps.',
    status: _str(_get(profile, 'status'), 'Open to opportunities'),
    skills,
    projects: featuredProjects,
    stats: [
      {
        label: 'DSA',
        value:
          _str(_get(terminal, 'dsa', 'count')) ||
          _str(_get(dsaHighlight, 'value')) ||
          '400+',
      },
      { label: 'Projects', value: `${projects.length}` },
      { label: 'Skills', value: `${skills.length || 8}+` },
      { label: 'Year', value: yearNumber ? `${yearNumber}nd` : '2nd' },
    ],
    socials: {
      github: _str(_get(contact, 'github')),
      linkedin: _str(_get(contact, 'linkedin')),
      twitter: _str(_get(contact, 'twitter')),
    },
  };
}

function setAnchorState(anchor, href) {
  if (!anchor) return;

  if (href) {
    anchor.href = href;
    anchor.classList.remove('is-disabled');
    anchor.removeAttribute('aria-disabled');
    anchor.tabIndex = 0;
  } else {
    anchor.href = '#';
    anchor.classList.add('is-disabled');
    anchor.setAttribute('aria-disabled', 'true');
    anchor.tabIndex = -1;
  }
}

function populateIdentity() {
  const meta = _get(portfolio, 'meta') ?? {};
  cubeData = buildCubeData();

  const siteTitle = _str(_get(meta, 'siteTitle'), 'Portfolio');
  document.title = siteTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', _str(_get(meta, 'description'), siteTitle));
  }

  const cube = document.getElementById('profileCube');
  if (cube) {
    cube.setAttribute('aria-label', `${cubeData.name} true 3D portfolio cube`);
  }

  const nameEl = document.getElementById('cubeProfileName');
  const roleEl = document.getElementById('cubeProfileRole');
  const aboutEl = document.getElementById('cubeProfileAbout');
  const fallbackEl = document.getElementById('cubeProfileFallback');
  const imageEl = document.getElementById('cubeProfileImage');
  const skillsList = document.getElementById('cubeSkillsList');
  const projectsList = document.getElementById('cubeProjectsList');
  const statsGrid = document.getElementById('cubeStatsGrid');
  const termTitle = document.getElementById('termTitle');

  if (nameEl) nameEl.textContent = cubeData.name;
  if (roleEl) roleEl.textContent = cubeData.roles[0];
  if (aboutEl) aboutEl.textContent = cubeData.about;
  if (fallbackEl) fallbackEl.textContent = cubeData.name.charAt(0).toUpperCase();

  if (imageEl) {
    if (cubeData.image) {
      imageEl.src = cubeData.image;
      imageEl.hidden = false;
      if (fallbackEl) fallbackEl.hidden = true;
    } else {
      imageEl.hidden = true;
      imageEl.removeAttribute('src');
      if (fallbackEl) fallbackEl.hidden = false;
    }
  }

  if (skillsList) {
    skillsList.innerHTML = cubeData.skills
      .map(skill => `
        <div
          class="cube-skill-tag"
          style="--skill-accent:${skill.accent};--skill-fg:${skill.fg};--skill-glow:${skill.glow};"
        >
          <span class="cube-skill-icon">${skill.icon}</span>
          <span class="cube-skill-text">${skill.label}</span>
        </div>
      `)
      .join('');
  }

  if (projectsList) {
    projectsList.innerHTML = cubeData.projects
      .map(project => {
        const external = project.link.startsWith('http');
        return `
          <a class="cube-project-card" href="${project.link}" ${external ? 'target="_blank" rel="noopener"' : ''}>
            <span class="cube-project-title">
              <span>${project.title}</span>
              <span class="cube-project-icon">${project.icon}</span>
            </span>
            <span class="cube-project-meta">${project.meta}</span>
            <span class="cube-project-bar"><span style="width:${project.progress}%"></span></span>
          </a>
        `;
      })
      .join('');
  }

  if (statsGrid) {
    statsGrid.innerHTML = cubeData.stats
      .map(stat => `
        <div class="cube-stat-card">
          <span class="cube-stat-value">${stat.value}</span>
          <span class="cube-stat-label">${stat.label}</span>
        </div>
      `)
      .join('');
  }

  if (termTitle) {
    termTitle.textContent = `${cubeData.name.toLowerCase()}.dev - bash`;
  }

  const socialMap = {
    github: ['connectGithubA', 'connectGithubB'],
    linkedin: ['connectLinkedinA', 'connectLinkedinB'],
    twitter: ['connectTwitterA', 'connectTwitterB'],
  };

  Object.entries(socialMap).forEach(([key, ids]) => {
    ids.forEach(id => setAnchorState(document.getElementById(id), cubeData.socials[key]));
  });
}

function _typeString(text, roleEl, onDone) {
  let i = 0;
  currentRoleText = '';
  clearInterval(typeTimer);

  typeTimer = setInterval(() => {
    if (i < text.length) {
      currentRoleText += text[i];
      roleEl.textContent = currentRoleText;
      i += 1;
    } else {
      clearInterval(typeTimer);
      setTimeout(() => _eraseString(roleEl, onDone), 1900);
    }
  }, 55);
}

function _eraseString(roleEl, onDone) {
  clearInterval(typeTimer);

  typeTimer = setInterval(() => {
    if (currentRoleText.length > 0) {
      currentRoleText = currentRoleText.slice(0, -1);
      roleEl.textContent = currentRoleText;
    } else {
      clearInterval(typeTimer);
      if (typeof onDone === 'function') onDone();
    }
  }, 28);
}

function startTypewriter() {
  const roleEl = document.getElementById('cubeProfileRole');
  if (!roleEl || !cubeData) return;

  const roles = cubeData.roles.length ? cubeData.roles : ['AI Integration Enthusiast'];

  function nextRole() {
    _typeString(roles[roleIndex], roleEl, () => {
      roleIndex = (roleIndex + 1) % roles.length;
      nextRole();
    });
  }

  nextRole();
}

function _buildBootSequence() {
  const name = _str(_get(portfolio, 'profile', 'name'), 'dev').toLowerCase();
  const status = _str(_get(portfolio, 'profile', 'status'), 'ready');
  const projCount = _arr(_get(portfolio, 'projects')).length;

  return [
    { text: `initializing ${name}.dev...`, type: 'prompt', delay: 0 },
    { text: 'loading cube renderer...', type: 'prompt', delay: 600 },
    { text: '[  OK  ] 3d faces aligned', type: 'success', delay: 1200 },
    { text: 'fetching profile data...', type: 'prompt', delay: 1650 },
    { text: `[  OK  ] ${projCount} project(s) indexed`, type: 'success', delay: 2300 },
    { text: 'calibrating experience engine...', type: 'prompt', delay: 2700 },
    { text: `[  OK  ] status: ${status}`, type: 'success', delay: 3200 },
    { text: 'system ready_', type: 'prompt', delay: 3700 },
  ];
}

function _typeLine(text, el) {
  return new Promise(resolve => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i += 1;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, 22);
  });
}

async function runBootSequence() {
  const terminalBody = document.getElementById('terminalBody');
  if (!terminalBody) return;

  terminalBody.innerHTML = '';
  const sequence = _buildBootSequence();
  const startMs = Date.now();

  for (const entry of sequence) {
    const elapsed = Date.now() - startMs;
    const wait = Math.max(0, entry.delay - elapsed + 300);

    await new Promise(resolve => setTimeout(resolve, wait));

    const line = document.createElement('div');
    line.className = `terminal-line terminal-line--${entry.type}`;
    terminalBody.appendChild(line);
    await _typeLine(entry.text, line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  const cursorLine = document.createElement('div');
  cursorLine.className = 'terminal-line';
  cursorLine.innerHTML = '<span class="terminal-cursor" aria-hidden="true"></span>';
  terminalBody.appendChild(cursorLine);
}

function _initCardLighting() {
  const cards = document.querySelectorAll('.mode-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width * 100).toFixed(1);
      const y = ((event.clientY - rect.top) / rect.height * 100).toFixed(1);
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });
}

function _debugCubeSystem() {
  const scene = document.getElementById('profileCubeScene');
  const cube = document.getElementById('profileCube');
  const parallax = document.getElementById('profileCubeParallax');
  const issues = [];
  const requiredFaces = ['front', 'back', 'left', 'right', 'top', 'bottom'];

  if (!scene) issues.push('Missing .profile-cube-scene');
  if (!parallax) issues.push('Missing .profile-cube-parallax');
  if (!cube) issues.push('Missing .profile-cube');

  const faces = cube ? [...cube.querySelectorAll('.cube-face')] : [];
  if (faces.length !== 6) {
    issues.push(`Expected 6 cube faces, found ${faces.length}`);
  }

  requiredFaces.forEach(faceName => {
    if (!cube?.querySelector(`.cube-face--${faceName}`)) {
      issues.push(`Missing .cube-face--${faceName}`);
    }
  });

  if (scene) {
    const sceneStyle = window.getComputedStyle(scene);
    if (sceneStyle.perspective === 'none') {
      issues.push('Perspective is missing on .profile-cube-scene');
    }
  }

  if (parallax) {
    const parallaxStyle = window.getComputedStyle(parallax);
    if (parallaxStyle.transformStyle !== 'preserve-3d') {
      issues.push('.profile-cube-parallax is not preserve-3d');
    }

    if (parallax.hasAttribute('style') && /transform/i.test(parallax.getAttribute('style'))) {
      issues.push('Parallax wrapper already has an inline transform before cube init');
    }
  }

  if (cube) {
    const cubeStyle = window.getComputedStyle(cube);
    if (cubeStyle.transformStyle !== 'preserve-3d') {
      issues.push('.profile-cube is not preserve-3d');
    }

    if (cube.hasAttribute('style') && /transform/i.test(cube.getAttribute('style'))) {
      issues.push('Cube already has an inline transform before controller init');
    }
  }

  faces.forEach(face => {
    if (window.getComputedStyle(face).transform === 'none') {
      issues.push(`Face ${face.dataset.face ?? face.className} is missing a 3D transform`);
    }
  });

  if (issues.length) {
    console.groupCollapsed('[Cube Debug] Issues detected');
    issues.forEach(issue => console.warn(issue));
    console.groupEnd();
    return false;
  }

  console.info('[Cube Debug] 3D hierarchy verified', {
    faces: faces.length,
    perspective: window.getComputedStyle(scene).perspective,
    cubeTransformStyle: window.getComputedStyle(cube).transformStyle,
    parallaxTransformStyle: window.getComputedStyle(parallax).transformStyle,
  });

  return true;
}

function _initCubeSystem() {
  const shell = document.getElementById('profileCubeShell');
  const scene = document.getElementById('profileCubeScene');
  const parallax = document.getElementById('profileCubeParallax');
  const cube = document.getElementById('profileCube');
  if (!shell || !scene || !parallax || !cube) return;

  if (typeof cubeCleanup === 'function') {
    cubeCleanup();
    cubeCleanup = null;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = {
    currentX: -16,
    currentY: -28,
    targetX: -16,
    targetY: -28,
    autoY: -28,
    hovered: false,
    dragging: false,
    dragMoved: false,
    pointerId: null,
    lastPointerX: 0,
    parallaxX: 0,
    parallaxY: 0,
    targetParallaxX: 0,
    targetParallaxY: 0,
    lightX: 50,
    lightY: 34,
    targetLightX: 50,
    targetLightY: 34,
    rafId: 0,
    lastFrame: 0,
  };

  const syncVisuals = () => {
    shell.style.setProperty('--light-x', `${state.lightX.toFixed(2)}%`);
    shell.style.setProperty('--light-y', `${state.lightY.toFixed(2)}%`);
    shell.style.setProperty('--parallax-x', `${state.parallaxX.toFixed(2)}px`);
    shell.style.setProperty('--parallax-y', `${state.parallaxY.toFixed(2)}px`);
    shell.style.setProperty('--connect-parallax-x', `${(-state.parallaxX * 0.32).toFixed(2)}px`);
    shell.style.setProperty('--connect-parallax-y', `${(-state.parallaxY * 0.26).toFixed(2)}px`);
  };

  const updateTargets = event => {
    const rect = scene.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) - 0.5;
    const ny = ((event.clientY - rect.top) / rect.height) - 0.5;

    state.targetX = _clamp(-16 - (ny * 18), -28, 8);
    state.targetY = state.autoY + _clamp(nx * 26, -18, 18);
    state.targetParallaxX = _clamp(nx * 16, -12, 12);
    state.targetParallaxY = _clamp(ny * 10, -8, 8);
    state.targetLightX = _clamp(50 + (nx * 36), 12, 88);
    state.targetLightY = _clamp(34 + (ny * 24), 10, 86);
  };

  const frame = timestamp => {
    if (!state.lastFrame) state.lastFrame = timestamp;
    const delta = timestamp - state.lastFrame;
    state.lastFrame = timestamp;

    if (!reducedMotion && !state.dragging && !state.hovered) {
  // Only auto-spin when user isn't touching the cube at all
      state.autoY += delta * 0.013;
      state.autoY = state.autoY % 360; // always normalize, not just when > 360 — prevents float drift
      if (!state.hovered) {
        state.targetX = -16;
        state.targetY = state.autoY;
      }
    }

state.currentX += (state.targetX - state.currentX) * 0.18;   // was 0.1 — snappier X tracking
state.currentY += (state.targetY - state.currentY) * 0.18;   // was 0.1 — snappier Y tracking
state.parallaxX += (state.targetParallaxX - state.parallaxX) * 0.14; // was 0.08
state.parallaxY += (state.targetParallaxY - state.parallaxY) * 0.14; // was 0.08
state.lightX += (state.targetLightX - state.lightX) * 0.12;  // was 0.08
state.lightY += (state.targetLightY - state.lightY) * 0.12;  // was 0.08

    cube.style.transform = `rotateX(${state.currentX.toFixed(2)}deg) rotateY(${state.currentY.toFixed(2)}deg)`;
    syncVisuals();
    state.rafId = window.requestAnimationFrame(frame);
  };

  const handleEnter = event => {
    state.hovered = true;
  };

  const handleLeave = () => {
    if (state.dragging) return;
    state.hovered = false;
  };

  const handleDown = event => {
    if (event.button !== 0) return;
    state.dragging = true;
    state.hovered = true;
    state.dragMoved = false;
    state.pointerId = event.pointerId;
    state.lastPointerX = event.clientX;
    cube.classList.add('is-dragging');
    scene.setPointerCapture(event.pointerId);
  };

  const handleMove = event => {
    if (state.dragging) {
      const deltaX = event.clientX - state.lastPointerX;
      state.lastPointerX = event.clientX;
      state.autoY += deltaX * 0.18; // was 0.46 — now 1px mouse = 0.18deg rotation, much more controlled
      state.targetY = state.autoY;
      updateTargets(event);
      if (Math.abs(deltaX) > 1.5) state.dragMoved = true;
      return;
    }
  };

  const handleUp = event => {
    if (!state.dragging) return;
    state.dragging = false;
    cube.classList.remove('is-dragging');

    if (state.pointerId != null && scene.hasPointerCapture(state.pointerId)) {
      scene.releasePointerCapture(state.pointerId);
    }

    state.pointerId = null;

    if (!scene.matches(':hover')) {
      state.hovered = false;
      state.targetParallaxX = 0;
      state.targetParallaxY = 0;
      state.targetLightX = 50;
      state.targetLightY = 34;
      state.targetX = -16;
      state.targetY = state.autoY;
    } else if (event) {
      updateTargets(event);
    }
  };

  const preventClickAfterDrag = event => {
    if (!state.dragMoved) return;
    event.preventDefault();
    event.stopPropagation();
    state.dragMoved = false;
  };

  scene.addEventListener('pointerenter', handleEnter);
  scene.addEventListener('pointerleave', handleLeave);
  scene.addEventListener('pointerdown', handleDown);
  scene.addEventListener('pointermove', handleMove);
  scene.addEventListener('pointerup', handleUp);
  scene.addEventListener('pointercancel', handleUp);
  scene.addEventListener('click', preventClickAfterDrag, true);

  syncVisuals();
  cube.style.transform = `rotateX(${state.currentX}deg) rotateY(${state.currentY}deg)`;

  if (!reducedMotion) {
    state.rafId = window.requestAnimationFrame(frame);
  }

  cubeCleanup = () => {
    window.cancelAnimationFrame(state.rafId);
    scene.removeEventListener('pointerenter', handleEnter);
    scene.removeEventListener('pointerleave', handleLeave);
    scene.removeEventListener('pointerdown', handleDown);
    scene.removeEventListener('pointermove', handleMove);
    scene.removeEventListener('pointerup', handleUp);
    scene.removeEventListener('pointercancel', handleUp);
    scene.removeEventListener('click', preventClickAfterDrag, true);
  };
}

function _cap(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
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
    story: '> loading story_mode...',
    terminal: '> launching terminal_mode...',
    desktop: '> booting desktop_mode...',
  };

  const modeOverlay = document.getElementById('modeOverlay');
  const overlayText = document.getElementById('modeOverlayText');

  if (overlayText) overlayText.textContent = labels[mode] ?? '> loading...';
  if (modeOverlay) {
    modeOverlay.classList.add('is-active');
    modeOverlay.removeAttribute('aria-hidden');
  }

  setTimeout(() => {
    const routes = {
      story: 'portfolio.html',
      terminal: '../ui/dashboard.html',
      desktop: 'desktop.html',
    };

    window.location.href = `./${routes[mode]}`;
  }, 900);
}

function _initKeyboard() {
  document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const mode = card.dataset.mode;
        if (mode) switchMode(mode);
      }
    });
  });
}

function _restoreMode() {
  try {
    const saved = localStorage.getItem('portfolio_mode');
    if (saved) _setActiveCard(saved);
  } catch (_) {}
}

function init() {
  populateIdentity();
  _debugCubeSystem();
  startTypewriter();
  runBootSequence();
  _initCubeSystem();
  _initCardLighting();
  _initKeyboard();
  _restoreMode();
}

window.switchMode = switchMode;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
