import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Play,
  Maximize2,
  X,
  Plus,
  Upload,
  Layers,
  Film,
  Eye,
  Check,
  Tag,
  ArrowUpRight,
  Monitor,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CustomDesign } from '../types';

export function DesignShowcase() {
  const {
    customDesigns,
    personalInfo,
    updatePersonalInfo,
    setHeroVisual,
    isAuthenticated,
    isEditModeActive,
    openCMS,
  } = usePortfolio();

  const [activeFilter, setActiveFilter] = useState<'all' | 'design' | 'animation'>('all');
  const [selectedDesign, setSelectedDesign] = useState<CustomDesign | null>(null);

  // If hidden in settings and user is not admin, do not render
  if (personalInfo.showDesignsSection === false && !isAuthenticated) {
    return null;
  }

  const filteredDesigns = customDesigns.filter((d) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'animation') return d.type === 'animation' || d.mediaType === 'gif' || d.mediaType === 'video';
    return d.type === 'design' || d.type === 'vector' || d.type === '3d';
  });

  return (
    <section
      id="designs"
      className="py-24 sm:py-32 bg-[var(--bg-secondary,#121212)] relative border-t border-[var(--border-color,#262626)] transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-white/[0.015] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#2B2B2B] text-xs font-mono text-[#A3A3A3]">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>CUSTOM ARCHIVE & MOTION</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-normal text-white tracking-tight">
              Designs & <span className="italic font-editorial-italic font-normal">Animations</span>
            </h2>
            <p className="text-sm sm:text-base text-[#888888] font-light leading-relaxed">
              Custom-engineered interface layouts, autonomous system topology graphs, vector motion concepts, and interactive visual architecture.
            </p>
          </div>

          {/* Right Action: Filters & Admin Upload CTA */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Pills */}
            <div className="flex p-1 bg-[#161616] border border-[#2B2B2B] rounded-full text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-white text-black font-semibold shadow'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                All ({customDesigns.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('design')}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  activeFilter === 'design'
                    ? 'bg-white text-black font-semibold shadow'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                Designs
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('animation')}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  activeFilter === 'animation'
                    ? 'bg-white text-black font-semibold shadow'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                Animations
              </button>
            </div>

            {/* Owner Upload Button */}
            {isAuthenticated && isEditModeActive && (
              <button
                type="button"
                onClick={() => openCMS('designs')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium text-white bg-emerald-950/80 border border-emerald-700/70 hover:bg-emerald-900 transition-colors shadow-sm"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Upload Design/Motion</span>
              </button>
            )}
          </div>
        </div>

        {/* Designs Bento Grid */}
        {filteredDesigns.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#141414] border border-[#262626]">
            <Layers className="w-10 h-10 text-[#555555] mx-auto mb-3" />
            <p className="text-sm font-mono text-[#888888]">No items found in this category.</p>
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => openCMS('designs')}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-white text-black font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>Upload First Creation</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDesigns.map((item, index) => {
              const isHeroActive =
                personalInfo.heroVisualType === 'custom_design' &&
                personalInfo.activeHeroDesignId === item.id;
              const isAnim = item.type === 'animation' || item.mediaType === 'gif' || item.mediaType === 'video';

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative rounded-2xl bg-[var(--bg-card,#161616)] border border-[var(--border-color,#262626)] overflow-hidden shadow-lg hover:border-[#444444] transition-all duration-300 flex flex-col"
                >
                  {/* Media Visual Container */}
                  <div
                    onClick={() => setSelectedDesign(item)}
                    className="relative w-full aspect-[4/3] bg-[#0E0E0E] overflow-hidden cursor-pointer flex items-center justify-center"
                  >
                    {item.mediaType === 'video' ? (
                      <video
                        src={item.mediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity" />

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-white bg-black/70 backdrop-blur-md border border-white/15">
                        {isAnim ? (
                          <>
                            <Film className="w-3 h-3 text-emerald-400" />
                            <span>Animation</span>
                          </>
                        ) : (
                          <>
                            <Layers className="w-3 h-3 text-sky-400" />
                            <span>Design</span>
                          </>
                        )}
                      </span>

                      {isHeroActive && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-300 bg-emerald-950/90 border border-emerald-500/50">
                          <Check className="w-3 h-3" />
                          <span>Active in Hero</span>
                        </span>
                      )}
                    </div>

                    {/* Hover Expand Icon */}
                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Info Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#888888]">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#555555]">
                          {item.createdAt}
                        </span>
                      </div>

                      <h3
                        onClick={() => setSelectedDesign(item)}
                        className="font-serif-display text-lg text-white font-medium group-hover:text-white cursor-pointer transition-colors"
                      >
                        {item.title}
                      </h3>

                      <p className="text-xs text-[#888888] line-clamp-2 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Tags & Action Footer */}
                    <div className="pt-3 border-t border-[#222222] flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
                        {item.tags?.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1E1E1E] text-[#AAAAAA] border border-[#2D2D2D]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Admin Action: Set as Hero Visual */}
                        {isAuthenticated && isEditModeActive && (
                          <button
                            type="button"
                            title={isHeroActive ? 'Currently active in Hero Arch' : 'Set as Hero Arch Visual'}
                            onClick={() => {
                              if (isHeroActive) {
                                setHeroVisual('portrait', undefined);
                              } else {
                                setHeroVisual('custom_design', item.id);
                              }
                            }}
                            className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
                              isHeroActive
                                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600'
                                : 'bg-[#1F1F1F] text-[#888888] hover:text-white border border-[#2E2E2E]'
                            }`}
                          >
                            <Monitor className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setSelectedDesign(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-white hover:bg-white hover:text-black transition-colors"
                        >
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox / High-Res Preview Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDesign(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-lg"
              aria-hidden="true"
            />

            {/* Modal Dialog */}
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row bg-[#121212] border border-[#2B2B2B] rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedDesign(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-white hover:text-black text-white border border-white/20 transition-colors"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left/Top Media Display */}
              <div className="md:w-3/5 bg-[#090909] p-4 sm:p-6 flex items-center justify-center min-h-[300px] md:min-h-[500px] border-b md:border-b-0 md:border-r border-[#222222]">
                {selectedDesign.mediaType === 'video' ? (
                  <video
                    src={selectedDesign.mediaUrl}
                    autoPlay
                    controls
                    loop
                    className="max-h-[70vh] max-w-full rounded-lg object-contain shadow-lg"
                  />
                ) : (
                  <img
                    src={selectedDesign.mediaUrl}
                    alt={selectedDesign.title}
                    className="max-h-[70vh] max-w-full rounded-lg object-contain shadow-lg"
                  />
                )}
              </div>

              {/* Right/Bottom Meta & Controls */}
              <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800">
                      {selectedDesign.type}
                    </span>
                    <span className="text-xs font-mono text-[#888888]">
                      {selectedDesign.category}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-2xl sm:text-3xl text-white font-normal">
                    {selectedDesign.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed font-light">
                    {selectedDesign.description}
                  </p>

                  {/* Tags */}
                  {selectedDesign.tags && selectedDesign.tags.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block mb-2">
                        Tags & Architecture
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedDesign.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded text-xs font-mono bg-[#1C1C1C] border border-[#2D2D2D] text-[#CCCCCC]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-[#222222] space-y-2.5">
                  {isAuthenticated && (
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          const isHero =
                            personalInfo.heroVisualType === 'custom_design' &&
                            personalInfo.activeHeroDesignId === selectedDesign.id;
                          if (isHero) {
                            setHeroVisual('portrait', undefined);
                          } else {
                            setHeroVisual('custom_design', selectedDesign.id);
                          }
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-medium transition-colors flex items-center justify-center gap-2 ${
                          personalInfo.heroVisualType === 'custom_design' &&
                          personalInfo.activeHeroDesignId === selectedDesign.id
                            ? 'bg-emerald-900/70 text-emerald-300 border border-emerald-600'
                            : 'bg-white text-black hover:bg-neutral-200'
                        }`}
                      >
                        <Monitor className="w-4 h-4" />
                        <span>
                          {personalInfo.heroVisualType === 'custom_design' &&
                          personalInfo.activeHeroDesignId === selectedDesign.id
                            ? 'Active as Hero Arch (Click to reset)'
                            : 'Set as Hero Arch Visual'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDesign(null);
                          openCMS('designs');
                        }}
                        className="w-full py-2 px-4 rounded-xl text-xs font-mono text-[#888888] hover:text-white bg-[#181818] border border-[#2A2A2A] hover:bg-[#202020] transition-colors"
                      >
                        Manage in CMS Studio
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#666666] pt-1">
                    <span>Added {selectedDesign.createdAt}</span>
                    <span>Created by Sameer</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
