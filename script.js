/**
 * script.js — Agniva Hait Portfolio
 *
 * Features:
 *  1. Smooth scroll for all anchor links
 *  2. Active section tracking → navbar links + sidebar sb-nav-links
 *  3. Scroll reveal (.reveal-item / .tl-item) via IntersectionObserver
 *  4. Skill bar animation (CSS transition triggered on load)
 *  5. Count-up animation for [data-count] elements (triggered on reveal)
 *  6. Timeline scroll-progress fill via CSS --tl-fill variable
 *  7. GitHub stars live fetch
 */

'use strict';

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
