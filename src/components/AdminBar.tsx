import { Settings, Plus, LogOut, Eye, EyeOff, Sparkles, Sliders, Film } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export function AdminBar() {
  const {
    isAuthenticated,
    isEditModeActive,
    toggleEditMode,
    openCMS,
    openEditProjectModal,
    logout,
  } = usePortfolio();

  if (!isAuthenticated) return null;

  return (
    <aside
      aria-label="Admin controls"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[99980] max-w-full px-4"
    >
      <div className="flex items-center gap-2 sm:gap-3 px-4 py-2.5 rounded-full bg-[#121212]/95 border border-[#333333] shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-md text-white text-xs font-mono">
        {/* Status indicator */}
        <div className="flex items-center gap-2 pr-2 border-r border-[#262626]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white uppercase hidden sm:inline">Owner Mode</span>
        </div>

        {/* Live edit quick helper toggler */}
        <button
          type="button"
          onClick={toggleEditMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
            isEditModeActive
              ? 'bg-white/10 text-white border border-white/20'
              : 'text-[#888888] hover:text-white'
          }`}
          title="Toggle inline edit pencil indicators on sections"
        >
          {isEditModeActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">Edit Hints</span>
        </button>

        {/* Add Project Quick Button */}
        <button
          type="button"
          onClick={() => openEditProjectModal(null)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F1F1F] hover:bg-[#282828] text-neutral-200 border border-[#333333] transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>New Project</span>
        </button>

        {/* Upload Custom Design/Animation Button */}
        <button
          type="button"
          onClick={() => openCMS('designs')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F1F1F] hover:bg-[#282828] text-neutral-200 border border-[#333333] transition-colors"
          title="Upload and browse your custom designs and animations"
        >
          <Film className="w-3.5 h-3.5 text-sky-400" />
          <span>Upload Art</span>
        </button>

        {/* Open Customizer Studio */}
        <button
          type="button"
          onClick={() => openCMS('content')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-all shadow"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Customizer</span>
        </button>

        {/* Logout button */}
        <button
          type="button"
          onClick={logout}
          className="p-1.5 rounded-full text-[#777777] hover:text-red-400 hover:bg-[#1A1A1A] transition-colors"
          title="Log out from Owner Mode"
          aria-label="Log out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
