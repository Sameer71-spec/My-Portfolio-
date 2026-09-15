import { GraduationCap, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { EDUCATION_INFO, DEVELOPMENT_JOURNEY_INFO } from '../data/portfolioData';

export function JourneyEducation() {
  return (
    <section id="background" className="py-20 lg:py-28 relative bg-[#0A0A0A] border-t border-[#1C1C1C]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Matching Canva "My Background" */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            My Background
          </h2>
          <p className="text-sm sm:text-base text-[#888888] font-light">
            Academic foundation and self-directed engineering journey.
          </p>
        </motion.div>

        {/* Two-Column Grid matching Canva template */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Column 1: Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-2xl bg-[#121212] border border-[#242424] space-y-6 flex flex-col justify-between"
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
                    <span>{EDUCATION_INFO.level}</span>
                    <span>{EDUCATION_INFO.location}</span>
                  </div>
                  <h4 className="text-base font-medium text-white">
                    {EDUCATION_INFO.institution}
                  </h4>
                  <p className="text-xs text-[#777777] mt-1">
                    Foundational academics with deep focus on mathematics and computational logic.
                  </p>
                </div>

                {/* Self Learning */}
                <div className="p-4 rounded-xl bg-[#161616] border border-[#222222]">
                  <div className="text-xs font-mono text-[#888888] mb-2 uppercase tracking-wider">
                    Self-Directed Learning
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {EDUCATION_INFO.selfLearningAreas.map((area) => (
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
              <span>Karachi, PK</span>
            </div>
          </motion.div>

          {/* Column 2: Work Experience & Technical Trajectory */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl bg-[#121212] border border-[#242424] space-y-6 flex flex-col justify-between"
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
                    <span>2024 — Present</span>
                    <span className="text-neutral-400">Independent</span>
                  </div>
                  <h4 className="text-base font-medium text-white">
                    Independent Developer & AI Architect
                  </h4>
                  <p className="text-xs text-[#777777] mt-1 leading-relaxed">
                    Building utilitarian software, full-stack applications, and agentic AI architectures including CareerPilot-AI and quick-temp-mail.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#161616] border border-[#222222]">
                  <div className="text-xs font-mono text-[#888888] mb-1">
                    Engineering Capabilities
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300 pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                      <span>Python & FastAPI</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                      <span>React & TypeScript</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                      <span>LangGraph Agents</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                      <span>Vector DBs & RAG</span>
                    </div>
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
