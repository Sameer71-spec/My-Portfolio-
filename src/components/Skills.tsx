import {
  Code2,
  Layout,
  Server,
  Bot,
  Database,
  Cpu,
  Sparkles,
  Edit2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

function getCategoryIcon(name: string) {
  switch (name) {
    case 'Code2':
      return <Code2 className="w-4 h-4 text-white" />;
    case 'Layout':
      return <Layout className="w-4 h-4 text-white" />;
    case 'Server':
      return <Server className="w-4 h-4 text-white" />;
    case 'Bot':
      return <Bot className="w-4 h-4 text-white" />;
    case 'Database':
      return <Database className="w-4 h-4 text-white" />;
    case 'Cpu':
      return <Cpu className="w-4 h-4 text-white" />;
    default:
      return <Sparkles className="w-4 h-4 text-white" />;
  }
}

export function Skills() {
  const { skillCategories, isAuthenticated, isEditModeActive, openCMS } = usePortfolio();

  return (
    <section
      id="skills"
      className="py-20 lg:py-28 relative bg-[var(--bg-primary,#0A0A0A)] border-t border-[#1C1C1C] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
              <span>Edit Tech Stack</span>
            </button>
          )}

          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            Technical Stack
          </h2>
          <p className="text-sm sm:text-base text-[#888888] font-light">
            Core technologies and frameworks used for full-stack and AI development.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="p-6 rounded-2xl bg-[var(--bg-card,#121212)] border border-[#222222] hover:border-neutral-500 transition-colors shadow-lg"
            >
              <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#1E1E1E]">
                <div className="p-2 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A]">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <h3 className="font-serif-display text-lg font-normal text-white">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#181818] border border-[#262626] text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
