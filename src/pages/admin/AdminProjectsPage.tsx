import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Layers,
  AlertTriangle,
  Sparkles,
  Check,
} from 'lucide-react';
import type { Project } from '../../types/project';
import {
  getAllProjects,
  deleteProject,
  togglePublishProject,
  toggleFeaturedProject,
  initProjectDatabase,
} from '../../services/projectDb';

type FilterTab = 'All' | 'Published' | 'Draft' | 'Featured' | 'Client Projects' | 'ADDIMS Products';

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadProjects = async () => {
    await initProjectDatabase();
    const all = await getAllProjects();
    setProjects(all);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleTogglePublish = async (id: string) => {
    setActionLoading(true);
    const updated = await togglePublishProject(id);
    await loadProjects();
    setActionLoading(false);
    showToast(`Project status changed to: ${updated.status}`);
  };

  const handleToggleFeatured = async (id: string) => {
    setActionLoading(true);
    const updated = await toggleFeaturedProject(id);
    await loadProjects();
    setActionLoading(false);
    showToast(
      updated.featured
        ? `⭐ "${updated.name}" is now SELECTED for Main Page!`
        : `"${updated.name}" removed from Main Page.`
    );
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    await deleteProject(deleteTarget.id);
    setDeleteTarget(null);
    await loadProjects();
    setActionLoading(false);
    showToast('Project deleted successfully.');
  };

  const filteredProjects = projects.filter((p) => {
    let matchesTab = true;
    if (activeTab === 'Published') matchesTab = p.status === 'Published';
    else if (activeTab === 'Draft') matchesTab = p.status === 'Draft';
    else if (activeTab === 'Featured') matchesTab = p.featured === true;
    else if (activeTab === 'Client Projects') matchesTab = p.projectType === 'Client Project';
    else if (activeTab === 'ADDIMS Products') matchesTab = p.projectType === 'ADDIMS Product';

    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const featuredList = projects.filter((p) => p.featured === true && p.status === 'Published');

  return (
    <div className="space-y-6 select-none">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold shadow-2xl animate-fade-in border border-slate-700">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Project Inventory
          </h1>
          <p className="text-xs font-mono text-slate-500 mt-1 font-semibold">
            Select which projects appear on the Main Page or manage all showcase case studies.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/projects/new')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs font-display uppercase tracking-wider hover:bg-sky-500 transition-all shadow-md cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Add New Project</span>
        </button>
      </div>

      {/* --- HOMEPAGE SPOTLIGHT CONTROL BANNER --- */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-sky-50 border border-purple-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-extrabold font-display text-slate-900">
                Main Page Spotlight Selection ({featuredList.length} Selected)
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-purple-200/80 text-purple-900 text-[10px] font-mono font-bold">
                TOP 3 DISPLAYED
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Use the toggle switch on each project row below to choose which 3 projects appear in the "BUILT BY ADDIMS" section on the homepage.
            </p>
          </div>
        </div>

        {/* Selected Badges Quick View */}
        <div className="flex flex-wrap items-center gap-1.5">
          {featuredList.length === 0 ? (
            <span className="text-xs font-mono text-amber-700 bg-amber-100 px-3 py-1 rounded-lg font-bold">
              Default: Latest 3 projects will be shown
            </span>
          ) : (
            featuredList.slice(0, 3).map((f) => (
              <span
                key={f.id}
                className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-purple-900 text-xs font-mono font-bold shadow-xs flex items-center gap-1"
              >
                <span>⭐ {f.name}</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Filter Tabs & Search Controls (Light Card) */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {(['All', 'Published', 'Draft', 'Featured', 'Client Projects', 'ADDIMS Products'] as FilterTab[]).map(
            (tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer font-bold ${
                    active
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              );
            }
          )}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-medium"
          />
        </div>
      </div>

      {/* Projects Table (Light Table with Interactive Main Page Toggle Switch) */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs font-mono text-slate-400">Loading projects database...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-16 text-center">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700">No projects found</p>
            <p className="text-xs font-mono text-slate-400 mt-1">Try another search query or add a new project.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Project & Client</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Publish Status</th>
                  <th className="pb-3 font-semibold">Show on Main Page</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map((p) => {
                  const isMainPage = p.featured === true;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Project & Client */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                            {p.coverImage ? (
                              <img
                                src={p.coverImage}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 font-mono text-xs">
                                {(p.name || 'P').charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <a
                              href={`/showcase/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-bold text-slate-900 hover:text-[#FF6900] transition-colors flex items-center gap-1.5"
                            >
                              <span>{p.name}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                            </a>
                            <span className="text-[11px] font-mono text-slate-500 block">
                              {p.clientName || p.projectType} • {p.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 pr-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-medium">
                          {p.category}
                        </span>
                      </td>

                      {/* Publish Status Toggle */}
                      <td className="py-4 pr-4">
                        <button
                          onClick={() => handleTogglePublish(p.id)}
                          disabled={actionLoading}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                            p.status === 'Published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                          }`}
                        >
                          {p.status === 'Published' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                          )}
                          <span>{p.status}</span>
                        </button>
                      </td>

                      {/* Interactive Main Page Toggle Switch */}
                      <td className="py-4 pr-4">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(p.id)}
                          disabled={actionLoading}
                          className={`group/switch inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                            isMainPage
                              ? 'bg-purple-100 border-purple-300 text-purple-900 shadow-xs'
                              : 'bg-slate-100 border-slate-200 text-slate-500 hover:border-slate-300'
                          }`}
                          title={isMainPage ? 'Click to remove from Main Page' : 'Click to display on Main Page (Top 3)'}
                        >
                          {/* Animated Toggle Track & Thumb */}
                          <div
                            className={`w-9 h-5 rounded-full p-0.5 transition-colors flex items-center ${
                              isMainPage ? 'bg-purple-600 justify-end' : 'bg-slate-300 justify-start'
                            }`}
                          >
                            <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                          </div>

                          {/* Label Badge */}
                          <span className="text-xs font-mono font-bold">
                            {isMainPage ? '⭐ ON Main Page' : 'Showcase Only'}
                          </span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => navigate(`/admin/projects/edit/${p.id}`)}
                            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(p)}
                            className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-colors cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal (Light Theme) */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 rounded-xl bg-rose-50">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">Delete Project?</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-slate-900">{deleteTarget.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-mono font-bold text-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-mono font-bold text-white transition-colors cursor-pointer"
              >
                {actionLoading ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
