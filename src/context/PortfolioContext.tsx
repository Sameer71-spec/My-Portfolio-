import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PersonalInfo,
  ThemeSettings,
  AnimationSettings,
  EducationInfo,
  WorkExperienceInfo,
  Project,
  SkillCategory,
  CustomDesign,
  SecurityIncident,
} from '../types';
import {
  INITIAL_PERSONAL_INFO,
  INITIAL_THEME_SETTINGS,
  INITIAL_ANIMATION_SETTINGS,
  INITIAL_EDUCATION_INFO,
  INITIAL_WORK_EXPERIENCE_INFO,
  INITIAL_PROJECTS,
  INITIAL_SKILL_CATEGORIES,
  INITIAL_CUSTOM_DESIGNS,
} from '../data/portfolioData';

const STORAGE_DATA_KEY = 'sameer_portfolio_data_v2';
const STORAGE_AUTH_KEY = 'sameer_portfolio_auth_token_v2';
const STORAGE_PWD_KEY = 'sameer_portfolio_admin_password_v2';
const STORAGE_BACKUP_PWD_KEY = 'sameer_portfolio_backup_pwd_v2';
const STORAGE_PWD_HINT_KEY = 'sameer_portfolio_pwd_hint_v2';
const STORAGE_SECURITY_INCIDENTS_KEY = 'sameer_portfolio_security_incidents_v1';
const STORAGE_UNREAD_ALERT_KEY = 'sameer_portfolio_security_unread_alert_v1';
const DEFAULT_PASSWORD = 'sameer@2026';

function detectClientDeviceInfo(): string {
  try {
    const ua = navigator.userAgent;
    let browser = 'Unknown Browser';
    if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Edg')) browser = 'Microsoft Edge';
    else if (ua.includes('Chrome')) browser = 'Google Chrome';
    else if (ua.includes('Safari')) browser = 'Apple Safari';

    let os = 'Unknown OS';
    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    const resolution = `${window.screen.width}x${window.screen.height}`;
    return `${browser} on ${os} (${resolution})`;
  } catch {
    return 'Web Browser Device';
  }
}

export interface PortfolioContextType {
  // State
  personalInfo: PersonalInfo;
  themeSettings: ThemeSettings;
  animationSettings: AnimationSettings;
  educationInfo: EducationInfo;
  workExperienceInfo: WorkExperienceInfo;
  projects: Project[];
  skillCategories: SkillCategory[];
  customDesigns: CustomDesign[];

  // Auth & Admin state
  isAuthenticated: boolean;
  isEditModeActive: boolean;
  isLoginModalOpen: boolean;
  isCMSModalOpen: boolean;
  activeCMSTab: string;
  isEditProjectModalOpen: boolean;
  editingProject: Project | null;
  passwordHint: string;
  hasBackupPassword: boolean;
  securityIncidents: SecurityIncident[];
  hasUnreadSecurityAlert: boolean;

  // Actions
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; message: string };
  setPasswordHint: (hint: string) => void;
  setBackupPassword: (backupPass: string) => { success: boolean; message: string };
  removeBackupPassword: () => void;
  resetPasswordToDefault: () => void;
  recordSecurityIncident: (attemptsCount: number, notes?: string) => void;
  markSecurityAlertsAsReviewed: () => void;
  clearSecurityIncidents: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  toggleEditMode: () => void;
  openCMS: (tab?: string) => void;
  closeCMS: () => void;
  openEditProjectModal: (project?: Project | null) => void;
  closeEditProjectModal: () => void;

  // Data updates
  updatePersonalInfo: (partial: Partial<PersonalInfo>) => void;
  updateThemeSettings: (partial: Partial<ThemeSettings>) => void;
  updateAnimationSettings: (partial: Partial<AnimationSettings>) => void;
  updateEducationInfo: (partial: Partial<EducationInfo>) => void;
  updateWorkExperienceInfo: (partial: Partial<WorkExperienceInfo>) => void;
  
  // Project CRUD
  addProject: (project: Omit<Project, 'id'> & { id?: string }) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (newProjects: Project[]) => void;
  
  // Skills CRUD
  updateSkillCategories: (cats: SkillCategory[]) => void;

  // Custom Designs & Animations CRUD
  addCustomDesign: (design: Omit<CustomDesign, 'id' | 'createdAt'> & { id?: string }) => void;
  updateCustomDesign: (id: string, updated: Partial<CustomDesign>) => void;
  deleteCustomDesign: (id: string) => void;
  setHeroVisual: (type: 'portrait' | 'custom_design', designId?: string) => void;
  setBackgroundVisual: (type: 'default' | 'custom_animation', designId?: string) => void;

  // Data management
  resetToDefaults: () => void;
  exportConfigJSON: () => string;
  importConfigJSON: (jsonString: string) => { success: boolean; message: string };
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage if available
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.personalInfo) return { ...INITIAL_PERSONAL_INFO, ...parsed.personalInfo };
      }
    } catch {
      // fallback
    }
    return INITIAL_PERSONAL_INFO;
  });

  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.themeSettings) return { ...INITIAL_THEME_SETTINGS, ...parsed.themeSettings };
      }
    } catch {
      // fallback
    }
    return INITIAL_THEME_SETTINGS;
  });

  const [animationSettings, setAnimationSettings] = useState<AnimationSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.animationSettings) return { ...INITIAL_ANIMATION_SETTINGS, ...parsed.animationSettings };
      }
    } catch {
      // fallback
    }
    return INITIAL_ANIMATION_SETTINGS;
  });

  const [educationInfo, setEducationInfo] = useState<EducationInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.educationInfo) return { ...INITIAL_EDUCATION_INFO, ...parsed.educationInfo };
      }
    } catch {
      // fallback
    }
    return INITIAL_EDUCATION_INFO;
  });

  const [workExperienceInfo, setWorkExperienceInfo] = useState<WorkExperienceInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.workExperienceInfo) return { ...INITIAL_WORK_EXPERIENCE_INFO, ...parsed.workExperienceInfo };
      }
    } catch {
      // fallback
    }
    return INITIAL_WORK_EXPERIENCE_INFO;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.projects) && parsed.projects.length > 0) return parsed.projects;
      }
    } catch {
      // fallback
    }
    return INITIAL_PROJECTS;
  });

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.skillCategories) && parsed.skillCategories.length > 0) return parsed.skillCategories;
      }
    } catch {
      // fallback
    }
    return INITIAL_SKILL_CATEGORIES;
  });

  const [customDesigns, setCustomDesigns] = useState<CustomDesign[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DATA_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.customDesigns) && parsed.customDesigns.length > 0) return parsed.customDesigns;
      }
    } catch {
      // fallback
    }
    return INITIAL_CUSTOM_DESIGNS;
  });

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isCMSModalOpen, setIsCMSModalOpen] = useState<boolean>(false);
  const [activeCMSTab, setActiveCMSTab] = useState<string>('content');
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Security & Password Hint State
  const [passwordHint, setPasswordHintState] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_PWD_HINT_KEY) || 'Primary password is your name with year (sameer@2026)';
    } catch {
      return '';
    }
  });

  const [hasBackupPassword, setHasBackupPassword] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem(STORAGE_BACKUP_PWD_KEY);
    } catch {
      return false;
    }
  });

  // Security Incident Activity Logs & Notification State
  const [securityIncidents, setSecurityIncidents] = useState<SecurityIncident[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_SECURITY_INCIDENTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [hasUnreadSecurityAlert, setHasUnreadSecurityAlert] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_UNREAD_ALERT_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      const bundle = {
        personalInfo,
        themeSettings,
        animationSettings,
        educationInfo,
        workExperienceInfo,
        projects,
        skillCategories,
        customDesigns,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(bundle));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [
    personalInfo,
    themeSettings,
    animationSettings,
    educationInfo,
    workExperienceInfo,
    projects,
    skillCategories,
    customDesigns,
  ]);

  // Apply Theme styling dynamically to Document
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-primary', themeSettings.bgPrimary);
    root.style.setProperty('--bg-secondary', themeSettings.bgSecondary);
    root.style.setProperty('--bg-card', themeSettings.bgCard);
    root.style.setProperty('--accent-color', themeSettings.accentColor);
    root.style.setProperty('--text-primary', themeSettings.textColor);
    root.style.setProperty('--text-muted', themeSettings.textMuted);
    root.style.setProperty('--border-color', themeSettings.borderColor);

    // Apply font serif selection
    const serifHeadings = document.querySelectorAll<HTMLElement>('.font-serif-display, h1, h2, h3');
    serifHeadings.forEach((el) => {
      el.style.fontFamily = `"${themeSettings.fontSerif}", Georgia, serif`;
    });
  }, [themeSettings]);

  // Keyboard shortcut listener: Ctrl + Shift + A (or Cmd + Shift + A) to toggle Admin login / CMS
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAuthenticated) {
          setIsCMSModalOpen((prev) => !prev);
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  // Auth Functions
  const login = (inputPass: string): boolean => {
    const storedPass = localStorage.getItem(STORAGE_PWD_KEY) || DEFAULT_PASSWORD;
    const backupPass = localStorage.getItem(STORAGE_BACKUP_PWD_KEY);

    const cleanInput = inputPass.trim();
    const noSpacesInput = inputPass.replace(/\s+/g, '');
    const cleanStored = storedPass.trim();
    const noSpacesStored = storedPass.replace(/\s+/g, '');
    const cleanBackup = backupPass ? backupPass.trim() : null;
    const noSpacesBackup = backupPass ? backupPass.replace(/\s+/g, '') : null;

    // Direct match (with or without spaces)
    const directMatch =
      cleanInput === cleanStored ||
      noSpacesInput === noSpacesStored ||
      (cleanBackup && (cleanInput === cleanBackup || noSpacesInput === noSpacesBackup));

    // Also match if user entered '1111' or '1 1 1 1' (matching screenshot hint 'four time = 1')
    const hintMatch =
      (noSpacesInput === '1111' || cleanInput === '1 1 1 1') &&
      (passwordHint.toLowerCase().includes('1') || passwordHint.toLowerCase().includes('four'));

    // Master default fallback
    const defaultMatch = cleanInput === DEFAULT_PASSWORD || noSpacesInput === DEFAULT_PASSWORD;

    if (directMatch || hintMatch || defaultMatch) {
      // If hintMatch unlocked it, update master password to '1111' so future direct logins always work!
      if (hintMatch && cleanStored !== '1111') {
        localStorage.setItem(STORAGE_PWD_KEY, '1111');
      }
      setIsAuthenticated(true);
      sessionStorage.setItem(STORAGE_AUTH_KEY, 'true');
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(STORAGE_AUTH_KEY);
    setIsCMSModalOpen(false);
    setIsEditProjectModalOpen(false);
  };

  const changePassword = (oldPass: string, newPass: string): { success: boolean; message: string } => {
    const currentPass = localStorage.getItem(STORAGE_PWD_KEY) || DEFAULT_PASSWORD;
    if (oldPass.trim() !== currentPass.trim()) {
      return { success: false, message: 'Current password is incorrect.' };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'New password must be at least 4 characters.' };
    }
    localStorage.setItem(STORAGE_PWD_KEY, newPass.trim());
    return { success: true, message: 'Password changed successfully! Keep it safe.' };
  };

  const resetPasswordToDefault = () => {
    localStorage.setItem(STORAGE_PWD_KEY, DEFAULT_PASSWORD);
    localStorage.removeItem(STORAGE_BACKUP_PWD_KEY);
    setPasswordHintState('Primary password is your name with year (sameer@2026)');
    localStorage.setItem(STORAGE_PWD_HINT_KEY, 'Primary password is your name with year (sameer@2026)');
  };

  const setPasswordHint = (hint: string) => {
    const cleanHint = hint.trim();
    setPasswordHintState(cleanHint);
    if (cleanHint) {
      localStorage.setItem(STORAGE_PWD_HINT_KEY, cleanHint);
    } else {
      localStorage.removeItem(STORAGE_PWD_HINT_KEY);
    }
  };

  const setBackupPassword = (backupPass: string): { success: boolean; message: string } => {
    const clean = backupPass.trim();
    if (clean.length < 4) {
      return { success: false, message: 'Backup password must be at least 4 characters.' };
    }
    localStorage.setItem(STORAGE_BACKUP_PWD_KEY, clean);
    setHasBackupPassword(true);
    return { success: true, message: 'Backup recovery passcode successfully saved!' };
  };

  const removeBackupPassword = () => {
    localStorage.removeItem(STORAGE_BACKUP_PWD_KEY);
    setHasBackupPassword(false);
  };

  const recordSecurityIncident = (attemptsCount: number, notes?: string) => {
    try {
      const now = new Date();
      const formattedTime = now.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const incident: SecurityIncident = {
        id: `inc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        timestamp: now.toISOString(),
        formattedTime,
        attemptsCount,
        deviceInfo: detectClientDeviceInfo(),
        reviewed: false,
        notes: notes || 'Consecutive incorrect passcode entries detected',
      };

      setSecurityIncidents((prev) => {
        const updated = [incident, ...prev.slice(0, 29)]; // keep latest 30
        try {
          localStorage.setItem(STORAGE_SECURITY_INCIDENTS_KEY, JSON.stringify(updated));
        } catch (e) {
          console.warn('Failed saving security incidents:', e);
        }
        return updated;
      });

      setHasUnreadSecurityAlert(true);
      try {
        localStorage.setItem(STORAGE_UNREAD_ALERT_KEY, 'true');
      } catch (e) {
        console.warn('Failed saving unread alert state:', e);
      }
    } catch (err) {
      console.warn('Could not record security incident:', err);
    }
  };

  const markSecurityAlertsAsReviewed = () => {
    setHasUnreadSecurityAlert(false);
    try {
      localStorage.setItem(STORAGE_UNREAD_ALERT_KEY, 'false');
    } catch (e) {
      console.warn(e);
    }
    setSecurityIncidents((prev) => {
      const updated = prev.map((inc) => ({ ...inc, reviewed: true }));
      try {
        localStorage.setItem(STORAGE_SECURITY_INCIDENTS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const clearSecurityIncidents = () => {
    setSecurityIncidents([]);
    setHasUnreadSecurityAlert(false);
    try {
      localStorage.removeItem(STORAGE_SECURITY_INCIDENTS_KEY);
      localStorage.setItem(STORAGE_UNREAD_ALERT_KEY, 'false');
    } catch (e) {
      console.warn(e);
    }
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const toggleEditMode = () => setIsEditModeActive((prev) => !prev);

  const openCMS = (tab = 'content') => {
    setActiveCMSTab(tab);
    setIsCMSModalOpen(true);
  };
  const closeCMS = () => setIsCMSModalOpen(false);

  const openEditProjectModal = (project: Project | null = null) => {
    setEditingProject(project);
    setIsEditProjectModalOpen(true);
  };
  const closeEditProjectModal = () => {
    setEditingProject(null);
    setIsEditProjectModalOpen(false);
  };

  // Updaters
  const updatePersonalInfo = (partial: Partial<PersonalInfo>) => {
    setPersonalInfo((prev) => ({ ...prev, ...partial }));
  };

  const updateThemeSettings = (partial: Partial<ThemeSettings>) => {
    setThemeSettings((prev) => ({ ...prev, ...partial }));
  };

  const updateAnimationSettings = (partial: Partial<AnimationSettings>) => {
    setAnimationSettings((prev) => ({ ...prev, ...partial }));
  };

  const updateEducationInfo = (partial: Partial<EducationInfo>) => {
    setEducationInfo((prev) => ({ ...prev, ...partial }));
  };

  const updateWorkExperienceInfo = (partial: Partial<WorkExperienceInfo>) => {
    setWorkExperienceInfo((prev) => ({ ...prev, ...partial }));
  };

  // Projects CRUD
  const addProject = (projData: Omit<Project, 'id'> & { id?: string }) => {
    const newId = projData.id || `project-${Date.now()}`;
    const nextNumber = String(projects.length + 1).padStart(2, '0');
    const newProject: Project = {
      ...projData,
      id: newId,
      number: projData.number || nextNumber,
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const reorderProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };

  const updateSkillCategories = (cats: SkillCategory[]) => {
    setSkillCategories(cats);
  };

  // Custom Designs & Animations Management
  const addCustomDesign = (design: Omit<CustomDesign, 'id' | 'createdAt'> & { id?: string }) => {
    const newDesign: CustomDesign = {
      ...design,
      id: design.id || `design-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setCustomDesigns((prev) => [newDesign, ...prev]);
  };

  const updateCustomDesign = (id: string, updated: Partial<CustomDesign>) => {
    setCustomDesigns((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updated } : d))
    );
  };

  const deleteCustomDesign = (id: string) => {
    setCustomDesigns((prev) => prev.filter((d) => d.id !== id));
    if (personalInfo.activeHeroDesignId === id) {
      updatePersonalInfo({ heroVisualType: 'portrait', activeHeroDesignId: undefined });
    }
    if (personalInfo.activeBackgroundDesignId === id) {
      updatePersonalInfo({ backgroundVisualType: 'default', activeBackgroundDesignId: undefined });
    }
  };

  const setHeroVisual = (type: 'portrait' | 'custom_design', designId?: string) => {
    updatePersonalInfo({
      heroVisualType: type,
      activeHeroDesignId: designId,
    });
  };

  const setBackgroundVisual = (type: 'default' | 'custom_animation', designId?: string) => {
    updatePersonalInfo({
      backgroundVisualType: type,
      activeBackgroundDesignId: designId,
    });
  };

  // Reset to factory defaults
  const resetToDefaults = () => {
    setPersonalInfo(INITIAL_PERSONAL_INFO);
    setThemeSettings(INITIAL_THEME_SETTINGS);
    setAnimationSettings(INITIAL_ANIMATION_SETTINGS);
    setEducationInfo(INITIAL_EDUCATION_INFO);
    setWorkExperienceInfo(INITIAL_WORK_EXPERIENCE_INFO);
    setProjects(INITIAL_PROJECTS);
    setSkillCategories(INITIAL_SKILL_CATEGORIES);
    setCustomDesigns(INITIAL_CUSTOM_DESIGNS);
    localStorage.removeItem(STORAGE_DATA_KEY);
  };

  // Export JSON backup
  const exportConfigJSON = (): string => {
    const exportBundle = {
      personalInfo,
      themeSettings,
      animationSettings,
      educationInfo,
      workExperienceInfo,
      projects,
      skillCategories,
      customDesigns,
      exportedAt: new Date().toISOString(),
      author: 'Sameer',
    };
    return JSON.stringify(exportBundle, null, 2);
  };

  // Import JSON backup
  const importConfigJSON = (jsonString: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.personalInfo) setPersonalInfo({ ...INITIAL_PERSONAL_INFO, ...parsed.personalInfo });
      if (parsed.themeSettings) setThemeSettings({ ...INITIAL_THEME_SETTINGS, ...parsed.themeSettings });
      if (parsed.animationSettings) setAnimationSettings({ ...INITIAL_ANIMATION_SETTINGS, ...parsed.animationSettings });
      if (parsed.educationInfo) setEducationInfo({ ...INITIAL_EDUCATION_INFO, ...parsed.educationInfo });
      if (parsed.workExperienceInfo) setWorkExperienceInfo({ ...INITIAL_WORK_EXPERIENCE_INFO, ...parsed.workExperienceInfo });
      if (Array.isArray(parsed.projects)) setProjects(parsed.projects);
      if (Array.isArray(parsed.skillCategories)) setSkillCategories(parsed.skillCategories);
      if (Array.isArray(parsed.customDesigns)) setCustomDesigns(parsed.customDesigns);
      return { success: true, message: 'Configuration imported and applied successfully!' };
    } catch {
      return { success: false, message: 'Invalid JSON format. Please verify the file contents.' };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        themeSettings,
        animationSettings,
        educationInfo,
        workExperienceInfo,
        projects,
        skillCategories,
        customDesigns,
        isAuthenticated,
        isEditModeActive,
        isLoginModalOpen,
        isCMSModalOpen,
        activeCMSTab,
        isEditProjectModalOpen,
        editingProject,
        login,
        logout,
        changePassword,
        openLoginModal,
        closeLoginModal,
        toggleEditMode,
        openCMS,
        closeCMS,
        openEditProjectModal,
        closeEditProjectModal,
        updatePersonalInfo,
        updateThemeSettings,
        updateAnimationSettings,
        updateEducationInfo,
        updateWorkExperienceInfo,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        updateSkillCategories,
        addCustomDesign,
        updateCustomDesign,
        deleteCustomDesign,
        setHeroVisual,
        setBackgroundVisual,
        passwordHint,
        hasBackupPassword,
        securityIncidents,
        hasUnreadSecurityAlert,
        setPasswordHint,
        setBackupPassword,
        removeBackupPassword,
        resetPasswordToDefault,
        recordSecurityIncident,
        markSecurityAlertsAsReviewed,
        clearSecurityIncidents,
        resetToDefaults,
        exportConfigJSON,
        importConfigJSON,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
