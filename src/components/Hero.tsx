import { useState } from 'react';
import { ArrowUpRight, Edit2, Camera, Sparkles, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export function Hero() {
  const {
    personalInfo,
    animationSettings,
    isAuthenticated,
    isEditModeActive,
    openCMS,
    customDesigns,
    setHeroVisual,
  } = usePortfolio();

  const [hasImageError, setHasImageError] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const topOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Badge rotation class based on animation settings
  const getBadgeSpinClass = () => {
    switch (animationSettings.badgeSpinSpeed) {
      case 'fast':
        return 'animate-[spin_5s_linear_infinite]';
      case 'normal':
        return 'animate-[spin_10s_linear_infinite]';
      case 'paused':
        return '';
      case 'slow':
      default:
        return 'animate-spin-slow';
    }
  };

  const activeCustomDesign =
    personalInfo.heroVisualType === 'custom_design' && personalInfo.activeHeroDesignId
      ? customDesigns.find((d) => d.id === personalInfo.activeHeroDesignId)
      : null;

  const currentPortrait = hasImageError
    ? personalInfo.portraitFallback
    : personalInfo.portraitLocal || personalInfo.portraitFallback;

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[var(--bg-primary,#0A0A0A)] overflow-hidden transition-colors duration-300"
    >
      {/* Subtle radial ambient gradient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Welcome Heading & Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8 relative group/hero"
          >
            {/* Quick Edit Overlay for Admin */}
            {isAuthenticated && isEditModeActive && (
              <button
                type="button"
                onClick={() => openCMS('content')}
                className="absolute -top-7 left-0 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 shadow hover:bg-emerald-900 transition-colors"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit Hero Text</span>
              </button>
            )}

            <div className="space-y-4">
              <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-white leading-[1.08]">
                {personalInfo.heroHeadingLine1 || 'Welcome to'} <br />
                <span className="italic font-editorial-italic font-normal">
                  {personalInfo.heroHeadingLine2 || 'My Developer'}
                </span>{' '}
                <br />
                {personalInfo.heroHeadingLine3 || 'Portfolio'}
              </h1>
            </div>

            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#141414] border border-[#2E2E2E] shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-white uppercase">
                {personalInfo.heroBadgeText || `${personalInfo.name} / ${personalInfo.professionalTitle}`}
              </span>
            </motion.div>

            {/* Brief introductory quote / description */}
            <p className="text-sm sm:text-base text-[#A3A3A3] max-w-lg leading-relaxed font-light">
              {personalInfo.heroDescription}
            </p>

            {/* Direct Quick Action */}
            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-black bg-white hover:bg-neutral-200 transition-all shadow-lg active:scale-95"
              >
                <span>Discuss a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-[#141414] hover:bg-[#202020] border border-[#2E2E2E] transition-all"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#888888]" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Architectural Arch Portrait & Circular Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              
              {/* The Iconic Architectural Arch Frame */}
              <div
                className={`relative w-full aspect-[3/4] arch-hero-portrait bg-[#161616] border border-[#2E2E2E] overflow-hidden shadow-2xl group transition-all duration-500 ${
                  animationSettings.cardHoverZoom ? 'hover:scale-[1.02]' : ''
                }`}
              >
                {/* Visual Content: Custom Design/Animation OR Portrait */}
                {activeCustomDesign ? (
                  activeCustomDesign.mediaType === 'video' ? (
                    <video
                      src={activeCustomDesign.mediaUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  ) : (
                    <img
                      src={activeCustomDesign.mediaUrl}
                      alt={activeCustomDesign.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-all duration-700 ease-out bg-[#0D0D0D]"
                    />
                  )
                ) : (
                  <img
                    src={currentPortrait}
                    alt={personalInfo.fullName}
                    onError={() => setHasImageError(true)}
                    className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                )}

                {/* Subtle dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Micro Label inside Arch bottom */}
                <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {activeCustomDesign ? activeCustomDesign.title : (personalInfo.location || 'Karachi, Pakistan')}
                  </span>
                </div>

                {/* Top Quick Actions */}
                <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5">
                  {/* Quick Toggle between Portrait and Custom Design */}
                  {customDesigns.length > 0 && (
                    <button
                      type="button"
                      title={activeCustomDesign ? 'Switch to Portrait photo' : 'Switch to Custom Design / Animation'}
                      onClick={() => {
                        if (activeCustomDesign) {
                          setHeroVisual('portrait', undefined);
                        } else {
                          setHeroVisual('custom_design', customDesigns[0].id);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-white bg-black/80 backdrop-blur-md border border-white/30 shadow hover:bg-white hover:text-black transition-colors"
                    >
                      {activeCustomDesign ? (
                        <>
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Show Photo</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Show Design</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Admin Quick Photo/Design Change Button */}
                  {isAuthenticated && isEditModeActive && (
                    <button
                      type="button"
                      onClick={() => openCMS(activeCustomDesign ? 'designs' : 'photo')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono text-white bg-black/80 backdrop-blur-md border border-white/30 shadow hover:bg-white hover:text-black transition-colors"
                      title="Manage in Studio"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Floating Circular Badge */}
              <motion.button
                type="button"
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-20 group flex items-center justify-center cursor-pointer"
                aria-label="Work with me today"
              >
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#141414] border border-[#333333] shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center p-2 hover:border-white transition-colors duration-300">
                  
                  {/* Rotating Circular Text SVG */}
                  <svg
                    className={`absolute inset-0 w-full h-full pointer-events-none ${getBadgeSpinClass()}`}
                    viewBox="0 0 100 100"
                  >
                    <path
                      id="textCircle"
                      d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                      fill="none"
                    />
                    <text className="text-[8.5px] uppercase tracking-[0.24em] fill-neutral-300 font-semibold">
                      <textPath href="#textCircle" startOffset="0%">
                        • WORK WITH ME TODAY • CONNECT •
                      </textPath>
                    </text>
                  </svg>

                  {/* Center Arrow Icon */}
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.button>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
