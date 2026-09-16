import { useState, useEffect, type FormEvent } from 'react';
import { X, Plus, Trash2, Check, ExternalLink, Github, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';

export function EditProjectModal() {
  const {
    isEditProjectModalOpen,
    closeEditProjectModal,
    editingProject,
    addProject,
    updateProject,
    deleteProject,
  } = usePortfolio();

  const isEditing = Boolean(editingProject);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('01');
  const [category, setCategory] = useState<string>('Agentic AI');
  const [categoryLabel, setCategoryLabel] = useState('Agentic AI / System');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [developmentApproach, setDevelopmentApproach] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [isFlagship, setIsFlagship] = useState(false);

  // Dynamic tags
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTech, setNewTech] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name || '');
      setNumber(editingProject.number || '01');
      setCategory(editingProject.category || 'Agentic AI');
      setCategoryLabel(editingProject.categoryLabel || '');
      setTagline(editingProject.tagline || '');
      setDescription(editingProject.description || '');
      setProblem(editingProject.problem || '');
      setSolution(editingProject.solution || '');
      setDevelopmentApproach(editingProject.developmentApproach || '');
      setGithubUrl(editingProject.githubUrl || '');
      setLiveDemoUrl(editingProject.liveDemoUrl || '');
      setIsFlagship(Boolean(editingProject.isFlagship));
      setTechnologies(editingProject.technologies || []);
      setFeatures(editingProject.features || []);
    } else {
      setName('');
      setNumber('01');
      setCategory('Agentic AI');
      setCategoryLabel('Agentic AI / Autonomous');
      setTagline('');
      setDescription('');
      setProblem('');
      setSolution('');
      setDevelopmentApproach('');
      setGithubUrl('https://github.com/Sameer71-spec');
      setLiveDemoUrl('');
      setIsFlagship(false);
      setTechnologies(['Python', 'LangGraph', 'FastAPI']);
      setFeatures(['Autonomous Decision Loops', 'Real-Time Verification']);
    }
  }, [editingProject, isEditProjectModalOpen]);

  if (!isEditProjectModalOpen) return null;

  const handleAddTech = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feat: string) => {
    setFeatures(features.filter((f) => f !== feat));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const projectPayload = {
      name: name.trim(),
      number: number.trim(),
      category,
      categoryLabel: categoryLabel.trim() || category,
      tagline: tagline.trim(),
      description: description.trim(),
      problem: problem.trim(),
      solution: solution.trim(),
      developmentApproach: developmentApproach.trim(),
      githubUrl: githubUrl.trim() || undefined,
      liveDemoUrl: liveDemoUrl.trim() || undefined,
      isFlagship,
      technologies,
      features,
    };

    if (isEditing && editingProject) {
      updateProject(editingProject.id, projectPayload);
    } else {
      addProject(projectPayload);
    }

    closeEditProjectModal();
  };

  const handleDelete = () => {
    if (editingProject && window.confirm(`Are you sure you want to delete "${editingProject.name}"?`)) {
      deleteProject(editingProject.id);
      closeEditProjectModal();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99992] flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeEditProjectModal}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#121212] border border-[#2A2A2A] shadow-2xl overflow-hidden text-white z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#222222] bg-[#161616] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#888888]">
                {isEditing ? 'MODIFY EXISTING PROJECT' : 'CREATE NEW PORTFOLIO PROJECT'}
              </span>
              <h2 className="font-serif-display text-2xl font-normal text-white">
                {isEditing ? `Edit: ${editingProject?.name}` : 'Add New Project'}
              </h2>
            </div>
            <button
              type="button"
              onClick={closeEditProjectModal}
              className="p-2 rounded-xl text-[#888888] hover:text-white hover:bg-[#202020] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Form Body */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm">
            {/* Top Row: Name, Number, Category */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-6">
                <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. CareerPilot AI"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-[#282828] text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1">
                  Number
                </label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="01"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-[#282828] text-white font-mono text-center focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    if (!categoryLabel) setCategoryLabel(e.target.value);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-[#282828] text-white focus:outline-none focus:border-white transition-colors"
                >
                  <option value="Agentic AI">Agentic AI</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="AI / LLM">AI / LLM</option>
                  <option value="EdTech">EdTech</option>
                  <option value="Automation">Automation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Row: Category Label & Tagline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1">
                  Category Display Label
                </label>
                <input
                  type="text"
                  value={categoryLabel}
                  onChange={(e) => setCategoryLabel(e.target.value)}
                  placeholder="e.g. Agentic AI / Career Guidance"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-[#282828] text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1">
                  Tagline / Motto
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Assessment Before Recommendation"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-[#282828] text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1">
                Overview Description *
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does this application do and what makes it valuable?"
                className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-[#282828] text-white focus:outline-none focus:border-white transition-colors resize-none"
              />
            </div>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1">
                  The Problem
                </label>
                <textarea
                  rows={3}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="What limitation or challenge does this solve?"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-[#282828] text-white focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1">
                  The Solution
                </label>
                <textarea
                  rows={3}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="How does your architecture solve it?"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-[#282828] text-white focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>
            </div>

            {/* Development Approach */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1">
                Development Approach / Architecture
              </label>
              <textarea
                rows={2}
                value={developmentApproach}
                onChange={(e) => setDevelopmentApproach(e.target.value)}
                placeholder="e.g. Built using LangGraph for stateful graphs, FastAPI orchestration..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-[#282828] text-white focus:outline-none focus:border-white transition-colors resize-none"
              />
            </div>

            {/* Technologies Builder */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1.5">
                Technologies & Tools
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#202020] border border-[#2E2E2E] text-xs font-mono text-white"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="text-[#888888] hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTech();
                    }
                  }}
                  placeholder="Add technology (e.g. LangGraph, React, Python)..."
                  className="flex-1 px-4 py-2 rounded-xl bg-[#181818] border border-[#282828] text-xs text-white focus:outline-none focus:border-white"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] text-xs font-mono text-white border border-[#333333]"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Features Builder */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1.5">
                Key Features
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {features.map((feat) => (
                  <span
                    key={feat}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#202020] border border-[#2E2E2E] text-xs font-mono text-neutral-300"
                  >
                    <span>{feat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(feat)}
                      className="text-[#888888] hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  placeholder="Add feature capability..."
                  className="flex-1 px-4 py-2 rounded-xl bg-[#181818] border border-[#282828] text-xs text-white focus:outline-none focus:border-white"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] text-xs font-mono text-white border border-[#333333]"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Links: GitHub & Live Demo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1">
                  GitHub Repository URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/Sameer71-spec/repo"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-[#282828] text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1">
                  Live Demo URL (Optional)
                </label>
                <input
                  type="url"
                  value={liveDemoUrl}
                  onChange={(e) => setLiveDemoUrl(e.target.value)}
                  placeholder="https://demo-app.app"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-[#282828] text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            {/* Flagship Toggle */}
            <div className="p-4 rounded-xl bg-[#181818] border border-[#282828] flex items-center justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-white">
                  Showcase as Flagship Project (Top 3 Arch Cards)
                </div>
                <div className="text-[11px] text-[#777777] mt-0.5">
                  Displays in the top prominent architectural arch cards section instead of the secondary grid.
                </div>
              </div>
              <input
                type="checkbox"
                checked={isFlagship}
                onChange={(e) => setIsFlagship(e.target.checked)}
                className="w-5 h-5 rounded accent-white cursor-pointer"
              />
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-[#222222] flex items-center justify-between flex-wrap gap-3">
              {isEditing ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs uppercase font-mono font-semibold text-red-400 bg-red-950/40 border border-red-800/40 hover:bg-red-900/50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Project</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={closeEditProjectModal}
                  className="px-4 py-2.5 rounded-xl text-xs uppercase font-mono text-[#888888] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-md"
                >
                  <Check className="w-4 h-4" />
                  <span>{isEditing ? 'Save Changes' : 'Create Project'}</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
