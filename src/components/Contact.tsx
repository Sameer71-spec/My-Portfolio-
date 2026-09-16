import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight, Send, Github, Edit2 } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export function Contact() {
  const { personalInfo, isAuthenticated, isEditModeActive, openCMS } = usePortfolio();

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showComposer, setShowComposer] = useState(false);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleSendMail = (e: FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      subject || 'Collaboration inquiry with Sameer'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 relative bg-[var(--bg-primary,#0A0A0A)] border-t border-[#1C1C1C] transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4 relative"
        >
          {isAuthenticated && isEditModeActive && (
            <button
              type="button"
              onClick={() => openCMS('content')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 shadow hover:bg-emerald-900 transition-colors mb-2"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Contact Info</span>
            </button>
          )}

          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            Reach Out to Me
          </h2>
          <p className="text-sm sm:text-base text-[#888888] font-light">
            Have a project, requirement, or collaboration in mind? Let's build together.
          </p>
        </motion.div>

        {/* 3 Columns for Address, Email, Phone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          
          {/* 1. Address Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-2xl bg-[var(--bg-card,#121212)] border border-[#222222] flex flex-col items-center justify-center space-y-3 shadow-xl"
          >
            <div className="p-3 rounded-full bg-[#1A1A1A] border border-[#2C2C2C] text-white mb-1">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="font-serif-display text-lg text-white font-normal">
              Address
            </div>
            <div className="text-sm text-[#888888] font-light">
              {personalInfo.location || 'Karachi, Pakistan'}
            </div>
            <span className="text-[11px] font-mono text-[#666666]">
              Timezone: GMT+5 (PKT)
            </span>
          </motion.div>

          {/* 2. Email Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-2xl bg-[var(--bg-card,#121212)] border border-[#222222] flex flex-col items-center justify-center space-y-3 group shadow-xl"
          >
            <div className="p-3 rounded-full bg-[#1A1A1A] border border-[#2C2C2C] text-white mb-1">
              <Mail className="w-5 h-5" />
            </div>
            <div className="font-serif-display text-lg text-white font-normal">
              Email
            </div>
            <a
              href={personalInfo.emailMailto || `mailto:${personalInfo.email}`}
              className="text-sm text-[#888888] hover:text-white transition-colors break-all"
            >
              {personalInfo.email}
            </a>
            <button
              type="button"
              onClick={() => copyToClipboard(personalInfo.email, 'email')}
              className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              {copiedField === 'email' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy email</span>
                </>
              )}
            </button>
          </motion.div>

          {/* 3. Phone Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-8 rounded-2xl bg-[var(--bg-card,#121212)] border border-[#222222] flex flex-col items-center justify-center space-y-3 shadow-xl"
          >
            <div className="p-3 rounded-full bg-[#1A1A1A] border border-[#2C2C2C] text-white mb-1">
              <Phone className="w-5 h-5" />
            </div>
            <div className="font-serif-display text-lg text-white font-normal">
              Phone
            </div>
            <a
              href={personalInfo.phoneTel || `tel:${personalInfo.phone}`}
              className="text-sm text-[#888888] hover:text-white transition-colors"
            >
              {personalInfo.phoneFormatted || personalInfo.phone}
            </a>
            <button
              type="button"
              onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
              className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              {copiedField === 'phone' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy phone</span>
                </>
              )}
            </button>
          </motion.div>

        </div>

        {/* Center Pill Button - "Let's collaborate ↗" */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              id="lets-collaborate-btn"
              type="button"
              onClick={() => setShowComposer(!showComposer)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-xl active:scale-95"
            >
              <span>Let's collaborate</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold text-white bg-[#141414] hover:bg-[#202020] border border-[#2E2E2E] transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub / {personalInfo.githubUsername || personalInfo.name}</span>
            </a>
          </div>

          {/* Collapsible Direct Message Composer */}
          {showComposer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-[#121212] border border-[#262626] shadow-2xl mt-4"
            >
              <form onSubmit={handleSendMail} className="space-y-4 text-left">
                <h3 className="font-serif-display text-lg text-white font-normal text-center mb-4">
                  Send Direct Message to {personalInfo.name}
                </h3>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Full Stack Application or AI Agent Project"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-[#888888] mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe what you'd like to build..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via Email Client</span>
                </button>
              </form>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
