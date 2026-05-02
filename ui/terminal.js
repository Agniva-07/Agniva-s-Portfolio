/**
 * terminal.js — Fully working fake terminal
 * Powered entirely by portfolio.js data
 */
import { portfolio } from '../data/portfolio.js';

// ── State ─────────────────────────────────────────────────────────────────────
let output, input;
const history = [];
let histIdx = -1;

const sleep = ms => new Promise(r => setTimeout(r, ms));

function scrollBottom() { output.scrollTop = output.scrollHeight; }

function appendLine(text = '', cls = 't-white') {
  const el = document.createElement('div');
  el.className = `t-line ${cls}`;
  el.innerHTML = text;
  output.appendChild(el);
  scrollBottom();
  return el;
}

function appendEmpty() { appendLine('', 't-empty'); }

function echoPrompt(cmd) {
  appendLine(
    `<span class="prompt-user">agniva</span><span class="prompt-at">@</span><span class="prompt-host">portfolio</span><span class="prompt-path">:~</span><span class="prompt-sym">$ </span><span class="prompt-cmd">${esc(cmd)}</span>`,
    't-prompt'
  );
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

async function typeLine(text, cls = 't-cyan', delay = 18) {
  const el = appendLine('', cls);
  for (const ch of text) { el.textContent += ch; scrollBottom(); await sleep(delay); }
}

// ── ASCII Banner ──────────────────────────────────────────────────────────────
const BANNER = [
  "  █████╗  ██████╗ ███╗  ██╗██╗██╗   ██╗ █████╗ ",
  " ██╔══██╗██╔════╝ ████╗ ██║██║██║   ██║██╔══██╗",
  " ███████║██║  ███╗██╔██╗██║██║╚██╗ ██╔╝███████║",
  " ██╔══██║██║   ██║██║╚████║██║ ╚████╔╝ ██╔══██║",
  " ██║  ██║╚██████╔╝██║ ╚███║██║  ╚██╔╝  ██║  ██║",
  " ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚══╝╚═╝   ╚═╝  ╚═╝  ╚═╝",
];

async function printBanner() {
  const el = document.createElement('div');
  el.className = 't-line t-ascii';
  el.textContent = BANNER.join('\n');
  output.appendChild(el);
  appendEmpty();
  await typeLine(`  ${portfolio?.profile?.tagline || 'Welcome to my portfolio.'}`, 't-cyan', 22);
  appendEmpty();
  appendLine(`  Type <span style="color:var(--cyan)">help</span> to see available commands.`, 't-muted');
  appendEmpty();
  scrollBottom();
}

// ── Commands ──────────────────────────────────────────────────────────────────

function cmdHelp() {
  const cmds = [
    ['help','Show this command list'],
    ['about','Who is Agniva?'],
    ['skills','View all skill categories'],
    ['projects','List all projects'],
    ['project <name>','Detailed view of a project'],
    ['contact','Get in touch'],
    ['dsa','DSA stats & platforms'],
    ['clear','Clear the terminal'],
    ['───','───'],
    ['coffee', portfolio?.terminal?.commands?.coffee || ''],
    ['music', portfolio?.terminal?.commands?.music || ''],
    ['fun', portfolio?.terminal?.commands?.fun || ''],
    ['hire', portfolio?.terminal?.commands?.hire || ''],
  ];
  appendLine('<span style="color:var(--cyan);font-weight:700">AVAILABLE COMMANDS</span>', 't-white');
  appendEmpty();
  cmds.forEach(([cmd, desc]) => {
    if (cmd.startsWith('─')) {
      appendLine('<span style="color:var(--text-muted)">──────────────────────────────────────────</span>', 't-muted');
    } else {
      appendLine(`  <span style="color:var(--cyan);min-width:160px;display:inline-block">${esc(cmd)}</span><span style="color:var(--text-secondary)">${esc(desc)}</span>`, 't-white');
    }
  });
  appendEmpty();
}

function cmdAbout() {
  appendLine('<span style="color:var(--purple);font-weight:700">ABOUT AGNIVA</span>', 't-white');
  appendEmpty();
  appendLine(`  ${esc(portfolio?.about?.summary || 'No summary available.')}`, 't-white');
  appendEmpty();
  if (portfolio?.about?.interests?.length) {
    appendLine('  <span style="color:var(--cyan)">INTERESTS</span>', 't-white');
    portfolio.about.interests.forEach(i => appendLine(`  · ${esc(i)}`, 't-muted'));
    appendEmpty();
  }
  if (portfolio?.education) {
    appendLine('  <span style="color:var(--cyan)">EDUCATION</span>', 't-white');
    appendLine(`  · ${esc(portfolio.education.degree)} — ${esc(portfolio.education.college)}`, 't-white');
    appendLine(`  · ${esc(portfolio.education.field)} · ${esc(portfolio.education.year)}`, 't-muted');
    portfolio.education?.boards?.forEach(b => appendLine(`  · ${esc(b.exam)} — ${esc(b.score)} (${esc(b.board)})`, 't-muted'));
    portfolio.education?.competitive?.forEach(c => appendLine(`  · ${esc(c.exam)} — ${esc(c.score)}`, 't-muted'));
    appendEmpty();
  }
}

function cmdSkills() {
  appendLine('<span style="color:var(--purple);font-weight:700">SKILLS</span>', 't-white');
  appendEmpty();
  (portfolio?.skills || []).forEach(group => {
    appendLine(`  <span style="color:var(--cyan)">${esc(group.label)}</span>`, 't-white');
    appendLine(`  ${group.items.map(i => esc(i)).join('  ·  ')}`, 't-blue');
    appendEmpty();
  });
}

function cmdProjects() {
  appendLine('<span style="color:var(--purple);font-weight:700">ALL PROJECTS</span>', 't-white');
  appendEmpty();
  (portfolio?.projects || []).forEach((p, i) => {
    const sc = p.status === 'completed' ? 'color:var(--green)' : 'color:var(--amber)';
    appendLine(`  <span style="color:var(--cyan)">[${i+1}]</span> <span style="font-weight:700">${esc(p.title)}</span>  <span style="${sc};font-size:0.7em">[${esc(p.status)}]</span>`, 't-white');
    appendLine(`      ${esc(p.description)}`, 't-muted');
    appendLine(`      Tech: ${p.tech.map(t=>esc(t)).join(' · ')}`, 't-blue');
    appendLine(`      slug: <span style="color:var(--purple)">${esc(p.slug)}</span>`, 't-muted');
    appendEmpty();
  });
}

function cmdProjectDetail(slug) {
  if (!slug) { appendLine('  Usage: project &lt;slug&gt;  e.g. project flowstate-ai', 't-yellow'); return; }
  const p = (portfolio?.projects || []).find(pr => pr.slug.toLowerCase() === slug.toLowerCase() || pr.title.toLowerCase().includes(slug.toLowerCase()));
  if (!p) { appendLine(`  Project "${esc(slug)}" not found.`, 't-red'); return; }
  const sc = p.status === 'completed' ? 'color:var(--green)' : 'color:var(--amber)';
  appendLine(`<span style="color:var(--cyan);font-weight:700">◆ ${esc(p.title)}</span>`, 't-white');
  if (p.tagline) appendLine(`  <em style="color:var(--text-muted)">${esc(p.tagline)}</em>`, 't-white');
  appendEmpty();
  appendLine(`  <span style="${sc}">● ${esc(p.status.toUpperCase())}</span>`, 't-white');
  appendEmpty();
  appendLine(`  ${esc(p.description)}`, 't-white');
  appendEmpty();
  appendLine(`  Tech: ${p.tech.map(t=>esc(t)).join('  ·  ')}`, 't-blue');
  if (p.links?.github) appendLine(`  GitHub → <a href="${p.links.github}" target="_blank" style="color:var(--blue)">${p.links.github}</a>`, 't-white');
  if (p.links?.live) appendLine(`  Live   → <a href="${p.links.live}" target="_blank" style="color:var(--green)">${p.links.live}</a>`, 't-white');
  appendEmpty();
}

function cmdContact() {
  appendLine('<span style="color:var(--purple);font-weight:700">CONTACT</span>', 't-white');
  appendEmpty();
  const c = portfolio?.contact || {};
  if (c.email) appendLine(`  Email    → <a href="mailto:${c.email}" style="color:var(--cyan)">${c.email}</a>`, 't-white');
  if (c.github) appendLine(`  GitHub   → <a href="${c.github}" target="_blank" style="color:var(--blue)">${c.github}</a>`, 't-white');
  if (c.linkedin) appendLine(`  LinkedIn → <a href="${c.linkedin}" target="_blank" style="color:var(--blue)">${c.linkedin}</a>`, 't-white');
  appendEmpty();
}

function cmdDSA() {
  const d = portfolio?.terminal?.dsa;
  if (!d) { appendLine('  No DSA data available.', 't-muted'); return; }
  appendLine('<span style="color:var(--purple);font-weight:700">DSA STATS</span>', 't-white');
  appendEmpty();
  appendLine(`  Problems Solved  <span style="color:var(--cyan);font-weight:700;font-size:1.2em">${esc(d.count)}</span>`, 't-white');
  appendLine(`  Platforms        ${d.platforms.map(p=>`<span style="color:var(--blue)">${esc(p)}</span>`).join('  ·  ')}`, 't-white');
  appendEmpty();
}

function cmdClear() { output.innerHTML = ''; printBanner(); }

function cmdBonus(key) {
  const val = portfolio?.terminal?.commands?.[key];
  if (val) { appendLine(`  ${esc(val)}`, 't-yellow'); appendEmpty(); }
}

// ── Router ────────────────────────────────────────────────────────────────────
function runCommand(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return;
  echoPrompt(trimmed);
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const arg = parts.slice(1).join(' ');
  appendEmpty();
  switch (cmd) {
    case 'help': cmdHelp(); break;
    case 'about': cmdAbout(); break;
    case 'skills': cmdSkills(); break;
    case 'projects': cmdProjects(); break;
    case 'project': cmdProjectDetail(arg); break;
    case 'contact': cmdContact(); break;
    case 'dsa': cmdDSA(); break;
    case 'clear': cmdClear(); return;
    case 'coffee': case 'music': case 'fun': case 'hire': cmdBonus(cmd); break;
    default:
      appendLine(`  <span style="color:var(--red)">${esc(cmd)}</span><span style="color:var(--text-muted)">: command not found. Type </span><span style="color:var(--cyan)">help</span>`, 't-white');
      appendEmpty();
  }
}

// ── Init (DOM selectors INSIDE here) ──────────────────────────────────────────
export function initTerminal() {
  output = document.getElementById('terminal-output');
  input = document.getElementById('terminal-input');
  if (!output || !input) { console.error('Terminal DOM not found'); return; }

  printBanner();

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value;
      if (val.trim()) { history.unshift(val); histIdx = -1; }
      runCommand(val);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; input.value = history[histIdx]; } else { histIdx = -1; input.value = ''; }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.value.toLowerCase().trim();
      const allCmds = ['help','about','skills','projects','project','contact','dsa','clear','coffee','music','fun','hire'];
      const match = allCmds.find(c => c.startsWith(val));
      if (match) input.value = match;
    }
  });

  document.getElementById('terminal-panel')?.addEventListener('click', () => input.focus());
  input.focus();
}
