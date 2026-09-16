import { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Shield,
  Key,
  Lightbulb,
  Sparkles,
  Layers,
  Palette,
  Image as ImageIcon,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Laptop,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export function AdminGuideTab() {
  const { personalInfo, hasBackupPassword, passwordHint } = usePortfolio();
  const [activeSection, setActiveSection] = useState<string>('all');

  const handlePrintPDF = () => {
    // Create a dedicated clean print window with proper PDF styling
    const printContent = document.getElementById('printable-owner-guide');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Sameer Portfolio - Official Owner Guide & Documentation (PDF)</title>
          <style>
            @page {
              size: A4;
              margin: 18mm 16mm 18mm 16mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              color: #111111;
              background: #ffffff;
              line-height: 1.6;
              font-size: 11pt;
              margin: 0;
              padding: 10px;
            }
            h1, h2, h3, h4 {
              color: #050505;
              font-family: Georgia, "Playfair Display", serif;
              margin-top: 1.2em;
              margin-bottom: 0.4em;
              page-break-after: avoid;
            }
            h1 { font-size: 24pt; border-bottom: 2px solid #000; padding-bottom: 8px; margin-top: 0; }
            h2 { font-size: 16pt; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-top: 24px; color: #1a1a1a; }
            h3 { font-size: 13pt; margin-top: 16px; color: #333; }
            p { margin: 0.5em 0; }
            code, pre, .mono {
              font-family: "Courier New", Courier, monospace;
              background: #f4f4f5;
              padding: 2px 5px;
              border-radius: 4px;
              font-size: 9.5pt;
              border: 1px solid #e4e4e7;
            }
            .badge {
              display: inline-block;
              padding: 2px 8px;
              border-radius: 4px;
              background: #000;
              color: #fff;
              font-size: 8pt;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .callout {
              border-left: 4px solid #059669;
              background: #f0fdf4;
              padding: 10px 14px;
              margin: 14px 0;
              border-radius: 0 6px 6px 0;
            }
            .callout-warning {
              border-left-4px solid #d97706;
              background: #fffbeb;
              padding: 10px 14px;
              margin: 14px 0;
              border-radius: 0 6px 6px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 14px 0;
              font-size: 10pt;
            }
            th, td {
              border: 1px solid #d4d4d8;
              padding: 8px 10px;
              text-align: left;
            }
            th {
              background: #f4f4f5;
              font-weight: bold;
            }
            .footer {
              margin-top: 40px;
              padding-top: 12px;
              border-top: 1px solid #e4e4e7;
              font-size: 9pt;
              color: #666;
              display: flex;
              justify-content: space-between;
            }
            .step-box {
              border: 1px solid #e5e7eb;
              border-radius: 6px;
              padding: 12px;
              margin-bottom: 12px;
              background: #fafafa;
              page-break-inside: avoid;
            }
            .step-title {
              font-weight: bold;
              color: #111;
              margin-bottom: 4px;
            }
          </style>
        </head>
        <body>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 15px;">
            <span class="badge">CONFIDENTIAL & OFFICIAL</span>
            <span style="font-size: 9pt; color: #666; font-family: monospace;">PORTFOLIO CMS MANUAL v2.5</span>
          </div>
          ${printContent.innerHTML}
          <div class="footer">
            <span>Portfolio System Owner: Sameer</span>
            <span>Generated from Sameer Interactive Portfolio Studio</span>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-6">
      {/* Top Banner & PDF Trigger */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1c1c1c] to-[#141414] border border-[#2a2a2a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-[10px] font-mono uppercase tracking-wider">
            <BookOpen className="w-3 h-3" />
            <span>Complete Owner Handbook</span>
          </div>
          <h3 className="font-serif-display text-2xl text-white">
            Portfolio Administration & Customization Guide
          </h3>
          <p className="text-xs text-[#888888] font-mono max-w-xl">
            A comprehensive manual explaining every control: passcode recovery, custom designs, live editing, backups, themes, and animations.
          </p>
        </div>

        {/* Action Button: Download / Print as PDF */}
        <button
          type="button"
          onClick={handlePrintPDF}
          className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex items-center gap-2 whitespace-nowrap"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Filter / Quick Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        {[
          { id: 'all', label: 'All Modules' },
          { id: 'sec-access', label: '1. Access & Shortcuts' },
          { id: 'sec-security', label: '2. Passcodes & Hints' },
          { id: 'sec-content', label: '3. Content & Headlines' },
          { id: 'sec-art', label: '4. Designs & Motion' },
          { id: 'sec-projects', label: '5. Projects CRUD' },
          { id: 'sec-theme', label: '6. Themes & FX' },
          { id: 'sec-backup', label: '7. Backup & Restore' },
        ].map((sec) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => {
              setActiveSection(sec.id);
              if (sec.id !== 'all') {
                document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeSection === sec.id
                ? 'bg-white text-black font-semibold'
                : 'bg-[#1a1a1a] text-[#888888] hover:text-white border border-[#262626]'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Guide Content - Clean Printable HTML Container */}
      <div
        id="printable-owner-guide"
        className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-[#242424] space-y-10 text-neutral-200 leading-relaxed text-sm font-sans"
      >
        {/* Document Header */}
        <div className="border-b border-[#262626] pb-6">
          <h1 className="text-3xl font-serif-display text-white mb-2">
            Sameer Portfolio — Owner Operation Manual
          </h1>
          <p className="text-xs font-mono text-[#888888]">
            Author: Sameer (Agentic AI Developer & System Architect) &bull; Portfolio Version 2.5
          </p>
        </div>

        {/* SECTION 1: ACCESS & SHORTCUTS */}
        <section id="sec-access" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#262626] pb-2">
            <Laptop className="w-4 h-4 text-emerald-400" />
            <h2 className="text-lg font-serif-display text-white">
              1. Accessing the Owner Customizer Studio
            </h2>
          </div>
          <p className="text-xs text-neutral-300">
            Aapka portfolio bilkul secure hai aur public users ke liye read-only presentation hai. Sirf aap neeche diye gaye 3 tareeqon se Admin Mode mein enter ho sakte hain:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#181818] border border-[#282828] space-y-1.5">
              <span className="text-emerald-400 font-semibold block">Method A: Keyboard Shortcut</span>
              <p className="text-[#888888] text-[11px]">
                Kisi bhi waqt keyboard par <code className="text-white bg-[#222] px-1 py-0.5 rounded">Ctrl + Shift + A</code> (Mac par <code className="text-white bg-[#222] px-1 py-0.5 rounded">Cmd + Shift + A</code>) dabayein.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#181818] border border-[#282828] space-y-1.5">
              <span className="text-emerald-400 font-semibold block">Method B: Navbar Keyhole</span>
              <p className="text-[#888888] text-[11px]">
                Top navigation bar ke right side par ek discrete lock/keyhole icon hai. Us par click karein.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#181818] border border-[#282828] space-y-1.5">
              <span className="text-emerald-400 font-semibold block">Method C: Footer Monogram</span>
              <p className="text-[#888888] text-[11px]">
                Footer ke bilkul aakhri hissay mein [S] monogram icon par click karne se bhi login window open ho jati hai.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: PASSCODES, RECOVERY & HINTS */}
        <section id="sec-security" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#262626] pb-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <h2 className="text-lg font-serif-display text-white">
              2. Passcodes, Backup Password & 3-Attempt Auto Hint
            </h2>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Aapko kabhi bhi password bhoolne par locked-out feel na ho, iske liye multi-tier security aur instant recovery mechanism banaya gaya hai:
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-[#181818] border border-[#282828] space-y-2">
              <div className="flex items-center gap-2 font-mono font-medium text-white">
                <Key className="w-4 h-4 text-emerald-400" />
                <span>Default Master Passcode:</span>
                <code className="text-emerald-300 bg-black/40 px-2 py-0.5 rounded border border-emerald-900">
                  sameer@2026
                </code>
              </div>
              <p className="text-[#888888] text-[11px]">
                Aap ise "Security & Backup" tab mein ja kar kisi bhi waqt naye secret passcode se badal sakte hain.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#181818] border border-[#282828] space-y-2">
              <div className="flex items-center gap-2 font-mono font-medium text-amber-300">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>3-Attempt Auto Hint System (Teesri Ghalti Par Hint):</span>
              </div>
              <p className="text-[#888888] text-[11px] leading-relaxed">
                Agar aap kabhi passcode bhool jayein aur login dialog mein lagataar 3 baar ghalat password type karein, toh <strong>teesri try ke baad password input ke theek neeche aapka banaya hua Secret Hint khud-b-khud reveal ho jayega</strong>!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#181818] border border-[#282828] space-y-2">
              <div className="flex items-center gap-2 font-mono font-medium text-sky-300">
                <Shield className="w-4 h-4 text-sky-400" />
                <span>Secondary Backup Recovery Passcode:</span>
              </div>
              <p className="text-[#888888] text-[11px] leading-relaxed">
                Aap ek alag secondary master password bhi set kar sakte hain (jaise koi secret phrase ya phone number). Agar primary password yaad na aaye, toh yeh Backup Passcode bhi portal ko foran unlock kar dega.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: CONTENT & BIO CUSTOMIZATION */}
        <section id="sec-content" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#262626] pb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h2 className="text-lg font-serif-display text-white">
              3. Text, Headlines & Contact Details Customization
            </h2>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Studio ke <strong>"Content & Bio"</strong> tab mein ja kar aap portfolio ka har ek lafz live edit kar sakte hain:
          </p>
          <ul className="list-disc list-inside text-xs text-[#888888] space-y-1 font-mono">
            <li><strong>Hero 3-Line Headline</strong>: Pehli line ("DESIGNING"), doosri line ("AUTONOMOUS"), aur teesri line ("INTELLIGENCE").</li>
            <li><strong>Badge Text</strong>: Gol chakkar wale badge ka title ("AGENTIC AI DEVELOPER").</li>
            <li><strong>About & Philosophy</strong>: Aapka comprehensive bio aur personal engineering philosophy quote.</li>
            <li><strong>Contact Info</strong>: Email, phone number, location, aur GitHub URL jo har call-to-action button ko instantly update karta hai.</li>
          </ul>
        </section>

        {/* SECTION 4: DESIGNS & MOTION UPLOADER */}
        <section id="sec-art" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#262626] pb-2">
            <ImageIcon className="w-4 h-4 text-pink-400" />
            <h2 className="text-lg font-serif-display text-white">
              4. Custom Designs & Motion Graphics (Browse & Upload)
            </h2>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Aap apne computer ya mobile se khud ke banaye hue vector graphics, animations, aur videos direct upload kar sakte hain:
          </p>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#282828] space-y-3 text-xs">
            <div className="font-mono text-white font-medium">Supported Formats:</div>
            <div className="flex flex-wrap gap-2 font-mono text-[11px]">
              <span className="px-2 py-1 rounded bg-[#222] border border-[#333] text-emerald-300">SVG Vectors</span>
              <span className="px-2 py-1 rounded bg-[#222] border border-[#333] text-sky-300">Animated GIFs</span>
              <span className="px-2 py-1 rounded bg-[#222] border border-[#333] text-amber-300">MP4 / WebM Videos</span>
              <span className="px-2 py-1 rounded bg-[#222] border border-[#333] text-purple-300">PNG / JPG / WebP</span>
            </div>
            <p className="text-[#888888] text-[11px] leading-relaxed">
              <strong>Hero Arch Integration:</strong> Upload karte waqt ya gallery mein kisi bhi design par <em>"Set as Hero Arch Visual"</em> button dabane se Hero section mein photo ki jagah aapka design animation chalne lag jayega!
            </p>
          </div>
        </section>

        {/* SECTION 5: PROJECTS CRUD */}
        <section id="sec-projects" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#262626] pb-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h2 className="text-lg font-serif-display text-white">
              5. Projects Management (Add, Edit, Reorder & Delete)
            </h2>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Projects tab mein aap naye engineering systems add kar sakte hain ya existing projects ko modify kar sakte hain:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#181818] border border-[#282828]">
              <span className="text-white font-semibold block mb-1">Live Demo & Repo Links</span>
              <p className="text-[#888888] text-[11px]">
                Har project mein Live Demo URL aur GitHub Repository link paste karein jo public cards par interactive buttons banate hain.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#181818] border border-[#282828]">
              <span className="text-white font-semibold block mb-1">Tech Stack Tags</span>
              <p className="text-[#888888] text-[11px]">
                Comma-separated tags (jaise: Next.js, LangGraph, PyTorch, Tailwind) jo projects filter aur bento badges bante hain.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: THEMES & ANIMATIONS */}
        <section id="sec-theme" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#262626] pb-2">
            <Palette className="w-4 h-4 text-purple-400" />
            <h2 className="text-lg font-serif-display text-white">
              6. Typography, Dark Palettes & Animation Engine
            </h2>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Portfolio ki visual elegance poori tarah customizable hai:
          </p>
          <ul className="list-disc list-inside text-xs text-[#888888] space-y-1 font-mono">
            <li><strong>Display Serif Fonts</strong>: Playfair Display, Bodoni Moda, Cormorant Garamond, Cinzel, ya Georgia.</li>
            <li><strong>Luxury Dark Themes</strong>: Noir Classic, Obsidian Gold, Cyber Slate, Deep Emerald, ya Midnight Royal.</li>
            <li><strong>Custom Color Pickers</strong>: Background Hex, Card Surfaces, Border Hues, aur Accent Highlights.</li>
            <li><strong>Cursor Particle Trails</strong>: Starlight Sparkles, Precision Dot + Ring, Ambient Glow, ya Browser Default.</li>
            <li><strong>Badge Spin Velocity</strong>: Smooth Luxury (18s), Normal (10s), Fast (6s), ya Paused.</li>
          </ul>
        </section>

        {/* SECTION 7: BACKUP & DATA SAFETY */}
        <section id="sec-backup" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#262626] pb-2">
            <Download className="w-4 h-4 text-emerald-400" />
            <h2 className="text-lg font-serif-display text-white">
              7. Backup & Migration (Export JSON / Restore)
            </h2>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Aapke saare changes aapke browser ke <code>localStorage</code> mein hamesha mefooz rehte hain. Lekin kisi doosre computer par shift hone ke liye ya permanent safe rakhne ke liye:
          </p>
          <div className="p-4 rounded-xl bg-[#181818] border border-[#282828] space-y-2 text-xs">
            <div className="font-mono text-emerald-300 font-medium">Export Procedure:</div>
            <p className="text-[#888888] text-[11px] leading-relaxed">
              "Security & Backup" tab mein <strong>"Export JSON Backup File"</strong> par click karein. Ek <code>.json</code> file download ho jayegi jisme aapka har project, photo, custom design, typography, aur settings bundled hain.
            </p>
            <div className="font-mono text-emerald-300 font-medium pt-2">Restore Procedure:</div>
            <p className="text-[#888888] text-[11px] leading-relaxed">
              Naye device par us JSON file ka content copy karke "Import & Restore" box mein paste karein aur "Restore Portfolio from JSON" dabayein. Har cheez 1 second mein restore ho jayegi!
            </p>
          </div>
        </section>

        {/* SIGN-OFF BADGE */}
        <div className="pt-6 border-t border-[#262626] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#888888]">
          <div>
            <span>Verified System Architecture &bull; Designed specifically for Sameer</span>
          </div>
          <button
            type="button"
            onClick={handlePrintPDF}
            className="px-4 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2c2c2c] text-neutral-200 border border-[#333333] transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
}
