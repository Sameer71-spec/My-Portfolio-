import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import {
  Upload,
  Sparkles,
  Layers,
  Film,
  Trash2,
  Check,
  Eye,
  Plus,
  Monitor,
  AlertCircle,
  FileCode,
  Tag,
  Maximize2,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CustomDesign } from '../types';

export function AdminDesignsTab() {
  const {
    customDesigns,
    addCustomDesign,
    updateCustomDesign,
    deleteCustomDesign,
    personalInfo,
    updatePersonalInfo,
    setHeroVisual,
    setBackgroundVisual,
  } = usePortfolio();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State for new upload
  const [mediaUrl, setMediaUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Interface & Architecture');
  const [type, setType] = useState<'design' | 'animation' | 'vector' | '3d'>('design');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'gif' | 'svg'>('svg');
  const [description, setDescription] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('Architecture, UI, Vector');
  const [setAsHeroImmediately, setSetAsHeroImmediately] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');

  // Handle local file selection
  const processFile = (file: File) => {
    setUploadError(null);
    setSuccessMessage(null);

    // Validate size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      setUploadError('File exceeds 20MB limit. Please choose a smaller file.');
      return;
    }

    setFileName(file.name);

    // Auto-detect type
    if (file.type.startsWith('video/')) {
      setMediaType('video');
      setType('animation');
    } else if (file.type === 'image/gif') {
      setMediaType('gif');
      setType('animation');
    } else if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
      setMediaType('svg');
      setType('vector');
    } else {
      setMediaType('image');
      setType('design');
    }

    if (!title) {
      // Auto-set title from file name
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setTitle(cleanName);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setMediaUrl(e.target.result as string);
        setSuccessMessage(`File loaded successfully: ${file.name}`);
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read file.');
    };

    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSaveDesign = () => {
    if (!mediaUrl.trim()) {
      setUploadError('Please select or upload a file, or provide an image/media URL.');
      return;
    }
    if (!title.trim()) {
      setUploadError('Please give your design or animation a title.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newId = `design-${Date.now()}`;

    addCustomDesign({
      id: newId,
      title: title.trim(),
      category: category.trim() || 'Custom Art',
      type,
      mediaType,
      mediaUrl: mediaUrl.trim(),
      description: description.trim() || 'Custom designed asset by Sameer.',
      tags: tags.length > 0 ? tags : ['Design', 'Creative'],
    });

    if (setAsHeroImmediately) {
      setHeroVisual('custom_design', newId);
    }

    // Reset Form
    setTitle('');
    setMediaUrl('');
    setDescription('');
    setFileName('');
    setTagsInput('Architecture, UI, Vector');
    setSetAsHeroImmediately(false);
    setSuccessMessage('Design / Animation successfully added to your archive!');
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const activeHeroDesign = customDesigns.find(
    (d) => d.id === personalInfo.activeHeroDesignId
  );

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#333333] text-xs font-mono text-emerald-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OWNER CREATIVE ARCHIVE</span>
        </div>
        <h3 className="font-serif-display text-2xl sm:text-3xl text-white">
          Upload Custom Designs & Animations
        </h3>
        <p className="text-xs sm:text-sm text-[#888888] mt-1 font-mono leading-relaxed">
          Browse and upload your self-made visual designs, vector graphs, 3D renders, or motion graphics (GIF / MP4 / SVG / WebM). Display them in the dedicated showcase gallery or directly as your Hero Arch visual.
        </p>
      </div>

      {/* Global Setting: Hero Visual Selector & Gallery Visibility */}
      <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2D2D2D] space-y-4">
        <h4 className="text-xs uppercase font-mono text-white tracking-wider flex items-center gap-2">
          <Monitor className="w-4 h-4 text-sky-400" />
          <span>Hero Arch Visual Configuration</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option 1: Portrait */}
          <div
            onClick={() => setHeroVisual('portrait', undefined)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              personalInfo.heroVisualType !== 'custom_design'
                ? 'bg-white/5 border-white text-white'
                : 'bg-[#141414] border-[#2A2A2A] text-[#888888] hover:border-[#444444]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase font-semibold text-white">
                1. Classic Portrait Arch
              </span>
              {personalInfo.heroVisualType !== 'custom_design' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
            </div>
            <p className="text-xs text-[#888888] mt-2 font-mono">
              Displays your grayscale architectural photograph with location tag.
            </p>
          </div>

          {/* Option 2: Custom Design */}
          <div
            onClick={() => {
              if (customDesigns.length > 0) {
                setHeroVisual('custom_design', customDesigns[0].id);
              } else {
                setUploadError('Please upload at least one custom design first.');
              }
            }}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              personalInfo.heroVisualType === 'custom_design'
                ? 'bg-emerald-950/40 border-emerald-500 text-white'
                : 'bg-[#141414] border-[#2A2A2A] text-[#888888] hover:border-[#444444]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase font-semibold text-emerald-300">
                2. Custom Design / Motion Arch
              </span>
              {personalInfo.heroVisualType === 'custom_design' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
            </div>
            <p className="text-xs text-[#888888] mt-2 font-mono">
              Active:{' '}
              <strong className="text-white font-mono">
                {activeHeroDesign ? activeHeroDesign.title : 'None selected'}
              </strong>
            </p>
          </div>
        </div>

        {/* Section visibility toggle */}
        <div className="pt-3 border-t border-[#292929] flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-white block">
              Show "Designs & Animations" Section on Public Site
            </span>
            <span className="text-[11px] text-[#777777] font-mono">
              Toggles the dedicated bento archive section on your homepage.
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              updatePersonalInfo({
                showDesignsSection: personalInfo.showDesignsSection === false ? true : false,
              })
            }
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
              personalInfo.showDesignsSection !== false
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-[#2A2A2A] text-[#888888]'
            }`}
          >
            {personalInfo.showDesignsSection !== false ? 'Enabled (Visible)' : 'Disabled (Hidden)'}
          </button>
        </div>
      </div>

      {/* Uploader Section */}
      <div className="p-6 rounded-2xl bg-[#181818] border border-[#2D2D2D] space-y-6">
        <h4 className="text-xs uppercase font-mono text-white tracking-wider flex items-center gap-2">
          <Upload className="w-4 h-4 text-emerald-400" />
          <span>Upload New Design / Animation</span>
        </h4>

        {/* Drag and drop zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-emerald-400 bg-emerald-950/20'
              : 'border-[#333333] hover:border-[#666666] bg-[#141414]'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept="image/*,video/mp4,video/webm,.svg,.gif"
            className="hidden"
          />

          <div className="w-12 h-12 rounded-full bg-[#1F1F1F] border border-[#333333] flex items-center justify-center mx-auto mb-3 text-white">
            <Upload className="w-5 h-5" />
          </div>

          <p className="text-sm font-medium text-white">
            Click to browse or drag & drop files here
          </p>
          <p className="text-xs text-[#888888] font-mono mt-1">
            Supports SVG, MP4, WebM, GIF, PNG, JPG, WebP (up to 20MB)
          </p>
          {fileName && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/60 text-xs font-mono text-emerald-300">
              <Check className="w-3.5 h-3.5" />
              <span>Loaded: {fileName}</span>
            </div>
          )}
        </div>

        {/* Alternative URL Input */}
        <div>
          <label className="block text-xs uppercase font-mono text-[#888888] mb-1">
            Or Paste Online Image / Video URL
          </label>
          <input
            type="text"
            value={mediaUrl.startsWith('data:') ? '(Local uploaded file loaded)' : mediaUrl}
            onChange={(e) => {
              setMediaUrl(e.target.value);
              setFileName('');
            }}
            disabled={mediaUrl.startsWith('data:')}
            placeholder="https://example.com/my-animation.mp4 or svg/png url"
            className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#2D2D2D] text-xs font-mono text-white focus:outline-none focus:border-white disabled:opacity-60"
          />
          {mediaUrl.startsWith('data:') && (
            <button
              type="button"
              onClick={() => {
                setMediaUrl('');
                setFileName('');
              }}
              className="mt-1 text-[11px] font-mono text-red-400 hover:underline"
            >
              Clear uploaded file & use URL instead
            </button>
          )}
        </div>

        {/* Live Interactive Preview */}
        {mediaUrl && (
          <div className="p-4 rounded-xl bg-[#101010] border border-[#2B2B2B] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-[#888888]">Live Asset Preview</span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase">
                {mediaType} • {type}
              </span>
            </div>
            <div className="w-full max-h-64 rounded-lg bg-black/60 overflow-hidden flex items-center justify-center p-3 border border-[#222222]">
              {mediaType === 'video' ? (
                <video
                  src={mediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="max-h-56 max-w-full rounded object-contain"
                />
              ) : (
                <img
                  src={mediaUrl}
                  alt="Preview"
                  className="max-h-56 max-w-full rounded object-contain"
                />
              )}
            </div>
          </div>
        )}

        {/* Meta Form Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-mono text-[#888888] mb-1">
              Title / Name *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Agentic Workflow Mesh"
              className="w-full px-4 py-2 rounded-xl bg-[#141414] border border-[#2D2D2D] text-sm text-white focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-mono text-[#888888] mb-1">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Interface & Architecture"
              className="w-full px-4 py-2 rounded-xl bg-[#141414] border border-[#2D2D2D] text-sm text-white focus:outline-none focus:border-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-mono text-[#888888] mb-1">
              Asset Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-4 py-2 rounded-xl bg-[#141414] border border-[#2D2D2D] text-sm text-white focus:outline-none focus:border-white font-mono"
            >
              <option value="design">Design / Interface</option>
              <option value="animation">Animation / Motion Graphic</option>
              <option value="vector">Vector Graph / SVG</option>
              <option value="3d">3D Render</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase font-mono text-[#888888] mb-1">
              Media Format
            </label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as any)}
              className="w-full px-4 py-2 rounded-xl bg-[#141414] border border-[#2D2D2D] text-sm text-white focus:outline-none focus:border-white font-mono"
            >
              <option value="svg">SVG Vector</option>
              <option value="gif">GIF Animation</option>
              <option value="video">MP4 / WebM Video</option>
              <option value="image">PNG / JPG / WebP Image</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-mono text-[#888888] mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Agentic AI, Motion, Dark Mode, Architecture"
            className="w-full px-4 py-2 rounded-xl bg-[#141414] border border-[#2D2D2D] text-xs font-mono text-white focus:outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-mono text-[#888888] mb-1">
            Description / Technical Narrative
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the architectural concept, stack, or inspiration behind this visual creation..."
            className="w-full px-4 py-2 rounded-xl bg-[#141414] border border-[#2D2D2D] text-xs text-white focus:outline-none focus:border-white resize-none"
          />
        </div>

        {/* Immediate activation toggle */}
        <label className="flex items-center gap-3 cursor-pointer pt-2">
          <input
            type="checkbox"
            checked={setAsHeroImmediately}
            onChange={(e) => setSetAsHeroImmediately(e.target.checked)}
            className="w-4 h-4 rounded bg-[#141414] border-[#333333] text-emerald-500 focus:ring-0"
          />
          <span className="text-xs font-mono text-white">
            Immediately set as active Hero Arch Visual upon saving
          </span>
        </label>

        {/* Feedback Messages */}
        {uploadError && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-xs font-mono text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={handleSaveDesign}
          className="w-full py-3 px-6 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Save to Creative Archive</span>
        </button>
      </div>

      {/* Existing Designs Gallery & Quick Setters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs uppercase font-mono text-white tracking-wider">
            Your Creative Archive ({customDesigns.length} items)
          </h4>
          <span className="text-[11px] font-mono text-[#888888]">
            Click "Set as Hero" to feature in your home arch
          </span>
        </div>

        {customDesigns.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#161616] border border-[#2A2A2A]">
            <p className="text-xs font-mono text-[#888888]">
              No custom designs uploaded yet. Use the upload box above!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {customDesigns.map((design) => {
              const isHeroActive =
                personalInfo.heroVisualType === 'custom_design' &&
                personalInfo.activeHeroDesignId === design.id;

              return (
                <div
                  key={design.id}
                  className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                    isHeroActive
                      ? 'bg-emerald-950/30 border-emerald-600'
                      : 'bg-[#161616] border-[#2A2A2A] hover:border-[#444444]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Media Thumbnail */}
                    <div className="w-20 h-20 rounded-lg bg-[#0C0C0C] border border-[#282828] overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {design.mediaType === 'video' ? (
                        <video
                          src={design.mediaUrl}
                          autoPlay
                          loop
                          muted
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={design.mediaUrl}
                          alt={design.title}
                          className="w-full h-full object-contain p-1"
                        />
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-emerald-400">
                          {design.type}
                        </span>
                        <span className="text-[10px] font-mono text-[#666666]">
                          {design.createdAt}
                        </span>
                      </div>
                      <h5 className="text-sm font-medium text-white truncate">
                        {design.title}
                      </h5>
                      <p className="text-[11px] text-[#888888] line-clamp-2 leading-relaxed">
                        {design.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-[#242424] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (isHeroActive) {
                          setHeroVisual('portrait', undefined);
                        } else {
                          setHeroVisual('custom_design', design.id);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                        isHeroActive
                          ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-600 font-semibold'
                          : 'bg-[#222222] text-white hover:bg-white hover:text-black border border-[#333333]'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>{isHeroActive ? 'Active in Hero Arch' : 'Set as Hero Arch'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${design.title}"?`)) {
                          deleteCustomDesign(design.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-[#888888] hover:text-red-400 hover:bg-red-950/30 transition-colors"
                      title="Delete design"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
