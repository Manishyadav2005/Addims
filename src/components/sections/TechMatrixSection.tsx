import React from 'react';
import { Cpu, Terminal, Database, Globe, Zap } from 'lucide-react';

const TECH_CATEGORIES = [
  {
    category: 'Spatial 3D & Graphics',
    icon: Globe,
    color: 'text-purple-700',
    skills: ['Three.js', 'React Three Fiber', 'GLSL Custom Shaders', 'WebGPU', 'GSAP Physics', 'Blender Pipeline'],
  },
  {
    category: 'Full-Stack Platforms',
    icon: Terminal,
    color: 'text-[#FF6900]',
    skills: ['React 19 / 18', 'TypeScript', 'Next.js App Router', 'Tailwind CSS', 'Node.js Microservices', 'GraphQL'],
  },
  {
    category: 'Applied AI & Neural Systems',
    icon: Cpu,
    color: 'text-fuchsia-700',
    skills: ['Autonomous Agent Loops', 'LangChain / LlamaIndex', 'Pinecone / Qdrant RAG', 'Model Fine-tuning', 'Real-time TTS/STT', 'Function Calling'],
  },
  {
    category: 'Cloud, Edge & Reliability',
    icon: Database,
    color: 'text-[#FF6900]',
    skills: ['AWS / Cloudflare Workers', 'Docker & Kubernetes', 'Redis / PostgreSQL', 'Zero-Trust Auth', 'Distributed Edge CDNs', 'CI/CD Pipelines'],
  },
];

export const TechMatrixSection: React.FC = () => {
  return (
    <section id="tech-matrix" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 select-none">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono font-extrabold text-purple-700 mb-4 shadow-xs">
          <Zap className="w-3.5 h-3.5 text-purple-600" />
          <span>PRODUCTION-PROVEN ARCHITECTURES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-950 uppercase mb-4">
          Our Core Tech Matrix
        </h2>
        <p className="text-slate-900 text-sm sm:text-base font-bold">
          We leverage modern, battle-tested technologies to build ultra-fast, accessible, and future-proof digital platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TECH_CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="group relative rounded-3xl bg-white p-6 border border-purple-100/90 hover:border-purple-400/90 transition-all duration-500 flex flex-col justify-between shadow-[0_10px_35px_rgba(15,23,42,0.04),0_1px_3px_rgba(15,23,42,0.06)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(168,85,247,0.16)] overflow-hidden"
            >
              {/* Top Accent Gradient Beam */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2)] group-hover:scale-110 group-hover:shadow-[0_6px_18px_rgba(147,51,234,0.35)] transition-all duration-300">
                    <Icon className="w-5 h-5 text-purple-200" />
                  </div>
                  <h3 className="font-black font-display text-slate-950 text-base">{cat.category}</h3>
                </div>

                <ul className="space-y-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="text-xs font-mono text-slate-900 flex items-center gap-2 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 shadow-xs" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
