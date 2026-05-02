# 🌌 Agniva's Futuristic Portfolio — Split-Screen UI

> **"This developer is not normal."**
> A cinematic, hacker-style developer portfolio — glassmorphism dashboard + interactive terminal.

---

## 📁 Files Created

| File | Role |
|------|------|
| `ui/dashboard.html` | HTML shell — semantic, zero hardcoded content |
| `ui/dashboard.css`  | Full design system — dark glassmorphism, neon glows, animations |
| `ui/dashboard.js`   | Left-panel renderer — 100% driven by `portfolio.js` |
| `ui/terminal.js`    | Right-panel terminal — commands, history, typing animation |
| `ui/layout.js`      | Orchestrator — particles, parallax, wires both panels |

**Data source (read-only, untouched):** `data/portfolio.js`

---

## 🎨 Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--cyan` | `#00e5ff` | Primary accent, cursor, glow |
| `--blue` | `#4d8cff` | Tech badges, links |
| `--purple` | `#a855f7` | Section headers, skill groups |
| `--green` | `#22d3a0` | Status, success, live badge |
| `--amber` | `#fbbf24` | In-progress project status |
| `--bg-void` | `#050508` | Deep void background |

### Fonts
- **UI:** `Inter` from Google Fonts
- **Terminal / code:** `JetBrains Mono` from Google Fonts

### Visual Effects
- Glassmorphism — `backdrop-filter: blur(16px)` + translucent panels
- Neon glow — `box-shadow` rgba coloring
- Gradient text — name, stats numbers
- Hue-rotate ring — avatar border animation
- Particle canvas — 90 drifting nodes with proximity lines
- Subtle parallax — mouse-driven offset on dashboard

---

## 🧩 Left Panel Sections

```
① Profile Card       — avatar, name, rotating roles, status, location
② Stats Row          — DSA count, projects count, dev phases
③ About              — summary + 4 highlight chips
④ Featured Projects  — cards with status badge, tech tags, links
⑤ Skills            — 6 groups × tags in 2-col grid
⑥ Social Links       — GitHub, LinkedIn, Email
```

---

## 💻 Right Panel — Terminal

**Prompt:** `agniva@portfolio:~$`

### Commands

| Command | Output |
|---------|--------|
| `help` | All commands |
| `about` | Summary, interests, education |
| `skills` | All skill categories |
| `projects` | All projects with slugs |
| `project <slug>` | e.g. `project flowstate-ai` |
| `contact` | Email, GitHub, LinkedIn |
| `dsa` | 400+ problems + platforms |
| `clear` | Reset terminal |
| `coffee` | Tabs vs spaces takes a stance |
| `music` | Kishore Kumar 🎧 |
| `fun` | The CORS confession |
| `hire` | Access granted 🚀 |

### Behaviors
- ↑ / ↓ command history
- Tab autocomplete
- Typing animation (ASCII banner)
- Auto-scroll
- Click-to-focus
- `command not found` handling
- Multi-color output (cyan, blue, purple, green, amber, red)

---

## 📱 Responsive

| Breakpoint | Layout |
|------------|--------|
| `> 900px` | 50 / 50 split — dashboard left, terminal right |
| `≤ 900px` | Stacked — dashboard top, terminal below |
| `≤ 480px` | Compact spacing + wrapped social buttons |

---

## 🚀 How to Run

ES modules require a local server (`file://` won't work).

```bash
# Option 1 — VS Code
# Right-click ui/dashboard.html → Open with Live Server

# Option 2 — npx
npx serve .
# Visit: http://localhost:3000/ui/dashboard.html

# Option 3 — Python
python -m http.server 8080
# Visit: http://localhost:8080/ui/dashboard.html
```

---

## 🏗️ Architecture

```
data/portfolio.js          ← source of truth (READ ONLY)
         │
         └── ui/layout.js  ← boots on DOMContentLoaded
                   ├── initDashboard()  → dashboard.js
                   ├── initTerminal()   → terminal.js
                   └── initParticles()  → canvas background
```

---

*Zero external dependencies. Zero build step. Pure ES modules.*
