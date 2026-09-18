import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle, ArrowRight, User } from 'lucide-react';
import { authService } from '../../services/authService';
import { MSLogo } from '../../components/common/MSLogo';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await authService.login(username, password);
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error || 'Invalid credentials. Please verify your admin access.');
      }
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || 'Authentication failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] technical-blueprint-grid text-slate-900 flex flex-col items-center justify-center p-4 relative select-none selection:bg-purple-600 selection:text-white overflow-hidden">
      {/* Background Soft Ambient Purple Glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Centered Login Card */}
      <div className="relative z-10 w-full max-w-[420px] p-7 sm:p-9 rounded-[32px] bg-white border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.1)] flex flex-col items-center">
        {/* Brand Header: Authentic MS Logo + ADDIMS */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3.5">
            <MSLogo size={46} glow={true} className="shadow-md" />
            <div className="absolute -inset-2 rounded-2xl bg-purple-500/15 blur-md pointer-events-none" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight uppercase text-center">
            ADDIMS
          </h1>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="w-full mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs font-mono text-rose-700">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full space-y-4">
          {/* Username or Email Field */}
          <div>
            <label className="block text-xs font-bold text-slate-900 tracking-wider uppercase mb-1.5 font-mono">
              Username or Email
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 hover:border-slate-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-500/15 text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal transition-all outline-none shadow-xs"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-slate-900 tracking-wider uppercase mb-1.5 font-mono">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 hover:border-slate-400 focus:border-purple-600 focus:ring-4 focus:ring-purple-500/15 text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal transition-all outline-none shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 mt-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold font-display uppercase tracking-wider text-xs sm:text-sm hover:opacity-95 shadow-[0_4px_20px_rgba(147,51,234,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>SIGN IN</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Return to website link */}
      <div className="relative z-10 mt-6 flex flex-col items-center">
        <a
          href="/"
          className="text-xs font-mono font-bold text-slate-500 hover:text-purple-700 transition-colors inline-flex items-center gap-1.5"
        >
          <span>←</span> Return to website
        </a>
      </div>
    </div>
  );
};
