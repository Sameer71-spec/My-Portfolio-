import { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#121212] border border-[#282828] shadow-2xl overflow-hidden text-white z-10"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-[#222222] flex items-start justify-between gap-4 bg-[#161616]">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#202020] text-neutral-300 border border-[#303030]">
                    PROJECT {project.number}
                  </span>
                  <span className="text-xs font-mono text-[#888888]">
                    {project.categoryLabel}
                  </span>
                </div>
                <h3 id="modal-project-title" className="font-serif-display text-2xl sm:text-3xl font-normal text-white">
                  {project.name}
                </h3>
                {project.tagline && (
                  <p className="text-xs font-mono text-[#A3A3A3]">
                    "{project.tagline}"
                  </p>
                )}
              </div>

              <button
                id="close-project-modal-btn"
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-[#888888] hover:text-white hover:bg-[#222222] border border-[#2C2C2C] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm">
              {/* Overview */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#888888] mb-2">
                  System Overview
                </h4>
                <p className="text-[#CCCCCC] leading-relaxed text-sm bg-[#181818] p-4 rounded-xl border border-[#242424] font-light">
                  {project.description}
                </p>
              </div>

              {/* Problem & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#181818] border border-[#262626] space-y-2">
                  <div className="text-xs font-mono text-neutral-400 font-semibold uppercase tracking-wider">
                    The Problem
                  </div>
                  <p className="text-xs text-[#999999] leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#181818] border border-[#262626] space-y-2">
                  <div className="text-xs font-mono text-neutral-300 font-semibold uppercase tracking-wider">
                    The Solution
                  </div>
                  <p className="text-xs text-[#999999] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Architectural Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#888888] mb-3">
                    Architectural Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-[#181818] border border-[#242424] text-xs text-neutral-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#888888] mb-2">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-lg bg-[#1E1E1E] text-neutral-300 border border-[#2E2E2E]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-[#222222] bg-[#161616] flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold text-white bg-[#202020] hover:bg-[#2A2A2A] border border-[#333333] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-3">
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-md"
                  >
                    <span>Launch Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono text-[#888888] hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
