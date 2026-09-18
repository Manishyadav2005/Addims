import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Plus,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';
import type { Project, ProjectCategory } from '../../types/project';
import {
  createProject,
  getProjectById,
  updateProject,
  initProjectDatabase,
} from '../../services/projectDb';
import { fileToDataUrl, generateSlug } from '../../utils/imageUtils';

const CATEGORIES: ProjectCategory[] = [
  'Business Management',
  'Healthcare',
  'Hotel Management',
  'Restaurant & Billing',
  'AI & Automation',
  'Web & Digital',
  'Custom Software',
];

const PRESET_IMAGES = [
  { label: 'Cloud Systems', path: '/assets/panel_2_systems.jpg' },
  { label: 'Smart Devices', path: '/assets/panel_1_devices.jpg' },
  { label: 'AI Intelligence', path: '/assets/panel_3_ai.jpg' },
];

export const AdminProjectFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  // Simple Card Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('Business Management');
  const [coverImage, setCoverImage] = useState<string>('/assets/panel_1_devices.jpg');
  const [shortDescription, setShortDescription] = useState('');
  const [features, setFeatures] = useState<string[]>([
    'High-Performance System Architecture',
    'Real-Time Telemetry & Monitoring',
  ]);
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [liveUrl, setLiveUrl] = useState('');

  // Live Preview features state
  const [previewFeaturesOpen, setPreviewFeaturesOpen] = useState(true);

  // Status & Notifications
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    async function loadEditData() {
      if (!id) return;
      await initProjectDatabase();
      const existing = await getProjectById(id);
      if (existing) {
        setName(existing.name);
        setCategory(existing.category);
        setCoverImage(existing.coverImage || '/assets/panel_1_devices.jpg');
        setShortDescription(existing.shortDescription || '');
        setFeatures(existing.features || []);
        setLiveUrl(existing.liveUrl || '');
      }
      setInitialLoading(false);
    }

    if (isEdit) {
      loadEditData();
    }
  }, [id, isEdit]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await fileToDataUrl(file);
      setCoverImage(base64);
    } catch {
      setNotification({ type: 'error', message: 'Failed to process image file.' });
    }
  };

  const handleAddFeature = () => {
    if (newFeatureInput.trim()) {
      setFeatures((prev) => [...prev, newFeatureInput.trim()]);
      setNewFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setNotification({ type: 'error', message: 'Please enter a Project Name.' });
      return;
    }
    if (!shortDescription.trim()) {
      setNotification({ type: 'error', message: 'Please enter a Short Description.' });
      return;
    }

    setLoading(true);
    setNotification(null);

    const generatedSlug = generateSlug(name.trim()) || `project-${Date.now()}`;

    const projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
      name: name.trim(),
      slug: generatedSlug,
      shortTitle: `${category} Platform`,
      projectType: 'Client Project',
      category,
      shortDescription: shortDescription.trim(),
      fullDescription: shortDescription.trim(),
      clientName: 'ADDIMS Client',
      clientIndustry: category,
      visibility: 'Public',
      coverImage: coverImage || '/assets/panel_1_devices.jpg',
      galleryImages: [coverImage || '/assets/panel_1_devices.jpg'],
      features: features.length > 0 ? features : ['Engineered Custom Architecture'],
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      liveUrl: liveUrl.trim() || undefined,
      status: 'Published',
      featured: true,
      displayOrder: 1,
    };

    try {
      if (isEdit && id) {
        await updateProject(id, projectData);
        setNotification({ type: 'success', message: 'Project successfully updated!' });
      } else {
        await createProject(projectData);
        setNotification({ type: 'success', message: 'Project successfully published to website!' });
      }

      setTimeout(() => {
        navigate('/admin/projects');
      }, 700);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Database operation failed.';
      setNotification({ type: 'error', message: errorMsg });
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="py-24 text-center text-xs font-mono text-purple-600 animate-pulse font-bold">
        Loading project details...
      </div>
    );
  }

  // Card styling variables matching BuiltByAddimsSection
  const catLower = category.toLowerCase();
  const cardBorder = catLower.includes('hotel')
    ? 'border-2 border-emerald-400'
    : catLower.includes('ai') || catLower.includes('auto')
    ? 'border-2 border-rose-400'
    : catLower.includes('business') || catLower.includes('management')
    ? 'border-2 border-blue-400'
    : 'border-2 border-purple-400';

  const pillStyles = catLower.includes('hotel')
    ? { bg: 'bg-emerald-50 border-emerald-200 text-emerald-700', dot: 'bg-emerald-600' }
    : catLower.includes('ai') || catLower.includes('auto')
    ? { bg: 'bg-rose-50 border-rose-200 text-rose-700', dot: 'bg-rose-600' }
    : catLower.includes('business') || catLower.includes('management')
    ? { bg: 'bg-blue-50 border-blue-200 text-blue-700', dot: 'bg-blue-600' }
    : { bg: 'bg-purple-50 border-purple-200 text-purple-700', dot: 'bg-purple-600' };

  return (
    <div className="space-y-8 select-none">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-purple-700 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL PROJECTS</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-950 uppercase tracking-tight">
            {isEdit ? 'Edit Project' : 'Add New Project'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
            Fill in the details below. This will directly update the showcase cards across the website.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider shadow-[0_4px_18px_rgba(147,51,234,0.35)] transition-all cursor-pointer disabled:opacity-50 active:scale-98"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>{loading ? 'Saving...' : isEdit ? 'Update Project' : 'Publish Project'}</span>
        </button>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-xs font-mono font-bold animate-fadeIn ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-rose-50 border-rose-300 text-rose-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* 2-Column Grid: Left (Simple Form) & Right (Live Card Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ============================================================ */}
        {/* LEFT FORM COLUMN (COL SPAN 7)                                */}
        {/* ============================================================ */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-5">
            {/* 1. Project Name */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2">
                Project Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., GrandSuite Cloud Hotel OS"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-sm font-semibold focus:outline-hidden focus:border-purple-600 focus:bg-white transition-all"
              />
            </div>

            {/* 2. Category Dropdown */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-sm font-semibold focus:outline-hidden focus:border-purple-600 focus:bg-white transition-all cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Project Photo / Cover Image */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2">
                Project Photo / Screenshot <span className="text-rose-500">*</span>
              </label>

              {/* Upload Drop Area */}
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 hover:border-purple-500 rounded-2xl p-5 bg-purple-50/40 hover:bg-purple-50/80 transition-all cursor-pointer group">
                <Upload className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform mb-2" />
                <span className="text-xs font-mono font-bold text-slate-900">
                  Click to Upload Photo from Device
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">PNG, JPG, WEBP (Instant Preview)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {/* Quick Preset Pickers */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-slate-500">Or use preset:</span>
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.path}
                    type="button"
                    onClick={() => setCoverImage(preset.path)}
                    className={`px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-bold border transition-all cursor-pointer ${
                      coverImage === preset.path
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Short Description */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2">
                Short Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="e.g., Digital hotel operating system integrating smart room matrix, contactless check-in, and multi-channel reservation booking."
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-sm font-semibold focus:outline-hidden focus:border-purple-600 focus:bg-white transition-all resize-none"
              />
            </div>

            {/* 5. Key Features (Bullet points on card) */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2">
                Key Features (Card Dropdown Points)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newFeatureInput}
                  onChange={(e) => setNewFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  placeholder="e.g., Sub-Second Multi-Agent AI Processing"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-xs font-semibold focus:outline-hidden focus:border-purple-600 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-purple-700 text-white font-mono text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* Active Features List */}
              <div className="space-y-1.5">
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-purple-600 font-bold">•</span>
                      <span className="truncate">{feat}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      title="Remove feature"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Website / Demo URL (Optional) */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2">
                Website / Demo Link <span className="text-slate-400 text-[10px]">(Optional)</span>
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="e.g., https://myhotelsoftware.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 text-sm font-semibold focus:outline-hidden focus:border-purple-600 focus:bg-white transition-all"
              />
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Opens directly in a new tab when visitors click the "VIEW →" button on the card.
              </p>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-sm uppercase tracking-wider shadow-[0_6px_25px_rgba(147,51,234,0.4)] hover:shadow-[0_8px_30px_rgba(147,51,234,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{loading ? 'Publishing...' : isEdit ? 'Save Changes' : 'Publish Project To Website'}</span>
            </button>
          </div>
        </form>

        {/* ============================================================ */}
        {/* RIGHT LIVE PREVIEW COLUMN (COL SPAN 5)                       */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 sticky top-24 space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-mono font-extrabold text-purple-700 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>LIVE CARD PREVIEW</span>
            </span>
            <span className="text-[10.5px] font-mono text-slate-500 font-bold">
              Exact Website Appearance
            </span>
          </div>

          {/* The Exact Card Component */}
          <div
            className={`group relative rounded-3xl bg-white p-5 sm:p-6 ${cardBorder} shadow-[0_15px_40px_rgba(168,85,247,0.12)] transition-all duration-300 overflow-hidden flex flex-col justify-between`}
          >
            <div>
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-100 mb-5">
                <img
                  src={coverImage || '/assets/panel_1_devices.jpg'}
                  alt={name || 'Project Preview'}
                  className="w-full h-full object-cover object-top transition-transform duration-500"
                />
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-black font-display tracking-wide text-slate-900 uppercase mb-2 leading-snug">
                {name || 'PROJECT NAME PREVIEW'}
              </h3>

              {/* Category Pill & Features Row */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10.5px] font-mono font-bold uppercase tracking-wider ${pillStyles.bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${pillStyles.dot}`} />
                  {category}
                </span>

                <button
                  type="button"
                  onClick={() => setPreviewFeaturesOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-600 hover:text-purple-700 transition-colors cursor-pointer"
                >
                  <span>FEATURES</span>
                  {previewFeaturesOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Expandable Features Drawer */}
              {previewFeaturesOpen && (
                <div className="mb-4 p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs space-y-1.5">
                  {features.length > 0 ? (
                    features.slice(0, 4).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-1.5 text-slate-800 font-semibold text-[11.5px]">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>{feat}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-400 text-xs font-mono">No features added yet.</span>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal mb-5 line-clamp-3">
                {shortDescription || 'Your short project description will appear here on the card...'}
              </p>
            </div>

            {/* Bottom Action Button: Slim Ultra-Premium Obsidian VIEW Button */}
            <button
              type="button"
              className="relative group/btn w-full h-9 sm:h-10 px-4 rounded-xl bg-slate-950 text-white border border-slate-800 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="relative z-10 text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-white">
                VIEW
              </span>
              <ArrowRight className="relative z-10 w-3.5 h-3.5 text-purple-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
