export const portfolio = {
  // ============================================================
  // 🌐 CONFIG
  // ============================================================
  config: {
    theme: "dark",
    modes: ["normal", "story", "terminal"],
    accent: "cyan",
  },

  // ============================================================
  // 🧑 PROFILE
  // ============================================================
  profile: {
    name: "Agniva",
    fullName: "Agniva Hait",

    roles: [
      "Full Stack Developer",
      "Systems-Focused Engineer",
      "AI Integration Developer",
      "Interactive Experience Builder",
    ],

    tagline:
      "I architect scalable systems, ship production-grade applications, and engineer intelligent workflows that solve real problems.",

    location: "Kolkata, India",

    status: "Actively Building · Open to Internships & Collaborations",

    avatar: "/assets/agniva.png",
  },

  // ============================================================
  // 🎓 EDUCATION
  // ============================================================
  education: {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science and Engineering",
    year: "2nd Year",

    college: "Kalyani Government Engineering College",

    boards: [
      {
        exam: "ISC",
        score: "95%",
        board: "CISCE",
      },
      {
        exam: "ICSE",
        score: "98%",
        board: "CISCE",
      },
    ],

    competitive: [
      {
        exam: "JEE Mains",
        score: "97 Percentile",
      },
    ],
  },

  // ============================================================
  // 🧠 ABOUT
  // ============================================================
  about: {
    short:
      "I build scalable systems, not just frontend screens.",

    summary:
      "Second-year CSE student engineering performant, production-grade full stack systems — with a focus on AI integration, clean architecture, and real-world usability.",

    full: `
I'm a second-year Computer Science student at Kalyani Government Engineering College — but the real learning happens far outside the classroom.

I don't wait for assignments to tell me what to build. I identify problems, architect solutions, and ship projects that reflect genuine engineering decisions — not tutorial clones.

My core interest lies at the intersection of:
→ system design and scalable backend architecture
→ AI-integrated workflows and intelligent product experiences
→ high-performance, component-driven frontend engineering
→ developer tooling and deployment infrastructure

I approach every project as an architecture problem first. Before writing a line of code, I think about data flow, API contracts, failure modes, and long-term maintainability.

Currently focused on:
→ modular full stack system design
→ AI-powered productivity platforms
→ TypeScript, Next.js, and containerised deployment
→ advanced DSA — graphs, DP, and system design patterns

I believe strong engineering is about designing systems that are efficient, resilient, and genuinely useful — not just code that runs.
`,

    highlights: [
      {
        label: "DSA Problems Solved",
        value: "400+",
      },
      {
        label: "Projects Engineered",
        value: "Production-Grade Systems",
      },
      {
        label: "Current Academic Year",
        value: "B.Tech CSE — 2nd Year",
      },
      {
        label: "Current Status",
        value: "Open to Internships & Collaborations",
      },
    ],

    interests: [
      "System Design",
      "Artificial Intelligence",
      "Human Psychology",
      "Geopolitics",
      "Frontend Architecture",
      "Backend Engineering",
      "Developer Experience",
      "Cricket",
      "Philosophy",
      "Emerging Technologies",
    ],
  },

  // ============================================================
  // 🛠️ SKILLS
  // ============================================================
  skills: [
    {
      label: "Frontend Engineering",
      items: [
        "JavaScript (ES6+)",
        "React.js",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Vanilla JS / DOM",
      ],
    },

    {
      label: "Backend & APIs",
      items: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST API Design",
        "MySQL",
      ],
    },

    {
      label: "Programming Languages",
      items: [
        "JavaScript",
        "Python",
        "C",
      ],
    },

    {
      label: "AI Integrations & Automation",
      items: [
        "Google Gemini API",
        "Grok API",
        "YouTube Data API v3",
        "Prompt Engineering",
        "Workflow Automation",
      ],
    },

    {
      label: "Developer Tools & Workflow",
      items: [
        "Git & GitHub",
        "VS Code",
        "Postman",
        "Figma",
        "Vite",
      ],
    },

    {
      label: "Computer Science Fundamentals",
      items: [
        "Data Structures",
        "Algorithms",
        "Problem Solving",
        "400+ DSA Problems",
      ],
    },

    {
      label: "Currently Exploring",
      items: [
        "TypeScript",
        "Next.js",
        "Docker",
        "CI/CD Pipelines",
        "FastAPI",
        "System Design",
      ],
    },
  ],

  // ============================================================
  // 🚀 PROJECTS
  // ============================================================
  projects: [
    {
      id: 1,
      slug: "flowstate-ai",
      order: 1,

      title: "FlowState AI",

      tagline:
        "AI-powered productivity and burnout management platform",

      description:
        "A modular study-management ecosystem with AI-driven scheduling, burnout detection, focus analytics, and adaptive productivity workflows — built as a production-grade system with real infrastructure.",

      fullDescription: `
FlowState AI is a productivity platform engineered to optimise study workflows through intelligent scheduling and behavioural tracking.

Core systems built:
→ Adaptive task scheduler with cognitive load estimation
→ Burnout detection engine using session pattern analysis
→ Gemini 2.5 Flash integration with exponential backoff and structured error recovery
→ JWT authentication with refresh tokens and protected routes
→ Deployed on Vercel (frontend) and Railway (backend) with environment-isolated pipelines

Designed with a modular monolith architecture — decoupled services for auth, AI inference, scheduling, and analytics with clean internal interfaces.
`,

      tech: [
        "React",
        "Node.js",
        "MongoDB",
        "Gemini API",
        "Express.js",
        "JWT",
      ],

      links: {
        github: "https://github.com/Agniva-07/Study-Manager",
        live: "",
      },

      featured: true,
      status: "in-progress",
    },

    {
      id: 2,
      slug: "mooddj",
      order: 2,

      title: "MoodDJ",

      tagline:
        "Emotion-aware music discovery engine",

      description:
        "A mood-driven music recommendation system using YouTube Data API v3 — featuring a custom mood-to-track scoring algorithm, artist mode with discography traversal, and session-based playlist management.",

      fullDescription: `
MoodDJ maps emotional input to curated music recommendations through a proprietary scoring system.

Engineering highlights:
→ Custom scoring algorithm with weighted vectors across energy, valence, and tempo
→ Artist mode — full discography traversal filtered by mood-fit score
→ YouTube API v3 quota management with pagination and fallback chains
→ Session-based playlist state with lock, regenerate, and export functionality
`,

      tech: [
        "React",
        "Node.js",
        "YouTube Data API v3",
        "Express.js",
      ],

      links: {
        github: "",
        live: "",
      },

      featured: false,
      status: "in-progress",
    },

    {
      id: 3,
      slug: "chat-app",
      order: 3,

      title: "Realtime Chat Platform",

      tagline:
        "Low-latency communication system with room-based architecture",

      description:
        "A realtime messaging platform built on Socket.io with isolated room channels, persistent message history via MongoDB, presence tracking, and a responsive React frontend.",

      fullDescription: `
A production-style chat system engineered for reliability and clean event architecture.

Key engineering decisions:
→ Named Socket.io event pipeline — clean separation between system and message events
→ Room-based channel isolation with unique session tokens
→ Persistent history indexed on roomId + timestamp for fast reconnect retrieval
→ Typing indicators and presence tracking via configurable heartbeat pings
→ Optimistic UI updates with server-side reconciliation
`,

      tech: [
        "React",
        "Node.js",
        "Socket.io",
        "Express.js",
        "MongoDB",
      ],

      links: {
        github: "",
        live: "",
      },

      featured: false,
      status: "completed",
    },
  ],

  // ============================================================
  // 🧭 STORY
  // ============================================================
  story: [
    {
      id: "phase1",

      date: "Aug 2024",

      title: "Foundation Phase",

      subtitle: "Web fundamentals from first principles",

      content: [
        "Rebuilt HTML, CSS, and JavaScript from scratch — no shortcuts",
        "Reconstructed real-world UI clones to internalise layout and design systems",
        "Started daily DSA practice and core programming fundamentals",
      ],

      visual: "idle",
    },

    {
      id: "phase2",

      date: "Oct – Dec 2024",

      title: "Transition to Real Applications",

      subtitle: "Full stack engineering and live deployments",

      content: [
        "Adopted React deeply — components, hooks, context, and routing",
        "Built first production-style CRUD app with Express.js + MongoDB",
        "Deployed on Vercel and Railway — learned real infrastructure",
        "Shipped Realtime Chat Platform with Socket.io event architecture",
      ],

      visual: "thinking",
    },

    {
      id: "phase3",

      date: "2025 — Present",

      title: "Systems Thinking Era",

      subtitle: "Architecture-first engineering and AI integration",

      content: [
        "Started approaching every project as a system design problem",
        "Integrated Gemini API into production with error recovery and backoff",
        "Built FlowState AI as a modular platform with decoupled service layers",
        "Exploring TypeScript, Next.js, Docker, and CI/CD pipelines",
      ],

      visual: "focused",
    },
  ],

  // ============================================================
  // 📞 CONTACT
  // ============================================================
  contact: {
    email: "haitagniva@gmail.com",

    github: "https://github.com/Agniva-07",

    linkedin: "https://www.linkedin.com/in/agniva-hait-49508630a/",

    twitter: "",

    resume: "",
  },

  // ============================================================
  // 💻 TERMINAL
  // ============================================================
  terminal: {
    commands: {
      coffee:
        "Tabs are a personal attack. Spaces win every time.",

      music:
        "Kishore Kumar running in the background 🎧",

      fun:
        "Spent 3 hours debugging a Gemini response parser. Stray backtick. Never again.",

      hire:
        "Access granted. Let's build something that actually ships 🚀",
    },

    dsa: {
      count: "400+",

      platforms: [
        "LeetCode",
        "GeeksForGeeks",
      ],
    },
  },

  // ============================================================
  // 🔍 META
  // ============================================================
  meta: {
    siteTitle:
      "Agniva Hait • Full Stack Developer",

    description:
      "Systems-focused full stack developer building scalable web applications, AI-powered platforms, and production-grade digital experiences.",

    url: "",

    themeColor: "#0d0d0d",
  },
};