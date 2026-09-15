export interface Project {
  id: string;
  number: string;
  name: string;
  category: 'Agentic AI' | 'AI / LLM' | 'Full Stack' | 'EdTech';
  categoryLabel: string;
  tagline?: string;
  description: string;
  technologies: string[];
  features: string[];
  problem: string;
  solution: string;
  developmentApproach: string;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  homepage?: string | null;
}

export interface JourneyMilestone {
  year?: string;
  title: string;
  description?: string;
}
