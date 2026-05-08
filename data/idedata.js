// ============================================================
//  idedata.js — IDE Mode Data Source
//  Auto-loaded by ide.js from ../../data/idedata.js
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
      { value: '400+', label: 'DSA SOLVED'       },
      { value: '3+',   label: 'PROJECTS SHIPPED'  },
      { value: '7+',   label: 'TECH CATEGORIES'   },
      { value: '∞',    label: 'CURIOSITY'         },
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  ABOUT.HTML
  // ──────────────────────────────────────────────────────────
  about: {
    quote: 'I build scalable systems, not just frontend screens.',

    extended: `
I'm a second-year CSE student at Kalyani Government Engineering College — but the real learning happens far outside the classroom.

→ I don't wait for assignments to tell me what to build. I identify problems, architect solutions, and ship projects that reflect real engineering decisions — not tutorial clones.

→ My journey started in August 2024 with web fundamentals from first principles. By late 2024, I had transitioned into full stack development — building production-style apps with Express, MongoDB, and React, deployed on real infrastructure.

→ In 2025, my thinking evolved from writing features to designing systems. Every project now starts with architecture, data flow, and failure modes — before a single line of code.

→ I believe strong engineering isn't just about syntax. It's about designing things that are efficient, maintainable, and built to last.
`,

    traits: [
      {
        icon:        '⚡',
        title:       "I don't just code — I solve",
        color:       '#ffc947',
        description: 'Every project starts with a problem statement, not a tech stack. I break down complexity, identify bottlenecks early, and design solutions that scale under real-world constraints.',
      },
      {
        icon:        '🤖',
        title:       'I build with AI',
        color:       '#9b5de5',
        description: 'I integrate AI APIs — Gemini, Grok, YouTube Data — as core system components. I understand prompt engineering, rate-limiting, and how to build reliable pipelines on probabilistic models.',
      },
      {
        icon:        '📡',
        title:       'I learn in systems',
        color:       '#00d4ff',
        description: 'I don\'t learn tools in isolation. When I picked up React, I learned state, rendering, and architecture simultaneously. When I touched backends, I went all the way to deployment.',
      },
      {
        icon:        '🧠',
        title:       'I think before I type',
        color:       '#ff6b6b',
        description: 'Before opening an editor, I design data flows and consider failure modes. 400+ DSA problems have trained me to see patterns in complexity and choose efficient paths instinctively.',
      },
    ],

    interests: [
      'System Design', 'Artificial Intelligence', 'Frontend Architecture',
      'Backend Engineering', 'Human Psychology', 'Geopolitics',
      'Cricket', 'Philosophy', 'Emerging Technologies',
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
          { name: 'JavaScript (ES6+)', pct: 88, color: '#f7df1e' },
          { name: 'React.js',          pct: 82, color: '#61dafb' },
          { name: 'HTML5',             pct: 93, color: '#e34c26' },
          { name: 'CSS3',              pct: 90, color: '#264de4' },
          { name: 'Tailwind CSS',      pct: 78, color: '#38bdf8' },
          { name: 'Vanilla JS / DOM',  pct: 85, color: '#f0db4f' },
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
          { name: 'Google Gemini API',  pct: 80, color: '#9b5de5' },
          { name: 'Grok API',           pct: 65, color: '#ff6b6b' },
          { name: 'YouTube Data API',   pct: 72, color: '#ff0000' },
          { name: 'Prompt Engineering', pct: 78, color: '#ffc947' },
          { name: 'Workflow Automation',pct: 66, color: '#00d4ff' },
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
      description: 'An intelligent study-management platform with AI-driven scheduling, burnout detection, focus tracking, and adaptive productivity workflows — engineered as a production-grade system, not a tutorial clone.',
      tags:        ['React', 'Node.js', 'MongoDB', 'Gemini API', 'Express.js', 'JWT', 'Vercel', 'Railway'],
      github:      'https://github.com/Agniva-07/Study-Manager',
      live:        '',
      highlights: [
        'Gemini 2.5 Flash API integration with exponential backoff and structured error recovery under rate limits',
        'Burnout detection engine using pattern analysis across session logs and task completion history',
        'JWT auth with refresh tokens, protected routes, and cross-device session persistence',
        'Adaptive scheduler that re-prioritises tasks based on focus history, deadlines, and cognitive load',
        'Deployed on Vercel + Railway with environment-isolated build pipelines',
      ],
    },
    {
      title:       'MoodDJ',
      status:      'In Dev',
      category:    'FULL STACK · API ENGINEERING · MUSIC',
      description: 'A mood-aware music discovery engine that maps emotional input to curated track recommendations via YouTube Data API v3 — featuring a custom scoring algorithm and adaptive playlist generation.',
      tags:        ['React', 'Node.js', 'YouTube Data API v3', 'Express.js'],
      github:      '',
      live:        '',
      highlights: [
        'Custom mood-to-track scoring algorithm with weighted vectors across energy, valence, and tempo',
        'Artist mode with full discography traversal filtered by mood-fit score',
        'YouTube API quota management with pagination and fallback chains on empty result sets',
        'Session-based playlist state — lock tracks, regenerate others, export as shareable queue',
      ],
    },
    {
      title:       'Realtime Chat Platform',
      status:      'Completed',
      category:    'FULL STACK · WEBSOCKETS · REALTIME',
      description: 'A low-latency private messaging platform built on Socket.io with room-based architecture, persistent message history, and a clean React frontend.',
      tags:        ['React', 'Node.js', 'Socket.io', 'Express.js', 'MongoDB'],
      github:      '',
      live:        '',
      highlights: [
        'Socket.io bi-directional event pipeline with clean separation between system and message events',
        'Room-based channel isolation with unique session tokens, preventing cross-channel data leakage',
        'Persistent message history via MongoDB with indexed queries on roomId + timestamp',
        'Typing indicators and presence tracking via heartbeat pings with configurable TTL',
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
      description:  'Rebuilt web fundamentals from first principles — through reverse-engineering, deliberate practice, and building things that broke in interesting ways.',
      bullets: [
        'Deep-dived into HTML5 semantics, CSS layout models (flexbox, grid), and the full DOM API without abstraction layers',
        'Reconstructed real-world UI clones to internalise design systems, spacing logic, and responsive patterns',
        'Wrote raw JavaScript before touching any framework — closures, async/await, event loops, and module systems',
        'Established daily DSA practice — started with arrays, strings, and recursion, built upward systematically',
      ],
      tags: ['HTML5', 'CSS3', 'JavaScript', 'DOM API', 'DSA'],
    },
    {
      period:       'Oct – Dec 2024',
      title:        'Transition to Real Applications',
      company:      'Full Stack Development',
      companyColor: '#9b5de5',
      description:  'Crossed from static frontends into full stack engineering — adopted React deeply, built my first production-style backend, and deployed real applications with live URLs.',
      bullets: [
        'Adopted React from scratch — components, hooks, context, custom hooks, and React Router v6',
        'Built first full stack app: Express.js REST API + MongoDB Atlas + React frontend with client-side routing',
        'Implemented JWT authentication with protected routes and session persistence',
        'Deployed on Vercel + Railway — learned env variables, build configs, and CORS in production',
        'Built Realtime Chat Platform — first experience with WebSockets and bi-directional state management',
      ],
      tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Socket.io'],
    },
    {
      period:       '2025 — Present',
      title:        'Systems Thinking Era',
      company:      'AI-Integrated Platform Engineering',
      companyColor: '#ffc947',
      description:  'Stopped writing features and started designing systems. Every project now begins with architecture, failure mode analysis, and a clear mental model of end-to-end data flow.',
      bullets: [
        'Integrated Gemini 2.5 Flash into FlowState AI with production error handling and structured prompt engineering',
        'Architected FlowState AI as a modular monolith with decoupled services for auth, scheduling, and AI inference',
        'Built MoodDJ\'s custom mood-scoring engine — first experience designing a proprietary algorithm with configurable weights',
        'Exploring TypeScript, Next.js, Docker, and CI/CD — understanding deployment beyond "push to Vercel"',
        'Active DSA at 400+ problems — graphs, dynamic programming, and system design patterns',
      ],
      tags: ['Gemini API', 'System Design', 'TypeScript', 'Next.js', 'Docker', 'Architecture'],
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
      { label: 'EMAIL',    value: 'haitagniva@gmail.com',             href: 'mailto:haitagniva@gmail.com',                        icon: '✉' },
      { label: 'GITHUB',   value: 'github.com/Agniva-07',             href: 'https://github.com/Agniva-07',                       icon: '⌥' },
      { label: 'LINKEDIN', value: 'linkedin.com/in/agniva-hait',      href: 'https://www.linkedin.com/in/agniva-hait-49508630a/', icon: '⚇' },
    ],

    availability: [
      'Open to software engineering internships (remote or hybrid)',
      'Available for freelance full stack development projects',
      'Interested in open source contributions and collaborations',
      'Happy to connect, discuss tech, or collaborate on ideas',
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

    currentWork: 'FlowState AI — a modular productivity platform with Gemini API integration, burnout detection, and adaptive scheduling. Also building MoodDJ\'s emotion-to-music engine and exploring TypeScript + Next.js.',

    education: 'B.Tech CSE — Kalyani Government Engineering College (2nd Year) · ISC 95% · ICSE 98% · JEE Mains 97 Percentile',

    dsa: '400+ problems solved across LeetCode & GeeksForGeeks — arrays, strings, trees, graphs, and dynamic programming.',

    funFact: 'Spent 3 hours debugging a Gemini API response parser. The culprit was a stray backtick in the model output breaking JSON.parse(). Lesson: never trust LLM output formatting blindly.',

    quote: 'Made with caffeine, curiosity, and an unreasonable number of VS Code tabs.',
  },

};