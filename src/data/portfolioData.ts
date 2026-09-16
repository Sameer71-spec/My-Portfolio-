import {
  Project,
  SkillCategory,
  JourneyMilestone,
  PersonalInfo,
  ThemeSettings,
  AnimationSettings,
  EducationInfo,
  WorkExperienceInfo,
  CustomDesign,
} from '../types';

export const INITIAL_PERSONAL_INFO: PersonalInfo = {
  name: 'Sameer',
  fullName: 'Sameer',
  professionalTitle: 'Full Stack & AI Developer',
  location: 'Karachi, Pakistan',
  phone: '03312820966',
  phoneFormatted: '+92 331 2820966',
  phoneTel: 'tel:+923312820966',
  email: 'sameerwork0129@gmail.com',
  emailMailto: 'mailto:sameerwork0129@gmail.com',
  githubUrl: 'https://github.com/Sameer71-spec',
  githubUsername: 'Sameer71-spec',
  portraitLocal: '/sameer-portrait.jpg',
  portraitFallback: 'https://avatars.githubusercontent.com/u/213257428?v=4',
  heroHeadingLine1: 'Welcome to',
  heroHeadingLine2: 'My Developer',
  heroHeadingLine3: 'Portfolio',
  heroBadgeText: 'Sameer / Full Stack & AI Developer',
  heroDescription:
    'Architecting intelligent agentic workflows, responsive full-stack applications, and real-world software solutions.',
  aboutDescription:
    "I'm a full stack developer and AI builder with a focus on creating practical, high-performance software. Today, I build autonomous agentic workflows, responsive web applications, and automated systems that solve real-world problems.",
  aboutSubDescription:
    'My technical interests span Agentic AI frameworks (LangGraph, autonomous tool execution), modern full-stack development (React, TypeScript, Python, FastAPI), and API-driven automation.',
  tagline: 'Turning Ideas Into Intelligent Solutions.',
  philosophyQuote: 'Code speaks where logic connects to real-world intelligence.',
  philosophySubtext:
    'Building software with direct functional utility, robust system architecture, and minimal fluff.',
  quoteAttribution: 'Sameer — Utilitarian Philosophy',
  heroVisualType: 'portrait',
  backgroundVisualType: 'default',
  showDesignsSection: true,
};

export const INITIAL_THEME_SETTINGS: ThemeSettings = {
  fontSerif: 'Playfair Display',
  fontSans: 'Plus Jakarta Sans',
  bgPrimary: '#0A0A0A',
  bgSecondary: '#121212',
  bgCard: '#161616',
  accentColor: '#FFFFFF',
  textColor: '#F5F5F5',
  textMuted: '#A3A3A3',
  borderColor: '#262626',
  themePresetName: 'Classic Noir',
};

export const INITIAL_ANIMATION_SETTINGS: AnimationSettings = {
  cursorStyle: 'starlight',
  badgeSpinSpeed: 'slow',
  cardHoverZoom: true,
  enableMotion: true,
};

export const INITIAL_EDUCATION_INFO: EducationInfo = {
  level: 'Intermediate',
  institution: 'Allied School',
  location: 'Karachi, Pakistan',
  description:
    'Foundational academics with deep focus on mathematics, computational logic, and problem solving.',
  selfLearningAreas: [
    'Agentic AI & Multi-Agent Systems',
    'Python & FastAPI Backends',
    'Modern React & TypeScript',
    'Vector Embeddings & RAG',
    'API-driven Automation',
  ],
};

export const INITIAL_WORK_EXPERIENCE_INFO: WorkExperienceInfo = {
  period: '2024 — Present',
  role: 'Independent Developer & AI Architect',
  type: 'Independent / Open Source',
  description:
    'Building utilitarian software, full-stack applications, and agentic AI architectures including CareerPilot-AI and quick-temp-mail.',
  capabilities: [
    'Python & FastAPI Microservices',
    'React & Modern Web Interfaces',
    'LangGraph Multi-Agent Workflows',
    'Vector DBs (ChromaDB) & RAG',
    'REST APIs & Real-Time Polling',
    'Utilitarian & Production Craft',
  ],
};

export const INITIAL_SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AGENTIC AI & LLMs',
    iconName: 'Bot',
    skills: [
      'LangGraph',
      'Autonomous Agents',
      'Tool Calling',
      'RAG Pipelines',
      'ChromaDB Vector Store',
      'Prompt Engineering',
      'Multi-Agent Coordination',
    ],
  },
  {
    title: 'PROGRAMMING & BACKEND',
    iconName: 'Server',
    skills: [
      'Python',
      'FastAPI',
      'Flask',
      'REST APIs',
      'MongoDB',
      'PostgreSQL',
      'Node.js',
    ],
  },
  {
    title: 'FRONTEND & UI',
    iconName: 'Layout',
    skills: [
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Motion Animations',
      'Responsive Web Design',
      'Vite',
    ],
  },
  {
    title: 'TOOLS & PLATFORMS',
    iconName: 'Cpu',
    skills: [
      'Git & GitHub',
      'VS Code',
      'Linux Environment',
      'Vercel / Cloud Run',
      'API Integration',
    ],
  },
  {
    title: 'CORE PHILOSOPHIES',
    iconName: 'Sparkles',
    skills: [
      'Utilitarian Craft',
      'Practical Problem Solving',
      'Clean Code Architecture',
      'Rapid Autonomous Iteration',
    ],
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'careerpilot-ai',
    number: '01',
    name: 'CareerPilot AI',
    category: 'Agentic AI',
    categoryLabel: 'Agentic AI / Career Intelligence',
    tagline: 'Assessment Before Recommendation',
    description:
      'An agentic AI career guidance system that analyzes resumes, extracts claims, performs dynamic skill assessments, verifies information, analyzes job-market trends, detects skill gaps, generates personalized roadmaps and helps optimize resumes.',
    technologies: ['Python', 'FastAPI', 'LangGraph', 'MongoDB', 'ChromaDB', 'AI / LLM'],
    features: [
      'Resume Analysis & Claim Extraction',
      'Dynamic Skill Assessment Loop',
      'Claim Verification Engine',
      'Job Market Trend Correlation',
      'Semantic Skill Gap Detection',
      'Personalized Roadmap Generator',
      'Multi-Agent Stateful Graph',
    ],
    problem:
      'Standard career platforms rely on superficial keyword matching that fails to verify authentic candidate abilities or provide actionable gap-closing guidance.',
    solution:
      'CareerPilot AI implements an agentic multi-agent architecture where autonomous agents extract qualifications, run dynamic skill assessments, cross-reference market requirements using vector embeddings, and construct tailored learning roadmaps.',
    developmentApproach:
      'Constructed using LangGraph for stateful multi-agent coordination, FastAPI for high-throughput orchestration, ChromaDB for semantic skill gap indexing, and MongoDB for structured profile persistence.',
    githubUrl: 'https://github.com/Sameer71-spec',
    isFlagship: true,
  },
  {
    id: 'quick-temp-mail',
    number: '02',
    name: 'Quick Temp Mail System',
    category: 'Full Stack',
    categoryLabel: 'Full Stack / Disposable Email',
    tagline: 'Instant Inboxes, Zero Spam',
    description:
      'A web-based temporary email application demonstrating full-stack development, instant mailbox generation, and real-time inbox polling.',
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'REST API'],
    features: [
      'Instant Ephemeral Email Generation',
      'Real-Time Inbox Polling & Notification',
      'Email HTML/Text Parsing & Rendering',
      'Clean Disposable Inbox Management',
      'Secure End-to-End API Integration',
    ],
    problem:
      'Testing web application onboarding workflows or signing up for non-critical services often requires disposable inboxes to avoid spam clutter and protect privacy.',
    solution:
      'A live, responsive temporary email web service that automatically generates randomized mailbox addresses, monitors incoming messages via background polling, and presents parsed messages.',
    developmentApproach:
      'Built with a decoupled Python FastAPI backend and a lightweight React frontend, hosted and deployed with active verification.',
    githubUrl: 'https://github.com/Sameer71-spec/quick-temp-mail',
    liveDemoUrl: 'https://quicktemp-catch-all.lovable.app',
    isFlagship: true,
  },
  {
    id: 'ai-smart-assistant',
    number: '03',
    name: 'AI Smart Assistant',
    category: 'AI / LLM',
    categoryLabel: 'AI / LLM & Conversations',
    tagline: 'Conversational Clarity & Fast Execution',
    description:
      'An AI-powered assistant application focused on conversational interaction, intelligent prompt parsing, and fast response generation.',
    technologies: ['Python', 'FastAPI', 'React', 'LLM Streaming'],
    features: [
      'Conversational Context Handling',
      'Intelligent Prompt Parsing',
      'Real-Time Streaming Responses',
      'Clean Modular Dark UI',
    ],
    problem:
      'Users need responsive, context-aware virtual assistance that can handle multi-turn inquiries with clarity without complicated setup.',
    solution:
      'A full-stack application that couples a high-speed Python FastAPI backend with a reactive React frontend to process natural language queries and provide immediate intelligent answers.',
    developmentApproach:
      'Developed with modular backend endpoints for streaming LLM responses, structured error handling, and a distraction-free user interface.',
    githubUrl: 'https://github.com/Sameer71-spec',
    isFlagship: true,
  },
  {
    id: 'crypto-chatbot',
    number: '04',
    name: 'Crypto Chatbot Using LLM',
    category: 'AI / LLM',
    categoryLabel: 'AI / Financial Domain',
    tagline: 'De-mystifying Web3 Concepts',
    description:
      'An LLM-powered chatbot focused on cryptocurrency-related questions, market concepts, and blockchain mechanics.',
    technologies: ['Python', 'LLM', 'FastAPI', 'React'],
    features: [
      'Cryptocurrency Domain Querying',
      'Token & Ecosystem Concept Explanations',
      'Conversational Dialogue Interface',
      'Fast Prompt-Engineered Responses',
    ],
    problem:
      'Understanding cryptocurrency mechanics, blockchain terminology, and market concepts is frequently overwhelming for learners due to fragmented information.',
    solution:
      'An educational chatbot application tuned to address crypto-specific inquiries, clarify complex protocols, and explain decentralized concepts in simple terms.',
    developmentApproach:
      'Engineered domain-specific prompt templates executed through FastAPI routes, integrated with a sleek dark-themed React chat dashboard.',
    githubUrl: 'https://github.com/Sameer71-spec',
    isFlagship: false,
  },
  {
    id: 'ai-learning-platform',
    number: '05',
    name: 'AI-powered Learning Platform',
    category: 'EdTech',
    categoryLabel: 'EdTech / Automated Quizzes',
    tagline: 'Interactive Knowledge Verification',
    description:
      'An AI-assisted educational platform focused on PDF-based learning, automated quiz generation, learning progression and conceptual explanations.',
    technologies: ['Python', 'FastAPI', 'React', 'AI Document Parsing'],
    features: [
      'PDF Document Parsing & Extraction',
      'Automated Quiz & Assessment Generation',
      'Learning Progression Tracking',
      'AI-Assisted Concept Explanations',
      'Interactive Student Feedback Loops',
    ],
    problem:
      'Students and self-learners often struggle to test their comprehension when studying dense PDF textbooks or lecture notes.',
    solution:
      'An interactive educational workspace where learners upload study materials or PDFs and receive dynamic quizzes, detailed breakdowns of difficult concepts, and progress tracking.',
    developmentApproach:
      'Constructed with Python document parsing pipelines feeding into structured AI quiz generators, connected to an intuitive React revision dashboard.',
    githubUrl: 'https://github.com/Sameer71-spec',
    isFlagship: false,
  },
  {
    id: 'agentic-ai-workflows',
    number: '06',
    name: 'Agentic AI Workflow Suite',
    category: 'Agentic AI',
    categoryLabel: 'Agentic AI / Automation',
    tagline: 'Autonomous Multi-Step Execution',
    description:
      'A suite of specialized autonomous agent scripts executing multi-step verification, recursive web search, and data synthesis.',
    technologies: ['Python', 'LangGraph', 'TypeScript', 'Tool Calling'],
    features: [
      'Multi-Step Agent State Machines',
      'Dynamic Tool Selection & Calling',
      'Self-Correction Feedback Loops',
      'Structured JSON Schema Outputs',
    ],
    problem:
      'Single-prompt LLMs fail when tasks require multiple steps, verification, and external tool execution.',
    solution:
      'Implemented cyclic graphs where agents evaluate their intermediate outputs, call external tools, and iterate until the task criteria are fully satisfied.',
    developmentApproach:
      'Built using LangGraph and Python, with TypeScript interface bindings for control monitoring.',
    githubUrl: 'https://github.com/Sameer71-spec',
    isFlagship: false,
  },
];

// Initial Curated Custom Designs & Animated Showcases
export const INITIAL_CUSTOM_DESIGNS: CustomDesign[] = [
  {
    id: 'design-1',
    title: 'Autonomous Graph Topology',
    category: 'Agentic Architecture',
    type: 'animation',
    mediaType: 'svg',
    mediaUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="%23FFFFFF" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="%23FFFFFF" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%23737373"/>
          <stop offset="100%" stop-color="%23FFFFFF"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="%230D0D0D"/>
      <g stroke="%23262626" stroke-width="1">
        <line x1="0" y1="150" x2="800" y2="150"/>
        <line x1="0" y1="300" x2="800" y2="300"/>
        <line x1="0" y1="450" x2="800" y2="450"/>
        <line x1="200" y1="0" x2="200" y2="600"/>
        <line x1="400" y1="0" x2="400" y2="600"/>
        <line x1="600" y1="0" x2="600" y2="600"/>
      </g>
      <!-- Connections with animated dashed flow -->
      <path d="M 200,300 C 300,180 300,180 400,200 C 500,220 500,380 600,320" fill="none" stroke="url(%23lineGrad)" stroke-width="2.5" stroke-dasharray="6 4"/>
      <path d="M 200,300 C 300,420 300,420 400,400 C 500,380 500,240 600,320" fill="none" stroke="%23404040" stroke-width="1.5" stroke-dasharray="4 4"/>
      
      <!-- Nodes -->
      <g transform="translate(200,300)">
        <circle r="36" fill="%23171717" stroke="%23525252" stroke-width="2"/>
        <circle r="14" fill="%23FFFFFF"/>
        <text y="54" fill="%23A3A3A3" font-family="monospace" font-size="12" text-anchor="middle">SUPERVISOR</text>
      </g>
      <g transform="translate(400,200)">
        <circle r="28" fill="%23171717" stroke="%23737373" stroke-width="2"/>
        <circle r="8" fill="%23E5E5E5"/>
        <text y="46" fill="%23A3A3A3" font-family="monospace" font-size="11" text-anchor="middle">RESEARCH_AGENT</text>
      </g>
      <g transform="translate(400,400)">
        <circle r="28" fill="%23171717" stroke="%23737373" stroke-width="2"/>
        <circle r="8" fill="%23E5E5E5"/>
        <text y="46" fill="%23A3A3A3" font-family="monospace" font-size="11" text-anchor="middle">TOOL_CALLER</text>
      </g>
      <g transform="translate(600,320)">
        <circle r="32" fill="%23171717" stroke="%23A3A3A3" stroke-width="2"/>
        <circle r="12" fill="%23FFFFFF"/>
        <text y="50" fill="%23FFFFFF" font-family="monospace" font-size="12" text-anchor="middle">SYNTHESIS_OUT</text>
      </g>
    </svg>`,
    description:
      'Dynamic multi-agent coordination architecture diagram depicting supervisor routing, iterative evaluation cycles, and tool execution state branches.',
    tags: ['LangGraph', 'Agentic AI', 'State Machine', 'Vector Flow'],
    isHeroVisual: false,
    isBackgroundVisual: false,
    createdAt: '2026-03-01',
  },
  {
    id: 'design-2',
    title: 'Minimalist Monolith UI Concept',
    category: 'UI/UX Prototype',
    type: 'design',
    mediaType: 'svg',
    mediaUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect width="100%" height="100%" fill="%230F0F0F"/>
      <!-- Header bar -->
      <rect x="40" y="40" width="720" height="50" rx="8" fill="%231A1A1A" stroke="%232E2E2E"/>
      <circle cx="70" cy="65" r="6" fill="%23FFFFFF"/>
      <rect x="90" y="58" width="120" height="14" rx="3" fill="%23333333"/>
      <rect x="620" y="52" width="110" height="26" rx="13" fill="%23FFFFFF"/>
      
      <!-- Bento Cards -->
      <rect x="40" y="110" width="460" height="240" rx="12" fill="%23161616" stroke="%232B2B2B"/>
      <rect x="65" y="140" width="160" height="12" rx="3" fill="%23555555"/>
      <rect x="65" y="165" width="280" height="24" rx="4" fill="%23E5E5E5"/>
      <rect x="65" y="210" width="410" height="2" fill="%23222222"/>
      <rect x="65" y="235" width="100" height="70" rx="6" fill="%23202020"/>
      <rect x="180" y="235" width="100" height="70" rx="6" fill="%23202020"/>
      <rect x="295" y="235" width="100" height="70" rx="6" fill="%23202020"/>

      <!-- Right Metric Card -->
      <rect x="520" y="110" width="240" height="240" rx="12" fill="%23161616" stroke="%232B2B2B"/>
      <circle cx="640" cy="200" r="50" fill="none" stroke="%232A2A2A" stroke-width="8"/>
      <circle cx="640" cy="200" r="50" fill="none" stroke="%23FFFFFF" stroke-width="8" stroke-dasharray="180 360"/>
      <text x="640" y="206" fill="%23FFFFFF" font-family="monospace" font-size="18" text-anchor="middle">98.4%</text>
      <text x="640" y="290" fill="%23888888" font-family="sans-serif" font-size="12" text-anchor="middle">SYSTEM STABILITY</text>

      <!-- Bottom Card -->
      <rect x="40" y="370" width="720" height="180" rx="12" fill="%23141414" stroke="%23282828"/>
      <path d="M 65,490 Q 200,430 350,470 T 735,420" fill="none" stroke="%23FFFFFF" stroke-width="2.5"/>
    </svg>`,
    description:
      'High-contrast dark editorial interface system utilizing mathematical baseline grids, minimal 1px borders, and tactile typographic heirarchy.',
    tags: ['Figma', 'UI System', 'Dark Mode', 'Design Craft'],
    isHeroVisual: false,
    isBackgroundVisual: false,
    createdAt: '2026-03-05',
  },
  {
    id: 'design-3',
    title: 'Concentric Vector Motion Orb',
    category: 'Motion Graphic',
    type: 'animation',
    mediaType: 'svg',
    mediaUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <rect width="100%" height="100%" fill="%230A0A0A"/>
      <g transform="translate(300,300)">
        <circle r="220" fill="none" stroke="%23222222" stroke-width="1" stroke-dasharray="4 8"/>
        <circle r="180" fill="none" stroke="%23333333" stroke-width="1.5" stroke-dasharray="20 10"/>
        <circle r="140" fill="none" stroke="%234A4A4A" stroke-width="2" stroke-dasharray="60 30"/>
        <circle r="100" fill="none" stroke="%23737373" stroke-width="2.5" stroke-dasharray="120 40"/>
        <circle r="60" fill="none" stroke="%23FFFFFF" stroke-width="3" stroke-dasharray="180 60"/>
        <!-- Inner Core -->
        <circle r="24" fill="%23FFFFFF"/>
        <circle r="36" fill="none" stroke="%23FFFFFF" stroke-width="1" opacity="0.6"/>
      </g>
    </svg>`,
    description:
      'Harmonic concentric vector orbital motion graphic designed for ambient background looping or hero focal point visualizers.',
    tags: ['Vector Motion', 'Orbital SVG', 'Ambient Loop', 'Geometric'],
    isHeroVisual: false,
    isBackgroundVisual: false,
    createdAt: '2026-03-10',
  },
];

// For backward-compatibility with any imports
export const PERSONAL_INFO = INITIAL_PERSONAL_INFO;
export const EDUCATION_INFO = INITIAL_EDUCATION_INFO;
export const DEVELOPMENT_JOURNEY_INFO = {
  role: INITIAL_WORK_EXPERIENCE_INFO.role,
  description: INITIAL_WORK_EXPERIENCE_INFO.description,
  focusAreas: INITIAL_WORK_EXPERIENCE_INFO.capabilities,
};
export const SKILL_CATEGORIES = INITIAL_SKILL_CATEGORIES;
export const PROJECTS = INITIAL_PROJECTS;
export const CUSTOM_DESIGNS = INITIAL_CUSTOM_DESIGNS;
export const LANGUAGES = ['Urdu', 'English'];
