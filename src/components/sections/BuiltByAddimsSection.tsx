import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Layers, Sparkles, ArrowRight } from 'lucide-react';
import type { Project } from '../../types/project';
import { getFeaturedProjects, initProjectDatabase } from '../../services/projectDb';

export const BuiltByAddimsSection: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFeatures, setOpenFeatures] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProjects() {
      await initProjectDatabase();
      const top3 = await getFeaturedProjects(3);
      setFeaturedProjects(top3);
      setLoading(false);
    }

    loadProjects();

    const handleUpdate = () => {
      loadProjects();
    };

    window.addEventListener('addims_projects_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('addims_projects_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const toggleFeatures = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenFeatures((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="showcase" className="relative pt-12 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 select-none scroll-mt-20">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* --- 3D CINEMATIC HEADER WITH SITTING BOY --- */}
      <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-12 select-none">
        <div className="relative flex flex-col items-center justify-center">
          {/* 3D Boy Resting Naturally on Top of the Text */}
          <div className="relative w-48 sm:w-56 md:w-64 lg:w-76 -mb-[3px] sm:-mb-[4px] md:-mb-[5px] lg:-mb-[6px] z-20 pointer-events-none">
            <img
              src="/assets/boy_bottom_clean_pure.png"
              alt="ADDIMS Boy Resting on Built By ADDIMS"
              className="w-full h-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
            />
          </div>

          {/* Compact Crisp 3D Heading: BUILT BY ADDIMS */}
          <div className="relative z-10">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-wider uppercase text-slate-950 select-none px-4"
              style={{
                letterSpacing: '0.06em',
                textShadow:
                  '0 1px 0 #94a3b8, 0 2px 0 #64748b, 0 3px 0 #475569, 0 4px 0 #334155, 0 6px 14px rgba(15, 23, 42, 0.45)',
              }}
            >
              BUILT BY ADDIMS
            </h2>
          </div>

          {/* Minimal Clean Subtitle */}
          <p className="mt-2 text-black text-sm sm:text-base font-extrabold tracking-wide max-w-lg">
            Technology built for real-world business impact.
          </p>

          {/* Subtle Purple Ambient Line */}
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-3 opacity-80 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
        </div>
      </div>

      {/* Dynamic Featured Project Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-[460px] rounded-3xl bg-white border border-purple-100 animate-pulse p-6 flex flex-col justify-between shadow-sm"
            >
              <div className="w-full h-52 rounded-2xl bg-slate-100" />
              <div className="space-y-3 mt-4">
                <div className="w-1/2 h-6 rounded bg-slate-100" />
                <div className="w-1/3 h-4 rounded bg-slate-100" />
                <div className="w-full h-16 rounded bg-slate-100" />
                <div className="w-full h-12 rounded-2xl bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      ) : featuredProjects.length === 0 ? (
        <div className="rounded-3xl bg-white/90 border border-dashed border-purple-200/90 p-10 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200/60 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 mb-1">
            No Projects Published Yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Projects added from the Admin Dashboard will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featuredProjects.map((project) => {
            const isFeaturesOpen = openFeatures[project.id] || false;
            const cat = project.category.toLowerCase();
            const cardBorder = cat.includes('hotel')
              ? 'border-2 border-emerald-400 hover:border-emerald-600'
              : cat.includes('ai') || cat.includes('auto')
              ? 'border-2 border-rose-400 hover:border-rose-600'
              : cat.includes('business') || cat.includes('management')
              ? 'border-2 border-blue-400 hover:border-blue-600'
              : 'border-2 border-purple-400 hover:border-purple-600';

            const pillStyles = cat.includes('hotel')
              ? { bg: 'bg-emerald-50 border-emerald-200 text-emerald-800', dot: 'bg-emerald-600' }
              : cat.includes('ai') || cat.includes('auto')
              ? { bg: 'bg-rose-50 border-rose-200 text-rose-800', dot: 'bg-rose-600' }
              : cat.includes('business') || cat.includes('management')
              ? { bg: 'bg-blue-50 border-blue-200 text-blue-800', dot: 'bg-blue-600' }
              : { bg: 'bg-purple-50 border-purple-200 text-purple-800', dot: 'bg-purple-600' };

            return (
              <div
                key={project.id}
                className={`group relative rounded-3xl bg-white p-5 sm:p-6 ${cardBorder} transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(168,85,247,0.14)] hover:-translate-y-1.5`}
              >
                <div>
                  {/* Top UI Screenshot Container */}
                  <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-100 mb-5 group/img">
                    <img
                      src={project.coverImage || '/assets/panel_1_devices.jpg'}
                      alt={project.name}
                      className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Title (Bold Uppercase Sans) */}
                  <h3 className="text-base sm:text-lg font-black font-display tracking-wide text-black uppercase mb-2 leading-snug">
                    {project.name}
                  </h3>

                  {/* Category Pill & Features Row */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10.5px] font-mono font-black uppercase tracking-wider ${pillStyles.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${pillStyles.dot}`} />
                      {project.category}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => toggleFeatures(project.id, e)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-black text-black hover:text-purple-700 transition-colors cursor-pointer"
                    >
                      <span>FEATURES</span>
                      {isFeaturesOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Expandable Features Drawer */}
                  {isFeaturesOpen && (
                    <div className="mb-4 p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-xs space-y-1.5 animate-fadeIn">
                      {project.features.slice(0, 4).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5 text-black font-bold text-[11.5px]">
                          <span className="text-purple-600 font-black">•</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-[13.5px] text-black leading-relaxed font-semibold mb-5 line-clamp-3">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Bottom Action Button: Slim Ultra-Premium Obsidian VIEW Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (project.liveUrl && project.liveUrl.startsWith('http')) {
                      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                    } else {
                      navigate(`/showcase/${project.slug}`);
                    }
                  }}
                  className="relative group/btn w-full h-9 sm:h-10 px-4 rounded-xl bg-slate-950 hover:bg-black text-white border border-slate-800 hover:border-purple-400/80 shadow-xs hover:shadow-[0_4px_18px_rgba(168,85,247,0.25)] transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  {/* Subtle Shimmer Light Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                  <span className="relative z-10 text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-white group-hover/btn:text-purple-300 transition-colors">
                    VIEW
                  </span>
                  <ArrowRight className="relative z-10 w-3.5 h-3.5 text-purple-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Showcase Explorer Link (Only when projects exist) */}
      {featuredProjects.length > 0 && (
        <div className="text-center">
          <button
            onClick={() => navigate('/showcase')}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-xs sm:text-sm font-black font-display uppercase tracking-wider text-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.25)] group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
            <span>Show More</span>
            <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
};
