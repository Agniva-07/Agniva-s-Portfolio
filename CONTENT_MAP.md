# 📄 CONTENT_MAP.md — Agniva Hait Portfolio

A developer-facing guide to understand where every piece of content comes from.
Use this file as a reference when editing or extending the portfolio.

---

## 🗂️ File Overview

| File | Purpose |
|------|---------|
| `portfolio.html` | Main page — all UI structure, static content, inline globe JS |
| `styles.css` | All visual styling — tokens, layout, components, responsive |
| `script.js` | Runtime JS — scroll logic, section tracking, count-up, GitHub API |
| `data/portfolio.js` | ES Module data store — used by alternate/story view (`js/main.js`) |
| `js/main.js` | Loads `data/portfolio.js` and drives the index.html view |
| `js/story.js` | Powers the cinematic story scroll view (story page) |

---

## 🔵 About Section (`#about`)

| Element | Type | Source |
|---------|------|--------|
| Hero quote `"I'm a second-year CS student…"` | **Static** | Hardcoded in `portfolio.html` lines 113–116 |
| Quote subtitle text | **Static** | Hardcoded in `portfolio.html` line 117 |
| Feature cards (⚡🤖📡) — titles + body text | **Static** | Hardcoded in `portfolio.html` lines 123–139 |
| Skills Globe (React, Node.js, etc.) | **Static** | Hardcoded in inline `<script>` block, `portfolio.html` lines 446–459 |
| Globe icons | **External CDN** | `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/...` |
| Interests tags | **Static** | Hardcoded in `portfolio.html` lines 149–153 |
| Achievement card — DSA count `400+` | **Static** | `data-count="400"` in HTML, animated by `script.js` |
| Achievement card — GitHub stars | **Dynamic** | Fetched live from GitHub API via `script.js` → `fetchGitHubStars()` |
| Sidebar skills (JS, TS, React…) + percentages | **Static** | Hardcoded in `portfolio.html` lines 65–73 |
| Sidebar identity info (location, email, etc.) | **Static** | Hardcoded in `portfolio.html` lines 53–58 |

> **Note:** `data/portfolio.js` also defines `about`, `highlights`, and `interests` but these are used only by `js/main.js` (index.html), NOT by `portfolio.html`.

---

## 🟡 Journey Section (`#journey`)

| Element | Type | Source |
|---------|------|--------|
| Section title `"The Story So Far"` | **Static** | Hardcoded in `portfolio.html` line 187 |
| Timeline phase 1 — `"The Beginning"` (Aug 2024) | **Static** | Hardcoded in `portfolio.html` lines 193–205 |
| Timeline phase 2 — `"From Clones to Real Use"` | **Static** | Hardcoded in `portfolio.html` lines 207–219 |
| Timeline phase 3 — `"AI-Powered Shift"` | **Static** | Hardcoded in `portfolio.html` lines 221–233 |
| Timeline phase 4 — `"Building What Matters"` (active) | **Static** | Hardcoded in `portfolio.html` lines 235–248 |
| Timeline tags (`HTML`, `React`, `Gemini`…) | **Static** | Hardcoded inside each `.tl-tags` block in `portfolio.html` |
| Timeline progress fill animation | **Dynamic** | Calculated from scroll position by `script.js` → `updateTimelineFill()` |
| Timeline reveal animation (`.tl-item.visible`) | **Dynamic** | Triggered by IntersectionObserver in `script.js` |
| Skills panel (Frontend / Backend / Database / DevOps) | **Static** | Hardcoded in `portfolio.html` lines 253–294 |

> **Note:** `data/portfolio.js` also defines `story[]` entries but these drive the `js/story.js` (story page), NOT `portfolio.html`.

---

## 🟣 Projects Section (`#projects`)

| Element | Type | Source |
|---------|------|--------|
| Featured project `MoodyDJ` — all content | **Static** | Hardcoded in `portfolio.html` lines 311–337 |
| Secondary cards (AR Hand Tracker, Dev Portfolio, AI Roadmap Gen) | **Static** | Hardcoded in `portfolio.html` lines 340–384 |
| Project tags, links, status badges | **Static** | Hardcoded in HTML |
| Card reveal animation | **Dynamic** | Triggered by IntersectionObserver in `script.js` (`.reveal-item`) |

> **Note:** `data/portfolio.js` defines a `projects[]` array with richer data (full descriptions, links), used only by `js/main.js`.

---

## 🟢 Contact Section (`#contact`)

| Element | Type | Source |
|---------|------|--------|
| Section title `"Let's Connect"` | **Static** | Hardcoded in `portfolio.html` line 399 |
| Section subtitle text | **Static** | Hardcoded in `portfolio.html` line 400 |
| Contact cards (Email, GitHub, LinkedIn) — labels + values | **Static** | Hardcoded in `portfolio.html` lines 402–423 |
| Social links icons (GitHub, LinkedIn, Email, Twitter) | **Static** | Hardcoded as inline SVGs in `portfolio.html` |
| Newsletter title `"Stay Updated"` | **Static** | Hardcoded in `portfolio.html` |
| Newsletter description text | **Static** | Hardcoded in `portfolio.html` |
| Newsletter email input + subscribe button | **Static UI** | HTML form in `portfolio.html`; no backend — `onsubmit` is `event.preventDefault()` |

> **Note:** `data/portfolio.js` has a `contact` object with `email`, `github`, `linkedin`, `twitter` — used only by `js/main.js` for the alternate index view.

---

## 🌐 Skills Globe

| Element | Type | Source |
|---------|------|--------|
| Skills list (`React`, `Node.js`, `TypeScript`…) | **Static** | Inline `<script>` block in `portfolio.html` lines 446–459 |
| Icon URLs | **External CDN** | devicon CDN: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/` |
| Globe rotation physics | **Dynamic** | Inline JS in `portfolio.html` — `loop()`, `velY`, `rotX`/`rotY`, inertia |
| Globe interaction (drag/pointer) | **Dynamic** | Event listeners on `#skills-globe` inside inline `<script>` |

---

## 🔧 Runtime Data Flow

```
portfolio.html → script.js (loads at bottom)
    ├─ Smooth scroll (anchor links)
    ├─ Active section tracking (IntersectionObserver)
    ├─ Scroll reveal (.reveal-item, .tl-item)
    ├─ Skill bar animation (CSS --tw → width)
    ├─ Count-up animations (data-count)
    ├─ Timeline fill (--tl-fill CSS var on scroll)
    └─ GitHub stars fetch → #gh-stars element

portfolio.html → inline <script> (bottom, before </body>)
    └─ Skills Globe: DOM sphere, Fibonacci layout, drag physics

data/portfolio.js (ES Module — NOT used by portfolio.html)
    └─ Used only by js/main.js → index.html
```

---

## ✏️ How to Edit Content

| Task | Where to Edit |
|------|--------------|
| Change hero quote | `portfolio.html` → `<blockquote class="section__quote">` |
| Add/remove timeline phase | `portfolio.html` → `.tl-item` blocks in `#journey` |
| Add a project card | `portfolio.html` → `.proj-grid` section |
| Change contact email | `portfolio.html` → `.contact-card[href^="mailto:"]` |
| Add a skill to globe | `portfolio.html` inline `<script>` → `skills[]` array |
| Change globe speed | `portfolio.html` inline `<script>` → `velY` initial value |
| Change colors/fonts | `styles.css` → `:root {}` design tokens |
| Update GitHub username | `script.js` → `fetchGitHubStars()` fetch URL |
| Edit data used by index.html | `data/portfolio.js` |
