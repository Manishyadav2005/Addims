import React from 'react';
import { Quote, Sparkles, Target, ShieldCheck } from 'lucide-react';

export const FounderSection: React.FC = () => {
  return (
    <section
      id="founder"
      className="relative pt-12 pb-14 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 select-none scroll-mt-20"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* LEFT COLUMN (ON DESKTOP): FOUNDER PORTRAIT WITH ULTRA-THIN LUXURY BADGE */}
        <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
          <div className="relative w-full max-w-[460px] group">
            {/* Outer Warm Glowing Halo */}
            <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-purple-500/20 via-violet-500/15 to-indigo-600/20 blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-700" />

            {/* Glass Card Container */}
            <div className="relative rounded-[32px] bg-white border border-purple-200 p-3 sm:p-4 backdrop-blur-2xl shadow-[0_15px_45px_rgba(168,85,247,0.12)] group-hover:border-purple-300 transition-all duration-500">
              {/* Image Frame */}
              <div className="relative rounded-[24px] overflow-hidden bg-slate-100 aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src="/assets/founder_portrait.jpg"
                  alt="Aditya Jaiswal — Founder of ADDIMS"
                  className="w-full h-full object-cover rounded-[20px] filter contrast-[1.02] brightness-[1.01] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Subtle Bottom Vignette */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />

                {/* Ultra-Thin Frosted Glass Identity Badge: ADITYA JAISWAL - FOUNDER */}
                <div className="absolute bottom-3.5 sm:bottom-4 inset-x-4 sm:inset-x-6 z-20">
                  <div className="relative mx-auto rounded-2xl bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_10px_35px_rgba(0,0,0,0.18)] py-2 sm:py-2.5 px-4 text-center transition-all duration-300 group-hover:border-purple-300 group-hover:bg-white/95">
                    <h3 className="font-display font-black text-sm sm:text-base text-slate-950 tracking-wider uppercase leading-tight">
                      ADITYA JAISWAL
                    </h3>
                    <p className="text-[10px] sm:text-[10.5px] font-mono font-extrabold text-purple-700 tracking-[0.25em] uppercase mt-0.5">
                      FOUNDER
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (ON DESKTOP): HEADINGS, VALUES & QUOTE CARD */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center animate-fade-in-up">
          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-black font-display tracking-tight uppercase leading-tight mb-4 flex flex-wrap items-center gap-x-3 sm:gap-x-4">
            <span className="text-black">FOUNDER'S</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-violet-600 to-[#FF6900]">
              MESSAGE
            </span>
          </h2>

          {/* Purple Horizontal Accent Line */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-[2px] bg-purple-600 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
            <div className="w-2 h-[2px] bg-purple-400 rounded-full" />
          </div>

          {/* Philosophy Statement */}
          <div className="space-y-4 mb-8 text-sm sm:text-base text-black leading-relaxed font-bold">
            <p>
              "When we started <strong className="text-black font-black">ADDIMS</strong>, our goal was simple: to build technology that does not just exist on screens, but drives measurable, real-world operational growth for every business we partner with."
            </p>
            <p className="text-xs sm:text-sm text-black font-bold">
              "We reject generic templates and unnecessary bloat. Every line of code, every system architecture, and every AI integration is purpose-engineered from the ground up to solve concrete operational bottlenecks."
            </p>
          </div>

          {/* Core Pillars / Values Pill Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Purpose-Driven', icon: Target, desc: 'Zero bloat architecture' },
              { label: 'Obsessive Craft', icon: Sparkles, desc: 'Pixel & logic perfection' },
              { label: 'Built for Scale', icon: ShieldCheck, desc: 'Enterprise reliability' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-purple-200 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1 text-purple-700">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-black text-black uppercase tracking-wider font-mono">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-black font-mono font-bold">
                    {item.desc}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quote Card */}
          <div className="relative rounded-2xl bg-purple-50/80 border-l-4 border-purple-600 border border-purple-200 p-5 sm:p-6 shadow-sm">
            <Quote className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-display italic text-base sm:text-lg text-black font-black leading-snug">
              "Technology should be intuitive enough for a first-time user, yet robust enough to manage enterprise-scale operations."
            </p>
            <span className="block mt-3 text-xs font-mono text-purple-800 font-black uppercase tracking-wider">
              — Aditya Jaiswal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
