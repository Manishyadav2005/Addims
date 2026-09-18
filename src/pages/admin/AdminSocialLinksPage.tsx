import React, { useEffect, useState } from 'react';
import {
  Share2,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Link2,
  Info,
} from 'lucide-react';
import {
  getSocialLinks,
  saveSocialLinks,
  resetSocialLinks,
  DEFAULT_SOCIAL_LINKS,
} from '../../services/settingsService';
import {
  SOCIAL_PLATFORMS,
  SocialIcons,
} from '../../components/common/SocialIcons';
import type { SocialLinks } from '../../types/settings';

export const AdminSocialLinksPage: React.FC = () => {
  const [links, setLinks] = useState<SocialLinks>(DEFAULT_SOCIAL_LINKS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getSocialLinks();
      setLinks(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleChange = (key: keyof SocialLinks, value: string) => {
    setLinks((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSocialLinks(links);
      showToast('Social links updated successfully! Public footer is now synced.');
    } catch (err) {
      console.error('Error saving links:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all social links to default values?')) {
      setSaving(true);
      const res = await resetSocialLinks();
      setLinks(res);
      setSaving(false);
      showToast('Social links reset to default values.');
    }
  };

  return (
    <div className="space-y-8 select-none max-w-5xl">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-mono font-bold">{successToast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-orange-50 text-[#FF6900] border border-orange-200">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
                Social Media Channels
              </h1>
              <p className="text-xs font-mono text-slate-500 mt-0.5 font-semibold">
                Manage official LinkedIn, Facebook, YouTube, Instagram & X links shown in the footer
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={saving || loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-mono text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            title="Reset to default placeholder links"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6900] text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-[#e05d00] transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Links'}</span>
          </button>
        </div>
      </div>

      {/* Grid Layout: Left Edit Form, Right Live Preview & Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Settings Form (Col Span 7) */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Link2 className="w-4 h-4 text-[#FF6900]" />
                Platform URLs
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Auto-synced with public footer
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs font-mono text-slate-400">
                Loading configuration...
              </div>
            ) : (
              <div className="space-y-5">
                {SOCIAL_PLATFORMS.map((platform) => {
                  const IconComp = platform.icon;
                  const currentVal = links[platform.id] || '';

                  return (
                    <div
                      key={platform.id}
                      className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <label
                            htmlFor={`input-${platform.id}`}
                            className="text-xs font-bold font-display text-slate-900 cursor-pointer"
                          >
                            {platform.name}
                          </label>
                        </div>

                        {currentVal.trim() && (
                          <a
                            href={currentVal.trim()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-sky-600 hover:text-sky-700 hover:underline font-semibold"
                            title="Test this link in new tab"
                          >
                            <span>Test Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="relative">
                        <input
                          id={`input-${platform.id}`}
                          type="url"
                          value={currentVal}
                          onChange={(e) => handleChange(platform.id, e.target.value)}
                          placeholder={platform.defaultUrl}
                          className="w-full px-3.5 py-2.5 text-xs font-mono text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6900]/30 focus:border-[#FF6900] transition-all"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={saving || loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6900] text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-[#e05d00] transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Right Preview & Info Panel (Col Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Preview Box */}
          <div className="p-6 rounded-2xl bg-[#09060E] border border-purple-950/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-950/80">
              <span className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Live Footer Preview
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300">
                Dark Mode
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-400 font-medium">
                Here is how the social links will appear and respond in the public footer:
              </p>

              {/* Rendered Live Icons */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-900/30 flex items-center justify-start">
                <SocialIcons variant="dark" size="md" />
              </div>

              {/* Current Active Links List */}
              <div className="pt-3 border-t border-purple-950/50 space-y-2 text-[11px] font-mono">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">
                  Configured Destinations:
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {SOCIAL_PLATFORMS.map((platform) => {
                    const activeUrl = links[platform.id] || platform.defaultUrl;
                    return (
                      <div
                        key={platform.id}
                        className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-purple-950/20 border border-purple-900/20 text-slate-300 text-[10px]"
                      >
                        <span className="font-bold text-purple-300 shrink-0">
                          {platform.name}:
                        </span>
                        <span className="truncate text-slate-400 text-right" title={activeUrl}>
                          {activeUrl}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold font-display text-xs">
              <Info className="w-4 h-4 text-[#FF6900]" />
              <span>How Social Links Work</span>
            </div>
            <ul className="text-xs font-mono text-slate-600 space-y-2 list-disc pl-4">
              <li>Links open directly in a new secure browser tab (<code className="text-[#FF6900] font-bold">target="_blank"</code>).</li>
              <li>Changes take effect immediately across all visitors without restarting the server.</li>
              <li>Include the full protocol in links, e.g. <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded">https://...</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
