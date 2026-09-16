import { Code, Cpu, Globe, Edit2 } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export function About() {
  const { personalInfo, isAuthenticated, isEditModeActive, openCMS } = usePortfolio();

  return (
    <section id="about" className="py-20 lg:py-28 relative bg-[var(--bg-primary,#0A0A0A)] border-t border-[#1C1C1C] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading "Who is Sameer?" & Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 relative"
          >
            {/* Admin Quick Edit Button */}
            {isAuthenticated && isEditModeActive && (
              <button
                type="button"
                onClick={() => openCMS('content')}
                className="absolute -top-7 left-0 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 shadow hover:bg-emerald-900 transition-colors"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit Bio Narrative</span>
              </button>
            )}

            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
              Who is {personalInfo.name}?
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#A3A3A3] font-light leading-relaxed whitespace-pre-line">
              <p>{personalInfo.aboutDescription}</p>
              {personalInfo.aboutSubDescription && (
                <p className="text-sm sm:text-base text-[#888888]">{personalInfo.aboutSubDescription}</p>
              )}
            </div>

            {/* Core Capability Badges */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[var(--bg-card,#161616)] border border-[#242424] flex items-center gap-3">
                <Cpu className="w-5 h-5 text-neutral-300" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-white font-medium">Agentic AI & LLMs</div>
                  <div className="text-[11px] text-[#777777]">Autonomous workflows & RAG</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-card,#161616)] border border-[#242424] flex items-center gap-3">
                <Code className="w-5 h-5 text-neutral-300" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-white font-medium">Full Stack Web</div>
                  <div className="text-[11px] text-[#777777]">React, TypeScript & FastAPI</div>
                </div>
              </div>
            </div>

            {/* Micro Details: Location & Communication */}
            <div className="pt-4 flex items-center gap-6 text-xs text-[#888888] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span>{personalInfo.location || 'Karachi, Pakistan'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Urdu & English</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Architectural Arch Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] arch-hero-portrait bg-[#141414] border border-[#282828] p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl group">
              {/* Decorative subtle grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(#2E2E2E_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              {/* Arch Top Header Label */}
              <div className="relative z-10 text-center pt-8">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#888888] px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#333333]">
                  SYSTEMS & CODE
                </span>
              </div>

              {/* Center Terminal Snippet */}
              <div className="relative z-10 p-5 rounded-2xl bg-[#0A0A0A]/90 border border-[#242424] font-mono text-xs space-y-2 text-left shadow-xl">
                <div className="flex items-center gap-1.5 pb-2 border-b border-[#222222]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
                  <span className="text-[10px] text-[#666666] ml-2">architecture.py</span>
                </div>
                <p className="text-neutral-400">
                  <span className="text-white">class</span> Developer:
                </p>
                <p className="pl-3 text-neutral-300">
                  name = <span className="text-neutral-100">"{personalInfo.name}"</span>
                </p>
                <p className="pl-3 text-neutral-300">
                  focus = [<span className="text-neutral-100">"Agentic AI"</span>, <span className="text-neutral-100">"Full Stack"</span>]
                </p>
                <p className="pl-3 text-neutral-300">
                  mindset = <span className="text-neutral-100">"Utilitarian Craft"</span>
                </p>
              </div>

              {/* Arch Bottom Tag */}
              <div className="relative z-10 pb-4 text-center">
                <p className="font-serif-display italic text-sm text-neutral-400">
                  "{personalInfo.tagline || 'Turning Ideas Into Intelligent Solutions.'}"
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
