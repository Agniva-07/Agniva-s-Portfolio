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
      "I engineer scalable digital systems with strong UI, intelligent workflows, and real-world usability.",

    location: "Kolkata, India",

    status: "Actively Building & Open to Opportunities",

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
      "Second-year CSE student focused on engineering performant, user-centric, and system-oriented digital products.",

    full: `
I'm a second-year Computer Science student deeply focused on building practical systems that solve meaningful real-world problems.

Instead of limiting myself to tutorial-based development, I actively work on architecting interactive platforms, AI-assisted workflows, and scalable full stack applications.

My primary interest lies at the intersection of:
- system design
- intelligent user experiences
- backend architecture
- AI integrations
- high-performance frontend engineering

I enjoy understanding how complete systems work internally — from APIs and databases to rendering pipelines, UX flows, optimization, and deployment structures.

Currently, I am focused on:
- advanced frontend engineering
- scalable backend systems
- AI-powered productivity platforms
- developer tooling
- system architecture thinking

I believe strong engineering is not just about writing code — it's about designing systems that are efficient, maintainable, and genuinely useful.
`,

    highlights: [
      {
        label: "DSA Problems Solved",
        value: "400+",
      },
      {
        label: "Projects Engineered",
        value: "Real-World Systems",
      },
      {
        label: "Current Academic Year",
        value: "B.Tech 2nd Year",
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
        "JavaScript",
        "React",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Vanilla JS",
      ],
    },

    {
      label: "Backend & APIs",

      items: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
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
        "Prompt Engineering",
        "Workflow Automation",
        "YouTube API",
      ],
    },

    {
      label: "Developer Tools & Workflow",

      items: [
        "Git",
        "GitHub",
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
        "CI/CD",
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
        "AI-assisted productivity and burnout management platform",

      description:
        "An intelligent study-management ecosystem integrating AI-driven scheduling, burnout analytics, focus tracking, and adaptive productivity workflows.",

      fullDescription: `
FlowState AI is a productivity-focused platform designed to optimize study workflows using intelligent scheduling and behavioral tracking.

The system focuses on:
- adaptive task planning
- burnout detection
- productivity analytics
- focus monitoring
- AI-assisted recommendations

Built with scalability and modular architecture in mind, the platform combines responsive frontend engineering with intelligent backend logic to create a practical real-world productivity system.
`,

      tech: [
        "React",
        "Node.js",
        "MongoDB",
        "Gemini API",
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
        "Emotion-aware music discovery platform",

      description:
        "A mood-driven music recommendation system integrating Spotify and YouTube APIs for adaptive listening experiences.",

      tech: [
        "React",
        "API Integration",
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
        "Low-latency communication system",

      description:
        "A realtime messaging platform supporting private communication channels, socket-based event updates, and responsive UI interactions.",

      tech: [
        "React",
        "Node.js",
        "Socket.io",
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

      subtitle: "Learning core web fundamentals",

      content: [
        "Started with HTML, CSS, and JavaScript",
        "Built frontend UI clones",
        "Focused heavily on programming fundamentals",
      ],

      visual: "idle",
    },

    {
      id: "phase2",

      date: "Oct – Dec 2024",

      title: "Transition to Real Applications",

      content: [
        "Shifted into React ecosystem",
        "Started building production-style applications",
        "Focused on solving practical user problems",
      ],

      visual: "thinking",
    },

    {
      id: "phase3",

      date: "2025",

      title: "Systems Thinking",

      content: [
        "Started exploring system design concepts",
        "Built AI-integrated platforms",
        "Focused on scalability and real-world usability",
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

    linkedin:
      "https://www.linkedin.com/in/agniva-hait-49508630a/",

    twitter: "",

    resume: "",
  },

  // ============================================================
  // 💻 TERMINAL
  // ============================================================
  terminal: {
    commands: {
      coffee:
        "Tabs are a personal attack. Spaces win.",

      music:
        "Kishore Kumar running in the background 🎧",

      fun:
        "Spent 3 hours debugging. Missing semicolon.",

      hire:
        "Access granted. Let's engineer something impactful 🚀",
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
      "Systems-focused full stack developer building scalable web applications, AI-powered workflows, and interactive digital experiences.",

    url: "",

    themeColor: "#0d0d0d",
  },
};