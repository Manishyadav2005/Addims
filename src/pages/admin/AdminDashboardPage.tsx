import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  CheckCircle2,
  FileText,
  Star,
  PlusCircle,
  ArrowRight,
  ExternalLink,
  Edit3,
  Share2,
} from 'lucide-react';
import type { Project } from '../../types/project';
import { getAllProjects, initProjectDatabase } from '../../services/projectDb';

export const AdminDashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      await initProjectDatabase();
      const all = await getAllProjects();
      setProjects(all);
      setLoading(false);
    }
    load();
  }, []);

  const total = projects.length;
  const published = projects.filter((p) => p.status === 'Published').length;
  const drafts = projects.filter((p) => p.status === 'Draft').length;
  const featured = projects.filter((p) => p.featured).length;

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Studio Dashboard
          </h1>
          <p className="text-xs font-mono text-slate-500 mt-1 font-semibold">
            Real-time project inventory & publishing metrics
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/projects/new')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs font-display uppercase tracking-wider hover:bg-sky-500 transition-all shadow-md cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Metrics Row (Light Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase block font-bold">Total Systems</span>
            <span className="text-2xl font-black font-display text-slate-900 mt-1 block">{loading ? '...' : total}</span>
          </div>
          <div className="p-3 rounded-xl bg-orange-50 text-[#FF6900] border border-orange-100">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase block font-bold">Live Published</span>
            <span className="text-2xl font-black font-display text-emerald-600 mt-1 block">{loading ? '...' : published}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase block font-bold">Drafts / In-Dev</span>
            <span className="text-2xl font-black font-display text-amber-600 mt-1 block">{loading ? '...' : drafts}</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-500 uppercase block font-bold">Homepage Featured</span>
            <span className="text-2xl font-black font-display text-[#FF6900] mt-1 block">{loading ? '...' : `${featured} / 3`}</span>
          </div>
          <div className="p-3 rounded-xl bg-orange-50 text-[#FF6900] border border-orange-100">
            <Star className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recent Projects Table (Clean Light Table) */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <h2 className="text-base font-bold font-display text-slate-900">Recent Projects & Systems</h2>
          <button
            onClick={() => navigate('/admin/projects')}
            className="text-xs font-mono font-bold text-[#FF6900] hover:opacity-80 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-mono text-slate-400">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="py-12 text-center text-xs font-mono text-slate-400">No projects added yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Project</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Featured</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.slice(0, 5).map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          {project.coverImage ? (
                            <img
                              src={project.coverImage}
                              alt={project.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 font-mono text-xs">
                              {(project.name || 'P').charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            {project.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {project.clientName || project.projectType} • {project.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="text-xs font-mono text-slate-600 font-medium">
                        {project.category}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          project.status === 'Published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      {project.featured ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#FF6900] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-[#FF6900] text-[#FF6900]" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`/showcase/${project.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-[#FF6900] transition-colors"
                          title="View Public Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Social Media & Global Channels Configuration Overview */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-bold font-display text-slate-900">
              Social Media Channels & Footer Links
            </h3>
          </div>
          <p className="text-xs font-mono text-slate-500">
            Configure dynamic URLs for LinkedIn, Facebook, YouTube, Instagram, and X (Twitter) shown in the footer.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/social-links')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-mono text-xs font-bold hover:bg-purple-500 transition-all shadow-md cursor-pointer shrink-0"
        >
          <Share2 className="w-4 h-4" />
          <span>Manage Social Links</span>
        </button>
      </div>
    </div>
  );
};

