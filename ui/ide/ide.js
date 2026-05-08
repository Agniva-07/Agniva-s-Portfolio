/* IDE MODE — ui/ide/ */

let openTabs = [];
let activeTab = null;

// ─── Boot ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  updateClock();
  setInterval(updateClock, 30000);
});

function loadData() {
  // Remove any previous script to avoid duplicate loads
  const existing = document.getElementById('ide-data-script');
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.id = 'ide-data-script';
  // Adjust path relative to ui/ide/ide.html
  script.src = '../../data/idedata.js';
  script.onload  = () => setTimeout(initIDE, 50);
  script.onerror = () => {
    console.warn('idedata.js not found — using fallback data');
    window.ideData = buildFallback();
    setTimeout(initIDE, 50);
  };
  document.head.appendChild(script);
}

function initIDE() {
  setupSidebar();
  setupActivityBar();
  if (openTabs.length === 0) openFile('home.tsx');
}

// ─── Clock ───────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const t = now.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' });
  const d = now.toLocaleDateString('en-GB').replace(/\//g, '-');
  const el = document.getElementById('status-clock');
  if (el) el.textContent = `${t} ${d}`;
}

// ─── Sidebar ─────────────────────────────────────────────────
function setupSidebar() {
  document.querySelectorAll('.file-row').forEach(row => {
    row.addEventListener('click', () => {
      const file = row.getAttribute('data-file');
      if (file) openFile(file);
    });
  });
}

// ─── Activity Bar ────────────────────────────────────────────
function setupActivityBar() {
  const sidebar      = document.getElementById('sidebar');
  const copilotPanel = document.getElementById('copilot-panel');

  document.querySelectorAll('.activity-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      if (icon.id === 'btn-copilot') {
        copilotPanel.classList.toggle('open');
        return;
      }
      // Explorer toggles sidebar; others collapse it
      document.querySelectorAll('.activity-icon').forEach(i => {
        if (i.id !== 'btn-copilot') i.classList.remove('active');
      });
      icon.classList.add('active');

      if (icon.id === 'btn-explorer') {
        sidebar.classList.toggle('closed');
      } else {
        sidebar.classList.add('closed');
      }
    });
  });
}

// ─── Tab Management ──────────────────────────────────────────
function openFile(filename) {
  if (filename === 'resume.pdf') {
    // If resume URL available open it, else do nothing
    const d = getData();
    if (d.contact && d.contact.resume) window.open(d.contact.resume, '_blank');
    return;
  }

  if (!openTabs.includes(filename)) openTabs.push(filename);
  activeTab = filename;

  renderTabBar();
  highlightSidebar();
  renderContent(filename);
}

window.closeTab = function(e, filename) {
  e.stopPropagation();
  const idx = openTabs.indexOf(filename);
  if (idx < 0) return;
  openTabs.splice(idx, 1);

  if (activeTab === filename) {
    if (openTabs.length > 0) {
      activeTab = openTabs[Math.max(0, idx - 1)];
      renderContent(activeTab);
    } else {
      activeTab = null;
      renderEmpty();
    }
  }
  renderTabBar();
  highlightSidebar();
};

function renderTabBar() {
  const bar = document.getElementById('tab-bar');
  bar.innerHTML = '';

  openTabs.forEach(file => {
    const ext = file.split('.').pop();
    const tab = document.createElement('div');
    tab.className = 'tab' + (file === activeTab ? ' active' : '');
    tab.onclick = () => openFile(file);
    tab.innerHTML = `
      <span class="tab-dot ${ext}"></span>
      ${file}
      <span class="tab-close" onclick="closeTab(event,'${file}')">×</span>
    `;
    bar.appendChild(tab);
  });
}

function highlightSidebar() {
  document.querySelectorAll('.file-row').forEach(row => {
    row.classList.toggle('active', row.getAttribute('data-file') === activeTab);
  });
}

// ─── Breadcrumb ──────────────────────────────────────────────
function setBreadcrumb(filename) {
  const ext = filename.split('.').pop();
  document.getElementById('breadcrumb').innerHTML =
    `agniva-hait <span class="bc-sep">›</span> src <span class="bc-sep">›</span> <span class="bc-file"><span class="bc-file-dot ${ext}" style="background:${dotColor(ext)}"></span>${filename}</span>`;
}

function dotColor(ext) {
  const map = { tsx:'#007acc', html:'#e34c26', json:'#cbcb41', js:'#e8c84d', ts:'#3178c6', css:'#563d7c', md:'rgba(255,255,255,0.65)', pdf:'#f14c4c' };
  return map[ext] || '#8b949e';
}

// ─── Empty state ─────────────────────────────────────────────
function renderEmpty() {
  document.getElementById('breadcrumb').innerHTML = '';
  document.getElementById('editor-content').innerHTML = `
    <div class="empty-state">
      <svg viewBox="0 0 100 100" width="120" height="120" fill="currentColor">
        <rect x="10" y="20" width="80" height="60" rx="4" opacity=".15"/>
        <rect x="20" y="35" width="40" height="4" rx="2" opacity=".25"/>
        <rect x="20" y="45" width="55" height="4" rx="2" opacity=".2"/>
        <rect x="20" y="55" width="30" height="4" rx="2" opacity=".15"/>
      </svg>
      <p>Select a file to open</p>
    </div>`;
}

// ─── Data access ─────────────────────────────────────────────
function getData() {
  return window.ideData || buildFallback();
}

// ─── Main Render ─────────────────────────────────────────────
function renderContent(filename) {
  setBreadcrumb(filename);
  const el = document.getElementById('editor-content');
  const d  = getData();

  const renderers = {
    'home.tsx':      () => renderHome(d),
    'about.html':    () => renderAbout(d),
    'skills.json':   () => renderSkills(d),
    'projects.js':   () => renderProjects(d),
    'experience.ts': () => renderExperience(d),
    'contact.css':   () => renderContact(d),
    'README.md':     () => renderReadme(d),
  };

  const fn = renderers[filename];
  el.innerHTML = fn ? fn() : `<div class="empty-state"><p>File not found: ${filename}</p></div>`;

  // Post-render effects
  if (filename === 'skills.json') animateSkillBars();
}

// ════════════════════════════════════════════════════════════
//  HOME.TSX
// ════════════════════════════════════════════════════════════
function renderHome(d) {
  const h = d.home || {};
  const m = d.meta || {};
  const p = d.projects || [];

  const stats = (h.stats || [
    { value:'400+', label:'DSA SOLVED'  },
    { value:'3',    label:'PROJECTS'    },
    { value:'∞',    label:'CURIOSITY'   },
    { value:'10+',  label:'TECH SKILLS' },
  ]).map(s => `
    <div class="home-stat">
      <div class="hs-val">${s.value}</div>
      <div class="hs-label">${s.label}</div>
    </div>`).join('');

  const featuredProjs = p.slice(0, 2).map(pr => `
    <div class="home-proj-card">
      <div class="home-proj-title">${pr.title}</div>
      <div class="home-proj-desc">${pr.description}</div>
      <div class="hp-tags">${(pr.tags||pr.tech||[]).map(t=>`<span class="hp-tag">${t}</span>`).join('')}</div>
    </div>`).join('');

  return `
    <div class="home-page">
      <div class="home-name">${m.name || 'Agniva Hait'}</div>
      <div class="home-role-const">
        <span class="kw">const</span> role = <span class="str">"${m.role || 'Full Stack Developer'}"</span>;
      </div>
      <div class="home-status-badge">
        <span class="sdot"></span>${m.status || 'Open to Opportunities'}
      </div>
      <div class="home-stats-grid">${stats}</div>
      ${featuredProjs ? `<div style="margin-bottom:12px;font-size:11px;letter-spacing:.12em;color:rgba(0,212,255,.55);text-transform:uppercase;font-family:var(--font-mono);">Featured Projects</div>
      <div class="home-projects-grid">${featuredProjs}</div>` : ''}
    </div>`;
}

// ════════════════════════════════════════════════════════════
//  ABOUT.HTML
// ════════════════════════════════════════════════════════════
function renderAbout(d) {
  const a = d.about || {};

  const traits = (a.traits || [
    { icon:'⚡', title:"I don't just code, I solve", color:'#ffc947', description:"I break down complex problems, design efficient solutions, and build systems that actually matter." },
    { icon:'🤖', title:'I build with AI',            color:'#9b5de5', description:"I integrate AI tools and APIs to build smarter, faster, and more adaptive applications."           },
    { icon:'📡', title:'I learn everything',         color:'#00d4ff', description:"From DSA to system design to backend and UI — I constantly explore and improve."                    },
  ]).map(t => `
    <div class="trait-card">
      <div class="trait-icon">${t.icon}</div>
      <div class="trait-title" style="color:${t.color}">${t.title}</div>
      <div class="trait-desc">${t.description}</div>
    </div>`).join('');

  const interests = (a.interests || []).map(i =>
    `<span class="interest-chip">${i}</span>`).join('');

  const extended = (a.extended || a.full || '').trim()
    .split('\n').map(l => l.trim() === '' ? '<br>' : `<span>${l.startsWith('→') ? `<span class="arrow">→</span>${l.slice(1)}` : l}</span>`).join('\n');

  return `
    <div class="about-page">
      <div class="sec-title">About</div>
      <div class="sec-subtitle">// cd ~/portfolio &nbsp;&nbsp; ABOUT ME</div>
      <div class="about-quote">"${a.quote || 'I build scalable systems, not just frontend screens.'}"</div>
      ${extended ? `<div class="about-extended">${extended}</div>` : ''}
      <div class="trait-grid">${traits}</div>
      ${interests ? `<div style="margin-bottom:8px;font-size:10.5px;letter-spacing:.13em;color:rgba(0,212,255,.55);text-transform:uppercase;font-family:var(--font-mono);">Interests</div>
      <div class="interests-row">${interests}</div>` : ''}
    </div>`;
}

// ════════════════════════════════════════════════════════════
//  SKILLS.JSON
// ════════════════════════════════════════════════════════════
function renderSkills(d) {
  const s  = d.skills || {};
  const cats = s.categories || [];

  const catHTML = cats.map(cat => `
    <div class="skill-category">
      <div class="skill-cat-heading">${cat.name}</div>
      <div class="skill-rows">
        ${(cat.skills || []).map(sk => `
          <div class="skill-row">
            <div class="skill-name">${sk.name}</div>
            <div class="skill-track">
              <div class="skill-fill" data-width="${sk.pct}%" data-color="${sk.color}" style="background:${sk.color};width:0%"></div>
            </div>
            <div class="skill-pct" style="color:${sk.color}">${sk.pct}%</div>
          </div>`).join('')}
      </div>
    </div>`).join('');

  return `
    <div class="skills-page">
      <div class="sec-title">Skills</div>
      <div class="sec-subtitle">${s.meta || '{ "status": "always_learning", "passion": "immeasurable" }'}</div>
      <div class="skills-grid-2col">${catHTML}</div>
    </div>`;
}

function animateSkillBars() {
  setTimeout(() => {
    document.querySelectorAll('.skill-fill').forEach((bar, i) => {
      const w = bar.getAttribute('data-width');
      const c = bar.getAttribute('data-color') || '#00d4ff';
      setTimeout(() => {
        bar.style.width = w;
        bar.style.boxShadow = `0 0 8px ${c}66`;
      }, i * 55);
    });
  }, 120);
}

// ════════════════════════════════════════════════════════════
//  PROJECTS.JS
// ════════════════════════════════════════════════════════════
function renderProjects(d) {
  const projects = d.projects || [];
  const icons = ['🚀','🎵','💬','⚡','🧠','🛠️'];

  const cards = projects.map((p, i) => {
    const statusClass = p.status === 'In Dev' ? 'indev' : p.status === 'Live' || p.status === 'Completed' ? (p.status === 'Live' ? 'live' : 'done') : 'done';
    const catParts = (p.category || '').split('·').map(s => s.trim()).filter(Boolean);
    const catHTML  = catParts.map((c,j) => `${c}${j<catParts.length-1?'<span class="dot-sep">·</span>':''}`).join('');

    const highlightsHTML = (p.highlights||[]).length ? `
      <ul class="proj-highlights">
        ${p.highlights.map(h=>`<li>${h}</li>`).join('')}
      </ul>` : '';

    return `
      <div class="proj-card">
        <div class="proj-top">
          <span class="proj-icon">${icons[i % icons.length]}</span>
          <div class="proj-links-row">
            ${p.github ? `<a href="${p.github}" target="_blank" class="proj-btn gh">GitHub ↗</a>` : ''}
            ${p.live   ? `<a href="${p.live}"   target="_blank" class="proj-btn live">Live ↗</a>` : ''}
          </div>
        </div>
        ${p.status ? `<div class="status-badge ${statusClass}"><span class="bdot"></span>${p.status}</div>` : ''}
        ${catHTML   ? `<div class="proj-category">${catHTML}</div>` : ''}
        <div class="proj-title-text">${p.title}</div>
        <div class="proj-desc-text">${p.description}</div>
        ${highlightsHTML}
        <div class="hp-tags">${(p.tags||p.tech||[]).map(t=>`<span class="hp-tag">${t}</span>`).join('')}</div>
      </div>`;
  }).join('');

  return `
    <div class="projects-page">
      <div class="sec-title">Projects</div>
      <div class="sec-subtitle">const projects = [ ...shipped, ...building ]</div>
      <div class="proj-grid">${cards}</div>
    </div>`;
}

// ════════════════════════════════════════════════════════════
//  EXPERIENCE.TS
// ════════════════════════════════════════════════════════════
function renderExperience(d) {
  const exp = d.experience || [];
  const lastIdx = exp.length - 1;

  const entries = exp.map((e, i) => {
    const bullets = (e.bullets||e.content||[]).map(b=>`<li>${b}</li>`).join('');
    const tags    = (e.tags||e.tech||[]).map(t=>`<span class="hp-tag">${t}</span>`).join('');

    return `
      <div class="timeline-entry">
        <div class="tl-dot ${i === lastIdx ? 'current' : ''}"></div>
        <div class="tl-period">${e.period || e.date || ''}</div>
        <div class="tl-title">${e.title}</div>
        <div class="tl-company" style="color:${e.companyColor||'#00d4ff'}">@ ${e.company}</div>
        <div class="tl-desc">${e.description || ''}</div>
        ${bullets ? `<ul class="tl-bullets">${bullets}</ul>` : ''}
        ${tags    ? `<div class="hp-tags">${tags}</div>` : ''}
      </div>`;
  }).join('');

  return `
    <div class="exp-page">
      <div class="sec-title">Experience</div>
      <div class="sec-subtitle">interface Career extends Timeline {}</div>
      <div class="timeline">${entries || '<p style="color:var(--text-mid);font-size:13px">No experience entries found.</p>'}</div>
    </div>`;
}

// ════════════════════════════════════════════════════════════
//  CONTACT.CSS
// ════════════════════════════════════════════════════════════
function renderContact(d) {
  const c = d.contact || {};

  const socials = (c.socials || [
    { label:'EMAIL',    value: c.email    || 'haitagniva@gmail.com', href:`mailto:${c.email||''}`, icon:'✉' },
    { label:'GITHUB',   value: 'github.com/Agniva-07',              href: c.github  || '#',        icon:'⌥' },
    { label:'LINKEDIN', value: 'linkedin.com/in/agniva-hait',       href: c.linkedin|| '#',        icon:'⚇' },
  ]).map(s => `
    <a href="${s.href}" target="_blank" class="social-card">
      <div class="social-icon-box">${s.icon}</div>
      <div class="social-text">
        <span class="social-label">${s.label}</span>
        <span class="social-value">${s.value}</span>
      </div>
    </a>`).join('');

  const avail = (c.availability || [
    'Open to internship opportunities',
    'Available for freelance projects',
    'Interested in open source collaboration',
  ]).map(a => `<li>${a}</li>`).join('');

  return `
    <div class="contact-page">
      <div class="sec-title">Contact</div>
      <div class="sec-subtitle">// open to work, collabs & good conversations</div>
      <div class="contact-grid">
        <div>
          <div class="contact-col-heading">Find Me On</div>
          ${socials}
          ${avail ? `<div style="margin-top:20px"><div class="contact-col-heading">Availability</div><ul class="availability-list">${avail}</ul></div>` : ''}
        </div>
        <div>
          <div class="contact-col-heading">Send a Message</div>
          <form onsubmit="handleContactSubmit(event)">
            <div class="form-group">
              <label class="form-label">// YOUR_NAME <span class="req">*</span></label>
              <input type="text" class="form-input" placeholder="string" required>
            </div>
            <div class="form-group">
              <label class="form-label">// YOUR_EMAIL <span class="req">*</span></label>
              <input type="email" class="form-input" placeholder="string" required>
            </div>
            <div class="form-group">
              <label class="form-label">// SUBJECT</label>
              <input type="text" class="form-input" placeholder="string">
            </div>
            <div class="form-group">
              <label class="form-label">// MESSAGE <span class="req">*</span></label>
              <textarea class="form-input" placeholder="'''your message'''" required></textarea>
            </div>
            <button type="submit" class="form-submit">→ send_message()</button>
            <div class="form-footer">// Powered by Formspree (lands directly in my inbox) :p</div>
          </form>
        </div>
      </div>
    </div>`;
}

window.handleContactSubmit = function(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = '✓ Message sent!';
  btn.style.background = '#238636';
  setTimeout(() => { btn.textContent = '→ send_message()'; btn.style.background = ''; }, 3000);
};

// ════════════════════════════════════════════════════════════
//  README.MD
// ════════════════════════════════════════════════════════════
function renderReadme(d) {
  const r = d.readme || {};

  const badges = (r.techStack || ['JavaScript','React','Node.js','Express.js','MongoDB']).map(t =>
    `<span class="readme-badge">${t}</span>`).join('');

  return `
    <div class="readme-page">
      <div class="readme-h1"># ${r.name || 'Agniva Hait'}</div>
      <p class="readme-bio">${r.bio || 'I engineer scalable digital systems with strong UI, intelligent workflows, and real-world usability.'}</p>

      <div class="readme-h2">## Tech Stack</div>
      <div class="readme-badges">${badges}</div>

      <div class="readme-h2">## Currently Working On</div>
      <p class="readme-p">${r.currentWork || 'Building scalable web applications, refining UI/UX intuition, and exploring AI-driven toolchains.'}</p>

      <div class="readme-h2">## Education</div>
      <div class="readme-edu-row"><span class="rk">🎓</span>${r.education || 'B.Tech CSE — Kalyani Government Engineering College, 2nd Year'}</div>

      <div class="readme-h2">## DSA</div>
      <div class="readme-dsa-row"><span class="rk">⚡</span>${r.dsa || '400+ problems solved on LeetCode & GeeksForGeeks'}</div>

      <div class="readme-h2">## Fun Fact</div>
      <p class="readme-p">${r.funFact || 'Spent 3 hours debugging. It was a missing semicolon.'}</p>

      <div class="readme-blockquote">
        <p><span class="bq-arrow">&gt;</span> ${r.quote || 'Made with caffeine, curiosity, and VS Code.'}</p>
      </div>
    </div>`;
}

// ════════════════════════════════════════════════════════════
//  FALLBACK DATA (if idedata.js fails to load)
// ════════════════════════════════════════════════════════════
function buildFallback() {
  return {
    meta: { name:'Agniva Hait', role:'Full Stack Developer', status:'Open to Opportunities' },
    home: {
      stats: [
        { value:'400+', label:'DSA SOLVED'  },
        { value:'3',    label:'PROJECTS'    },
        { value:'∞',    label:'CURIOSITY'   },
        { value:'10+',  label:'TECH SKILLS' },
      ],
    },
    about: {
      quote: 'I build scalable systems, not just frontend screens.',
      traits: [
        { icon:'⚡', title:"I don't just code, I solve", color:'#ffc947', description:"I break down complex problems and build systems that actually matter." },
        { icon:'🤖', title:'I build with AI',            color:'#9b5de5', description:"I integrate AI tools and APIs to build smarter, faster applications." },
        { icon:'📡', title:'I learn everything',         color:'#00d4ff', description:"From DSA to system design — I constantly explore and improve." },
      ],
      interests: ['System Design','AI','Cricket','Philosophy','Geopolitics'],
    },
    skills: {
      meta: '{ "status": "always_learning", "passion": "immeasurable" }',
      categories: [
        { name:'FRONTEND', skills: [
          { name:'JavaScript', pct:88, color:'#f7df1e' },
          { name:'React',      pct:80, color:'#61dafb' },
          { name:'HTML / CSS', pct:92, color:'#e44d26' },
        ]},
        { name:'BACKEND', skills: [
          { name:'Node.js',   pct:75, color:'#68a063' },
          { name:'Express.js',pct:72, color:'#00d4ff' },
          { name:'MongoDB',   pct:70, color:'#47a248' },
        ]},
      ],
    },
    projects: [
      { title:'FlowState AI', status:'In Dev', category:'FULL STACK · AI', description:'AI-powered study management platform with burnout detection and Gemini API integration.', tags:['React','Node.js','MongoDB','Gemini API'], github:'https://github.com/Agniva-07/Study-Manager', live:'', highlights:['Gemini API with exponential backoff','JWT auth','Deployed on Vercel + Railway'] },
      { title:'MoodDJ',       status:'In Dev', category:'FULL STACK · API', description:'Mood-aware music engine using YouTube Data API v3 with custom scoring algorithm.', tags:['React','Node.js','YouTube API'], github:'', live:'', highlights:['Custom mood-to-track scoring','Artist mode with discography traversal'] },
      { title:'Realtime Chat',status:'Completed', category:'FULL STACK · SOCKET', description:'Low-latency private messaging with Socket.io, room architecture, and persistent history.', tags:['React','Node.js','Socket.io'], github:'', live:'', highlights:['Socket.io bi-directional events','Room-based channel isolation'] },
    ],
    experience: [
      { period:'Aug 2024', title:'Foundation Phase', company:'Self-Directed Learning', companyColor:'#00d4ff', description:'Deep-dived into HTML, CSS, and JavaScript from first principles.', bullets:['Built frontend UI clones from scratch','Started daily DSA practice','Established strong programming fundamentals'], tags:['HTML5','CSS3','JavaScript','DSA'] },
      { period:'Oct–Dec 2024', title:'Transition to Real Systems', company:'Full Stack Development', companyColor:'#9b5de5', description:'Shifted from static sites into React ecosystem and backend development.', bullets:['Built first full-stack CRUD app with Express + MongoDB','Adopted React — components, state, hooks, context','Deployed first app on Vercel + Railway'], tags:['React','Node.js','Express.js','MongoDB'] },
      { period:'2025', title:'Systems Thinking Era', company:'AI-Integrated Platforms', companyColor:'#ffc947', description:'Started approaching every project as an architecture problem.', bullets:['Integrated Gemini 2.5 Flash API with production error handling','Built MoodDJ — YouTube API with custom scoring','Started exploring TypeScript, Next.js, Docker'], tags:['Gemini API','YouTube API','System Design','TypeScript'] },
    ],
    contact: {
      email:'haitagniva@gmail.com',
      github:'https://github.com/Agniva-07',
      linkedin:'https://www.linkedin.com/in/agniva-hait-49508630a/',
      resume:'',
      availability:['Open to internship opportunities','Available for freelance projects','Interested in open source collaboration'],
    },
    readme: {
      name:'Agniva Hait',
      bio:'I engineer scalable digital systems with strong UI, intelligent workflows, and real-world usability.',
      techStack:['JavaScript','React','Node.js','Express.js','MongoDB','Tailwind CSS'],
      currentWork:'Building scalable web applications, refining UI/UX intuition, exploring AI-driven toolchains.',
      education:'B.Tech CSE — Kalyani Government Engineering College, 2nd Year',
      dsa:'400+ problems solved on LeetCode & GeeksForGeeks',
      funFact:'Spent 3 hours debugging. It was a missing semicolon.',
      quote:'Made with caffeine, curiosity, and VS Code.',
    },
  };
}