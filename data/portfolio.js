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
      "System Builder",
      "AI Integration Enthusiast",
      "Problem Solver",
    ],
    tagline: "I build interactive and useful systems, not just apps.",
    location: "Kolkata, India",
    status: "Open to opportunities",
    avatar: "",
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
      { exam: "ISC", score: "95%", board: "CISCE" },
      { exam: "ICSE", score: "98%", board: "CISCE" },
    ],

    competitive: [
      { exam: "JEE Mains", score: "97 Percentile" },
    ],
  },

  // ============================================================
  // 🧠 ABOUT
  // ============================================================
  about: {
    short: "I build systems, not just apps.",

    summary:
      "Second-year CSE student focused on solving real problems by building systems, not just apps.",

    full: `I'm a second-year Computer Science student who doesn't wait to "be ready" before building real things.
Most people learn to code. I learn to solve...

[TRIMMED FOR UI — keep full text same in your file]`,

    highlights: [
      { label: "DSA Problems Solved", value: "400+" },
      { label: "Projects Built", value: "Real-world" },
      { label: "Current Year", value: "B.Tech 2nd Year" },
      { label: "Status", value: "Open to Opportunities" },
    ],

    interests: [
      "Geopolitics",
      "Spirituality",
      "Cricket",
      "Psychology",
      "Philosophy",
      "Esports",
      "AI & Emerging Tech",
      "System Design",
    ],
  },

  // ============================================================
  // 🛠️ SKILLS
  // ============================================================
  skills: [
    {
      label: "Core Stack",
      items: [
        "JavaScript",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "HTML",
        "CSS",
      ],
    },
    {
      label: "Also Proficient",
      items: [
        "C",
        "Python",
        "MySQL",
        "REST APIs",
        "Tailwind CSS",
        "Vanilla JS",
      ],
    },
    {
      label: "Currently Learning",
      items: ["TypeScript", "Next.js", "FastAPI", "Docker", "CI/CD"],
    },
    {
      label: "AI & Integrations",
      items: [
        "Google Gemini API",
        "Grok API",
        "YouTube API",
        "Prompt Engineering",
      ],
    },
    {
      label: "Tools & DevOps",
      items: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Vite"],
    },
    {
      label: "Problem Solving",
      items: [
        "400+ LeetCode / GFG",
        "Data Structures",
        "Algorithms",
      ],
    },
  ],

  // ============================================================
  // 🚀 PROJECTS (ALL PRESERVED)
  // ============================================================
  projects: [
    {
      id: 1,
      slug: "flowstate-ai",
      order: 1,

      title: "FlowState AI",
      tagline: "Study smarter. Burn out less.",

      description:
        "AI-powered study planner with burnout detection, analytics, and focus tracking.",

      fullDescription: `An adaptive study planning system with AI burnout detection...`,

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
      tagline: "Mood-based music system",

      description:
        "Combines Spotify + YouTube for personalized mood-based listening.",

      tech: ["React", "API Integration"],

      links: { github: "", live: "" },
      featured: false,
      status: "in-progress",
    },

    {
      id: 3,
      slug: "chat-app",
      order: 3,

      title: "Chat Application",
      tagline: "Real-time messaging system",

      description:
        "Real-time chat app with private rooms and live updates.",

      tech: ["React", "Node.js", "Socket.io"],

      links: { github: "", live: "" },
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
      title: "Learning the Basics",
      subtitle: "Where it all started",

      content: [
        "Started with HTML, CSS, JS",
        "Built frontend clones",
        "Focused on learning fundamentals",
      ],

      visual: "idle",
    },

    {
      id: "phase2",
      date: "Oct–Dec 2024",
      title: "From Clones to Real Use",

      content: [
        "Shifted to React",
        "Built real apps",
        "Started solving real-life problems",
      ],

      visual: "thinking",
    },

    {
      id: "phase3",
      date: "2025",
      title: "Building Systems",

      content: [
        "Started system design thinking",
        "Built FlowState & MoodDJ",
        "Focus on real-world impact",
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
        "Tabs are a personal attack. Spaces always.",
      music:
        "Kishore Kumar 🎧",
      fun:
        "Debugged for 3 hours. It was CORS.",
      hire:
        "Access granted. Let's build something great 🚀",
    },

    dsa: {
      count: "400+",
      platforms: ["LeetCode", "GFG"],
    },
  },

  // ============================================================
  // 🔍 META
  // ============================================================
  meta: {
    siteTitle: "Agniva · Portfolio",
    description:
      "Full Stack Developer. I build systems, not just apps.",
    url: "",
    themeColor: "#0d0d0d",
  },
};