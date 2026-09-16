import { GraduationCap, Briefcase, Edit2 } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export function JourneyEducation() {
  const {
    educationInfo,
    workExperienceInfo,
    isAuthenticated,
    isEditModeActive,
    openCMS,
  } = usePortfolio();

  return (
    <section
      id="background"
      className="py-20 lg:py-28 relative bg-[var(--bg-primary,#0A0A0A)] border-t border-[#1C1C1C] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3 relative"
        >
          {isAuthenticated && isEditModeActive && (
            <button
              type="button"
              onClick={() => openCMS('skills')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 shadow hover:bg-emerald-900 transition-colors mb-2"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Education & Journey</span>
            </button>
          )}

          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            My Background
          </h2>
          <p className="text-sm sm:text-base text-[#888888] font-light">
            Academic foundation and self-directed engineering journey.
          </p>
        </motion.div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Column 1: Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-2xl bg-[var(--bg-card,#121212)] border border-[#242424] space-y-6 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-[#202020] mb-6">
                <div className="p-2.5 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-normal text-white">
                    Education
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#777777]">
                    Academic Journey
                  </p>
                </div>
              </div>

              {/* Main Institution */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#161616] border border-[#222222]">
                  <div className="flex items-center justify-between text-xs font-mono text-[#888888] mb-1">
                    <span>{educationInfo.level}</span>
                    <span>{educationInfo.location}</span>
                  </div>
                  <h4 className="text-base font-medium text-white">
                    {educationInfo.institution}
                  </h4>
                  <p className="text-xs text-[#777777] mt-1 leading-relaxed">
                    {educationInfo.description}
                  </p>
                </div>

                {/* Self Learning */}
                <div className="p-4 rounded-xl bg-[#161616] border border-[#222222]">
                  <div className="text-xs font-mono text-[#888888] mb-2 uppercase tracking-wider">
                    Self-Directed Learning
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {educationInfo.selfLearningAreas.map((area) => (
                      <span
                        key={area}
                        className="px-2.5 py-1 text-xs rounded-md bg-[#202020] border border-[#2C2C2C] text-neutral-300"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1C1C1C] text-[11px] font-mono text-[#666666] flex items-center justify-between">
              <span>Status: Active Exploration</span>
              <span>{educationInfo.location}</span>
            </div>
          </motion.div>

          {/* Column 2: Work Experience & Trajectory */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl bg-[var(--bg-card,#121212)] border border-[#242424] space-y-6 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-[#202020] mb-6">
                <div className="p-2.5 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-white">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-normal text-white">
                    Work Experience
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#777777]">
                    Practical Development
                  </p>
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#161616] border border-[#222222]">
                  <div className="flex items-center justify-between text-xs font-mono text-[#888888] mb-1">
                    <span>{workExperienceInfo.period}</span>
                    <span className="text-neutral-400">{workExperienceInfo.type}</span>
                  </div>
                  <h4 className="text-base font-medium text-white">
                    {workExperienceInfo.role}
                  </h4>
                  <p className="text-xs text-[#777777] mt-1 leading-relaxed">
                    {workExperienceInfo.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#161616] border border-[#222222]">
                  <div className="text-xs font-mono text-[#888888] mb-2 uppercase tracking-wider">
                    Engineering Capabilities
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300 pt-1">
                    {workExperienceInfo.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1C1C1C] text-[11px] font-mono text-[#666666] flex items-center justify-between">
              <span>Methodology: Utilitarian Code</span>
              <span>Open Source</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
