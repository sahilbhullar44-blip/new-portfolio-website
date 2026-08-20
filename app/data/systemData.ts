import { Server, Cpu, Smartphone, Terminal, Code2, Database, Shield, Zap } from "lucide-react";

export interface ProjectItem {
  id: string;
  name: string;
  category: "fullstack" | "ai_ml" | "mobile" | "tools";
  issueTag: string;
  tagline: string;
  size: string;
  date: string;
  desc: string;
  editorialSummary: string;
  architectureHighlights: string[];
  pullQuote: string;
  tech: string[];
  status: string;
  color: string;
  accentGradient: string;
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
}

export const magazineMetaData = {
  issueNumber: "ISSUE 01",
  volume: "VOL. 2026",
  title: "SAHILPREET SINGH",
  subTitle: "FULL-STACK & AI SYSTEMS ARCHITECT",
  editorialMotto: "CODE AS ART // ARCHITECTURE AS SCIENCE",
  authorBio: "Specializing in MERN stack, high-frequency WebSockets, multi-tenant RBAC systems, and AI-powered ETL pipelines.",
  metrics: [
    { label: "Production Platforms Built", value: "8+" },
    { label: "Realtime Socket Latency", value: "< 25ms" },
    { label: "AI Speech-To-Text ETL", value: "10k+ Records/hr" },
    { label: "Multi-Tenant Scalability", value: "Enterprise Grade" },
  ]
};

export const magazineProjects: ProjectItem[] = [
  {
    id: "tickmark",
    name: "Tickmark.io",
    category: "fullstack",
    issueTag: "COVER STORY // FEATURE 01",
    tagline: "Enterprise Multi-Tenant SaaS & Operations Suite",
    size: "7.3 MB",
    date: "NOV 2024",
    desc: "Multi-tenant management platform with granular RBAC permissions, team & task modules, timezone-aware Agenda cron services, and high-frequency WebSocket updates.",
    editorialSummary: "Engineered from the ground up for high concurrency enterprise teams. Built with isolation layers, MongoDB aggregation pipelines, dynamic role-based access control, and automated agenda scheduling services.",
    architectureHighlights: [
      "Multi-tenant database schema isolation with MongoDB indexes",
      "Timezone-aware cron worker service utilizing Node.js & Agenda",
      "Realtime bi-directional task sync via Socket.io channels",
      "Comprehensive OpenAPI / Swagger API specification"
    ],
    pullQuote: "Designing multi-tenant architecture demands ruthless query optimization and rock-solid permission guardrails.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Socket.io", "TypeScript", "RBAC", "Agenda Cron"],
    status: "Production Live",
    color: "text-amber-400",
    accentGradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    metrics: [
      { label: "Verified Test Pass Rate", value: "100%" },
      { label: "Task Sync Delay", value: "< 15ms" },
      { label: "RBAC Roles Configured", value: "Dynamic" }
    ],
    liveUrl: "https://tickmark.io"
  },
  {
    id: "medfeed",
    name: "Medfeed.ai",
    category: "ai_ml",
    issueTag: "AI & ML DISPATCH // FEATURE 02",
    tagline: "AI-Powered Medical ETL & Patient Sentiment Pipeline",
    size: "600 MB",
    date: "SEP 2024",
    desc: "Automated AI ETL system converting raw patient voice recordings into structured clinical insights using OpenAI Whisper speech-to-text and ChatGPT sentiment models.",
    editorialSummary: "Transforming unstructured medical feedback into actionable healthcare task tickets. The pipeline processes multi-format audio streams, extracts critical medical signals, and categorizes urgent patient needs.",
    architectureHighlights: [
      "Whisper STT engine integration with dynamic noise reduction",
      "ChatGPT API function-calling for structured JSON output parsing",
      "FastAPI & Node.js hybrid orchestration layer",
      "MongoDB aggregation pipeline for clinical analytics"
    ],
    pullQuote: "AI in healthcare isn't just about text generation—it's about deterministic signal extraction from ambient human speech.",
    tech: ["Python", "ChatGPT API", "Whisper", "FastAPI", "MongoDB", "Node.js"],
    status: "Active System",
    color: "text-cyan-400",
    accentGradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    metrics: [
      { label: "STT Accuracy", value: "96.4%" },
      { label: "Audio Processing Speed", value: "4x Realtime" },
      { label: "Structured Schema", value: "100% Validated" }
    ],
    liveUrl: "https://medfeed.ai"
  },
  {
    id: "amritsar",
    name: "Amritsar.com",
    category: "fullstack",
    issueTag: "REALTIME BROADCAST // FEATURE 03",
    tagline: "High-Traffic Live Streaming & Content Moderation Hub",
    size: "5.5 MB",
    date: "SEP 2024",
    desc: "Live media streaming platform featuring YouTube API integration, ultra-low latency interactive chat rooms, and automated content moderation filters.",
    editorialSummary: "Built to support high viewer concurrency during major broadcast events. The system handles thousands of concurrent socket connections while maintaining instant message delivery and automated spam filtering.",
    architectureHighlights: [
      "Optimized Next.js frontend with SSR streaming components",
      "Cluster-mode Express.js socket servers with Redis Pub/Sub backplane",
      "Live YouTube Live API metadata synchronization",
      "Automated chat moderation regex & keyword filtering"
    ],
    pullQuote: "High-concurrency chat systems require minimal memory overhead per socket connection.",
    tech: ["Next.js", "Express", "TypeScript", "Socket.io", "Redis", "YouTube API"],
    status: "Production Live",
    color: "text-rose-400",
    accentGradient: "from-rose-500/20 via-rose-500/5 to-transparent",
    metrics: [
      { label: "Concurrent Viewers", value: "10,000+" },
      { label: "Chat Broadcast Latency", value: "< 20ms" }
    ],
    liveUrl: "https://amritsar.com"
  },
  {
    id: "sofa_studio",
    name: "Sofa Studio",
    category: "fullstack",
    issueTag: "DESIGN & COMMERCE // FEATURE 04",
    tagline: "Custom Furniture CAD & Admin Inventory Studio",
    size: "3.6 MB",
    date: "OCT 2024",
    desc: "Admin dashboard and custom design management platform integrating TanStack Query for seamless server state synchronization.",
    editorialSummary: "Streamlining custom furniture manufacturing workflows with interactive asset management, rapid inventory status toggles, and instant UI state updates.",
    architectureHighlights: [
      "TanStack Query (React Query) mutation & optimistic update patterns",
      "Tailwind CSS custom glassmorphism design system",
      "Node.js asset processing pipeline"
    ],
    pullQuote: "Optimistic UI updates transform admin dashboards from clunky tools into delightful creative environments.",
    tech: ["Next.js", "Node.js", "TanStack Query", "TypeScript", "Tailwind CSS"],
    status: "Stable Production",
    color: "text-purple-400",
    accentGradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    metrics: [
      { label: "UI Response Time", value: "< 50ms" },
      { label: "State Syncing", value: "Zero Flickers" }
    ]
  },
  {
    id: "shivshakti",
    name: "Shiv Shakti Fast Food",
    category: "fullstack",
    issueTag: "COMMERCE DISPATCH // FEATURE 05",
    tagline: "Real-Time Food Order Dispatch & Kitchen Display System",
    size: "4.1 MB",
    date: "AUG 2024",
    desc: "High-speed digital ordering web application with live kitchen order status tracking, dynamic menu filtering, and customer notifications.",
    editorialSummary: "Eliminating order bottlenecks during peak dining hours with a instant-update kitchen display interface and lightweight customer web app.",
    architectureHighlights: [
      "Next.js App Router server actions for rapid checkout",
      "MongoDB geospatial indexing for delivery radius checks",
      "Live order status WebSockets"
    ],
    pullQuote: "Speed and clarity in UI design are non-negotiable for high-pressure kitchen operations.",
    tech: ["Next.js", "MongoDB", "Express", "Tailwind CSS"],
    status: "Production Live",
    color: "text-emerald-400",
    accentGradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    metrics: [
      { label: "Order Processing", value: "< 2 secs" }
    ]
  },
  {
    id: "memesake",
    name: "MemeSake Mobile",
    category: "mobile",
    issueTag: "MOBILE EXPERIMENT // FEATURE 06",
    tagline: "Cross-Platform Mobile Content & Social Discovery Engine",
    size: "38 MB",
    date: "JUN 2024",
    desc: "React Native iOS & Android application engineered for high-performance meme image rendering, infinite scroll feeds, and user social sharing.",
    editorialSummary: "Focusing on image cache optimization, hardware acceleration, and smooth 60fps gesture navigation on mobile devices.",
    architectureHighlights: [
      "React Native bridge optimization and FastImage caching",
      "Custom infinite scroll pagination algorithm",
      "Native device share sheet integrations"
    ],
    pullQuote: "Delivering butter-smooth 60fps scrolling on mobile requires meticulous memory and thread management.",
    tech: ["React Native", "TypeScript", "Redux Toolkit", "Node.js"],
    status: "Beta Release",
    color: "text-lime-400",
    accentGradient: "from-lime-500/20 via-lime-500/5 to-transparent",
    metrics: [
      { label: "FPS Target", value: "60 FPS" },
      { label: "Memory Footprint", value: "Optimized" }
    ]
  },
  {
    id: "etl_pipeline",
    name: "MongoDB ETL Engine",
    category: "tools",
    issueTag: "INFRASTRUCTURE // FEATURE 07",
    tagline: "High-Throughput Aggregation & Data Processing Pipeline",
    size: "18 KB",
    date: "NOV 2024",
    desc: "High-performance MongoDB aggregation ETL pipeline script for batch processing feedback records, sentiment scoring, and task routing.",
    editorialSummary: "Constructed to process tens of thousands of complex database documents with multi-stage `$facet`, `$lookup`, and `$unwind` pipelines.",
    architectureHighlights: [
      "Custom MongoDB aggregation pipeline design patterns",
      "Node.js stream processing for memory efficiency",
      "Fault-tolerant error logging and retry queues"
    ],
    pullQuote: "Complex database aggregation turns heavy application logic into hyper-fast native database operations.",
    tech: ["MongoDB Aggregation", "Node.js", "TypeScript", "ETL"],
    status: "Production Utility",
    color: "text-emerald-400",
    accentGradient: "from-emerald-500/20 via-emerald-500/5 to-transparent"
  }
];

export const magazineSkills = [
  {
    domain: "01 // FRONTEND ARCHITECTURE",
    icon: Code2,
    description: "Building responsive, modern, and high-performance user interfaces with modern React paradigms.",
    skills: [
      { name: "React 19 / Next.js 16", level: "Expert", tags: ["App Router", "SSR", "Server Actions"] },
      { name: "TypeScript", level: "Expert", tags: ["Strict Typing", "Generics", "AST"] },
      { name: "Tailwind CSS & Glassmorphism", level: "Expert", tags: ["Custom Tokens", "PostCSS", "Design Systems"] },
      { name: "GSAP & Framer Motion", level: "Advanced", tags: ["ScrollTrigger", "Parallax", "Custom Easing"] },
    ]
  },
  {
    domain: "02 // BACKEND & REALTIME SYSTEMS",
    icon: Server,
    description: "Architecting scalable microservices, WebSocket channels, and REST/GraphQL APIs.",
    skills: [
      { name: "Node.js & Express.js", level: "Expert", tags: ["Async IO", "Middleware", "Cluster Mode"] },
      { name: "Socket.io & WebSockets", level: "Expert", tags: ["Bi-directional", "Rooms", "Redis Adapter"] },
      { name: "Python & FastAPI", level: "Intermediate", tags: ["Async", "Pydantic", "AI Wrappers"] },
      { name: "Agenda & Cron Workers", level: "Advanced", tags: ["Timezone Aware", "Queue Locks"] },
    ]
  },
  {
    domain: "03 // DATABASE & DATA PIPELINES",
    icon: Database,
    description: "Designing high-performance multi-tenant schemas and complex aggregation pipelines.",
    skills: [
      { name: "MongoDB & Mongoose", level: "Expert", tags: ["Aggregation Pipelines", "Indexing", "RBAC"] },
      { name: "Redis", level: "Advanced", tags: ["Caching", "Pub/Sub", "Session Store"] },
      { name: "ETL & Data Transformation", level: "Advanced", tags: ["Audio STT", "JSON Parsing"] },
    ]
  },
  {
    domain: "04 // AI INTEGRATIONS & TOOLS",
    icon: Cpu,
    description: "Incorporating cutting-edge AI speech-to-text models and LLM automation pipelines.",
    skills: [
      { name: "OpenAI ChatGPT API", level: "Advanced", tags: ["Function Calling", "Prompt Engineering"] },
      { name: "OpenAI Whisper STT", level: "Advanced", tags: ["Audio Transcribing", "NLP Extraction"] },
      { name: "Git & GitHub CLI", level: "Expert", tags: ["Workflows", "Actions", "CI/CD"] },
      { name: "OpenAPI / Swagger", level: "Expert", tags: ["API Specs", "Contract Testing"] },
    ]
  }
];

export const systemData = {
  root: [
    { id: "fullstack", name: "Fullstack_Dev", type: "folder", icon: Server },
    { id: "ai_ml", name: "AI_Intelligence", type: "folder", icon: Cpu },
    { id: "mobile", name: "Mobile_Apps", type: "folder", icon: Smartphone },
    { id: "tools", name: "Sys_Utils", type: "folder", icon: Terminal },
  ],
  files: {
    fullstack: magazineProjects.filter((p) => p.category === "fullstack"),
    ai_ml: magazineProjects.filter((p) => p.category === "ai_ml"),
    mobile: magazineProjects.filter((p) => p.category === "mobile"),
    tools: magazineProjects.filter((p) => p.category === "tools"),
  },
};

