import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Search, Layers, ArrowLeft, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import type { Project, ProjectCategory } from '../types/project';
import { getPublicPublishedProjects, initProjectDatabase } from '../services/projectDb';

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: 'BUSINESS SYSTEMS', value: 'Business Management' },
  { label: 'HEALTHCARE', value: 'Healthcare' },
  { label: 'HOTEL MANAGEMENT', value: 'Hotel Management' },
  { label: 'RESTAURANT & BILLING', value: 'Restaurant & Billing' },
  { label: 'AI & AUTOMATION', value: 'AI & Automation' },
  { label: 'WEB & DIGITAL', value: 'Web & Digital' },
  { label: 'CUSTOM SOFTWARE', value: 'Custom Software' },
];

export const ShowcasePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFeatures, setOpenFeatures] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    async function load() {
      await initProjectDatabase();
      const allPublic = await getPublicPublishedProjects();
      setProjects(allPublic);
      setLoading(false);
    }

    load();

    const handleUpdate = () => {
      load();
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

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory =
      selectedCategory === 'ALL' || proj.category === (selectedCategory as ProjectCategory);
    const matchesSearch =
      searchQuery.trim() === '' ||
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-slate-900 relative selection:bg-purple-600 selection:text-white">
      {/* Background Ambient Radial Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-[650px] h-[650px] bg-purple-600/5 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-1/4 w-[550px] h-[550px] bg-violet-600/5 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 select-none">
        {/* Breadcrumb / Back button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 hover:text-purple-700 transition-colors mb-8 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-purple-600" />
          <span>BACK TO HOMEPAGE</span>
        </button>

        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono font-extrabold text-purple-700 mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>ENTERPRISE ARCHITECTURE SHOWCASE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-slate-950 uppercase mb-4">
            Engineered Systems & Case Studies
          </h1>
          <p className="text-slate-900 text-sm sm:text-base max-w-2xl font-bold">
            Explore our production-deployed business architectures, healthcare operating systems, custom software platforms, and intelligent solutions.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 pb-6 border-b border-slate-200">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    active
                      ? 'bg-purple-600 text-white shadow-[0_4px_15px_rgba(147,51,234,0.3)]'
                      : 'bg-white text-slate-900 border border-slate-200 hover:text-purple-700 hover:border-purple-300 shadow-xs'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search systems & tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-950 placeholder:text-slate-400 focus:outline-none focus:border-purple-500 shadow-xs transition-colors"
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
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
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-3xl bg-white border border-purple-100 p-16 text-center max-w-lg mx-auto shadow-sm">
            <Layers className="w-10 h-10 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-black font-display text-slate-950 mb-2">No systems found</h3>
            <p className="text-slate-800 text-xs font-mono font-semibold">
              Try adjusting your category filter or search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project) => {
              const isFeaturesOpen = openFeatures[project.id] || false;
              const cat = project.category.toLowerCase();
              const cardBorder = cat.includes('hotel')
                ? 'border-2 border-emerald-400 hover:border-emerald-600'
                : cat.includes('ai') || cat.includes('auto')
                ? 'border-2 border-rose-400 hover:border-rose-600'
                : cat.includes('business') || cat.includes('management')
                ? 'border-2 border-blue-400 hover:border-blue-600'
                : cat.includes('health') || cat.includes('med') || cat.includes('clinic')
                ? 'border-2 border-teal-400 hover:border-teal-600'
                : cat.includes('restaurant') || cat.includes('billing') || cat.includes('food')
                ? 'border-2 border-amber-400 hover:border-amber-600'
                : 'border-2 border-purple-400 hover:border-purple-600';

              const pillStyles = cat.includes('hotel')
                ? { bg: 'bg-emerald-50 border-emerald-200 text-emerald-700', dot: 'bg-emerald-600' }
                : cat.includes('ai') || cat.includes('auto')
                ? { bg: 'bg-rose-50 border-rose-200 text-rose-700', dot: 'bg-rose-600' }
                : cat.includes('business') || cat.includes('management')
                ? { bg: 'bg-blue-50 border-blue-200 text-blue-700', dot: 'bg-blue-600' }
                : cat.includes('health') || cat.includes('med') || cat.includes('clinic')
                ? { bg: 'bg-teal-50 border-teal-200 text-teal-700', dot: 'bg-teal-600' }
                : cat.includes('restaurant') || cat.includes('billing') || cat.includes('food')
                ? { bg: 'bg-amber-50 border-amber-200 text-amber-700', dot: 'bg-amber-600' }
                : { bg: 'bg-purple-50 border-purple-200 text-purple-700', dot: 'bg-purple-600' };

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
                    <h3 className="text-base sm:text-lg font-black font-display tracking-wide text-slate-900 uppercase mb-2 leading-snug">
                      {project.name}
                    </h3>

                    {/* Category Pill & Features Row */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10.5px] font-mono font-bold uppercase tracking-wider ${pillStyles.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${pillStyles.dot}`} />
                        {project.category}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => toggleFeatures(project.id, e)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-600 hover:text-purple-700 transition-colors cursor-pointer"
                      >
                        <span>FEATURES</span>
                        {isFeaturesOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Expandable Features Drawer */}
                    {isFeaturesOpen && (
                      <div className="mb-4 p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs space-y-1.5 animate-fadeIn">
                        {project.features && project.features.slice(0, 4).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-1.5 text-slate-800 font-semibold text-[11.5px]">
                            <span className="text-purple-600 font-bold">•</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal mb-5 line-clamp-3">
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
      </div>
    </div>
  );
};
