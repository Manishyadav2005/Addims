import React from 'react';
import { Box, Code, Cpu, Cloud, Sparkles, ArrowRight } from 'lucide-react';

const CAPABILITIES = [
  {
    icon: Box,
    tag: 'SPATIAL & IMMERSIVE',
    title: '3D Web & Interactive WebGL',
    desc: 'Bespoke Three.js, React Three Fiber, custom GLSL shaders, and WebGPU interactive 3D landscapes that mesmerize audiences.',
    color: 'from-cyan-500/20 to-blue-600/10',
    borderColor: 'group-hover:border-cyan-400/50',
    iconColor: 'text-cyan-400',
    stats: '60 FPS Smooth Fidelity',
  },
  {
    icon: Code,
    tag: 'FULL-STACK LAB',
    title: 'Web Platforms & Software',
    desc: 'High-performance Next.js and React enterprise architectures, headless systems, microservices, and reactive web applications.',
    color: 'from-blue-500/20 to-indigo-600/10',
    borderColor: 'group-hover:border-blue-400/50',
    iconColor: 'text-blue-400',
    stats: '99.9% Uptime Architecture',
  },
  {
    icon: Cpu,
    tag: 'INTELLIGENCE',
    title: 'Applied AI & Autonomous Agents',
    desc: 'Custom neural workflows, LLM fine-tuning, RAG vector pipelines, and intelligent interactive user interfaces.',
    color: 'from-fuchsia-500/20 to-violet-600/10',
    borderColor: 'group-hover:border-fuchsia-400/50',
    iconColor: 'text-fuchsia-400',
    stats: 'Multi-Modal Reasoning',
  },
  {
    icon: Cloud,
    tag: 'SCALE & RESILIENCE',
    title: 'Cloud Systems & Infrastructure',
    desc: 'Distributed Kubernetes deployments, edge caching, serverless clusters, and zero-trust security foundations.',
    color: 'from-violet-500/20 to-cyan-600/10',
    borderColor: 'group-hover:border-violet-400/50',
    iconColor: 'text-violet-400',
    stats: '<50ms Global Edge Routing',
  },
];

export const CapabilitiesSection: React.FC = () => {
  return (
    <section id="capabilities" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-xs font-mono text-cyan-400 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WHAT WE ENGINEER</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-6">
          Architected for the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400">
            Next Era of Tech
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
          We combine cutting-edge creative design with battle-tested systems engineering to deliver category-defining digital experiences.
        </p>
      </div>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {CAPABILITIES.map((cap, index) => {
          const Icon = cap.icon;
          return (
            <div
              key={index}
              className={`group relative rounded-3xl glass-panel p-8 sm:p-10 border border-white/10 ${cap.borderColor} transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden`}
            >
              {/* Card Ambient Glow Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cap.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-2xl bg-white/5 border border-white/10 ${cap.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                      {cap.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed mb-6">
                    {cap.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-semibold">{cap.stats}</span>
                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-white transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
