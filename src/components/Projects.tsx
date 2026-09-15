import { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, Code2, Bot, Mail, Sparkles, Layers, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

export function Projects() {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Top 3 Flagship Projects for "My Work" (Arch Cards)
  const flagshipProjects = PROJECTS.slice(0, 3);
  
  // Remaining Projects for "More of My Work" (Arch Cards Grid)
  const moreProjects = PROJECTS.slice(3);

  return (
    <section id="work" className="py-20 lg:py-28 relative bg-[#0A0A0A] border-t border-[#1C1C1C]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 1. SECTION: "My Work" (3 Arch-Topped Cards) as shown in Canva video       */}
        {/* ========================================================================= */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
              My Work
            </h2>
            <p className="text-sm sm:text-base text-[#888888] font-light">
              Selected software engineering projects and intelligent agent architectures.
            </p>
          </motion.div>

          {/* 3 Prominent Arch-Topped Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {flagshipProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col justify-between"
              >
                <div>
                  {/* ARCH WINDOW (Tombstone curve matching Canva template) */}
                  <div
                    onClick={() => setActiveModalProject(project)}
                    className="cursor-pointer relative w-full aspect-[4/5] arch-card bg-[#141414] border border-[#262626] group-hover:border-neutral-400 overflow-hidden transition-all duration-500 shadow-xl flex flex-col justify-between p-6"
                  >
                    {/* Background Pattern / Visual Graphic */}
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-transparent to-black/80 pointer-events-none" />
                    
                    {/* Arch Top Label */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-xs font-mono tracking-widest text-[#888888] uppercase">
                        PROJECT {project.number}
                      </span>
                      <span className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Visual Graphic Representation inside Arch */}
                    <div className="relative z-10 flex flex-col items-center justify-center py-6 text-center space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-[#202020] border border-[#333333] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                        {idx === 0 && <Bot className="w-8 h-8 text-neutral-200" />}
                        {idx === 1 && <Mail className="w-8 h-8 text-neutral-200" />}
                        {idx === 2 && <Code2 className="w-8 h-8 text-neutral-200" />}
                      </div>
                      <span className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
                        {project.categoryLabel}
                      </span>
                    </div>

                    {/* Arch Bottom Pill */}
                    <div className="relative z-10 text-center">
                      <span className="inline-block text-[11px] font-mono text-neutral-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        Click to view case study
                      </span>
                    </div>
                  </div>

                  {/* Project Info Underneath the Arch (as seen in Canva template) */}
                  <div className="pt-5 space-y-1.5">
                    <h3
                      onClick={() => setActiveModalProject(project)}
                      className="font-serif-display text-xl sm:text-2xl font-normal text-white group-hover:text-neutral-300 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{project.name}</span>
                    </h3>
                    <p className="text-xs text-[#888888] leading-relaxed line-clamp-2 font-light">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 mt-4 border-t border-[#1C1C1C] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs uppercase tracking-wider font-semibold text-white hover:text-neutral-300 transition-colors flex items-center gap-1"
                  >
                    <span>Read Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-[#1A1A1A] transition-colors"
                        aria-label={`GitHub repo for ${project.name}`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-[#1A1A1A] transition-colors"
                        aria-label={`Live demo for ${project.name}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SECTION: Editorial Statement / Quote Banner (as seen in Canva video)    */}
        {/* "Art speaks where words are unable to explain."                            */}
        {/* For Sameer: "Code speaks where logic connects to real-world intelligence." */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="my-24 py-16 lg:py-24 border-y border-[#202020] text-center relative overflow-hidden"
        >
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <span className="text-xs font-mono tracking-widest uppercase text-[#777777]">
              PHILOSOPHY & PRINCIPLE
            </span>
            <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
              "Code speaks where logic connects to{' '}
              <span className="italic font-editorial-italic font-normal">real-world intelligence.</span>"
            </h2>
            <p className="text-sm text-[#888888] max-w-xl mx-auto font-light">
              Building software with direct functional utility, robust system architecture, and minimal fluff.
            </p>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 3. SECTION: "More of My Work" (Grid of Arched Cards)                      */}
        {/* ========================================================================= */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white">
              More of My Work
            </h2>
            <p className="text-sm sm:text-base text-[#888888] font-light">
              Autonomous workflows, LLM applications, and educational platforms.
            </p>
          </motion.div>

          {/* 4-Card Grid matching Canva "More of My Work" */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moreProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setActiveModalProject(project)}
                className="group cursor-pointer p-4 rounded-2xl bg-[#121212] border border-[#222222] hover:border-neutral-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Miniature Arch Window */}
                  <div className="relative w-full aspect-[4/3] arch-card-sm bg-[#1A1A1A] border border-[#2C2C2C] overflow-hidden mb-4 flex items-center justify-center p-4">
                    <div className="text-center space-y-1">
                      <div className="text-neutral-400 font-mono text-xs font-semibold">
                        {project.number}
                      </div>
                      <div className="font-serif-display text-sm font-normal text-white group-hover:scale-105 transition-transform">
                        {project.name}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] font-mono uppercase text-[#777777]">
                      {project.categoryLabel}
                    </div>
                    <h4 className="font-serif-display text-base font-medium text-white group-hover:text-neutral-300 transition-colors">
                      {project.name}
                    </h4>
                    <p className="text-xs text-[#888888] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>View Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>

      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
