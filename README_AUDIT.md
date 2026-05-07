# 🔍 Frontend Data Architecture Audit

**Target:** Portfolio Project (`index.html`, `portfolio.html`, `ui/dashboard.html`, JS files)
**Date:** May 2026

---

## 1. 📊 Identify DATA SOURCES

After analyzing the repository, here is how the data is sourced across the main files:

### `portfolio.html` (Story Mode)
*   **Hardcoded directly in HTML:** Almost everything. The Profile identity, About Me section, Skills list & progress bars, Interests, Achievements, Journey Timeline, Featured & Secondary Projects, and Contact details are all statically written in the HTML.
*   **Dynamically injected via JavaScript:** 
    *   The 3D Skills Globe (injected via an inline `<script>` at the bottom of the file).
    *   The GitHub stars count (fetched from the GitHub API via `script.js` and injected into `#gh-stars`).
*   **Loaded from `portfolio.js`:** **NONE.** `portfolio.html` is completely disconnected from your main JSON data source.

### `ui/dashboard.html` (Dashboard / Terminal Mode)
*(Note: The file acting as the terminal is `ui/dashboard.html`, not `terminal.html`)*
*   **Hardcoded directly in HTML:** The structural layout (empty `#dashboard-panel`, `#terminal-panel`), and the terminal prompt styling (`agniva@portfolio`).
*   **Dynamically injected via JavaScript:** Everything inside the dashboard and the terminal output.
*   **Loaded from `portfolio.js`:** **ALL CONTENT.** Both `ui/dashboard.js` and `ui/terminal.js` import `portfolio.js` and use it as the single source of truth to render profile data, projects, skills, and terminal command responses.

---

## 2. 🔀 TRACE DATA FLOW

### Flow A: Landing Page (`index.html`) & 3D Cube
1.  **Origin:** `data/portfolio.js`
2.  **Reader:** `js/main.js` imports the data object.
3.  **Processing:** `buildCubeData()` maps the raw data into a structured `cubeData` object, determining top projects and skill sets.
4.  **Rendering:** `populateIdentity()` and `runBootSequence()` target specific DOM IDs (`#cubeProfileName`, `#terminalBody`, etc.) and inject the processed strings into the DOM via `.textContent` and `.innerHTML`.

### Flow B: Dashboard Mode (`ui/dashboard.html` - Left Panel)
1.  **Origin:** `data/portfolio.js`
2.  **Reader:** `ui/dashboard.js` 
3.  **Processing & Rendering:** Functions like `buildHeroRow()`, `buildProjects()`, and `buildSkills()` read arrays from the data object, loop over them, generate DOM nodes using `document.createElement()`, and append them to the `#dashboard-panel`.

### Flow C: Terminal Mode (`ui/dashboard.html` - Right Panel)
1.  **Origin:** `data/portfolio.js`
2.  **Reader:** `ui/terminal.js`
3.  **Processing & Rendering:** Listens for `Enter` key on `#terminal-input`. When a command like `projects` or `about` is typed, it reads the corresponding nested object in `portfolio` (e.g., `portfolio.projects`), formats it with HTML tags for colors, and appends the lines to `#terminal-output`.

### Flow D: Story Mode (`portfolio.html`)
1.  **Origin:** Hardcoded HTML and local `script.js`.
2.  **Reader:** The browser parses the HTML directly.
3.  **Processing:** `script.js` handles smooth scrolling, observers for animations, and fetches data from `api.github.com`.
4.  **Rendering:** The skills globe renders its own isolated, hardcoded array of objects (icons and names) inside an IIFE (Immediately Invoked Function Expression) at the bottom of the HTML file.

---

## 3. 🗂️ CLASSIFY EACH SECTION

| Section | Hardcoded | JSON-driven | JS-rendered | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Profile / About** | Yes (`portfolio.html`) | Yes (`index.html`, `dashboard`) | Yes | Fully duplicated. Changes to `portfolio.js` won't reflect in Story Mode. |
| **Skills** | Yes (`portfolio.html`) | Yes (`index.html`, `dashboard`) | Yes | Stored in 3 separate places (HTML, Inline JS, `portfolio.js`). |
| **Projects** | Yes (`portfolio.html`) | Yes (`index.html`, `dashboard`) | Yes | Duplicated. Story Mode has hardcoded cards, Dashboard uses JSON. |
| **Terminal** | No | Yes (`dashboard.html`) | Yes | Properly architected. Fully dynamic. |
| **Journey / Story** | Yes (`portfolio.html`) | **Unused** | No | `portfolio.js` contains a `story` array, but it is currently ignored by the application. |
| **Stats** | Yes (`portfolio.html`) | Yes (`index.html`, `dashboard`) | Yes | GitHub stats are fetched live, but other stats are duplicated. |

---

## 4. ⚠️ DETECT DUPLICATION / CONFLICTS

1.  **The "Split Brain" Architecture (Major Conflict):** You have two entirely different content pipelines. The Dashboard and 3D Cube are data-driven, while Story Mode (`portfolio.html`) is completely hardcoded. If you launch a new project, you have to add it to `portfolio.js` **AND** manually write the HTML for it in `portfolio.html`.
2.  **Unused Data Elements:** Your `data/portfolio.js` file contains a highly detailed `story` array (Phase 1, Phase 2, etc.), but the actual "Story Mode" HTML ignores this and hardcodes the timeline.
3.  **Scattered Skill Definitions:** 
    *   Your 3D Globe uses an array inside `<script>` in `portfolio.html`.
    *   Your `js/main.js` has a hardcoded `SKILL_STYLES` constant mapping colors to skills.
    *   Your `ui/dashboard.js` has a `colorMap` constant doing a similar thing.
    *   Your `portfolio.js` contains the actual skill categories.
4.  **Social Links:** Hardcoded in `portfolio.html`, but also generated dynamically from `portfolio.js` in `dashboard.js`.

---

## 5. 🔗 CONNECTION MAPPING

*   ✅ `data/portfolio.js` → `js/main.js` → `index.html` (Working flawlessly)
*   ✅ `data/portfolio.js` → `ui/dashboard.js` → `ui/dashboard.html` (Working flawlessly)
*   ✅ `data/portfolio.js` → `ui/terminal.js` → `ui/dashboard.html` (Working flawlessly)
*   ❌ `data/portfolio.js` → `portfolio.html` (**Broken/Missing.** There is no link. `portfolio.html` is isolated.)
*   ⚠️ `terminal.html` (**Missing.** The terminal is housed inside `ui/dashboard.html`).

---

## 6. ⚖️ FINAL VERDICT

Your project is **partially dynamic**. The underlying mechanisms for the Cube and Dashboard are brilliant and highly scalable. However, the legacy `portfolio.html` file creates a massive maintenance debt because it relies entirely on hardcoded data. 

**What should be refactored?**
`portfolio.html` must be rewritten to consume `data/portfolio.js`. Instead of having hardcoded `<article class="proj-card">` tags, it should use a script to loop over `portfolio.projects` and render them, exactly how `dashboard.js` operates.

**Where redundancy exists?**
Skill definitions, project data, contact information, and timeline events are all stored twice—once in JSON, once in HTML. 

**What should be removed or centralized?**
The hardcoded color maps in `main.js` and `dashboard.js` should be moved directly into `portfolio.js`. The hardcoded skills array at the bottom of `portfolio.html` should be removed, and the globe should fetch its data from `portfolio.js`.

---

## 🎁 BONUS: ARCHITECTURE IMPROVEMENTS

1.  **Make it 100% JSON-Driven:**
    Create a `js/story.js` script. Import `portfolio.js`. Write functions like `renderProjects()` and `renderTimeline()` that target empty `div` containers in `portfolio.html` and populate them dynamically. This ensures `portfolio.js` becomes the single source of truth for the entire site.
2.  **Centralize Asset Meta-Data:**
    Move your color codes and SVG icon paths into `portfolio.js`. For example, instead of storing `"React"`, store `{ name: "React", icon: "react.svg", color: "#61DAFB" }`. This allows the globe, the dashboard, and the terminal to automatically pull the correct colors without needing local dictionaries in 3 different files.
3.  **Modularize Data Fetching:**
    The GitHub API fetch logic is currently sitting loosely in `script.js`. It should be encapsulated in an async function inside a utility file (e.g., `js/utils/api.js`) so that both the Dashboard and Story Mode can consume the live star count seamlessly.
