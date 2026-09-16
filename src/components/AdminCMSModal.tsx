import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import {
  X,
  User,
  Image as ImageIcon,
  Palette,
  Sparkles,
  Layers,
  GraduationCap,
  Shield,
  Upload,
  Download,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  Check,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Film,
  BookOpen,
  Lightbulb,
  Key,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { AdminDesignsTab } from './AdminDesignsTab';
import { AdminGuideTab } from './AdminGuideTab';

export function AdminCMSModal() {
  const {
    isCMSModalOpen,
    closeCMS,
    activeCMSTab,
    openCMS,
    personalInfo,
    updatePersonalInfo,
    themeSettings,
    updateThemeSettings,
    animationSettings,
    updateAnimationSettings,
    educationInfo,
    updateEducationInfo,
    workExperienceInfo,
    updateWorkExperienceInfo,
    projects,
    reorderProjects,
    openEditProjectModal,
    deleteProject,
    skillCategories,
    updateSkillCategories,
    changePassword,
    passwordHint,
    hasBackupPassword,
    setPasswordHint,
    setBackupPassword,
    removeBackupPassword,
    securityIncidents,
    hasUnreadSecurityAlert,
    recordSecurityIncident,
    markSecurityAlertsAsReviewed,
    clearSecurityIncidents,
    resetToDefaults,
    exportConfigJSON,
    importConfigJSON,
  } = usePortfolio();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Security password state
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [securityStatus, setSecurityStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Backup recovery passcode state
  const [backupPassInput, setBackupPassInput] = useState('');
  const [backupPassStatus, setBackupPassStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Password Hint state
  const [hintInput, setHintInput] = useState(passwordHint || '');
  const [hintSavedStatus, setHintSavedStatus] = useState<string | null>(null);

  // Import JSON state
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);

  // New Skill builder
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [newSkillName, setNewSkillName] = useState('');

  if (!isCMSModalOpen) return null;

  // Handle local image file upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size exceeds 5MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updatePersonalInfo({ portraitLocal: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = changePassword(oldPass, newPass);
    setSecurityStatus(res);
    if (res.success) {
      setOldPass('');
      setNewPass('');
    }
  };

  const handleBackupPassSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBackupPassStatus(null);
    const res = setBackupPassword(backupPassInput);
    setBackupPassStatus(res);
    if (res.success) {
      setBackupPassInput('');
    }
  };

  const handleSaveHint = (e: FormEvent) => {
    e.preventDefault();
    setPasswordHint(hintInput);
    setHintSavedStatus('Password hint saved successfully! It will appear after 3 failed attempts.');
    setTimeout(() => setHintSavedStatus(null), 3500);
  };

  const handleClearHint = () => {
    setHintInput('');
    setPasswordHint('');
    setHintSavedStatus('Password hint has been removed.');
    setTimeout(() => setHintSavedStatus(null), 3500);
  };

  const handleImportSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;
    const res = importConfigJSON(importJsonText);
    setImportStatus(res);
    if (res.success) {
      setImportJsonText('');
    }
  };

  const handleDownloadBackup = () => {
    const data = exportConfigJSON();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sameer-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    reorderProjects(updated);
  };

  const handleAddSkillToCategory = () => {
    if (!newSkillName.trim() || !skillCategories[selectedCategoryIdx]) return;
    const updatedCats = [...skillCategories];
    const cat = updatedCats[selectedCategoryIdx];
    if (!cat.skills.includes(newSkillName.trim())) {
      cat.skills.push(newSkillName.trim());
      updateSkillCategories(updatedCats);
      setNewSkillName('');
    }
  };

  const handleRemoveSkillFromCategory = (catIdx: number, skillName: string) => {
    const updatedCats = [...skillCategories];
    updatedCats[catIdx].skills = updatedCats[catIdx].skills.filter((s) => s !== skillName);
    updateSkillCategories(updatedCats);
  };

  const tabs = [
    { id: 'content', label: 'Content & Bio', icon: User },
    { id: 'photo', label: 'Photo & Media', icon: ImageIcon },
    { id: 'designs', label: 'Designs & Motion', icon: Film },
    { id: 'theme', label: 'Styles & Theme', icon: Palette },
    { id: 'animations', label: 'Animations', icon: Sparkles },
    { id: 'projects', label: 'Projects (CRUD)', icon: Layers },
    { id: 'skills', label: 'Skills & Journey', icon: GraduationCap },
    { id: 'security', label: 'Security & Backup', icon: Shield },
    { id: 'guide', label: 'Owner Guide (PDF)', icon: BookOpen },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99995] flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCMS}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Studio Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-5xl h-[92vh] flex flex-col md:flex-row rounded-2xl bg-[#121212] border border-[#2A2A2A] shadow-2xl overflow-hidden text-white z-10"
        >
          {/* Close Button Mobile/Desktop */}
          <button
            type="button"
            onClick={closeCMS}
            className="absolute top-4 right-4 z-20 p-2 rounded-xl text-[#777777] hover:text-white hover:bg-[#1F1F1F] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Navigation Sidebar */}
          <div className="w-full md:w-64 shrink-0 bg-[#0E0E0E] border-b md:border-b-0 md:border-r border-[#222222] p-4 flex md:flex-col justify-between overflow-x-auto md:overflow-x-visible">
            <div className="space-y-4 w-full">
              <div className="hidden md:block px-2 pt-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#888888]">
                  Owner Control Studio
                </span>
                <h2 className="font-serif-display text-xl font-normal text-white">
                  CMS Customizer
                </h2>
              </div>

              {/* Tab Navigation */}
              <nav className="flex md:flex-col gap-1 w-full" aria-label="CMS tabs">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCMSTab === tab.id;
                  const isSecurityTab = tab.id === 'security';
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => openCMS(tab.id)}
                      className={`relative flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-white text-black font-semibold shadow'
                          : 'text-[#888888] hover:text-white hover:bg-[#181818]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{tab.label}</span>
                      </div>
                      {isSecurityTab && hasUnreadSecurityAlert && (
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Status / Quick Action */}
            <div className="hidden md:block pt-4 border-t border-[#1C1C1C] px-2 text-[11px] font-mono text-[#666666]">
              <div className="flex items-center gap-2 mb-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Active: Sameer</span>
              </div>
              <p className="text-[10px] text-[#555555]">
                All changes auto-save instantly to your private storage.
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#141414] text-neutral-200">
            {/* Top Red Security Activity Alert Banner */}
            {hasUnreadSecurityAlert && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <div>
                    <div className="text-red-200 font-semibold flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      <span>Security Incident Alert: Unauthorized Passcode Attempts Detected!</span>
                    </div>
                    <p className="text-[11px] text-red-300/80 mt-0.5">
                      Someone attempted 3+ incorrect passcodes on your portfolio. Review date, time & device details.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => openCMS('security')}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-[11px] transition-colors"
                  >
                    Review Activity
                  </button>
                  <button
                    type="button"
                    onClick={markSecurityAlertsAsReviewed}
                    className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 text-[11px] transition-colors"
                  >
                    Dismiss Red Dot
                  </button>
                </div>
              </div>
            )}

            {/* 1. CONTENT & BIO */}
            {activeCMSTab === 'content' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="font-serif-display text-2xl text-white">Hero & Content</h3>
                  <p className="text-xs text-[#888888] mt-1 font-mono">
                    Customize titles, headlines, who-you-are bio narrative, and philosophies.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono text-[#888888] mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={personalInfo.name}
                      onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-[#1A1A1A] border border-[#2C2C2C] text-sm text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono text-[#888888] mb-1">
                      Professional Role Title
                    </label>
                    <input
                      type="text"
                      value={personalInfo.professionalTitle}
                      onChange={(e) => updatePersonalInfo({ professionalTitle: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-[#1A1A1A] border border-[#2C2C2C] text-sm text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                {/* 3-Line Hero Headline */}
                <div className="p-4 rounded-xl bg-[#191919] border border-[#292929] space-y-3">
                  <div className="text-xs uppercase font-mono text-white tracking-wider">
                    Hero Section 3-Line Headline
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#777777] mb-1">Line 1</label>
                      <input
                        type="text"
                        value={personalInfo.heroHeadingLine1}
                        onChange={(e) => updatePersonalInfo({ heroHeadingLine1: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#777777] mb-1">Line 2</label>
                      <input
                        type="text"
                        value={personalInfo.heroHeadingLine2}
                        onChange={(e) => updatePersonalInfo({ heroHeadingLine2: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#777777] mb-1">Line 3</label>
                      <input
                        type="text"
                        value={personalInfo.heroHeadingLine3}
                        onChange={(e) => updatePersonalInfo({ heroHeadingLine3: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Tagline & Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono text-[#888888] mb-1">
                      Hero Tagline
                    </label>
                    <input
                      type="text"
                      value={personalInfo.tagline}
                      onChange={(e) => updatePersonalInfo({ tagline: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-[#1A1A1A] border border-[#2C2C2C] text-sm text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono text-[#888888] mb-1">
                      Badge Text / Subtitle
                    </label>
                    <input
                      type="text"
                      value={personalInfo.heroBadgeText}
                      onChange={(e) => updatePersonalInfo({ heroBadgeText: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-[#1A1A1A] border border-[#2C2C2C] text-sm text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                {/* Hero Description */}
                <div>
                  <label className="block text-xs uppercase font-mono text-[#888888] mb-1">
                    Hero Intro Paragraph
                  </label>
                  <textarea
                    rows={2}
                    value={personalInfo.heroDescription}
                    onChange={(e) => updatePersonalInfo({ heroDescription: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-[#1A1A1A] border border-[#2C2C2C] text-sm text-white focus:outline-none focus:border-white resize-none"
                  />
                </div>

                {/* About Bio Narrative */}
                <div className="space-y-3">
                  <label className="block text-xs uppercase font-mono text-[#888888]">
                    About Me — Narrative & Philosophy
                  </label>
                  <textarea
                    rows={3}
                    value={personalInfo.aboutDescription}
                    onChange={(e) => updatePersonalInfo({ aboutDescription: e.target.value })}
                    placeholder="Primary bio paragraph..."
                    className="w-full px-4 py-2 rounded-xl bg-[#1A1A1A] border border-[#2C2C2C] text-sm text-white focus:outline-none focus:border-white resize-none"
                  />
                  <textarea
                    rows={2}
                    value={personalInfo.aboutSubDescription || ''}
                    onChange={(e) => updatePersonalInfo({ aboutSubDescription: e.target.value })}
                    placeholder="Secondary bio paragraph..."
                    className="w-full px-4 py-2 rounded-xl bg-[#1A1A1A] border border-[#2C2C2C] text-sm text-white focus:outline-none focus:border-white resize-none"
                  />
                </div>

                {/* Signature Philosophy Quote */}
                <div className="p-4 rounded-xl bg-[#191919] border border-[#292929] space-y-3">
                  <div className="text-xs uppercase font-mono text-white tracking-wider">
                    Signature Philosophy Quote
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#777777] mb-1">Quote</label>
                    <input
                      type="text"
                      value={personalInfo.philosophyQuote}
                      onChange={(e) => updatePersonalInfo({ philosophyQuote: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#777777] mb-1">Quote Subtext</label>
                    <input
                      type="text"
                      value={personalInfo.philosophySubtext}
                      onChange={(e) => updatePersonalInfo({ philosophySubtext: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-xs text-white"
                    />
                  </div>
                </div>

                {/* Contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs uppercase font-mono text-[#888888] mb-1">Email</label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => updatePersonalInfo({ email: e.target.value, emailMailto: `mailto:${e.target.value}` })}
                      className="w-full px-3 py-2 rounded-xl bg-[#1A1A1A] border border-[#2C2C2C] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-mono text-[#888888] mb-1">Phone</label>
                    <input
                      type="text"
                      value={personalInfo.phone}
                      onChange={(e) => updatePersonalInfo({ phone: e.target.value, phoneFormatted: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#1A1A1A] border border-[#2C2C2C] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-mono text-[#888888] mb-1">Location</label>
                    <input
                      type="text"
                      value={personalInfo.location}
                      onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#1A1A1A] border border-[#2C2C2C] text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. PHOTO & MEDIA */}
            {activeCMSTab === 'photo' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="font-serif-display text-2xl text-white">Photo & Media</h3>
                  <p className="text-xs text-[#888888] mt-1 font-mono">
                    Upload your portrait photo directly from your computer or phone, or provide an image link.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                  {/* Live Portrait Preview in Arch Card */}
                  <div className="sm:col-span-5 flex flex-col items-center p-6 rounded-2xl bg-[#191919] border border-[#292929]">
                    <div className="w-48 h-64 arch-card overflow-hidden bg-black border-2 border-white/20 shadow-xl relative group">
                      <img
                        src={personalInfo.portraitLocal || personalInfo.portraitFallback}
                        alt={personalInfo.name}
                        className="w-full h-full object-cover grayscale contrast-110"
                        onError={(e) => {
                          // Fallback to GitHub avatar
                          (e.target as HTMLImageElement).src = personalInfo.portraitFallback;
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-mono text-[#777777] mt-3">
                      Current Portrait Preview
                    </span>
                  </div>

                  {/* Upload and URL inputs */}
                  <div className="sm:col-span-7 space-y-5">
                    {/* Direct File Upload */}
                    <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-3">
                      <div className="flex items-center gap-2 text-white text-xs font-mono uppercase tracking-wider">
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <span>Upload From Your Device</span>
                      </div>
                      <p className="text-xs text-[#888888]">
                        Select any photo (JPEG, PNG, WebP) from your phone or PC. It will instantly update your hero arch photo and save automatically.
                      </p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Choose Photo File</span>
                      </button>
                    </div>

                    {/* Remote URL input */}
                    <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2E2E2E] space-y-3">
                      <div className="text-white text-xs font-mono uppercase tracking-wider">
                        Or Provide Image URL
                      </div>
                      <input
                        type="url"
                        value={personalInfo.portraitLocal}
                        onChange={(e) => updatePersonalInfo({ portraitLocal: e.target.value })}
                        placeholder="https://images.unsplash.com/... or https://..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#262626] text-xs text-white focus:outline-none focus:border-white"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => updatePersonalInfo({ portraitLocal: '/sameer-portrait.jpg' })}
                          className="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#303030] text-[11px] font-mono text-neutral-300"
                        >
                          Use Local Sameer Photo
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updatePersonalInfo({
                              portraitLocal: 'https://avatars.githubusercontent.com/u/213257428?v=4',
                            })
                          }
                          className="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#303030] text-[11px] font-mono text-neutral-300"
                        >
                          Use GitHub Avatar
                        </button>
                      </div>
                    </div>

                    {/* Quick Callout to Designs Tab */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#181818] border border-emerald-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-mono font-medium text-emerald-300 block">
                          Want to show your custom designs or animations in the Hero Arch instead?
                        </span>
                        <span className="text-[11px] text-[#888888] font-mono">
                          Upload your SVG, vector graphics, GIF, or video creations.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => openCMS('designs')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-mono whitespace-nowrap transition-colors"
                      >
                        Go to Designs &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. DESIGNS & MOTION GRAPHICS ARCHIVE */}
            {activeCMSTab === 'designs' && <AdminDesignsTab />}

            {/* 4. STYLES & THEME */}
            {activeCMSTab === 'theme' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="font-serif-display text-2xl text-white">Styles, Typography & Background</h3>
                  <p className="text-xs text-[#888888] mt-1 font-mono">
                    Switch fonts, choose luxury dark palette presets, or pick exact background hex colors.
                  </p>
                </div>

                {/* Preset Themes */}
                <div>
                  <label className="block text-xs uppercase font-mono text-[#888888] mb-2">
                    Minimalist Dark Theme Presets
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      {
                        name: 'Classic Noir',
                        primary: '#0A0A0A',
                        card: '#161616',
                        border: '#262626',
                        serif: 'Playfair Display',
                      },
                      {
                        name: 'Obsidian Slate',
                        primary: '#0D1117',
                        card: '#161B22',
                        border: '#30363D',
                        serif: 'Bodoni Moda',
                      },
                      {
                        name: 'Deep Charcoal',
                        primary: '#141414',
                        card: '#1F1F1F',
                        border: '#333333',
                        serif: 'Cormorant Garamond',
                      },
                      {
                        name: 'Pure Black',
                        primary: '#000000',
                        card: '#121212',
                        border: '#262626',
                        serif: 'Cinzel',
                      },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() =>
                          updateThemeSettings({
                            themePresetName: preset.name,
                            bgPrimary: preset.primary,
                            bgCard: preset.card,
                            borderColor: preset.border,
                            fontSerif: preset.serif as any,
                          })
                        }
                        className={`p-3 rounded-xl border text-left transition-all ${
                          themeSettings.themePresetName === preset.name
                            ? 'border-white bg-white/10'
                            : 'border-[#262626] bg-[#161616] hover:border-[#383838]'
                        }`}
                      >
                        <div
                          className="w-full h-8 rounded-lg mb-2 border border-white/10"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div className="text-xs font-semibold text-white">{preset.name}</div>
                        <div className="text-[10px] text-[#777777] font-mono mt-0.5">
                          {preset.serif}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Pairing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#181818] border border-[#282828]">
                  <div>
                    <label className="block text-xs uppercase font-mono text-white mb-2">
                      Display Serif Heading Font
                    </label>
                    <select
                      value={themeSettings.fontSerif}
                      onChange={(e) =>
                        updateThemeSettings({ fontSerif: e.target.value as any })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121212] border border-[#333333] text-sm text-white focus:outline-none focus:border-white"
                    >
                      <option value="Playfair Display">Playfair Display (Classic Luxury)</option>
                      <option value="Bodoni Moda">Bodoni Moda (High Contrast)</option>
                      <option value="Cormorant Garamond">Cormorant Garamond (Editorial Vintage)</option>
                      <option value="Cinzel">Cinzel (Classical Monumental)</option>
                      <option value="Georgia">Georgia (Clean Standard Serif)</option>
                    </select>
                    <div className="mt-2 text-lg italic text-neutral-300 font-serif-display">
                      Preview: "Sameer — Full Stack Developer"
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono text-white mb-2">
                      Body & Interface Font
                    </label>
                    <select
                      value={themeSettings.fontSans}
                      onChange={(e) =>
                        updateThemeSettings({ fontSans: e.target.value as any })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121212] border border-[#333333] text-sm text-white focus:outline-none focus:border-white"
                    >
                      <option value="Plus Jakarta Sans">Plus Jakarta Sans (Crisp Modern)</option>
                      <option value="Inter">Inter (Neutral Clean)</option>
                      <option value="system-ui">system-ui (Native OS Font)</option>
                    </select>
                    <div className="mt-2 text-xs text-neutral-400">
                      Preview: Architecting intelligent agentic workflows and practical software.
                    </div>
                  </div>
                </div>

                {/* Custom Color Controls */}
                <div>
                  <label className="block text-xs uppercase font-mono text-[#888888] mb-2">
                    Exact Color Pickers
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-[#181818] border border-[#282828] space-y-2">
                      <span className="text-[11px] font-mono text-[#888888]">Page Background</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={themeSettings.bgPrimary}
                          onChange={(e) => updateThemeSettings({ bgPrimary: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={themeSettings.bgPrimary}
                          onChange={(e) => updateThemeSettings({ bgPrimary: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-[#121212] border border-[#333333] text-xs font-mono text-white"
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#181818] border border-[#282828] space-y-2">
                      <span className="text-[11px] font-mono text-[#888888]">Card Background</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={themeSettings.bgCard}
                          onChange={(e) => updateThemeSettings({ bgCard: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={themeSettings.bgCard}
                          onChange={(e) => updateThemeSettings({ bgCard: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-[#121212] border border-[#333333] text-xs font-mono text-white"
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#181818] border border-[#282828] space-y-2">
                      <span className="text-[11px] font-mono text-[#888888]">Borders Tone</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={themeSettings.borderColor}
                          onChange={(e) => updateThemeSettings({ borderColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={themeSettings.borderColor}
                          onChange={(e) => updateThemeSettings({ borderColor: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-[#121212] border border-[#333333] text-xs font-mono text-white"
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#181818] border border-[#282828] space-y-2">
                      <span className="text-[11px] font-mono text-[#888888]">Accent Color</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={themeSettings.accentColor}
                          onChange={(e) => updateThemeSettings({ accentColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={themeSettings.accentColor}
                          onChange={(e) => updateThemeSettings({ accentColor: e.target.value })}
                          className="w-full px-2 py-1 rounded bg-[#121212] border border-[#333333] text-xs font-mono text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. ANIMATIONS */}
            {activeCMSTab === 'animations' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="font-serif-display text-2xl text-white">Animation & Cursor FX</h3>
                  <p className="text-xs text-[#888888] mt-1 font-mono">
                    Configure interactive cursor particle effects, badge rotation speeds, and hover zooms.
                  </p>
                </div>

                {/* Cursor FX */}
                <div className="p-5 rounded-2xl bg-[#181818] border border-[#282828] space-y-3">
                  <div className="text-xs uppercase font-mono text-white tracking-wider">
                    Interactive Cursor Trail Effect
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'starlight', label: 'Starlight Sparkles', desc: 'Trailing stars behind cursor' },
                      { id: 'minimal-dot', label: 'Minimal Dot & Ring', desc: 'Precision dot + outer ring' },
                      { id: 'glow', label: 'Soft Glow', desc: 'Subtle ambient cursor aura' },
                      { id: 'disabled', label: 'Native Arrow', desc: 'Standard browser cursor only' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() =>
                          updateAnimationSettings({ cursorStyle: mode.id as any })
                        }
                        className={`p-3 rounded-xl border text-left transition-all ${
                          animationSettings.cursorStyle === mode.id
                            ? 'border-white bg-white/10 text-white'
                            : 'border-[#282828] bg-[#121212] text-[#888888] hover:border-[#383838]'
                        }`}
                      >
                        <div className="text-xs font-semibold">{mode.label}</div>
                        <div className="text-[10px] text-[#666666] mt-1">{mode.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Circular Badge Spin */}
                <div className="p-5 rounded-2xl bg-[#181818] border border-[#282828] space-y-3">
                  <div className="text-xs uppercase font-mono text-white tracking-wider">
                    Hero Badge Circular Sticker Rotation Speed
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'slow', label: 'Smooth Luxury (18s)' },
                      { id: 'normal', label: 'Normal (10s)' },
                      { id: 'fast', label: 'Fast (5s)' },
                      { id: 'paused', label: 'Paused / Static' },
                    ].map((spd) => (
                      <button
                        key={spd.id}
                        type="button"
                        onClick={() =>
                          updateAnimationSettings({ badgeSpinSpeed: spd.id as any })
                        }
                        className={`p-3 rounded-xl border text-center transition-all ${
                          animationSettings.badgeSpinSpeed === spd.id
                            ? 'border-white bg-white/10 text-white'
                            : 'border-[#282828] bg-[#121212] text-[#888888] hover:border-[#383838]'
                        }`}
                      >
                        <div className="text-xs font-semibold">{spd.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hover Zoom & Motion Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#181818] border border-[#282828] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase text-white">Arch Cards Hover Zoom</div>
                      <div className="text-[11px] text-[#777777] mt-0.5">
                        Slight scale and lift on project & portrait cards
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={animationSettings.cardHoverZoom}
                      onChange={(e) =>
                        updateAnimationSettings({ cardHoverZoom: e.target.checked })
                      }
                      className="w-5 h-5 rounded accent-white cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-[#181818] border border-[#282828] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase text-white">Entrance Motion</div>
                      <div className="text-[11px] text-[#777777] mt-0.5">
                        Scroll-triggered fade and rise animations
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={animationSettings.enableMotion}
                      onChange={(e) =>
                        updateAnimationSettings({ enableMotion: e.target.checked })
                      }
                      className="w-5 h-5 rounded accent-white cursor-pointer"
                    />
                  </div>

                  {/* Callout to Custom Motion & Designs */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#181818] border border-emerald-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-mono font-medium text-emerald-300 block">
                        Upload Your Own Motion Graphics & Animations
                      </span>
                      <span className="text-[11px] text-[#888888] font-mono">
                        Add MP4, WebM, animated SVG, or GIF animations created by you.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openCMS('designs')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-mono whitespace-nowrap transition-colors"
                    >
                      Open Motion Uploader &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 5. PROJECTS (CRUD) */}
            {activeCMSTab === 'projects' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="font-serif-display text-2xl text-white">Projects Manager</h3>
                    <p className="text-xs text-[#888888] mt-1 font-mono">
                      Add, modify, reorder, or delete projects in your portfolio.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openEditProjectModal(null)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Project</span>
                  </button>
                </div>

                {/* Projects List */}
                <div className="space-y-3">
                  {projects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl bg-[#181818] border border-[#282828] flex items-center justify-between gap-3 hover:border-[#383838] transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#242424] border border-[#333333] flex items-center justify-center text-xs font-mono font-bold text-white shrink-0">
                          {proj.number || String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-white truncate">
                              {proj.name}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#252525] text-neutral-300">
                              {proj.category}
                            </span>
                            {proj.isFlagship && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-700/50 text-emerald-300">
                                Top 3 Flagship
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#888888] truncate mt-0.5 max-w-md">
                            {proj.tagline || proj.description}
                          </p>
                        </div>
                      </div>

                      {/* Controls: Reorder, Edit, Delete */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => moveProject(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg text-[#777777] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Move Up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveProject(idx, 'down')}
                          disabled={idx === projects.length - 1}
                          className="p-1.5 rounded-lg text-[#777777] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Move Down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditProjectModal(proj)}
                          className="p-2 rounded-lg bg-[#222222] hover:bg-[#303030] text-neutral-200"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete project "${proj.name}"?`)) {
                              deleteProject(proj.id);
                            }
                          }}
                          className="p-2 rounded-lg bg-red-950/40 border border-red-900/40 hover:bg-red-900/60 text-red-400"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. SKILLS & JOURNEY */}
            {activeCMSTab === 'skills' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="font-serif-display text-2xl text-white">Skills & Journey</h3>
                  <p className="text-xs text-[#888888] mt-1 font-mono">
                    Edit education credentials, independent experience, and technical skill tags.
                  </p>
                </div>

                {/* Education Card Edit */}
                <div className="p-5 rounded-2xl bg-[#181818] border border-[#282828] space-y-3">
                  <div className="text-xs uppercase font-mono text-white tracking-wider">
                    Education Information
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#777777] mb-1">Level</label>
                      <input
                        type="text"
                        value={educationInfo.level}
                        onChange={(e) => updateEducationInfo({ level: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#2A2A2A] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#777777] mb-1">Institution</label>
                      <input
                        type="text"
                        value={educationInfo.institution}
                        onChange={(e) => updateEducationInfo({ institution: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#2A2A2A] text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#777777] mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={educationInfo.description}
                      onChange={(e) => updateEducationInfo({ description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#2A2A2A] text-xs text-white resize-none"
                    />
                  </div>
                </div>

                {/* Work Experience Edit */}
                <div className="p-5 rounded-2xl bg-[#181818] border border-[#282828] space-y-3">
                  <div className="text-xs uppercase font-mono text-white tracking-wider">
                    Independent Journey & Experience
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#777777] mb-1">Role Title</label>
                      <input
                        type="text"
                        value={workExperienceInfo.role}
                        onChange={(e) => updateWorkExperienceInfo({ role: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#2A2A2A] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#777777] mb-1">Period</label>
                      <input
                        type="text"
                        value={workExperienceInfo.period}
                        onChange={(e) => updateWorkExperienceInfo({ period: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#2A2A2A] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#777777] mb-1">Type</label>
                      <input
                        type="text"
                        value={workExperienceInfo.type}
                        onChange={(e) => updateWorkExperienceInfo({ type: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#2A2A2A] text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#777777] mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={workExperienceInfo.description}
                      onChange={(e) => updateWorkExperienceInfo({ description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-[#2A2A2A] text-xs text-white resize-none"
                    />
                  </div>
                </div>

                {/* Skill Categories & Skills Builder */}
                <div className="p-5 rounded-2xl bg-[#181818] border border-[#282828] space-y-4">
                  <div className="text-xs uppercase font-mono text-white tracking-wider">
                    Technical Stack Categories & Tags
                  </div>

                  {/* Category Selector */}
                  <div className="flex flex-wrap gap-2">
                    {skillCategories.map((cat, idx) => (
                      <button
                        key={cat.title}
                        type="button"
                        onClick={() => setSelectedCategoryIdx(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                          selectedCategoryIdx === idx
                            ? 'bg-white text-black font-semibold'
                            : 'bg-[#222222] text-[#888888] hover:text-white'
                        }`}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>

                  {/* Selected Category Skill Badges */}
                  {skillCategories[selectedCategoryIdx] && (
                    <div className="p-4 rounded-xl bg-[#121212] border border-[#242424] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-neutral-300">
                          Editing: {skillCategories[selectedCategoryIdx].title}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {skillCategories[selectedCategoryIdx].skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#202020] border border-[#303030] text-xs text-neutral-200"
                          >
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSkillFromCategory(selectedCategoryIdx, skill)
                              }
                              className="text-[#888888] hover:text-red-400 font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Add Skill Input */}
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          value={newSkillName}
                          onChange={(e) => setNewSkillName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddSkillToCategory();
                            }
                          }}
                          placeholder="Add skill tag (e.g. LangGraph)..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#181818] border border-[#2C2C2C] text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={handleAddSkillToCategory}
                          className="px-3 py-1.5 rounded-lg bg-[#282828] text-xs font-mono text-white hover:bg-[#333333]"
                        >
                          Add Tag
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 7. SECURITY & BACKUP */}
            {activeCMSTab === 'security' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="font-serif-display text-2xl text-white">Security, Backup & Restore</h3>
                  <p className="text-xs text-[#888888] mt-1 font-mono">
                    Change your master passcode, track security attempt logs, export complete backup JSON, or restore anytime.
                  </p>
                </div>

                {/* Security Activity & Intruder Attempt Logs */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  hasUnreadSecurityAlert
                    ? 'bg-red-950/20 border-red-800/80 shadow-lg shadow-red-950/30'
                    : 'bg-[#181818] border-[#282828]'
                } space-y-4`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${hasUnreadSecurityAlert ? 'bg-red-500/20 text-red-400' : 'bg-neutral-800 text-neutral-300'}`}>
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs uppercase font-mono text-white tracking-wider flex items-center gap-2">
                          <span>Security Incident & Attempt Logs</span>
                          {hasUnreadSecurityAlert && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                              Active Red Alert
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#888888] mt-0.5">
                          Automatically logs timestamp, device profile, and attempt count when 3+ failed passcodes are entered.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {hasUnreadSecurityAlert && (
                        <button
                          type="button"
                          onClick={markSecurityAlertsAsReviewed}
                          className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/60 text-xs font-mono transition-colors flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark as Reviewed (Clear Red Dot)</span>
                        </button>
                      )}
                      {securityIncidents.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Clear all recorded security attempt logs?')) {
                              clearSecurityIncidents();
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear Logs</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          recordSecurityIncident(3, 'Test simulation: 3 incorrect passcodes entered from current device');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2C2C2C] text-[11px] font-mono text-[#A3A3A3] hover:text-white border border-[#333333] transition-colors"
                        title="Simulate a 3-failed-attempts security incident to test notifications"
                      >
                        + Test Security Alert
                      </button>
                    </div>
                  </div>

                  {/* Incident Records List */}
                  {securityIncidents.length === 0 ? (
                    <div className="p-4 rounded-xl bg-black/40 border border-[#242424] text-center space-y-1">
                      <div className="text-xs font-mono text-emerald-400 flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>System Secure • No Suspicious Attempts Detected</span>
                      </div>
                      <p className="text-[11px] text-[#666666]">
                        When someone enters 3 incorrect passcodes on the login portal, the system will log the attempt with device details and activate the red alert badge.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                      {securityIncidents.map((incident) => (
                        <div
                          key={incident.id}
                          className={`p-3.5 rounded-xl border text-xs font-mono transition-colors ${
                            !incident.reviewed
                              ? 'bg-red-950/30 border-red-800/60 text-red-200'
                              : 'bg-black/40 border-[#262626] text-neutral-300'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                            <div className="flex items-center gap-2">
                              {!incident.reviewed ? (
                                <span className="flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
                              )}
                              <span className="font-semibold text-white">
                                {incident.attemptsCount} Consecutive Failed Attempts
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                                !incident.reviewed
                                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                  : 'bg-neutral-800 text-neutral-400'
                              }`}>
                                {!incident.reviewed ? 'Unreviewed' : 'Reviewed'}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#888888]">
                              📅 {incident.formattedTime}
                            </span>
                          </div>

                          <div className="text-[11px] text-[#A3A3A3] space-y-0.5 pl-4 border-l border-neutral-700/40 mt-2">
                            <div>
                              <strong className="text-neutral-400">Device & Browser:</strong> {incident.deviceInfo}
                            </div>
                            {incident.notes && (
                              <div className="text-[11px] text-[#888888]">
                                <strong className="text-neutral-400">Activity Note:</strong> {incident.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Change Master Password */}
                <form
                  onSubmit={handlePasswordSubmit}
                  className="p-5 rounded-2xl bg-[#181818] border border-[#282828] space-y-4"
                >
                  <div className="text-xs uppercase font-mono text-white tracking-wider flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Change Master Passcode (Owner Only)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#888888] mb-1">
                        Current Passcode
                      </label>
                      <input
                        type="password"
                        required
                        value={oldPass}
                        onChange={(e) => setOldPass(e.target.value)}
                        placeholder="Current password (default: sameer@2026)"
                        className="w-full px-4 py-2 rounded-xl bg-[#121212] border border-[#2A2A2A] text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#888888] mb-1">
                        New Passcode
                      </label>
                      <input
                        type="password"
                        required
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="Set new secret passcode"
                        className="w-full px-4 py-2 rounded-xl bg-[#121212] border border-[#2A2A2A] text-xs text-white"
                      />
                    </div>
                  </div>

                  {securityStatus && (
                    <div
                      className={`p-3 rounded-xl text-xs font-mono ${
                        securityStatus.success
                          ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-300'
                          : 'bg-red-950/50 border border-red-800 text-red-300'
                      }`}
                    >
                      {securityStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                  >
                    Update Passcode
                  </button>
                </form>

                {/* Secondary Backup Recovery Passcode */}
                <form
                  onSubmit={handleBackupPassSubmit}
                  className="p-5 rounded-2xl bg-[#181818] border border-[#282828] space-y-4"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="text-xs uppercase font-mono text-white tracking-wider flex items-center gap-2">
                      <Key className="w-4 h-4 text-sky-400" />
                      <span>Backup Recovery Passcode (Secondary Master Key)</span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                        hasBackupPassword
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                          : 'bg-neutral-800/80 text-neutral-400 border border-neutral-700'
                      }`}
                    >
                      {hasBackupPassword ? 'Active & Configured' : 'Not Set (Optional)'}
                    </span>
                  </div>

                  <p className="text-xs text-[#888888] leading-relaxed">
                    Set a secondary emergency password. If you ever forget your primary passcode, you can enter this backup recovery code to unlock the admin customizer instantly.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      type="password"
                      value={backupPassInput}
                      onChange={(e) => setBackupPassInput(e.target.value)}
                      placeholder="Set secondary backup passcode (min 4 chars)..."
                      className="flex-1 px-4 py-2 rounded-xl bg-[#121212] border border-[#2A2A2A] text-xs text-white"
                    />
                    <button
                      type="submit"
                      disabled={!backupPassInput.trim()}
                      className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-mono transition-colors whitespace-nowrap"
                    >
                      Save Backup Passcode
                    </button>
                    {hasBackupPassword && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Remove backup recovery passcode?')) {
                            removeBackupPassword();
                            setBackupPassStatus({ success: true, message: 'Backup password removed.' });
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs font-mono transition-colors whitespace-nowrap"
                      >
                        Remove Backup Passcode
                      </button>
                    )}
                  </div>

                  {backupPassStatus && (
                    <div
                      className={`p-3 rounded-xl text-xs font-mono ${
                        backupPassStatus.success
                          ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-300'
                          : 'bg-red-950/50 border border-red-800 text-red-300'
                      }`}
                    >
                      {backupPassStatus.message}
                    </div>
                  )}
                </form>

                {/* Password Hint Customization (Auto-reveals after 3 failed tries) */}
                <form
                  onSubmit={handleSaveHint}
                  className="p-5 rounded-2xl bg-[#181818] border border-[#282828] space-y-4"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="text-xs uppercase font-mono text-white tracking-wider flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span>Custom Password Hint (Revealed After 3 Failed Tries)</span>
                    </div>
                    {passwordHint && (
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/50">
                        Hint Active
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#888888] leading-relaxed">
                    Apni taraf se koi bhi secret hint add, change ya remove karein. Agar aap ya koi 3 martaba ghalat passcode enter karega, toh <strong>teesri try ke baad foran ye hint login box ke neeche nazar aayega</strong>.
                  </p>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-mono text-neutral-300">
                      Your Secret Password Hint:
                    </label>
                    <textarea
                      rows={2}
                      value={hintInput}
                      onChange={(e) => setHintInput(e.target.value)}
                      placeholder="e.g. Meri birthday or favourite IDE code (sameer@2026)..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121212] border border-[#2A2A2A] text-xs font-mono text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  {/* Live Simulation of 3-Failed-Attempts Reveal */}
                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-amber-300 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      Live Portal Preview (What appears after 3 failed login attempts):
                    </span>
                    <div className="p-2.5 rounded-lg bg-black/60 border border-amber-900/40 text-xs font-mono text-amber-200 break-words">
                      {hintInput.trim() ? `"${hintInput.trim()}"` : '(No custom hint configured)'}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-semibold text-xs font-mono transition-colors"
                    >
                      Save Password Hint
                    </button>
                    {hintInput && (
                      <button
                        type="button"
                        onClick={handleClearHint}
                        className="px-4 py-2 rounded-xl bg-[#242424] hover:bg-[#303030] text-xs font-mono text-neutral-300 border border-[#333333] transition-colors"
                      >
                        Clear / Remove Hint
                      </button>
                    )}
                  </div>

                  {hintSavedStatus && (
                    <div className="p-3 rounded-xl text-xs font-mono bg-emerald-950/50 border border-emerald-800 text-emerald-300">
                      {hintSavedStatus}
                    </div>
                  )}
                </form>

                {/* Callout to Official PDF User Guide */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-[#181818] border border-emerald-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono font-medium">
                      <BookOpen className="w-4 h-4" />
                      <span>Official Owner Guide & PDF Manual</span>
                    </div>
                    <p className="text-xs text-[#888888] max-w-md">
                      Read step-by-step instructions on every feature or print/save a clean PDF handbook for offline keeping.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openCMS('guide')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono whitespace-nowrap transition-colors"
                  >
                    Open PDF Guide &rarr;
                  </button>
                </div>

                {/* Export Backup JSON */}
                <div className="p-5 rounded-2xl bg-[#181818] border border-[#282828] space-y-3">
                  <div className="text-xs uppercase font-mono text-white tracking-wider flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>Download Full Portfolio Backup</span>
                  </div>
                  <p className="text-xs text-[#888888]">
                    Exports all your customized projects, text, colors, photo, and configs into a portable JSON backup file.
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadBackup}
                    className="px-5 py-2.5 rounded-full bg-[#242424] hover:bg-[#303030] text-xs font-mono text-white border border-[#383838] transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export JSON Backup File</span>
                  </button>
                </div>

                {/* Import JSON */}
                <form
                  onSubmit={handleImportSubmit}
                  className="p-5 rounded-2xl bg-[#181818] border border-[#282828] space-y-3"
                >
                  <div className="text-xs uppercase font-mono text-white tracking-wider flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span>Import & Restore Backup JSON</span>
                  </div>
                  <textarea
                    rows={3}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder="Paste exported JSON content here..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121212] border border-[#262626] text-xs font-mono text-white focus:outline-none focus:border-white"
                  />
                  {importStatus && (
                    <div
                      className={`p-3 rounded-xl text-xs font-mono ${
                        importStatus.success
                          ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-300'
                          : 'bg-red-950/50 border border-red-800 text-red-300'
                      }`}
                    >
                      {importStatus.message}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#242424] hover:bg-[#303030] text-xs font-mono text-white border border-[#383838] transition-colors"
                  >
                    Apply Backup JSON
                  </button>
                </form>

                {/* Factory Reset */}
                <div className="p-5 rounded-2xl bg-red-950/20 border border-red-900/30 space-y-3">
                  <div className="text-xs uppercase font-mono text-red-400 tracking-wider flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset Portfolio to Original Factory Defaults</span>
                  </div>
                  <p className="text-xs text-[#888888]">
                    Clears all saved changes and reverts back to the original template with initial data.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to revert all changes back to original defaults?'
                        )
                      ) {
                        resetToDefaults();
                        alert('Portfolio reset to original defaults.');
                      }
                    }}
                    className="px-5 py-2.5 rounded-full bg-red-900/40 hover:bg-red-900/70 text-xs font-mono text-red-300 border border-red-800/50 transition-colors"
                  >
                    Reset Everything to Default
                  </button>
                </div>
              </div>
            )}

            {/* 8. OWNER GUIDE & PDF MANUAL */}
            {activeCMSTab === 'guide' && <AdminGuideTab />}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
