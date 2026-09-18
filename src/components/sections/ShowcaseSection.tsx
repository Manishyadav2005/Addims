import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Aetheria Spatial OS',
    category: '3D Spatial Platform & WebGL',
    desc: 'An immersive in-browser spatial operating system built with Three.js, WebXR, and real-time multiplayer spatial audio.',
    tech: ['React Three Fiber', 'WebGL', 'TypeScript', 'WebAudio'],
    gradient: 'from-cyan-600/30 via-indigo-900/40 to-slate-950',
    stat: '+340% User Engagement',
  },
  {
    title: 'Nexus Autonomous AI Terminal',
    category: 'Enterprise AI & Automation',
    desc: 'Real-time multi-agent reasoning orchestrator handling millions of concurrent autonomous agent workflows with sub-second feedback.',
    tech: ['Next.js 15', 'Python Engine', 'Vector DB', 'Tailwind'],
    gradient: 'from-fuchsia-600/30 via-purple-900/40 to-slate-950',
    stat: '10M+ Operations / Day',
  },
  {
    title: 'Hyperion Quantum Cloud',
    category: 'Fintech & Cloud Infrastructure',
    desc: 'High-frequency telemetry dashboard processing over 500,000 streaming data packets per second with zero UI frame-drops.',
    tech: ['Rust WASM', 'React', 'WebSocket', 'Tailwind CSS'],
    gradient: 'from-blue-600/30 via-sky-900/40 to-slate-950',
    stat: '0.00ms Jitter SLA',
  },
];

export const ShowcaseSection: React.FC = () => {
  return (
    <section id="showcase" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-xs font-mono text-cyan-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SELECTED CLIENT SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            Pioneering Products.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
              Zero Compromise.
            </span>
          </h2>
        </div>

        <p className="text-slate-400 max-w-md text-sm sm:text-base">
          A glimpse into our recent production releases combining spatial design, high-concurrency systems, and boundary-pushing engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PROJECTS.map((proj, idx) => (
          <div
            key={idx}
            className="group relative rounded-3xl glass-panel border border-white/10 hover:border-cyan-400/40 transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            {/* Visual Header Mockup / Preview Banner */}
            <div className={`h-52 w-full bg-gradient-to-br ${proj.gradient} p-6 relative flex flex-col justify-between overflow-hidden border-b border-white/5`}>
              <div className="absolute inset-0 cyber-grid opacity-30 group-hover:opacity-60 transition-opacity" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full glass-panel text-[10px] font-mono text-cyan-300 border border-cyan-400/20">
                  {proj.category}
                </span>
                <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-white/70 group-hover:text-cyan-400 group-hover:scale-110 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="relative z-10">
                <span className="text-xs font-mono text-cyan-400 font-semibold">{proj.stat}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-7 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {proj.desc}
                </p>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {proj.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white/5 text-[11px] font-mono text-slate-300 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
