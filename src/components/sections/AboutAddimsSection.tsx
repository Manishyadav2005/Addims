import React, { useState } from 'react';
import {
  Compass,
  Cpu,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Workflow,
  Boxes,
  ShieldCheck,
  Zap,
  Activity,
} from 'lucide-react';

interface AboutAddimsSectionProps {
  onStartProject?: () => void;
  onExploreWork?: () => void;
}

// --- SUB-COMPONENT: ADDIMS ENGINEERING CAPABILITIES & STANDARDS ---
const BusinessEcosystemVisual: React.FC = () => {
  const [activeCapability, setActiveCapability] = useState<number>(0);

  const capabilities = [
    {
      id: 'bespoke',
      num: '01',
      title: 'Bespoke Engineering',
      headline: 'Built around your workflows',
      desc: 'Zero generic templates. Custom-engineered around your exact operations and team habits.',
      badge: '100% TAILORED',
      icon: Cpu,
      color: 'text-purple-700',
      border: 'border-2 border-purple-300 hover:border-purple-500 bg-purple-50/40 hover:bg-purple-50/70',
      pillBg: 'bg-purple-100 text-purple-800 border-purple-300',
      iconBg: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'speed',
      num: '02',
      title: 'High-Performance Systems',
      headline: 'Sub-second real-time speed',
      desc: 'Optimized rendering pipelines, sub-15ms API latencies, and responsive web interfaces.',
      badge: '<15ms LATENCY',
      icon: Zap,
      color: 'text-blue-700',
      border: 'border-2 border-blue-300 hover:border-blue-500 bg-blue-50/40 hover:bg-blue-50/70',
      pillBg: 'bg-blue-100 text-blue-800 border-blue-300',
      iconBg: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'ai',
      num: '03',
      title: 'Applied Intelligence',
      headline: 'AI that drives measurable ROI',
      desc: 'Autonomous workflow agents and intelligent models that eliminate manual bottlenecks.',
      badge: 'AUTONOMOUS AI',
      icon: Sparkles,
      color: 'text-rose-700',
      border: 'border-2 border-rose-300 hover:border-rose-500 bg-rose-50/40 hover:bg-rose-50/70',
      pillBg: 'bg-rose-100 text-rose-800 border-rose-300',
      iconBg: 'bg-rose-100 text-rose-700',
    },
    {
      id: 'scale',
      num: '04',
      title: 'Enterprise Scalability',
      headline: 'Engineered for continuous growth',
      desc: 'Resilient cloud infrastructure and zero-downtime deployments as your business expands.',
      badge: '99.99% RELIABILITY',
      icon: ShieldCheck,
      color: 'text-emerald-700',
      border: 'border-2 border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50/70',
      pillBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none rounded-2xl sm:rounded-3xl bg-white border-2 border-purple-200 p-4 sm:p-5 shadow-[0_6px_25px_rgba(0,0,0,0.03)] overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-600/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-purple-100 pb-2.5 mb-3.5">
        <div className="flex items-center gap-1.5">
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-purple-600" />
          </div>
          <span className="text-[10.5px] font-mono text-black font-black tracking-wider uppercase">
            ADDIMS STUDIO CAPABILITIES
          </span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-[9.5px] font-mono text-purple-900 font-black">
          <Activity className="w-3 h-3 text-purple-600" />
          <span>PRODUCTION STANDARDS</span>
        </div>
      </div>

      {/* 4 Enhanced Capabilities Sub-Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 relative z-10 my-1">
        {capabilities.map((cap, idx) => {
          const Icon = cap.icon;
          const isSelected = activeCapability === idx;

          return (
            <div
              key={cap.id}
              onClick={() => setActiveCapability(idx)}
              className={`p-3 sm:p-3.5 rounded-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${cap.border} ${
                isSelected ? 'shadow-sm -translate-y-0.5 ring-2 ring-purple-400/30' : 'shadow-xs'
              }`}
            >
              <div>
                {/* Header: Icon + Title + Number Badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg bg-white shadow-xs ${cap.iconBg}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-black text-black font-display tracking-tight">
                      {cap.title}
                    </span>
                  </div>
                  <span className={`text-[8.5px] font-mono px-1.5 py-0.5 rounded border font-black ${cap.pillBg}`}>
                    {cap.num}
                  </span>
                </div>

                {/* Headline */}
                <div className="text-[11px] font-black text-black mb-1 font-display">
                  {cap.headline}
                </div>

                {/* Description */}
                <p className="text-[11px] text-black leading-snug font-bold mb-2.5">
                  {cap.desc}
                </p>
              </div>

              {/* Bottom Specification Tag */}
              <div className="flex items-center justify-between text-[8.5px] font-mono pt-1.5 border-t border-slate-300/80">
                <span className="text-black font-black uppercase tracking-wider">SPECIFICATION</span>
                <span className="text-black font-black tracking-wider">{cap.badge}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Live Telemetry Stats */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 mt-3 pt-2.5 border-t border-purple-100 text-[9.5px] font-mono text-black font-black">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Approach: <strong className="text-black font-black">Bespoke Build</strong></span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
          <span>Quality: <strong className="text-black font-black">Zero-Bloat Code</strong></span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span>Architecture: <strong className="text-black font-black">Continuous Scale</strong></span>
        </div>
      </div>
    </div>
  );
};

export const AboutAddimsSection: React.FC<AboutAddimsSectionProps> = () => {
  const [activeApproachStep, setActiveApproachStep] = useState<number>(0);

  const philosophyCards = [
    {
      num: '01',
      label: '01 — UNDERSTAND',
      title: 'Start with the business.',
      desc: 'We begin by understanding your real business operations, daily bottlenecks, customer touchpoints, and the people who use the software.',
      icon: Compass,
      accentColor: 'text-purple-700',
      border: 'border-2 border-purple-400 hover:border-purple-600',
    },
    {
      num: '02',
      label: '02 — ENGINEER',
      title: 'Build around reality.',
      desc: 'We design and engineer digital systems around your operational truth — eliminating rigid complexity and providing intuitive speed.',
      icon: Cpu,
      accentColor: 'text-emerald-700',
      border: 'border-2 border-emerald-400 hover:border-emerald-600',
    },
    {
      num: '03',
      label: '03 — EVOLVE',
      title: 'Keep improving.',
      desc: 'We build modular systems that easily evolve as your business scales, new branches open, and market opportunities emerge.',
      icon: RefreshCw,
      accentColor: 'text-rose-700',
      border: 'border-2 border-rose-400 hover:border-rose-600',
    },
  ];

  const approachSteps = [
    {
      step: '01',
      name: 'BUSINESS PROBLEM',
      tag: 'Identify & Scope',
      detail: 'Isolating operational bottlenecks and defining core technological objectives.',
    },
    {
      step: '02',
      name: 'UNDERSTAND',
      tag: 'Deep Workflow Analysis',
      detail: 'Mapping stakeholder habits, existing data flows, and business realities.',
    },
    {
      step: '03',
      name: 'DESIGN',
      tag: 'Bespoke Architecture',
      detail: 'Architecting clean user interfaces, intuitive interactions, and data schemas.',
    },
    {
      step: '04',
      name: 'ENGINEER',
      tag: 'Production-Grade Build',
      detail: 'Developing scalable codebases, resilient APIs, and purposeful automation.',
    },
    {
      step: '05',
      name: 'DEPLOY',
      tag: 'Seamless Rollout',
      detail: 'Zero-downtime deployment, onboarding integration, and telemetry validation.',
    },
    {
      step: '06',
      name: 'EVOLVE',
      tag: 'Continuous Scaling',
      detail: 'Refining and scaling features as operational demands expand.',
    },
  ];

  return (
    <section
      id="about"
      className="relative pt-12 pb-14 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 select-none scroll-mt-20"
    >
      {/* ============================================================ */}
      {/* 1. TOP CINEMATIC 3D HEADER: BOY SITTING CROSS-LEGGED (PALTHI) */}
      {/* ============================================================ */}
      <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-12 select-none">
        <div className="relative flex flex-col items-center justify-center">
          {/* 3D Boy Sitting Cross-Legged (Palthi Pose) */}
          <div className="relative w-24 sm:w-28 md:w-32 lg:w-36 -mb-[2px] sm:-mb-[3px] md:-mb-[3.5px] lg:-mb-[4px] z-20 pointer-events-none">
            <img
              src="/assets/boy_palthi_pure.png"
              alt="ADDIMS Boy Sitting Cross-Legged on Built With Purpose"
              className="w-full h-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
            />
          </div>

          {/* Compact Crisp 3D Heading: BUILT WITH PURPOSE */}
          <div className="relative z-10">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-wider uppercase text-slate-950 select-none px-4"
              style={{
                letterSpacing: '0.06em',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.18), 0 6px 16px rgba(0, 0, 0, 0.12)',
              }}
            >
              BUILT WITH PURPOSE
            </h2>
          </div>

          {/* Clean Subtitle */}
          <p className="mt-3 text-black text-sm sm:text-base font-extrabold tracking-wide max-w-lg">
            Technology should solve problems, not create them.
          </p>

          {/* Subtle Glowing Purple Divider Beam */}
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-3 opacity-80 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. EDITORIAL INTRO + BUSINESS ECOSYSTEM VISUAL               */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-14 sm:mb-18">
        {/* Left Side: Identity & Editorial Text */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono font-black text-purple-800 uppercase tracking-widest mb-4 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>STUDIO PHILOSOPHY</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-black font-display mb-4 tracking-tight leading-[1.2]">
            TURNING OPERATIONAL CHALLENGES INTO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-fuchsia-600 to-[#FF6900]">
              RELIABLE DIGITAL SYSTEMS.
            </span>
          </h3>

          {/* Main Description */}
          <p className="text-black text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-bold">
            ADDIMS builds practical digital products, intelligent systems and custom software around the way businesses actually work. From business management platforms to AI-powered solutions, we turn ideas and operational challenges into reliable digital systems.
          </p>

          {/* Key Value Badges with permanent borders */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { label: 'Business-Centered Architecture', icon: Boxes, border: 'border-2 border-purple-300' },
              { label: 'Reliable Engineering', icon: ShieldCheck, border: 'border-2 border-blue-300' },
              { label: 'Adaptive Intelligence', icon: Zap, border: 'border-2 border-rose-300' },
            ].map((badge, bIdx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={bIdx}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white ${badge.border} shadow-xs text-xs font-mono text-black font-black hover:scale-105 transition-transform`}
                >
                  <Icon className="w-3.5 h-3.5 text-purple-600" />
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Enhanced Business Technology Ecosystem Visual */}
        <div className="lg:col-span-6 w-full">
          <BusinessEcosystemVisual />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. CORE PHILOSOPHY (HOW WE THINK - 3 COLUMNS)               */}
      {/* ============================================================ */}
      <div className="mb-14 sm:mb-18">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono font-black text-purple-800 uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-purple-600" />
            <span>OPERATIONAL FOUNDATIONS</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-black uppercase">
            HOW WE THINK
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-3" />
        </div>

        {/* 3 Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophyCards.map((card, cIdx) => {
            const Icon = card.icon;
            return (
              <div
                key={cIdx}
                className={`group relative rounded-3xl bg-white p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_25px_rgba(0,0,0,0.04)] ${card.border} overflow-hidden flex flex-col justify-between`}
              >
                {/* Large Subtle Watermark Number */}
                <span className="absolute -top-4 -right-2 text-7xl sm:text-8xl font-black font-display text-slate-900/[0.04] group-hover:text-purple-600/[0.08] transition-colors pointer-events-none select-none">
                  {card.num}
                </span>

                <div className="relative z-10">
                  {/* Top Row: Icon + Label */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-purple-50 border border-purple-200 ${card.accentColor} group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-black text-purple-800 tracking-wider">
                      {card.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl sm:text-2xl font-black font-display text-black mb-3 group-hover:text-purple-700 transition-colors">
                    {card.title}
                  </h4>

                  {/* Description */}
                  <p className="text-black text-xs sm:text-sm leading-relaxed font-bold">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Border Accent */}
                <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10.5px] font-mono text-black font-black group-hover:text-purple-700 transition-colors">
                  <span>METHODOLOGY</span>
                  <span className={card.accentColor}>ADDIMS SPEC</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. OUR APPROACH (FROM PROBLEM TO POSSIBILITY)               */}
      {/* ============================================================ */}
      <div className="mb-14 sm:mb-18">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[11px] font-mono font-black text-purple-800 uppercase tracking-widest mb-3">
            <Workflow className="w-3.5 h-3.5 text-purple-600" />
            <span>DISCOVERY & EXECUTION PIPELINE</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-black uppercase mb-4">
            FROM PROBLEM TO POSSIBILITY.
          </h3>
          <p className="text-black text-xs sm:text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-bold">
            Every business has different processes, challenges and opportunities. ADDIMS transforms those requirements into technology that works with the business — not against it.
          </p>
        </div>

        {/* Interactive Process Flow Visualization */}
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-purple-100 p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
          {/* Visual Step Pipeline Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
            {approachSteps.map((st, sIdx) => {
              const isSelected = activeApproachStep === sIdx;
              return (
                <div
                  key={sIdx}
                  onClick={() => setActiveApproachStep(sIdx)}
                  className={`group p-4 rounded-xl transition-all duration-300 cursor-pointer border flex flex-col justify-between ${isSelected
                      ? 'bg-purple-50 border-purple-400 shadow-sm -translate-y-1'
                      : 'bg-slate-50 border-slate-300 hover:border-purple-300 hover:bg-slate-100/90'
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-black text-black">
                        {st.step}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${isSelected
                            ? 'bg-purple-600 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                            : 'bg-slate-400 group-hover:bg-slate-600'
                          }`}
                      />
                    </div>
                    <h5 className="text-xs sm:text-sm font-black font-display text-black mb-1 tracking-tight">
                      {st.name}
                    </h5>
                    <span className="text-[10.5px] font-mono text-black font-black block mb-2">
                      {st.tag}
                    </span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="pt-2 border-t border-slate-300 flex items-center justify-between text-[8.5px] font-mono text-black font-black">
                    <span>PHASE</span>
                    <ArrowRight
                      className={`w-3 h-3 transition-transform ${isSelected ? 'text-purple-700 translate-x-0.5' : 'text-black'
                        }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Step Details Context Box */}
          <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-purple-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-950 text-[10px] font-black">
                {approachSteps[activeApproachStep].step}
              </span>
              <span className="text-black font-black">
                {approachSteps[activeApproachStep].name}:
              </span>
              <span className="text-black font-black text-[12px]">
                {approachSteps[activeApproachStep].detail}
              </span>
            </div>
            <div className="text-black text-[10px] tracking-wider shrink-0 font-black">
              CLICK NODES TO INSPECT STAGES
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 6. BRAND STATEMENT (VISUAL CLIMAX OF THE ABOUT SECTION)      */}
      {/* ============================================================ */}
      <div className="relative pt-6 pb-8 sm:pt-8 sm:pb-10 my-4 text-center max-w-4xl mx-auto overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Minimal Overhead Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono text-purple-700 font-extrabold uppercase tracking-widest mb-4 sm:mb-5 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
          <span>OUR CORE COMMITMENT</span>
        </div>

        {/* Oversized Typography */}
        <blockquote className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display text-slate-950 uppercase tracking-tight leading-[1.18] sm:leading-[1.15]">
          “WE DON'T JUST BUILD SOFTWARE.{' '}
          <br className="hidden sm:inline" />
          WE{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-[#FF6900]">
            BUILD SYSTEMS
          </span>{' '}
          THAT{' '}
          <br className="hidden md:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-[#FF6900] to-[#FF6900]">
            MOVE BUSINESSES FORWARD.
          </span>
          ”
        </blockquote>
      </div>
    </section>
  );
};
