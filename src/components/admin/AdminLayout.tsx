import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Share2,
  Globe,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { authService } from '../../services/authService';
import { MSLogo } from '../common/MSLogo';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const username = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-slate-900 flex flex-col md:flex-row selection:bg-sky-500 selection:text-white font-sans">
      {/* Sidebar Navigation (Clean White Light Theme) */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-5 flex flex-col justify-between shrink-0 select-none shadow-[2px_0_15px_rgba(0,0,0,0.03)] z-20">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 mb-7 pb-4 border-b border-slate-100">
            <MSLogo size={36} />
            <div>
              <span className="font-extrabold font-display text-slate-900 text-base tracking-wider block">
                ADDIMS CMS
              </span>
              <span className="text-[11px] font-mono text-[#FF6900] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Studio
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-orange-50 text-[#FF6900] border border-orange-200 font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4 text-[#FF6900]" />
                <span>Dashboard</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </NavLink>

            <NavLink
              to="/admin/projects"
              end
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-orange-50 text-[#FF6900] border border-orange-200 font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <FolderKanban className="w-4 h-4 text-[#FF6900]" />
                <span>All Projects</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </NavLink>

            <NavLink
              to="/admin/projects/new"
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-orange-50 text-[#FF6900] border border-orange-200 font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>Add New Project</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </NavLink>

            <NavLink
              to="/admin/social-links"
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-orange-50 text-[#FF6900] border border-orange-200 font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Share2 className="w-4 h-4 text-purple-600" />
                <span>Social Links</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </NavLink>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-100 space-y-2 mt-6">
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 mb-3">
            <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Signed in as</span>
            <span className="text-xs font-mono font-bold text-slate-800">@{username}</span>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-mono text-slate-600 hover:text-[#FF6900] hover:bg-slate-50 rounded-xl transition-all font-semibold"
          >
            <Globe className="w-4 h-4 text-[#FF6900]" />
            <span>View Public Website</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs font-mono text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all font-semibold cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area (Pristine Light Theme with Blueprint Grid) */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto max-h-screen bg-[#F8F7F4] technical-blueprint-grid">
        <Outlet />
      </main>
    </div>
  );
};
