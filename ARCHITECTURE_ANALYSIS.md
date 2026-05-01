# Architecture Analysis — Developer Portfolio

## 1. High-Level Architecture

The project is currently built on **two parallel, disconnected systems**. 

1. **The Static System (Active):** The primary, fully-styled, and functional portfolio view. It is built entirely with static HTML and relies on DOM-specific JavaScript for animations and interactions.
2. **The Data-Driven System (Inactive/Incomplete):** An alternate architecture designed to load data from a central JSON-like file into a landing page, acting as a router to different "modes" (Story, Terminal, Desktop) which are not fully wired up.

This split architecture means that there is no single source of truth. The UI visible to users is not driven by the data files.

---

## 2. File Responsibility Map

### `portfolio.html`
* **Role:** The main portfolio view containing all actual content, layouts, and the 3D globe structure.
* **Type:** Static UI
* **Depends on:** `styles.css`, `script.js`
* **Used by:** Active user viewing

### `index.html`
* **Role:** An alternate landing page/router that presents mode selections (Story, Terminal, Desktop).
* **Type:** Dynamic UI
* **Depends on:** `js/main.js`, `style/theme.css`, `style/base.css`
* **Used by:** The parallel data-driven system

### `script.js`
* **Role:** Handles UI interactions, scroll spy, smooth scrolling, reveal animations, and fetches GitHub stars.
* **Type:** Runtime Logic
* **Depends on:** Elements inside `portfolio.html`
* **Used by:** `portfolio.html`

### `js/main.js`
* **Role:** Fetches JSON data and injects it into `index.html` (e.g., typewriter effects, terminal boot logs).
* **Type:** Data Logic
* **Depends on:** `data/portfolio.js`
* **Used by:** `index.html`

### `data/portfolio.js`
* **Role:** A central data store defining profile info, skills, projects, and contact details.
* **Type:** Data
* **Depends on:** None
* **Used by:** `js/main.js` (but **NOT** used by `portfolio.html`)

### `js/story.js`
* **Role:** Placeholder file.
* **Type:** Logic
* **Depends on:** None
* **Used by:** **Unused** (Empty file)

### `styles.css`
* **Role:** Contains all design tokens, layout rules, and component styling for the main portfolio view.
* **Type:** Styling
* **Depends on:** None
* **Used by:** `portfolio.html`

---

## 3. Static vs Dynamic Breakdown

| Section | Static | Dynamic | Source |
| ------- | ------ | ------- | ------ |
| **About** | Yes | Yes (GitHub Stars) | Hardcoded in `portfolio.html` / `script.js` (GitHub API) |
| **Journey** | Yes | No | Hardcoded in `portfolio.html` |
| **Projects** | Yes | No | Hardcoded in `portfolio.html` |
| **Contact** | Yes | No | Hardcoded in `portfolio.html` |
| **Skills Globe** | Yes | No | Inline `<script>` array in `portfolio.html` |
| **Sidebar** | Yes | No | Hardcoded in `portfolio.html` |

---

## 4. Data Sources

* **Hardcoded HTML content:** **[USED]** This is the actual source of truth for the active UI (`portfolio.html`). If you want to change a project or a skill, you must edit the HTML directly.
* **Inline JS arrays (like `skills[]`):** **[USED]** Defines the icons rendered inside the 3D globe. Located at the bottom of `portfolio.html`.
* **GitHub API:** **[USED]** Live fetches repository stars via `script.js`.
* **`data/portfolio.js`:** **[NOT USED BY MAIN UI]** Contains rich data for projects, timeline, and contact, but is entirely ignored by the main `portfolio.html` view.

---

## 5. Data Flow Diagram

The flow of data and logic is completely split between the two entry points:

### Flow A: The Active Portfolio
```text
portfolio.html (Hardcoded Content) → Browser DOM
       ↓
   script.js → Attaches observers, animates scroll, fetches GitHub stars
       ↓
inline <script> → Reads skills[] array → Calculates Fibonacci 3D math → Renders Globe
```

### Flow B: The Alternate Router
```text
index.html (Empty Containers)
       ↓
   js/main.js (Controller)
       ↓
data/portfolio.js (Data Source) → Injected back into index.html (Typewriter, boot logs)
```

---

## 6. Duplicate / Redundant Systems

**Where duplication exists:**
Every piece of core data—your bio, your timeline story, your project descriptions, and your contact links—exists twice:
1. Hardcoded as raw text inside `portfolio.html`.
2. Structured as JSON-like objects inside `data/portfolio.js`.

**Which system is active:**
The static system (`portfolio.html`) is the active, functioning UI.

**Which system is unused:**
The data store (`data/portfolio.js`) is effectively redundant because its data does not flow into the view that users actually scroll through.

---

## 7. Unused Code / Dead Parts

* **`data/portfolio.js` (Majority):** The rich project details, timeline narrative, and contact data here are never consumed by the main UI.
* **`js/story.js`:** Completely empty and unused.
* **Mode Switching Logic:** The `index.html` page has buttons for "Story Mode", "Terminal Mode", etc., which attempt to route to pages that don't exist or map cleanly to the static UI.

---

## 8. Maintainability Assessment

**Is this project easy to maintain?** 
No.

**Why confusion is happening:**
A developer looking at the folder structure will naturally assume `data/portfolio.js` is the central brain of the app. If they update their email or add a project there, they will be confused when `portfolio.html` does not change. 

**What makes it complex:**
Having two parallel paradigms (Static HTML vs. DOM-injected JSON) requires maintaining data in two places. The static HTML is highly styled and visually robust, but editing it requires carefully navigating DOM nodes. The JSON system is clean and easy to edit, but it isn't wired up to the beautiful UI.

---

## 9. Final Summary

This project currently runs on a static HTML system, while also containing a separate unused data-driven system, which creates confusion and duplication.
