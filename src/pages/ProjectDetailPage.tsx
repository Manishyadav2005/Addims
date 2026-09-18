import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Play,
  CheckCircle2,
  Layers,
  X,
  ArrowRight,
  Maximize2,
} from 'lucide-react';
import type { Project } from '../types/project';
import { getProjectBySlug, getRelatedProjects, initProjectDatabase } from '../services/projectDb';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    async function loadProject() {
      if (!slug) return;
      setLoading(true);
      await initProjectDatabase();
      const proj = await getProjectBySlug(slug);
      setProject(proj);

      if (proj) {
        const related = await getRelatedProjects(proj.slug, proj.category, 3);
        setRelatedProjects(related);
      }
      setLoading(false);
    }
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center text-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
          <span className="text-xs font-mono text-purple-700 uppercase tracking-wider font-bold">Loading System Case Study...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center text-slate-900 px-4">
        <div className="p-8 rounded-3xl bg-white border border-purple-100 shadow-md text-center max-w-md">
          <Layers className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-display text-slate-900 mb-2">Project Not Found</h2>
          <p className="text-slate-600 text-xs font-mono mb-6">
            The requested project does not exist or is currently restricted.
          </p>
          <button
            onClick={() => navigate('/showcase')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all cursor-pointer shadow-sm"
          >
            Back to Showcase
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-slate-900 relative selection:bg-purple-600 selection:text-white">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-[650px] h-[650px] bg-purple-600/5 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-1/4 w-[550px] h-[550px] bg-violet-600/5 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 select-none">
        {/* Back Link */}
        <button
          onClick={() => navigate('/showcase')}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 hover:text-purple-700 transition-colors mb-8 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-purple-600" />
          <span>BACK TO ALL PROJECTS</span>
        </button>

        {/* Project Header / Hero */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-mono text-[#FF6900] font-bold shadow-xs">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 font-medium">
              {project.projectType}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-mono text-[#FF6900] font-bold">
                Featured System
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-slate-950 uppercase mb-3">
            {project.name}
          </h1>

          <p className="text-base sm:text-xl font-extrabold text-[#FF6900] font-display mb-6">
            {project.shortTitle}
          </p>

          <p className="text-slate-800 text-sm sm:text-base leading-relaxed max-w-3xl mb-8 font-semibold">
            {project.shortDescription}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white font-black text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_4px_20px_rgba(147,51,234,0.3)]"
              >
                <span>Launch Live System</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-purple-200 text-purple-700 font-black text-xs uppercase tracking-wider hover:bg-purple-50 shadow-xs transition-all"
              >
                <Play className="w-4 h-4 text-purple-600" />
                <span>Interactive Demo</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-mono font-bold text-xs hover:text-purple-700 hover:border-purple-300 shadow-xs transition-all"
              >
                <Code2 className="w-4 h-4 text-purple-600" />
                <span>Source Architecture</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Media Display */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-100 border border-purple-100 mb-16 shadow-[0_15px_45px_rgba(0,0,0,0.08)] aspect-video max-h-[600px] w-full">
          <img
            src={project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Core Architecture Breakdown & Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-8 space-y-10">
            {/* System Overview */}
            <div className="p-8 rounded-3xl bg-white border border-purple-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
              <h2 className="text-xl sm:text-2xl font-black font-display text-slate-950 mb-4">
                Architecture & Engineering Overview
              </h2>
              <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 font-semibold">
                {project.fullDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Key Deliverables & Features */}
            <div className="p-8 rounded-3xl bg-white border border-purple-100 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
              <h2 className="text-xl sm:text-2xl font-black font-display text-slate-950 mb-6">
                Key Engineered Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-950 font-bold"
                  >
                    <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Gallery */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-black font-display text-slate-950">
                  System Gallery & Interface Telemetry
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.galleryImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedLightboxImage(imgUrl)}
                      className="group relative h-52 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 hover:border-purple-400 cursor-pointer transition-all shadow-sm"
                    >
                      <img
                        src={imgUrl}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white">
                          <Maximize2 className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Specs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-purple-100 space-y-6 shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
              <h3 className="text-sm font-black font-mono text-purple-700 uppercase tracking-wider border-b border-slate-100 pb-3">
                System Metadata
              </h3>

              {project.clientName && (
                <div>
                  <span className="text-[10px] font-mono text-purple-700 uppercase font-extrabold block mb-1">
                    Client / Partner
                  </span>
                  <span className="text-sm font-black text-slate-950 block">
                    {project.clientName}
                  </span>
                  {project.clientIndustry && (
                    <span className="text-xs font-mono text-slate-600 font-bold">
                      {project.clientIndustry}
                    </span>
                  )}
                </div>
              )}

              <div>
                <span className="text-[10px] font-mono text-purple-700 uppercase font-extrabold block mb-1">
                  Category
                </span>
                <span className="text-sm font-black text-slate-950 block">
                  {project.category}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-purple-700 uppercase font-extrabold block mb-2">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-xs font-mono text-purple-700 font-black"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Systems */}
        {relatedProjects.length > 0 && (
          <div className="pt-16 border-t border-slate-200">
            <h2 className="text-2xl font-black font-display text-slate-950 mb-8">
              Related Engineered Systems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/showcase/${rel.slug}`)}
                  className="group rounded-2xl bg-white border border-purple-100 hover:border-purple-300 p-5 cursor-pointer transition-all shadow-sm hover:shadow-md hover:-translate-y-1.5"
                >
                  <div className="h-36 rounded-xl bg-slate-100 overflow-hidden mb-4 border border-slate-200">
                    <img
                      src={rel.coverImage}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-purple-700 uppercase font-extrabold block mb-1">
                    {rel.category}
                  </span>
                  <h3 className="text-base font-black font-display text-slate-950 group-hover:text-purple-700 transition-colors mb-2">
                    {rel.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-mono text-purple-700 font-bold group-hover:text-purple-900">
                    <span>View System</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedLightboxImage && (
        <div
          onClick={() => setSelectedLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <button
            onClick={() => setSelectedLightboxImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedLightboxImage}
            alt="Expanded view"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl border border-white/20"
          />
        </div>
      )}
    </div>
  );
};
