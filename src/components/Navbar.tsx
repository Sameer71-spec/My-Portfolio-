import { useState, useEffect, type MouseEvent } from 'react';
import { Menu, X, ArrowUpRight, Lock, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Who is Sameer?', href: '#about' },
  { name: 'Background', href: '#background' },
  { name: 'My Work', href: '#work' },
  { name: 'Designs & Motion', href: '#designs' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { personalInfo, isAuthenticated, openLoginModal, openCMS, hasUnreadSecurityAlert } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#222222] py-3.5 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2"
        >
          <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-widest text-white group-hover:text-neutral-300 transition-colors uppercase">
            {personalInfo.name}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs tracking-wider uppercase font-medium text-[#A3A3A3] hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA - Work with me & Discreet Owner Gate */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs tracking-wider uppercase font-semibold text-white bg-[#1A1A1A] hover:bg-white hover:text-black border border-[#333333] transition-all duration-300 shadow-sm"
          >
            <span>Work with me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Discreet Owner Keyhole Icon */}
          <button
            type="button"
            onClick={isAuthenticated ? () => openCMS('content') : openLoginModal}
            className={`relative p-2 rounded-full transition-all ${
              isAuthenticated
                ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 hover:bg-emerald-900/50'
                : 'text-[#555555] hover:text-white hover:bg-[#1A1A1A]'
            }`}
            title={
              isAuthenticated
                ? 'Open Customizer Studio (Owner Active)'
                : 'Owner Portal Access (Shortcut: Ctrl+Shift+A)'
            }
            aria-label="Owner access"
          >
            {isAuthenticated ? <Sliders className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            {hasUnreadSecurityAlert && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5" title="New Security Activity Detected">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-black"></span>
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button & Owner Icon */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={isAuthenticated ? () => openCMS('content') : openLoginModal}
            className="relative p-2 rounded-lg text-[#666666] hover:text-white"
            aria-label="Owner access"
          >
            <Lock className="w-4 h-4" />
            {hasUnreadSecurityAlert && (
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-white hover:bg-[#1A1A1A] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#111111] border-b border-[#262626] overflow-hidden"
          >
            <div className="px-6 py-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-sm font-medium uppercase tracking-wider text-[#A3A3A3] hover:text-white py-1.5"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-[#262626] flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToContact();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-black bg-white"
                >
                  <span>Work with me today</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (isAuthenticated) {
                      openCMS('content');
                    } else {
                      openLoginModal();
                    }
                  }}
                  className="w-full py-2 rounded-full text-xs font-mono uppercase text-[#888888] hover:text-white bg-[#181818]"
                >
                  {isAuthenticated ? 'Open Customizer (Admin Active)' : 'Owner Portal Login'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
