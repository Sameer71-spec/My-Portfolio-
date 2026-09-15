import { Project, SkillCategory, JourneyMilestone } from '../types';

export const PERSONAL_INFO = {
  name: 'Sameer',
  fullName: 'Sameer',
  professionalTitle: 'Full Stack Developer | AI & Agentic AI Developer',
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
  heroDescription:
    'I build practical web applications, AI-powered systems, automation workflows, and intelligent agentic solutions that solve real-world problems.',
  aboutDescription:
    "I'm Sameer, a Full Stack Developer focused on building practical software and AI-powered applications. I enjoy turning ideas and real-world requirements into useful digital products.\n\nMy interests include Artificial Intelligence, Agentic AI, web development, automation, LLM applications and exploring emerging technologies.",
  tagline: 'Turning Ideas Into Intelligent Solutions.',
};

export const HERO_HIGHLIGHTS = [
  'AI & LLM',
  'Full Stack',
  'Agentic AI',
  'Problem Solving',
];

export const JOURNEY_TIMELINE: JourneyMilestone[] = [
  {
    year: '2024',
    title: 'Started Development',
    description: 'Began exploring software engineering fundamentals, Python programming, and modern web application development.',
  },
  {
    title: 'Full Stack Development',
    description: 'Built complete end-to-end web applications connecting responsive React frontends with FastAPI backend architectures.',
  },
  {
    title: 'AI & LLM Applications',
    description: 'Transitioned into Generative AI, integrating LLMs, retrieval-augmented generation (RAG), and vector stores.',
  },
  {
    title: 'Agentic AI & Multi-Agent Systems',
    description: 'Architecting coordinated multi-agent workflows with LangGraph, autonomous verification loops, and dynamic task delegation.',
  },
];

export const DEVELOPMENT_JOURNEY_INFO = {
  role: 'Independent Developer',
  description:
    'Building and experimenting with full-stack, AI and automation projects while continuously learning emerging technologies.',
  focusAreas: [
    'Artificial Intelligence',
    'Agentic AI',
    'Web Development',
    'Cybersecurity',
    'Automation',
  ],
};

export const EDUCATION_INFO = {
  level: 'Intermediate',
  institution: 'Allied School',
  location: 'Karachi, Pakistan',
  selfLearningAreas: [
    'Agentic AI',
    'Artificial Intelligence',
    'Web Development',
    'Cybersecurity',
  ],
};

export const LANGUAGES = ['Urdu', 'English'];

export const CORE_STRENGTHS = [
  {
    title: 'AI Development',
    description: 'Implementing LLM workflows, context retrieval, and intelligent assistant capabilities.',
  },
  {
    title: 'Full Stack Development',
    description: 'Building connected, end-to-end applications with clean APIs and reactive user interfaces.',
  },
  {
    title: 'Problem Solving',
    description: 'Analyzing real-world requirements and formulating practical algorithmic solutions.',
  },
  {
    title: 'Building Practical Software Solutions',
    description: 'Focusing on reliable, utilitarian digital tools that serve direct end-user needs.',
  },
  {
    title: 'Research & Learning',
    description: 'Quickly assimilating emerging AI paradigms, agentic frameworks, and technology updates.',
  },
  {
    title: 'Client-Oriented Development',
    description: 'Translating functional specifications into intuitive, high-performance web products.',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'PROGRAMMING',
    iconName: 'Code2',
    skills: ['Python', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'FRONTEND',
    iconName: 'Layout',
    skills: ['React', 'Responsive Web Development'],
  },
  {
    title: 'BACKEND',
    iconName: 'Server',
    skills: ['FastAPI', 'Flask', 'REST APIs'],
  },
  {
    title: 'AI / LLM',
    iconName: 'Bot',
    skills: [
      'Generative AI',
      'LLM Applications',
      'RAG',
      'Agentic AI',
      'Multi-Agent Systems',
      'AI Automation',
      'Prompt Engineering',
    ],
  },
  {
    title: 'DATABASES / STORAGE',
    iconName: 'Database',
    skills: ['MongoDB', 'PostgreSQL', 'ChromaDB', 'FAISS'],
  },
  {
    title: 'TOOLS / PLATFORMS',
    iconName: 'Cpu',
    skills: ['Git', 'GitHub', 'VS Code', 'Firebase', 'AI Development Tools'],
  },
  {
    title: 'CORE SKILLS',
    iconName: 'Sparkles',
    skills: [
      'AI Development',
      'Full Stack Development',
      'Problem Solving',
      'Software Development',
      'Research & Learning',
      'Building Practical Software Solutions',
    ],
  },
];

export const PROJECTS: Project[] = [
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
      'Resume Analysis',
      'Claim Extraction',
      'Dynamic Skill Assessment',
      'Claim Verification',
      'Job Market Analysis',
      'Skill Gap Detection',
      'Roadmap Generation',
      'Resume Optimization',
      'Multi-Agent Architecture',
    ],
    problem:
      'Standard career platforms rely on superficial keyword matching that fails to verify authentic candidate abilities or provide actionable gap-closing guidance.',
    solution:
      'CareerPilot AI implements an agentic multi-agent architecture where autonomous agents extract qualifications, run dynamic skill assessments, cross-reference market requirements using vector embeddings, and construct tailored learning roadmaps.',
    developmentApproach:
      'Constructed using LangGraph for stateful multi-agent coordination, FastAPI for high-throughput orchestration, ChromaDB for semantic skill gap indexing, and MongoDB for structured profile persistence.',
    githubUrl: 'https://github.com/Sameer71-spec',
  },
  {
    id: 'ai-smart-assistant',
    number: '02',
    name: 'AI Smart Assistant',
    category: 'AI / LLM',
    categoryLabel: 'AI / LLM',
    description:
      'An AI-powered assistant application focused on conversational interaction and intelligent assistance.',
    technologies: ['Python', 'FastAPI', 'React', 'LLM'],
    features: [
      'Conversational Interaction',
      'Intelligent Prompt Handling',
      'Real-time Query Resolution',
      'Clean Modular UI',
    ],
    problem:
      'Users need responsive, context-aware virtual assistance that can handle multi-turn inquiries with clarity without complicated setup.',
    solution:
      'A full-stack application that couples a high-speed Python FastAPI backend with a reactive React frontend to process natural language queries and provide immediate intelligent answers.',
    developmentApproach:
      'Developed with modular backend endpoints for streaming LLM responses, structured error handling, and a distraction-free user interface.',
    githubUrl: 'https://github.com/Sameer71-spec',
  },
  {
    id: 'crypto-chatbot',
    number: '03',
    name: 'Crypto Chatbot Using LLM',
    category: 'AI / LLM',
    categoryLabel: 'AI / LLM',
    description:
      'An LLM-powered chatbot focused on cryptocurrency-related questions and information.',
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
  },
  {
    id: 'quick-temp-mail',
    number: '04',
    name: 'Quick Temp Mail System',
    category: 'Full Stack',
    categoryLabel: 'Full Stack',
    description:
      'A web-based temporary email application demonstrating full-stack development and API integration.',
    technologies: ['Python', 'FastAPI', 'React'],
    features: [
      'Instant Ephemeral Email Generation',
      'Real-Time Inbox Polling',
      'Email Message Parsing & Rendering',
      'Clean Temporary Inbox Management',
      'API Integration Architecture',
    ],
    problem:
      'Testing web application onboarding workflows or signing up for non-critical services often requires disposable inboxes to avoid inbox clutter and preserve privacy.',
    solution:
      'A live, responsive temporary email web service that automatically generates randomized mailbox addresses, monitors incoming messages via background polling, and presents parsed messages.',
    developmentApproach:
      'Built with a decoupled Python FastAPI API backend and a lightweight React frontend, hosted and deployed with active verification.',
    githubUrl: 'https://github.com/Sameer71-spec/quick-temp-mail',
    liveDemoUrl: 'https://quicktemp-catch-all.lovable.app',
  },
  {
    id: 'ai-learning-platform',
    number: '05',
    name: 'AI-powered Learning Platform',
    category: 'EdTech',
    categoryLabel: 'EdTech / AI',
    description:
      'An AI-assisted educational platform focused on PDF-based learning, quiz generation, learning progression and AI-assisted explanations.',
    technologies: ['Python', 'FastAPI', 'React', 'AI'],
    features: [
      'PDF Document Parsing & Extraction',
      'Automated Quiz & Assessment Generation',
      'Learning Progression Tracking',
      'AI-Assisted Concept Explanations',
      'Interactive Student Feedback',
    ],
    problem:
      'Students and self-learners often struggle to test their comprehension when studying dense PDF textbooks or lecture notes.',
    solution:
      'An interactive educational workspace where learners upload study materials or PDFs and receive dynamic quizzes, detailed breakdowns of difficult concepts, and progress tracking.',
    developmentApproach:
      'Constructed with Python document parsing pipelines feeding into structured AI quiz generators, connected to an intuitive React revision dashboard.',
    githubUrl: 'https://github.com/Sameer71-spec',
  },
];
