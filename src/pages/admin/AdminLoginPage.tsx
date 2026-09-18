import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { authService } from '../../services/authService';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const success = authService.login(username, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid credentials. Please verify your admin access.');
        setLoading(false);
      }
    }, 400);
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] technical-blueprint-grid text-slate-900 flex flex-col items-center justify-center p-4 relative select-none selection:bg-purple-600 selection:text-white overflow-hidden">
      {/* Background Soft Purple Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Centered Login Card */}
      <div className="relative z-10 w-full max-w-[430px] p-8 sm:p-10 rounded-[32px] bg-white border border-purple-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col items-center">
        {/* Brand Icon Squircle Badge */}
        <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-200 mb-5 shadow-xs flex items-center justify-center text-purple-700">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
          >
            <path d="M4 19V5l8 6 8-6v14" />
          </svg>
        </div>

        {/* Brand Header */}
        <h1 className="text-2xl font-black font-display text-slate-900 tracking-wider uppercase mb-1 text-center">
          ADDIMS STUDIO
        </h1>
        <p className="text-[11px] font-mono font-bold text-purple-700 tracking-[0.25em] uppercase mb-7 text-center">
          ADMIN PORTAL
        </p>

        {/* Error Alert */}
        {error && (
          <div className="w-full mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs font-mono text-rose-700">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full space-y-4">
          {/* Email / Username Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email or Username"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer transition-colors"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white font-extrabold font-display uppercase tracking-wider text-sm hover:opacity-95 shadow-[0_4px_20px_rgba(147,51,234,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span>SIGN IN</span>
            )}
          </button>
        </form>

        {/* Security Tag */}
        <p className="mt-6 text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase font-semibold text-center">
          AUTHORIZED PERSONNEL ONLY
        </p>

        {/* 1-Click Quick Autofill */}
        <div className="mt-5 w-full pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>
            Demo: <strong className="text-slate-900">admin / admin</strong>
          </span>
          <button
            type="button"
            onClick={handleQuickFill}
            className="px-2.5 py-1 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-all cursor-pointer font-bold"
          >
            Auto Fill
          </button>
        </div>
      </div>

      {/* Powered by MS Footer Note */}
      <div className="relative z-10 mt-6 flex flex-col items-center gap-2">
        <p className="text-xs font-mono text-slate-500">
          Powered by <span className="text-purple-700 font-bold">MS</span>
        </p>
        <a
          href="/"
          className="text-xs font-mono text-slate-500 hover:text-purple-700 transition-colors font-medium"
        >
          ← Return to public website
        </a>
      </div>
    </div>
  );
};
