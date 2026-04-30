# Step 1 — Layout Build Log

**Date:** 2026-04-30  
**Phase:** Foundation — Structure, Sidebar, About, Journey

---

## What Was Built

This first step establishes the **complete structural skeleton** of the portfolio. No placeholder lorem ipsum — every element maps directly to a PRD requirement.

---

## Files Created

| File | Purpose |
|---|---|
| `portfolio.html` | Main HTML — navbar, sidebar, about, journey, placeholders |
| `styles.css` | All CSS — design tokens, layout, components, animations |
| `script.js` | Vanilla JS — scroll, nav active states, reveals, GitHub fetch |

---

## Layout Architecture

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR  (position: fixed, top: 0, z-index: 100)    │
├──────────────────┬──────────────────────────────────┤
│  SIDEBAR         │  MAIN CONTENT                   │
│  (position:fixed │  (margin-left: 260px,            │
│   width: 260px)  │   scrolls independently)         │
│                  │                                  │
│  · Profile       │  #about ─────────────────────── │
│  · Status        │    Terminal header               │
│  · Identity      │    Big quote                     │
│  · Skills bars   │    Feature cards + Highlights    │
│  · Socials       │    Interests tags                │
│                  │    Achievement cards             │
│                  │                                  │
│                  │  #journey ───────────────────── │
│                  │    Vertical timeline             │
│                  │    4 phases with meta cards      │
│                  │                                  │
│                  │  #projects (placeholder)         │
│                  │  #contact  (placeholder)         │
└──────────────────┴──────────────────────────────────┘
```

---

## Design Decisions

### Color palette
- Background: `#0b0f14` — deep navy-black, not pure black (avoids harshness)
- Primary accent: `#00e5ff` cyan — neon but restrained
- Secondary: `#b06aff` purple — for gradients and badges
- Status green: `#00ff88` — pulsing online indicator only
- Glow used **only** on hover states and active elements — not ambient

### Typography
- `Space Grotesk` — headings, name, card titles
- `Inter` — body text, descriptions
- `JetBrains Mono` — terminal elements, labels, section markers

### CSS Architecture
- CSS custom properties on `:root` for all tokens (colors, spacing, fonts, sizes)
- No utility classes — every component has its own block
- BEM-lite naming: `.sidebar__name`, `.skill-bar__fill`, `.tl-card--active`

---

## Components Built

### Navbar
- `position: fixed` sticky top bar
- `backdrop-filter: blur(18px)` glass effect
- Active link underline via `::after` pseudo — slides in on hover/active
- CTA pill with neon border + hover glow

### Sidebar (Fixed)
- Always-visible `position: fixed` left panel
- **Avatar:** circular div with initials, gradient ring border (CSS mask trick), pulsing green online dot
- **Status pill** with animated dot
- **Identity table** — emoji icon + key/value rows
- **Skill bars** — animated via CSS `transition` + JS `setTimeout` (starts at 0, expands to target %)
- **Social icons** — GitHub, LinkedIn, Email SVGs with hover glow

### About Section
- Terminal-style prompt block (`❯ cd ~/portfolio // ABOUT ME`)
- Blockquote with cyan left-border accent
- 2-column grid: feature cards (left) + highlights panel (right)
- Interest tags — pill style, hover glows cyan
- Achievement cards with colored badges

### Journey / Timeline Section
- Vertical track bar with gradient `cyan → purple → transparent`
- Each phase: left node (dot + date) / right card (title, body, meta dl)
- Active node (Phase 4): glowing pulsing dot, card with cyan tint
- Phase 4 has `● NOW` blinking badge

---

## JavaScript Features

| Feature | Mechanism |
|---|---|
| Smooth scroll | `scrollIntoView({ behavior: 'smooth' })` |
| Active nav link | `IntersectionObserver` — fires when section is in middle viewport band |
| Scroll reveal | `IntersectionObserver` — adds `.visible` class (opacity + translateY) |
| Timeline stagger | `data-index` attribute × 120ms delay offset |
| Skill bars | CSS `--tw` variable + JS `setTimeout(300ms)` to trigger transition |
| GitHub stars | `fetch` to GitHub public API, graceful fallback to `—` |

---

## What's NOT in Step 1

- Projects section (structure only — placeholder)
- Contact section (structure only — placeholder)
- Mobile / responsive breakpoints
- Any heavy libraries (zero dependencies)

---

## Next Steps

- [ ] Build Projects section with real card grid
- [ ] Build Contact section with form
- [ ] Add responsive CSS for mobile (`< 768px`) — sidebar collapses
- [ ] Add avatar photo (replace initials)
- [ ] Polish: hover micro-transitions, count-up animation for stats
