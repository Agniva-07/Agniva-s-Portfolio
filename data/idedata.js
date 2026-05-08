// ============================================================
//  idedata.js — IDE Mode Data Source
//  Auto-loaded by ide.js from ../../data/idedata.js
//  Expanded & detailed version for IDE portfolio rendering
// ============================================================

window.ideData = {

  // ──────────────────────────────────────────────────────────
  //  META
  // ──────────────────────────────────────────────────────────
  meta: {
    name:   'Agniva Hait',
    role:   'Full Stack Developer',
    status: 'Actively Building · Open to Opportunities',
  },

  // ──────────────────────────────────────────────────────────
  //  HOME.TSX
  // ──────────────────────────────────────────────────────────
  home: {
    stats: [
      { value: '400+',   label: 'DSA SOLVED'       },
      { value: '3+',     label: 'PROJECTS SHIPPED'  },
      { value: '7+',     label: 'TECH CATEGORIES'   },
      { value: '∞',      label: 'CURIOSITY'         },
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  ABOUT.HTML
  // ──────────────────────────────────────────────────────────
  about: {
    quote: 'I build scalable systems, not just frontend screens.',

    extended: `
I'm a second-year Computer Science & Engineering student at Kalyani Government Engineering College — but the real learning has been happening far beyond the classroom.

→ I don't wait for assignments to tell me what to build. I identify problems, architect solutions, and ship projects that reflect real engineering decisions.

→ My journey started in August 2024 with core web fundamentals — not from a Udemy course checklist, but from first principles. I reverse-engineered UI clones, broke things on purpose, and rebuilt them until I understood why they worked.

→ By late 2024 I had transitioned into full stack development. I built my first production-style CRUD application using Express.js and MongoDB, adopted React deeply (components, state, hooks, context, routing), and deployed real apps on Vercel and Railway.

→ In 2025, my thinking evolved from "writing features" to "designing systems." I started approaching every project as an architecture problem — thinking about data flow, API design, error handling, scalability, and long-term maintainability before writing a single line of code.

→ I integrated Google's Gemini 2.5 Flash API into a production-grade platform with exponential backoff, structured error recovery, and real-time response streaming. That project taught me more about resilient system design than any tutorial could.

→ Currently, I'm exploring TypeScript, Next.js, Docker, and system design patterns — not because they're trending, but because they are the next logical step in building things that scale and survive real-world load.

I believe strong engineering is about more than syntax and frameworks. It's about understanding tradeoffs, thinking in systems, and building things that are genuinely useful, maintainable, and built to last.
`,

    traits: [
      {
        icon:        '⚡',
        title:       "I don't just code — I solve",
        color:       '#ffc947',
        description: 'Every project starts with a problem statement, not a tech stack. I break down complexity into components, identify architectural bottlenecks early, and design solutions that scale gracefully under real-world constraints.',
      },
      {
        icon:        '🤖',
        title:       'I build with AI',
        color:       '#9b5de5',
        description: 'I integrate AI APIs — Gemini, Grok, YouTube Data — as core system components, not gimmicks. I understand prompt engineering, rate-limiting, exponential backoff, and how to build reliable pipelines on top of probabilistic models.',
      },
      {
        icon:        '📡',
        title:       'I learn in systems',
        color:       '#00d4ff',
        description: 'I don\'t learn tools in isolation. When I picked up React, I learned state management, rendering behaviour, and component architecture simultaneously. When I touched backends, I went all the way to deployment pipelines.',
      },
      {
        icon:        '🧠',
        title:       'I think before I type',
        color:       '#ff6b6b',
        description: 'Before opening an editor, I design data flows, sketch component trees, and consider failure modes. 400+ DSA problems have trained me to see patterns in complexity and choose efficient paths instinctively.',
      },
    ],

    interests: [
      'System Design',
      'Artificial Intelligence',
      'Frontend Architecture',
      'Backend Engineering',
      'Developer Experience',
      'Human Psychology',
      'Geopolitics',
      'Cricket',
      'Philosophy',
      'Emerging Technologies',
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  SKILLS.JSON
  // ──────────────────────────────────────────────────────────
  skills: {
    meta: '{ "status": "always_learning", "philosophy": "depth_over_breadth", "passion": "immeasurable" }',

    categories: [
      {
        name: 'FRONTEND ENGINEERING',
        skills: [
          { name: 'JavaScript (ES6+)',  pct: 88, color: '#f7df1e' },
          { name: 'React.js',           pct: 82, color: '#61dafb' },
          { name: 'HTML5',              pct: 93, color: '#e34c26' },
          { name: 'CSS3',               pct: 90, color: '#264de4' },
          { name: 'Tailwind CSS',       pct: 78, color: '#38bdf8' },
          { name: 'Vanilla JS / DOM',   pct: 85, color: '#f0db4f' },
        ],
      },
      {
        name: 'BACKEND & DATABASES',
        skills: [
          { name: 'Node.js',    pct: 76, color: '#68a063' },
          { name: 'Express.js', pct: 74, color: '#00d4ff' },
          { name: 'MongoDB',    pct: 72, color: '#47a248' },
          { name: 'REST APIs',  pct: 80, color: '#ff6b6b' },
          { name: 'MySQL',      pct: 60, color: '#f29111' },
        ],
      },
      {
        name: 'PROGRAMMING LANGUAGES',
        skills: [
          { name: 'JavaScript', pct: 88, color: '#f7df1e' },
          { name: 'Python',     pct: 70, color: '#3776ab' },
          { name: 'C',          pct: 65, color: '#a8b9cc' },
        ],
      },
      {
        name: 'AI & INTEGRATIONS',
        skills: [
          { name: 'Google Gemini API', pct: 80, color: '#9b5de5' },
          { name: 'Grok API',          pct: 65, color: '#ff6b6b' },
          { name: 'YouTube Data API',  pct: 72, color: '#ff0000' },
          { name: 'Prompt Engineering',pct: 78, color: '#ffc947' },
          { name: 'Workflow Automation',pct:66, color: '#00d4ff' },
        ],
      },
      {
        name: 'TOOLS & WORKFLOW',
        skills: [
          { name: 'Git & GitHub', pct: 82, color: '#f05032' },
          { name: 'VS Code',      pct: 92, color: '#007acc' },
          { name: 'Postman',      pct: 75, color: '#ef5b25' },
          { name: 'Figma',        pct: 60, color: '#a259ff' },
          { name: 'Vite',         pct: 72, color: '#646cff' },
        ],
      },
      {
        name: 'CS FUNDAMENTALS',
        skills: [
          { name: 'Data Structures', pct: 82, color: '#00d4ff' },
          { name: 'Algorithms',      pct: 78, color: '#ffc947' },
          { name: 'Problem Solving', pct: 85, color: '#9b5de5' },
        ],
      },
      {
        name: 'CURRENTLY EXPLORING',
        skills: [
          { name: 'TypeScript', pct: 45, color: '#3178c6' },
          { name: 'Next.js',    pct: 38, color: '#ffffff' },
          { name: 'Docker',     pct: 30, color: '#2496ed' },
          { name: 'FastAPI',    pct: 28, color: '#009688' },
          { name: 'CI/CD',      pct: 25, color: '#f05032' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  PROJECTS.JS
  // ──────────────────────────────────────────────────────────
  projects: [
    {
      title:       'FlowState AI',
      status:      'In Dev',
      category:    'FULL STACK · AI · PRODUCTIVITY',
      description: 'An intelligent study-management ecosystem integrating AI-driven scheduling, burnout analytics, focus tracking, and adaptive productivity workflows — built as a real production-grade platform, not a tutorial clone.',
      tags:        ['React', 'Node.js', 'MongoDB', 'Gemini API', 'Express.js', 'JWT', 'Vercel', 'Railway'],
      github:      'https://github.com/Agniva-07/Study-Manager',
      live:        '',
      highlights: [
        'Integrated Gemini 2.5 Flash API with exponential backoff, structured error recovery, and graceful degradation under rate limits',
        'Built a burnout detection system using pattern analysis across session logs and task completion history',
        'JWT-based auth with refresh tokens, protected routes, and session persistence across devices',
        'Adaptive scheduling engine that re-prioritises tasks based on focus history, deadline proximity, and cognitive load estimates',
        'Deployed on Vercel (frontend) + Railway (backend) with environment-isolated build pipelines',
        'Modular component architecture in React — custom hooks, context-based state, and lazy-loaded route segments',
      ],
    },
    {
      title:       'MoodDJ',
      status:      'In Dev',
      category:    'FULL STACK · API ENGINEERING · MUSIC',
      description: 'A mood-aware music discovery engine that maps emotional input to curated track recommendations using YouTube Data API v3 — featuring a custom scoring algorithm, artist mode, and adaptive playlist generation.',
      tags:        ['React', 'Node.js', 'YouTube Data API v3', 'Express.js', 'Emotion Mapping'],
      github:      '',
      live:        '',
      highlights: [
        'Custom mood-to-track scoring algorithm with weighted emotional vectors across energy, valence, and tempo parameters',
        'Artist mode with full discography traversal — fetches entire catalogues and filters by mood-fit score',
        'YouTube Data API v3 integration with quota management, pagination, and fallback chain on empty result sets',
        'Session-based playlist state — users can lock tracks, regenerate others, and export queue as a shareable link',
        'Responsive UI with real-time mood visualisation using animated gradients tied to current emotional state',
      ],
    },
    {
      title:       'Realtime Chat Platform',
      status:      'Completed',
      category:    'FULL STACK · WEBSOCKETS · REALTIME',
      description: 'A low-latency private messaging platform built on Socket.io with room-based architecture, persistent message history, and a responsive React frontend — engineered for reliability and clean bi-directional event handling.',
      tags:        ['React', 'Node.js', 'Socket.io', 'Express.js', 'MongoDB'],
      github:      '',
      live:        '',
      highlights: [
        'Socket.io bi-directional event pipeline with named event architecture — clean separation between system events and message events',
        'Room-based channel isolation — users join namespaced rooms with unique session tokens, preventing cross-channel data leakage',
        'Persistent message history using MongoDB with indexed queries on roomId + timestamp for fast retrieval on reconnect',
        'Typing indicators and online/offline presence tracking via heartbeat pings with configurable TTL',
        'Optimistic UI updates on the client side — messages appear instantly and reconcile against server confirmation',
      ],
    },
  ],

  // ──────────────────────────────────────────────────────────
  //  EXPERIENCE.TS
  // ──────────────────────────────────────────────────────────
  experience: [
    {
      period:       'Aug 2024',
      title:        'Foundation Phase',
      company:      'Self-Directed Learning',
      companyColor: '#00d4ff',
      description:  'Rebuilt web fundamentals from first principles — not through tutorials, but through reverse-engineering, deliberate practice, and building things that broke in interesting ways.',
      bullets: [
        'Deep-dived into HTML5 semantics, CSS layout models (flexbox, grid, positioning), and the full DOM API without abstraction layers',
        'Reconstructed real-world UI clones pixel-by-pixel to internalise design systems, spacing logic, and responsive patterns',
        'Established a daily DSA practice routine — started with arrays, strings, and recursion, and built upward systematically',
        'Wrote raw JavaScript before touching any framework — closures, prototypal inheritance, async/await, event loops, and module systems',
        'Committed to understanding why things work, not just how to make them work',
      ],
      tags: ['HTML5', 'CSS3', 'JavaScript', 'DOM API', 'DSA', 'Flexbox', 'Grid'],
    },
    {
      period:       'Oct – Dec 2024',
      title:        'Transition to Real Applications',
      company:      'Full Stack Development',
      companyColor: '#9b5de5',
      description:  'Crossed from static frontends into full stack engineering — adopted React deeply, built my first production-style backend, and deployed real applications with live URLs.',
      bullets: [
        'Adopted React from scratch — components, props, useState, useEffect, useContext, custom hooks, and React Router v6',
        'Built first full stack CRUD application: Express.js REST API + MongoDB Atlas + React frontend with client-side routing',
        'Implemented JWT-based authentication with protected routes, token storage, and session persistence',
        'Deployed first live app: Vercel for frontend, Railway for backend — learned environment variables, build configs, and CORS setup in production',
        'Built the Realtime Chat Platform — first experience with WebSockets, Socket.io event architecture, and bi-directional state management',
        'Started thinking about component architecture, code reusability, and separation of concerns at the application level',
      ],
      tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Socket.io', 'Vercel', 'Railway'],
    },
    {
      period:       '2025 — Present',
      title:        'Systems Thinking Era',
      company:      'AI-Integrated Platform Engineering',
      companyColor: '#ffc947',
      description:  'Stopped writing features and started designing systems. Every project now begins with architecture diagrams, failure mode analysis, and a clear mental model of how data flows end-to-end.',
      bullets: [
        'Integrated Google Gemini 2.5 Flash API into FlowState AI — production error handling, exponential backoff, and structured prompt engineering for consistent outputs',
        'Architected FlowState AI as a modular monolith: decoupled services for auth, scheduling, AI inference, and analytics with clean internal interfaces',
        'Built MoodDJ\'s custom mood-scoring engine — first experience designing a proprietary algorithm with configurable weighting parameters',
        'Started exploring TypeScript for type-safe backend and frontend codebases — gradual migration strategy on existing Express projects',
        'Studying Next.js, Docker containerisation, and CI/CD pipelines — understanding deployment architecture beyond "push to Vercel"',
        'Active DSA practice at 400+ problems — focusing on graph traversal, dynamic programming, and system design patterns',
        'Exploring FastAPI for Python microservices as a potential sidecar for AI-heavy compute workloads',
      ],
      tags: ['Gemini API', 'System Design', 'TypeScript', 'Next.js', 'Docker', 'FastAPI', 'Architecture'],
    },
  ],

  // ──────────────────────────────────────────────────────────
  //  CONTACT.CSS
  // ──────────────────────────────────────────────────────────
  contact: {
    email:    'haitagniva@gmail.com',
    github:   'https://github.com/Agniva-07',
    linkedin: 'https://www.linkedin.com/in/agniva-hait-49508630a/',
    resume:   '',

    socials: [
      {
        label: 'EMAIL',
        value: 'haitagniva@gmail.com',
        href:  'mailto:haitagniva@gmail.com',
        icon:  '✉',
      },
      {
        label: 'GITHUB',
        value: 'github.com/Agniva-07',
        href:  'https://github.com/Agniva-07',
        icon:  '⌥',
      },
      {
        label: 'LINKEDIN',
        value: 'linkedin.com/in/agniva-hait',
        href:  'https://www.linkedin.com/in/agniva-hait-49508630a/',
        icon:  '⚇',
      },
    ],

    availability: [
      'Open to software engineering internships (remote or hybrid)',
      'Available for freelance full stack development projects',
      'Interested in open source contributions and collaborations',
      'Happy to connect with other developers and builders',
      'Open to technical discussions, mentorship, and knowledge exchange',
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  README.MD
  // ──────────────────────────────────────────────────────────
  readme: {
    name: 'Agniva Hait',

    bio: 'I engineer scalable digital systems with strong UI, intelligent workflows, and real-world usability. Second-year CSE student — building in public, learning in depth.',

    techStack: [
      'JavaScript', 'React', 'Node.js', 'Express.js',
      'MongoDB', 'Socket.io', 'Tailwind CSS', 'Gemini API',
    ],

    currentWork: 'FlowState AI — a modular productivity platform with Gemini API integration, burnout detection, and adaptive scheduling. Also building MoodDJ\'s emotion-to-music mapping engine and exploring TypeScript + Next.js migration.',

    education: 'B.Tech CSE — Kalyani Government Engineering College (2nd Year) · ISC 95% · ICSE 98% · JEE Mains 97 Percentile',

    dsa: '400+ problems solved across LeetCode & GeeksForGeeks — arrays, strings, recursion, trees, graphs, dynamic programming, and sliding window.',

    funFact: 'Spent 3 hours debugging a Gemini API response parser. The issue was a stray backtick in the model output breaking my JSON.parse(). Lesson: never trust LLM output formatting blindly.',

    quote: 'Made with caffeine, curiosity, and an unreasonable number of VS Code tabs.',
  },

};