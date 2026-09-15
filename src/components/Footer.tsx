import { ArrowUp, Github, Mail, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1C1C1C] py-12 text-[#888888]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1A1A1A]">
          {/* Monogram / Identity */}
          <div className="text-center md:text-left space-y-1">
            <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-widest text-white uppercase">
              {PERSONAL_INFO.name}
            </span>
            <p className="text-xs text-[#777777] font-light">
              Full Stack Developer & AI Systems Builder
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-[#333333]">•</span>
            <a
              href={PERSONAL_INFO.emailMailto}
              className="text-[#888888] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
            <span className="text-[#333333]">•</span>
            <a
              href={PERSONAL_INFO.phoneTel}
              className="text-[#888888] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Phone</span>
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#666666]">
          <div>
            © 2026 {PERSONAL_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Karachi, Pakistan</span>
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
