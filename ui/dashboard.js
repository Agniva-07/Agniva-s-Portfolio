/**
 * dashboard.js — Premium left-panel renderer
 * 100% dynamic from portfolio.js
 */
import { portfolio } from '../data/portfolio.js';

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function el(tag, cls, html = '') {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

function sectionCard(label, ...children) {
  const w = el('div', 'glass-card section-block');
  w.innerHTML = `<div class="section-header"><span class="section-icon">⬡</span><span class="section-label">${esc(label)}</span><span class="section-line"></span></div>`;
  children.forEach(c => w.appendChild(c));
  return w;
}

// ── HERO ROW: Profile + About side-by-side ────────────────────────────────────
function buildHeroRow() {
  const p = portfolio?.profile || {};
  const a = portfolio?.about || {};
  const row = el('div', 'hero-row');

  // Profile card
  const prof = el('div', 'glass-card profile-card');
  const avatarChar = (p.name || 'A').charAt(0).toUpperCase();
  const avatarInner = p.avatar
    ? `<img class="avatar-img" src="${p.avatar}" alt="${esc(p.fullName)}" />`
    : `<span class="avatar-letter">${avatarChar}</span>`;

  prof.innerHTML = `
    <div class="avatar-wrap">
      <div class="avatar-ring"><div class="avatar-inner">${avatarInner}</div></div>
      <div class="avatar-status"></div>
    </div>
    <div class="profile-name">${esc(p.fullName || 'Developer')}</div>
    <div class="role-rotator"><span>${esc((p.roles || ['Developer'])[0])}</span></div>
    <div class="status-badge">${esc(p.status || 'Available')}</div>
    <div class="profile-location">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
      ${esc(p.location || '')}
    </div>`;

  // Role rotation
  const roleSpan = prof.querySelector('.role-rotator span');
  let roleIdx = 0;
  setInterval(() => {
    roleIdx = (roleIdx + 1) % (p.roles || []).length;
    roleSpan.style.animation = 'none';
    void roleSpan.offsetWidth;
    roleSpan.textContent = (p.roles || [])[roleIdx];
    roleSpan.style.animation = '';
  }, 3000);

  // About card
  const about = el('div', 'glass-card about-card');
  const coreSkills = (portfolio?.skills || []).find(s => s.label === 'Core Stack');
  const techIcons = (coreSkills?.items || ['JavaScript','React','Node.js','MongoDB','HTML','CSS']).slice(0, 8);

  about.innerHTML = `
    <div class="section-header"><span class="section-icon">◈</span><span class="section-label">About Me</span><span class="section-line"></span></div>
    <p class="about-text">${esc(a.summary || 'Developer building impactful systems.')}</p>
    <div class="tech-icon-row">${techIcons.map(t => `<div class="tech-icon-btn"><span>${esc(t)}</span></div>`).join('')}</div>`;

  row.appendChild(prof);
  row.appendChild(about);
  return row;
}

// ── FEATURED PROJECTS GRID ────────────────────────────────────────────────────
function buildProjects() {
  const projects = portfolio?.projects || [];
  const featured = projects.filter(p => p.featured);
  const list = featured.length ? featured : projects.slice(0, 4);

  const grid = el('div', 'projects-grid');
  list.forEach(p => {
    const card = el('div', 'project-card');
    const sc = p.status === 'completed' ? 'status-done' : 'status-wip';
    const ghLink = p.links?.github ? `<a href="${p.links.github}" target="_blank" class="proj-link">↗ GitHub</a>` : '';
    const liveLink = p.links?.live ? `<a href="${p.links.live}" target="_blank" class="proj-link">↗ Live</a>` : '';

    card.innerHTML = `
      <div class="proj-gradient-bar"></div>
      <div class="proj-header">
        <span class="proj-title">${esc(p.title)}</span>
        <span class="proj-status ${sc}">${esc(p.status?.replace('-',' ') || '')}</span>
      </div>
      <p class="proj-desc">${esc(p.description || '')}</p>
      <div class="proj-tech">${(p.tech || []).map(t => `<span class="tech-pill">${esc(t)}</span>`).join('')}</div>
      <div class="proj-links">${ghLink}${liveLink}</div>`;
    grid.appendChild(card);
  });
  return sectionCard('Featured Projects', grid);
}

// ── SKILLS WITH PROGRESS BARS ─────────────────────────────────────────────────
function buildSkills() {
  const skills = portfolio?.skills || [];
  const colorMap = {
    'Core Stack': { color: 'var(--cyan)', pct: 92 },
    'Also Proficient': { color: 'var(--blue)', pct: 80 },
    'Currently Learning': { color: 'var(--purple)', pct: 45 },
    'AI & Integrations': { color: 'var(--pink)', pct: 70 },
    'Tools & DevOps': { color: 'var(--green)', pct: 85 },
    'Problem Solving': { color: 'var(--amber)', pct: 88 },
  };

  const grid = el('div', 'skills-grid');
  skills.forEach(group => {
    const meta = colorMap[group.label] || { color: 'var(--cyan)', pct: 60 };
    const g = el('div', 'skill-card');
    g.innerHTML = `
      <div class="skill-card-header">
        <span class="skill-label">${esc(group.label)}</span>
        <span class="skill-pct" style="color:${meta.color}">${meta.pct}%</span>
      </div>
      <div class="skill-bar-track"><div class="skill-bar-fill" style="width:0%;background:${meta.color}" data-pct="${meta.pct}"></div></div>
      <div class="skill-tags">${group.items.map(i => `<span class="skill-tag">${esc(i)}</span>`).join('')}</div>`;
    grid.appendChild(g);
  });

  // Animate bars on scroll into view
  setTimeout(() => {
    grid.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
  }, 600);

  return sectionCard('Skills & Expertise', grid);
}

// ── STATS ROW ─────────────────────────────────────────────────────────────────
function buildStats() {
  const storyLen = portfolio?.story?.length || 0;
  const projCount = portfolio?.projects?.length || 0;
  const dsaCount = portfolio?.terminal?.dsa?.count || '0';

  const stats = [
    { icon: '⏱', number: `${storyLen > 0 ? storyLen * 4 : 8}+`, label: 'Months Exp', color: 'var(--cyan)' },
    { icon: '🚀', number: `${projCount}`, label: 'Projects', color: 'var(--blue)' },
    { icon: '🧠', number: dsaCount, label: 'DSA Solved', color: 'var(--purple)' },
    { icon: '⚡', number: `${(portfolio?.skills || []).reduce((a,s) => a + s.items.length, 0)}+`, label: 'Tech Skills', color: 'var(--green)' },
  ];

  const row = el('div', 'stats-row');
  stats.forEach(s => {
    const card = el('div', 'stat-card');
    card.innerHTML = `
      <div class="stat-icon">${s.icon}</div>
      <span class="stat-number" style="background:linear-gradient(135deg, ${s.color}, ${s.color}88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${esc(s.number)}</span>
      <span class="stat-label">${esc(s.label)}</span>`;
    row.appendChild(card);
  });
  return row;
}

// ── SOCIAL LINKS ──────────────────────────────────────────────────────────────
function buildSocial() {
  const c = portfolio?.contact || {};
  const links = el('div', 'social-links');
  if (c.github) links.innerHTML += `<a href="${c.github}" target="_blank" class="social-btn github"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013.01-.4c1.02.01 2.05.14 3.01.4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>GitHub</a>`;
  if (c.linkedin) links.innerHTML += `<a href="${c.linkedin}" target="_blank" class="social-btn linkedin"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>LinkedIn</a>`;
  if (c.email) links.innerHTML += `<a href="mailto:${c.email}" class="social-btn email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>Email</a>`;
  
  const wrap = el('div', 'glass-card social-card');
  wrap.innerHTML = `<div class="section-header"><span class="section-icon">◉</span><span class="section-label">Connect</span><span class="section-line"></span></div>`;
  wrap.appendChild(links);
  return wrap;
}

// ── MOUNT ─────────────────────────────────────────────────────────────────────
export function initDashboard() {
  const panel = document.getElementById('dashboard-panel');
  if (!panel) return;

  panel.appendChild(buildHeroRow());
  panel.appendChild(buildStats());
  panel.appendChild(buildProjects());
  panel.appendChild(buildSkills());
  panel.appendChild(buildSocial());
}
