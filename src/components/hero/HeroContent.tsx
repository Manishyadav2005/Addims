import React from 'react';
import { ArrowRight, Sparkles, Code2, ShieldCheck, Zap, Layers } from 'lucide-react';

interface HeroContentProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  onStartProject,
  onExploreWork,
}) => {
  return (
    <div className="flex flex-col justify-center max-w-xl z-10 pointer-events-auto select-none">
      {/* Top Studio Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 w-fit mb-5 shadow-glow-cyan/20 animate-pulse-slow">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span className="tracking-wider uppercase font-semibold">NEXT-GEN DIGITAL LAB & STUDIO</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display leading-[1.08] mb-6 text-white">
        Ideas.{' '}
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
          Built Forward.
        </span>
      </h1>

      {/* Narrative Description */}
      <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-lg font-light">
        We architect high-impact digital products, spatial 3D web platforms, intelligent software, and enterprise-grade cloud solutions that define industry leaders.
      </p>

      {/* CTA Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <button
          onClick={onExploreWork}
          className="group relative px-7 py-3.5 rounded-xl font-medium text-sm text-slate-100 glass-panel border border-white/15 hover:border-cyan-400/60 hover:bg-cyan-500/10 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2.5 overflow-hidden"
        >
          <span className="relative z-10 font-semibold tracking-wide">Explore Our Work</span>
          <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <button
          onClick={onStartProject}
          className="group relative px-7 py-3.5 rounded-xl font-semibold text-sm text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:from-cyan-300 hover:to-fuchsia-400 transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] flex items-center gap-2 overflow-hidden active:scale-95"
        >
          <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
          <span>Start a Project</span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all" />
        </button>
      </div>

      {/* Live Brand Metric Strip */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-white/10 max-w-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-cyan-400 font-display font-bold text-xl sm:text-2xl">
            <span>50+</span>
            <Code2 className="w-4 h-4 opacity-75" />
          </div>
          <span className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider font-mono">Global Launches</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-fuchsia-400 font-display font-bold text-xl sm:text-2xl">
            <span>99.9%</span>
            <ShieldCheck className="w-4 h-4 opacity-75" />
          </div>
          <span className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider font-mono">Uptime SLA</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-sky-400 font-display font-bold text-xl sm:text-2xl">
            <span>Spatial 3D</span>
            <Layers className="w-4 h-4 opacity-75" />
          </div>
          <span className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider font-mono">WebGL & Three.js</span>
        </div>
      </div>
    </div>
  );
};
