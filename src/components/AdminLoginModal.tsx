import { useState, type FormEvent } from 'react';
import { Lock, KeyRound, Eye, EyeOff, X, ShieldAlert, Sparkles, Lightbulb, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export function AdminLoginModal() {
  const {
    isLoginModalOpen,
    closeLoginModal,
    login,
    passwordHint,
    hasBackupPassword,
    recordSecurityIncident,
  } = usePortfolio();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const success = login(password);
      setIsSubmitting(false);
      if (!success) {
        const nextFailed = failedAttempts + 1;
        setFailedAttempts(nextFailed);
        if (nextFailed >= 3) {
          // Log security activity incident automatically
          recordSecurityIncident(
            nextFailed,
            `Intruder attempt detected: ${nextFailed} consecutive incorrect passcodes entered.`
          );

          setErrorMessage(
            hasBackupPassword
              ? 'Incorrect passcode (3 failed attempts). Activity logged & your secret hint is revealed below! You can also enter your Backup Password.'
              : 'Incorrect passcode (3 failed attempts). Activity logged & your secret hint is revealed below!'
          );
        } else {
          setErrorMessage(`Incorrect passcode. Attempt ${nextFailed} of 3 (Hint will be unlocked after 3 failed attempts).`);
        }
      } else {
        setFailedAttempts(0);
        setPassword('');
      }
    }, 250);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLoginModal}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Card */}
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-md rounded-2xl bg-[#121212] border border-[#282828] shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-6 sm:p-8 text-white z-10 space-y-6"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLoginModal}
            className="absolute top-5 right-5 p-2 rounded-xl text-[#777777] hover:text-white hover:bg-[#1C1C1C] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] border border-[#2C2C2C] text-white flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-serif-display text-2xl font-normal text-white">
              Owner Access Portal
            </h2>
            <p className="text-xs text-[#888888] font-light max-w-xs mx-auto leading-relaxed">
              Enter your master passcode or backup recovery code to edit text, styles, background, animations, projects, and photos.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs uppercase tracking-wider font-mono text-[#888888]">
                  Passcode / Recovery Code
                </label>
                {failedAttempts > 0 && failedAttempts < 3 && (
                  <span className="text-[10px] font-mono text-amber-400/80">
                    Failed tries: {failedAttempts}/3
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#666666]">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Enter passcode or backup code..."
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#181818] border border-[#2A2A2A] text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#777777] hover:text-white"
                  aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Hint Box revealed after 3 failed attempts */}
            {failedAttempts >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="p-3.5 rounded-xl bg-gradient-to-br from-amber-950/40 to-[#181818] border border-amber-500/40 text-amber-200 text-xs space-y-2"
              >
                <div className="flex items-center gap-2 font-mono font-medium text-amber-300">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
                  <span>Your Password Hint (Revealed):</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/50 border border-amber-800/40 font-mono text-xs text-amber-100 select-text break-words">
                  {passwordHint || 'Default master passcode: sameer@2026'}
                </div>
                {hasBackupPassword && (
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-300/90 font-mono pt-1">
                    <Key className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>You also have a Backup Passcode enabled. Either code will unlock access.</span>
                  </div>
                )}
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-950/40 border border-red-800/50 flex items-center gap-2.5 text-xs text-red-300"
              >
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !password.trim()}
              className="w-full py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Unlock Admin Customizer</span>
                </>
              )}
            </button>
          </form>

          {/* Helper Hint */}
          <div className="pt-2 border-t border-[#1C1C1C] text-center space-y-1">
            <p className="text-[11px] font-mono text-[#666666]">
              Default Master Passcode: <span className="text-neutral-300 bg-[#1A1A1A] px-1.5 py-0.5 rounded border border-[#2E2E2E]">sameer@2026</span>
            </p>
            <p className="text-[10px] text-[#555555]">
              (Hint automatically triggers if 3 wrong passcodes are entered)
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
