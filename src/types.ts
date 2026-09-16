export interface Project {
  id: string;
  number: string;
  name: string;
  category: 'Agentic AI' | 'AI / LLM' | 'Full Stack' | 'EdTech' | string;
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
  isFlagship?: boolean;
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

export interface CustomDesign {
  id: string;
  title: string;
  category: string;
  type: 'design' | 'animation' | 'vector' | '3d';
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'gif' | 'svg';
  description: string;
  tags?: string[];
  isHeroVisual?: boolean;
  isBackgroundVisual?: boolean;
  createdAt: string;
}

export interface PersonalInfo {
  name: string;
  fullName: string;
  professionalTitle: string;
  location: string;
  phone: string;
  phoneFormatted: string;
  phoneTel: string;
  email: string;
  emailMailto: string;
  githubUrl: string;
  githubUsername: string;
  portraitLocal: string;
  portraitFallback: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroHeadingLine3: string;
  heroBadgeText: string;
  heroDescription: string;
  aboutDescription: string;
  aboutSubDescription?: string;
  tagline: string;
  philosophyQuote: string;
  philosophySubtext: string;
  quoteAttribution?: string;
  heroVisualType?: 'portrait' | 'custom_design';
  activeHeroDesignId?: string;
  backgroundVisualType?: 'default' | 'custom_animation';
  activeBackgroundDesignId?: string;
  showDesignsSection?: boolean;
}

export interface ThemeSettings {
  fontSerif: 'Playfair Display' | 'Bodoni Moda' | 'Cormorant Garamond' | 'Cinzel' | 'Georgia';
  fontSans: 'Plus Jakarta Sans' | 'Inter' | 'system-ui';
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  accentColor: string;
  textColor: string;
  textMuted: string;
  borderColor: string;
  themePresetName: string;
}

export interface AnimationSettings {
  cursorStyle: 'starlight' | 'minimal-dot' | 'glow' | 'disabled';
  badgeSpinSpeed: 'slow' | 'normal' | 'fast' | 'paused';
  cardHoverZoom: boolean;
  enableMotion: boolean;
}

export interface EducationInfo {
  level: string;
  institution: string;
  location: string;
  description: string;
  selfLearningAreas: string[];
}

export interface WorkExperienceInfo {
  period: string;
  role: string;
  type: string;
  description: string;
  capabilities: string[];
}

export interface SecuritySettings {
  passwordHint: string;
  hasBackupPassword: boolean;
}

export interface SecurityIncident {
  id: string;
  timestamp: string;
  formattedTime: string;
  attemptsCount: number;
  deviceInfo: string;
  reviewed: boolean;
  notes?: string;
}
