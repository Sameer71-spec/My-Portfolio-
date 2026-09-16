import { ArrowUp, Github, Mail, Phone, Lock, Sliders } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export function Footer() {
  const { personalInfo, isAuthenticated, openLoginModal, openCMS, hasUnreadSecurityAlert } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[var(--bg-primary,#0A0A0A)] border-t border-[#1C1C1C] py-12 text-[#888888] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1A1A1A]">
          {/* Monogram / Identity */}
          <div className="text-center md:text-left space-y-1">
            <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-widest text-white uppercase">
              {personalInfo.name}
            </span>
            <p className="text-xs text-[#777777] font-light">
              {personalInfo.professionalTitle || 'Full Stack Developer & AI Systems Builder'}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-xs font-mono flex-wrap justify-center">
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-[#333333]">•</span>
            <a
              href={personalInfo.emailMailto || `mailto:${personalInfo.email}`}
              className="text-[#888888] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
            <span className="text-[#333333]">•</span>
            <a
              href={personalInfo.phoneTel || `tel:${personalInfo.phone}`}
              className="text-[#888888] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Phone</span>
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#666666]">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
            
            {/* Owner portal trigger in footer */}
            <button
              type="button"
              onClick={isAuthenticated ? () => openCMS('content') : openLoginModal}
              className="relative inline-flex items-center gap-1 text-[11px] text-neutral-600 hover:text-neutral-300 transition-colors"
              title={isAuthenticated ? 'Open Studio Customizer' : 'Owner Login'}
            >
              {isAuthenticated ? <Sliders className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3" />}
              <span>{isAuthenticated ? 'Studio Active' : 'Owner'}</span>
              {hasUnreadSecurityAlert && (
                <span className="flex h-2 w-2 ml-0.5">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span>{personalInfo.location || 'Karachi, Pakistan'}</span>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#888888] hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
