/**
 * script.js — Agniva Hait Portfolio (Story Mode)
 *
 * NOW FULLY JSON-DRIVEN from data/portfolio.js
 *
 * Features:
 *  0. Dynamic rendering from portfolio.js (profile, about, skills, projects, story, contact)
 *  1. Smooth scroll for all anchor links
 *  2. Active section tracking → navbar links + sidebar sb-nav-links
 *  3. Scroll reveal (.reveal-item / .tl-item) via IntersectionObserver
 *  4. Skill bar animation (CSS transition triggered on load)
 *  5. Count-up animation for [data-count] elements (triggered on reveal)
 *  6. Timeline scroll-progress fill via CSS --tl-fill variable
 *  7. GitHub stars live fetch
 */

import { portfolio } from './data/portfolio.js';

'use strict';

/* ═════════════════════════════════════════════════════════════
   HELPER — safe data access
   ═════════════════════════════════════════════════════════════ */
const _s = (val, fallback = '') => (typeof val === 'string' && val.trim()) ? val.trim() : fallback;
const _a = (val) => Array.isArray(val) ? val : [];
const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

/* ═════════════════════════════════════════════════════════════
   0. RENDER FUNCTIONS — populate DOM from portfolio.js
   ═════════════════════════════════════════════════════════════ */

/** Proficiency estimates per skill-group label (sidebar bars need percentages) */
const SKILL_PCT = {
  'Core Stack':        [88, 80, 75, 72, 70, 68, 65],
  'Also Proficient':   [72, 68, 70, 65, 90, 66],
  'Currently Learning':[72, 65, 50, 55, 48],
  'AI & Integrations': [60, 55, 58, 62],
  'Tools & DevOps':    [85, 82, 90, 60, 75, 70],
  'Problem Solving':   [80, 78, 76],
};

function renderProfile() {
  const p = portfolio?.profile || {};
  const edu = portfolio?.education || {};
  const contact = portfolio?.contact || {};

  // Sidebar name & role
  const nameEl = document.getElementById('sidebar-name');
  const roleEl = document.getElementById('sidebar-role');
  if (nameEl) nameEl.textContent = _s(p.fullName, 'Developer');
  if (roleEl) roleEl.textContent = _s(p.roles?.[0], 'Developer');

  // Avatar initials
  const initialsEl = document.getElementById('sidebar-initials');
  if (initialsEl) {
    const full = _s(p.fullName, 'AH');
    initialsEl.textContent = full.split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  // Status tagline
  const taglineEl = document.getElementById('sidebar-tagline');
  if (taglineEl) taglineEl.textContent = _s(p.tagline, 'Building · Learning · Solving');

  // Identity list
  const idList = document.getElementById('identity-list');
  if (idList) {
    const items = [
      { icon: '📍', key: 'Location', val: _s(p.location, 'India') },
      { icon: '✉️', key: 'Email', val: _s(contact.email, '') },
      { icon: '💼', key: 'Experience', val: _s(edu.degree ? `${edu.degree.split('(')[1]?.replace(')', '') || edu.degree} ${edu.year}` : '', 'B.Tech 2nd Year') },
      { icon: '🟢', key: 'Status', val: _s(p.status, 'Open to Work') },
    ];
    idList.innerHTML = items.map(it =>
      `<li><span class="id-key">${it.icon} ${esc(it.key)}</span><span class="id-val${it.key === 'Status' ? ' id-val--open' : ''}">${esc(it.val)}</span></li>`
    ).join('');
  }

  // Navbar CTA email
  const ctaEl = document.getElementById('navbar-cta');
  if (ctaEl && contact.email) {
    ctaEl.href = `mailto:${contact.email}`;
  }
}

function renderAbout() {
  const about = portfolio?.about || {};

  // Quote
  const quoteEl = document.getElementById('about-quote');
  if (quoteEl) quoteEl.textContent = _s(about.short, 'I build systems, not just apps.');

  // Summary
  const sumEl = document.getElementById('about-summary');
  if (sumEl) sumEl.textContent = _s(about.summary, '');

  // Interests
  const interestsList = document.getElementById('interests-list');
  if (interestsList) {
    interestsList.innerHTML = _a(about.interests).map(i => `<li>${esc(i)}</li>`).join('');
  }

  // Achievement cards
  const achieveGrid = document.getElementById('achievements-grid');
  if (achieveGrid) {
    const highlights = _a(about.highlights);
    const dsaCount = portfolio?.terminal?.dsa?.count || '400+';
    const edu = portfolio?.education || {};

    // Map highlights into card configs with appropriate icons/badges
    const cards = [
      {
        icon: '🧩', badge: 'DSA', badgeClass: 'ac-cyan',
        value: dsaCount, isCount: true,
        desc: `Problems solved across ${_a(portfolio?.terminal?.dsa?.platforms).join(' & ') || 'LeetCode & GFG'}`
      },
      {
        icon: '🎓', badge: 'Academic', badgeClass: 'ac-purple',
        value: _s(edu.degree?.split('(')[1]?.replace(')', ''), 'B.Tech'),
        desc: `${_s(edu.field, 'Computer Science & Engineering')}, ${_s(edu.year, '2nd Year')}`
      },
      {
        icon: '🐙', badge: 'GitHub', badgeClass: 'ac-green',
        value: '—', isGhStars: true,
        desc: 'Stars across public repositories'
      },
    ];

    achieveGrid.innerHTML = cards.map(c => {
      const countAttrs = c.isCount ? ` data-count="${parseInt(c.value)}" data-suffix="+"` : '';
      const ghId = c.isGhStars ? ' id="gh-stars" data-suffix="+"' : '';
      const displayVal = c.isCount ? '0' : esc(c.value);
      return `<article class="achieve-card reveal-item">
        <div class="ac-top"><span>${c.icon}</span><span class="ac-badge ${c.badgeClass}">${esc(c.badge)}</span></div>
        <p class="ac-val"${countAttrs}${ghId}>${displayVal}</p>
        <p class="ac-desc">${esc(c.desc)}</p>
      </article>`;
    }).join('');
  }
}

function renderSkills() {
  const skillGroups = _a(portfolio?.skills);

  // Sidebar skill bars — flatten top items from each group
  const skillsList = document.getElementById('skills-list');
  if (skillsList && skillGroups.length) {
    const barItems = [];
    for (const group of skillGroups) {
      const pcts = SKILL_PCT[group.label] || [];
      _a(group.items).forEach((name, i) => {
        if (barItems.length < 8) {
          barItems.push({ name, pct: pcts[i] || 60 });
        }
      });
      if (barItems.length >= 8) break;
    }
    // Sort by pct descending for visual impact
    barItems.sort((a, b) => b.pct - a.pct);

    skillsList.innerHTML = barItems.map(sk =>
      `<li class="skill-item"><div class="skill-meta"><span class="skill-name">${esc(sk.name)}</span><span class="skill-pct">${sk.pct}%</span></div><div class="skill-bar"><div class="skill-bar__fill" style="--tw:${sk.pct}%"></div></div></li>`
    ).join('');
  }

  // Skills panel (sticky right in Journey) — use skill groups from portfolio.js
  const skillsPanel = document.getElementById('skills-panel');
  if (skillsPanel && skillGroups.length) {
    // Take first 4 groups for the panel cards
    const panelGroups = skillGroups.slice(0, 4);
    skillsPanel.innerHTML = panelGroups.map((group, i) => {
      const items = _a(group.items).slice(0, 4);
      return `<div class="skill-card" id="skc-group-${i}">
        <div class="skc-icon">⬡</div>
        <h4 class="skc-title">${esc(group.label)}</h4>
        <ul class="skc-list">${items.map(it => `<li>${esc(it)}</li>`).join('')}</ul>
      </div>`;
    }).join('');
  }
}

function renderSocials() {
  const contact = portfolio?.contact || {};
  const socialsEl = document.getElementById('sidebar-socials');
  if (!socialsEl) return;

  const svgs = {
    github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
    linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    email: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  };

  let html = '';
  if (contact.github)   html += `<a href="${contact.github}" target="_blank" rel="noopener" class="social-icon" aria-label="GitHub" title="GitHub">${svgs.github}</a>`;
  if (contact.linkedin) html += `<a href="${contact.linkedin}" target="_blank" rel="noopener" class="social-icon" aria-label="LinkedIn" title="LinkedIn">${svgs.linkedin}</a>`;
  if (contact.email)    html += `<a href="mailto:${contact.email}" class="social-icon" aria-label="Email" title="Email">${svgs.email}</a>`;
  socialsEl.innerHTML = html;
}

function renderStory() {
  const story = _a(portfolio?.story);
  const timelineContainer = document.getElementById('timeline-container');
  if (!timelineContainer || !story.length) return;

  // Keep the track element, append items after it
  timelineContainer.innerHTML = '<div class="timeline__track" aria-hidden="true"></div>';

  story.forEach((phase, i) => {
    const isLast = i === story.length - 1;
    const activeNodeCls = isLast ? ' tl-node--active' : '';
    const activeDotCls = isLast ? ' node-dot--active' : '';
    const activeCardCls = isLast ? ' tl-card--active' : '';
    const nowBadge = isLast ? '<span class="tl-now-badge">● NOW</span>' : '';
    const contentText = _a(phase.content).join('. ') + '.';

    timelineContainer.innerHTML += `
      <div class="tl-item reveal-item" data-index="${i}">
        <div class="tl-node${activeNodeCls}"><div class="node-dot${activeDotCls}"></div><span class="node-date">${esc(phase.date || '')}</span></div>
        <div class="tl-body">
          <div class="tl-card${activeCardCls}">
            ${nowBadge}
            <h3 class="tl-title">${esc(phase.title || '')}</h3>
            <p class="tl-text">${esc(contentText)}</p>
          </div>
        </div>
      </div>`;
  });
}

function renderProjects() {
  const projects = _a(portfolio?.projects);
  if (!projects.length) return;

  // Separate featured from secondary
  const featured = projects.find(p => p.featured);
  const secondary = projects.filter(p => !p.featured);

  // Featured project
  const featuredContainer = document.getElementById('featured-project');
  if (featuredContainer && featured) {
    const statusCls = featured.status === 'completed' ? 'proj-status--live' : 'proj-status--dev';
    const statusLabel = featured.status === 'completed' ? '● Live' : '◐ In Dev';
    const ghLink = featured.links?.github 
      ? `<a href="${featured.links.github}" target="_blank" rel="noopener" class="proj-btn proj-btn--ghost">GitHub ↗</a>` 
      : `<span class="proj-btn proj-btn--ghost" style="opacity:0.4;cursor:default;">GitHub</span>`;
    const liveLink = featured.links?.live 
      ? `<a href="${featured.links.live}" target="_blank" rel="noopener" class="proj-btn proj-btn--primary" aria-label="Live demo">Live Demo ↗</a>` 
      : `<span class="proj-btn proj-btn--ghost" style="opacity:0.4;cursor:default;">Coming Soon</span>`;

    featuredContainer.innerHTML = `
      <div class="proj-featured__meta">
        <div class="proj-header">
          <span class="proj-status ${statusCls}">${statusLabel}</span>
          <h3 class="proj-title">${esc(featured.title)}</h3>
          <p class="proj-tagline">${esc(featured.description || featured.tagline || '')}</p>
        </div>
        <div class="proj-tags">${_a(featured.tech).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
        <div class="proj-actions">${ghLink}${liveLink}</div>
      </div>
      <div class="proj-featured__visual" aria-hidden="true">
        <div class="proj-visual-block">
          <div class="pvb-line"></div><div class="pvb-line"></div><div class="pvb-line pvb-line--short"></div>
          <div class="pvb-dot-row"><span></span><span></span><span></span></div>
        </div>
      </div>`;
  }

  // Secondary project cards
  const projGrid = document.getElementById('proj-grid');
  if (projGrid) {
    projGrid.innerHTML = secondary.map(p => {
      const statusCls = p.status === 'completed' ? 'proj-status--live' : 'proj-status--dev';
      const statusLabel = p.status === 'completed' ? '● Live' : '◐ In Dev';
      const ghLink = p.links?.github 
        ? `<a href="${p.links.github}" target="_blank" rel="noopener" class="proj-btn proj-btn--ghost">GitHub ↗</a>` 
        : `<span class="proj-btn proj-btn--ghost" style="opacity:0.4;cursor:default;">GitHub</span>`;
      const liveLink = p.links?.live 
        ? `<a href="${p.links.live}" target="_blank" rel="noopener" class="proj-btn proj-btn--primary">Live Demo ↗</a>` 
        : `<span class="proj-btn proj-btn--ghost" style="opacity:0.4;cursor:default;">Coming Soon</span>`;

      return `<article class="proj-card reveal-item">
        <div class="proj-header">
          <span class="proj-status ${statusCls}">${statusLabel}</span>
          <h3 class="proj-title">${esc(p.title)}</h3>
        </div>
        <p class="proj-tagline">${esc(p.description || p.tagline || '')}</p>
        <div class="proj-tags">${_a(p.tech).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
        <div class="proj-actions">${ghLink}${liveLink}</div>
      </article>`;
    }).join('');
  }
}

function renderContact() {
  const contact = portfolio?.contact || {};

  const contactInfo = document.getElementById('contact-info');
  if (contactInfo) {
    let html = '';
    if (contact.email) {
      html += `<a href="mailto:${contact.email}" class="contact-card">
        <span class="cc-icon">✉️</span>
        <div class="cc-text"><span class="cc-label">Email</span><span class="cc-val">${esc(contact.email)}</span></div>
      </a>`;
    }
    if (contact.github) {
      const ghUser = contact.github.split('/').filter(Boolean).pop() || '';
      html += `<a href="${contact.github}" target="_blank" rel="noopener" class="contact-card">
        <span class="cc-icon">🐙</span>
        <div class="cc-text"><span class="cc-label">GitHub</span><span class="cc-val">${esc(ghUser)}</span></div>
      </a>`;
    }
    if (contact.linkedin) {
      const liUser = contact.linkedin.split('/').filter(Boolean).pop() || '';
      html += `<a href="${contact.linkedin}" target="_blank" rel="noopener" class="contact-card">
        <span class="cc-icon">💼</span>
        <div class="cc-text"><span class="cc-label">LinkedIn</span><span class="cc-val">${esc(liUser)}</span></div>
      </a>`;
    }
    contactInfo.innerHTML = html;
  }
}


/* ═════════════════════════════════════════════════════════════
   INITIALIZATION — render all dynamic content, then bind observers
   ═════════════════════════════════════════════════════════════ */

// Step 1: Render dynamic content
renderProfile();
renderAbout();
renderSkills();
renderSocials();
renderStory();
renderProjects();
renderContact();

// Step 2: Bind all existing features on the now-populated DOM

/* ─────────────────────────────────────────────────────────────
   1. SMOOTH SCROLL
   ───────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* ─────────────────────────────────────────────────────────────
   2. ACTIVE SECTION TRACKING (navbar + sidebar)
   ───────────────────────────────────────────────────────────── */
const SECTION_IDS = ['about', 'journey', 'projects', 'contact'];
const sections    = SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean);

// All nav links in both navbar and sidebar share the same data-section attr
const allNavLinks = document.querySelectorAll('.nav-link[data-section], .sb-nav-link[data-section]');

function setActiveSection(id) {
  allNavLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === id);
  });
}

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActiveSection(entry.target.id);
  });
}, {
  rootMargin: '-38% 0px -57% 0px', // active when section occupies the middle band
  threshold: 0
});

sections.forEach(s => sectionObserver.observe(s));


/* ─────────────────────────────────────────────────────────────
   3. SCROLL REVEAL
   ───────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    // .tl-item uses data-index for stagger; .reveal-item fires immediately
    const delay = el.classList.contains('tl-item') && el.dataset.index
      ? Number(el.dataset.index) * 130
      : 0;
    setTimeout(() => {
      el.classList.add('visible');
      // If element has a count-up target, start it once visible
      const countEl = el.querySelector('[data-count]') || (el.dataset.count ? el : null);
      if (countEl) animateCount(countEl);
    }, delay);
    revealObserver.unobserve(el);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-item, .tl-item').forEach(el => revealObserver.observe(el));


/* ─────────────────────────────────────────────────────────────
   4. SKILL BAR ANIMATION
   The bars start at width:0 in CSS; we push them to --tw after
   a short settle delay so the transition is clearly visible.
   ───────────────────────────────────────────────────────────── */
setTimeout(() => {
  document.querySelectorAll('.skill-bar__fill').forEach(bar => {
    const target = bar.style.getPropertyValue('--tw');
    if (target) bar.style.width = target;
  });
}, 350);


/* ─────────────────────────────────────────────────────────────
   5. COUNT-UP ANIMATION
   Elements: <p data-count="400" data-suffix="+">0</p>
   Duration: ~1 000ms, easeOut
   ───────────────────────────────────────────────────────────── */
function animateCount(el) {
  const target   = parseInt(el.dataset.count, 10);
  const suffix   = el.dataset.suffix || '';
  const duration = 1000; // ms
  const start    = performance.now();

  // If already animated, skip
  if (el.dataset.counted) return;
  el.dataset.counted = '1';

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOut cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Also observe achievement cards directly (they have data-count on the p element)
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));


/* ─────────────────────────────────────────────────────────────
   6. TIMELINE SCROLL PROGRESS FILL
   Reads the bounding rect of .timeline and updates --tl-fill
   (a CSS custom property) to drive the track gradient fill.
   Uses requestAnimationFrame-throttled scroll for performance.
   ───────────────────────────────────────────────────────────── */
const timelineEl = document.querySelector('.timeline');

if (timelineEl) {
  let rafPending = false;

  function updateTimelineFill() {
    const rect      = timelineEl.getBoundingClientRect();
    const vh        = window.innerHeight;
    // How much of the timeline has scrolled past the viewport midpoint
    const travelled = Math.max(0, (vh * 0.5) - rect.top);
    const total     = rect.height;
    const pct       = Math.min(100, (travelled / total) * 100).toFixed(1);
    timelineEl.style.setProperty('--tl-fill', pct + '%');
    rafPending = false;
  }

  window.addEventListener('scroll', () => {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(updateTimelineFill);
    }
  }, { passive: true });

  // Initial call in case section is already in view
  updateTimelineFill();
}


/* ─────────────────────────────────────────────────────────────
   7. GITHUB STARS FETCH
   Fetches public repo list, sums stargazers, then triggers
   count-up on #gh-stars if count data attr is set.
   ───────────────────────────────────────────────────────────── */
async function fetchGitHubStars() {
  const el = document.getElementById('gh-stars');
  if (!el) return;
  try {
    const res = await fetch('https://api.github.com/users/Agniva-07/repos?per_page=100');
    if (!res.ok) throw new Error('GitHub API error');
    const repos   = await res.json();
    const total   = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    if (total > 0) {
      // Store as data-count so count-up can animate it
      el.dataset.count  = total;
      el.dataset.suffix = '+';
      el.dataset.counted = ''; // reset so animateCount can run
      el.textContent = '0';
      // If already in viewport, trigger immediately; otherwise observer handles it
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) animateCount(el);
    } else {
      el.textContent = '—';
    }
  } catch {
    el.textContent = '—';
  }
}
fetchGitHubStars();
