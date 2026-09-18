import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, Zap, Layers, Cpu, Code2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SCOPES = [
  { id: 'spatial', label: 'Business Management', icon: Layers },
  { id: 'webapp', label: 'Healthcare / Hotel', icon: Code2 },
  { id: 'ai', label: 'AI & Intelligent Systems', icon: Cpu },
  { id: 'custom', label: 'Custom Architecture', icon: Zap },
];

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const [selectedScope, setSelectedScope] = useState('spatial');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedScopeObj = SCOPES.find((s) => s.id === selectedScope);
      const formData = new FormData();
      formData.append('access_key', 'f9990d66-e435-4c8c-a8a4-6268f35a44eb');
      formData.append('subject', `⚡ Launch Project Inquiry: ${name} (${selectedScopeObj?.label || selectedScope})`);
      formData.append('from_name', name);
      formData.append('Name', name);
      formData.append('Email', email);
      formData.append('Scope', selectedScopeObj?.label || selectedScope);
      formData.append('Project Brief', description);

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      setSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#9333EA', '#A855F7'],
      });

      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setDescription('');
        onClose();
      }, 3500);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
      <div
        className="relative w-full max-w-xl rounded-3xl bg-white border border-purple-200 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black font-display text-slate-950">
              Project Signal Transmitted
            </h3>
            <p className="text-xs sm:text-sm font-mono text-slate-800 font-bold max-w-md mx-auto leading-relaxed">
              Thank you, {name || 'Partner'}. Our engineering team has received your architecture brief and will connect within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-mono font-black uppercase tracking-wider text-slate-900 transition-all cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-purple-700 mb-2 font-mono text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Direct Project Initiation</span>
            </div>
            <h3 className="text-2xl font-black font-display text-slate-950 mb-2 uppercase tracking-tight">
              Launch Your Next Digital Architecture
            </h3>
            <p className="text-slate-800 text-xs sm:text-sm mb-6 font-semibold">
              Specify your project scope below. We engineer bespoke platforms, web ecosystems, and applied intelligence systems.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Scope Selector */}
              <div>
                <label className="text-[11px] font-mono text-slate-950 uppercase font-black block mb-2">
                  Select System Scope
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SCOPES.map((scope) => {
                    const Icon = scope.icon;
                    const active = selectedScope === scope.id;
                    return (
                      <button
                        type="button"
                        key={scope.id}
                        onClick={() => setSelectedScope(scope.id)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                          active
                            ? 'bg-purple-50 border-purple-500 text-purple-900 font-bold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-900 font-semibold hover:text-purple-700 hover:border-purple-200'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0 text-purple-600" />
                        <span className="text-xs font-mono truncate">{scope.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-950 uppercase font-black block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aditya Jaiswal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-950 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-950 uppercase font-black block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-950 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-950 uppercase font-black block mb-1">
                  Project Brief & Objectives
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline key business goals, target timelines, or architectural requirements..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-950 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 disabled:opacity-60 text-white font-black font-display uppercase tracking-wider text-xs hover:opacity-95 shadow-[0_4px_20px_rgba(147,51,234,0.3)] hover:shadow-[0_6px_25px_rgba(147,51,234,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>{loading ? 'TRANSMITTING...' : 'TRANSMIT SPECIFICATION'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
