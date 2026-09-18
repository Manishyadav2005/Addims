import React from 'react';
import {
  Building2,
  HeartPulse,
  Hotel,
  UtensilsCrossed,
  Bot,
  Globe,
  Boxes,
} from 'lucide-react';

interface WhatWeBuildSectionProps {
  onSelectCategory?: (category: string) => void;
}

interface SolutionCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  tags: string[];
  ctaText: string;
  iconBg: string;
  iconColor: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  borderColor: string;
  ctaColor: string;
}

const SOLUTIONS: SolutionCard[] = [
  {
    id: 'business-management',
    icon: Building2,
    title: 'BUSINESS MANAGEMENT',
    desc: 'Custom management systems that connect customers, operations, teams and workflows into one unified platform.',
    tags: ['CRM & CLIENTS', 'WORKFLOW AUTOMATION', 'BUSINESS ANALYTICS', 'MULTI-BRANCH'],
    ctaText: 'LEARN MORE →',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-600',
    tagBorder: 'border-blue-100',
    borderColor: 'border-2 border-blue-400 hover:border-blue-600',
    ctaColor: 'text-blue-600 hover:text-blue-700',
  },
  {
    id: 'healthcare-systems',
    icon: HeartPulse,
    title: 'HEALTHCARE SYSTEMS',
    desc: 'Smart hospital and clinical management systems designed to simplify patient records, staff and daily operations.',
    tags: ['SMART EHR TELEMETRY', 'DOCTOR QUEUES', 'APPOINTMENTS', 'BILLING & RX'],
    ctaText: 'LEARN MORE →',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    tagBg: 'bg-purple-50',
    tagText: 'text-purple-600',
    tagBorder: 'border-purple-100',
    borderColor: 'border-2 border-purple-400 hover:border-purple-600',
    ctaColor: 'text-blue-600 hover:text-blue-700',
  },
  {
    id: 'hotel-management',
    icon: Hotel,
    title: 'HOTEL MANAGEMENT',
    desc: 'Digital systems designed for hospitality businesses to manage bookings, guest requests, rooms and staff.',
    tags: ['ROOM BOOKING', 'GUEST PORTAL', 'KEYLESS CHECK-IN', 'REVENUE REPORTS'],
    ctaText: 'LEARN MORE →',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    tagBg: 'bg-emerald-50',
    tagText: 'text-emerald-600',
    tagBorder: 'border-emerald-100',
    borderColor: 'border-2 border-emerald-400 hover:border-emerald-600',
    ctaColor: 'text-blue-600 hover:text-blue-700',
  },
  {
    id: 'restaurant-billing',
    icon: UtensilsCrossed,
    title: 'RESTAURANT & BILLING',
    desc: 'Restaurant management and billing solutions built to simplify orders, payments, recipe inventory and reports.',
    tags: ['CLOUD POS', 'KDS INVENTORY', 'SPLIT BILLING', 'GST INVOICING'],
    ctaText: 'LEARN MORE →',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    tagBg: 'bg-sky-50',
    tagText: 'text-sky-600',
    tagBorder: 'border-sky-100',
    borderColor: 'border-2 border-sky-400 hover:border-sky-600',
    ctaColor: 'text-blue-600 hover:text-blue-700',
  },
  {
    id: 'ai-intelligent-systems',
    icon: Bot,
    title: 'AI & INTELLIGENT SYSTEMS',
    desc: 'AI assistants, intelligent chatbots and automation systems designed to interact with customers and streamline work.',
    tags: ['AUTONOMOUS AI', 'DOCUMENT PARSING', 'PREDICTIVE COPILOT', 'NLP CHATBOTS'],
    ctaText: 'LEARN MORE →',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    tagBg: 'bg-rose-50',
    tagText: 'text-rose-600',
    tagBorder: 'border-rose-100',
    borderColor: 'border-2 border-rose-400 hover:border-rose-600',
    ctaColor: 'text-blue-600 hover:text-blue-700',
  },
  {
    id: 'web-digital-solutions',
    icon: Globe,
    title: 'WEB & DIGITAL SOLUTIONS',
    desc: 'Modern, high-performance web applications and digital platforms that help brands stand out and convert visitors.',
    tags: ['REACT/NEXT.JS', '3D SPATIAL UI', '100/100 LIGHTHOUSE', 'SEO OPTIMIZATION'],
    ctaText: 'LEARN MORE →',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    tagBg: 'bg-amber-50',
    tagText: 'text-amber-700',
    tagBorder: 'border-amber-100',
    borderColor: 'border-2 border-amber-400 hover:border-amber-600',
    ctaColor: 'text-blue-600 hover:text-blue-700',
  },
];

export const WhatWeBuildSection: React.FC<WhatWeBuildSectionProps> = ({ onSelectCategory }) => {
  const handleArrowClick = (title: string) => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
    if (onSelectCategory) {
      onSelectCategory(title);
    }
  };

  return (
    <section id="capabilities" className="relative pt-16 pb-12 sm:pt-20 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 select-none scroll-mt-20">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* --- 3D CINEMATIC HEADER --- */}
      <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-12 select-none">
        <div className="relative flex flex-col items-center justify-center">
          {/* Transparent Sleeping Boy */}
          <div className="relative w-44 sm:w-56 md:w-64 -mb-[3px] sm:-mb-[4px] md:-mb-[5px] z-20 pointer-events-none">
            <img
              src="/assets/sleeping_boy_pure.png"
              alt="ADDIMS Boy Sleeping"
              className="w-full h-auto object-contain filter drop-shadow-[0_3px_8px_rgba(0,0,0,0.25)]"
            />
          </div>

          <div className="relative z-10">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-wider uppercase text-slate-950 select-none px-4"
              style={{
                letterSpacing: '0.06em',
                textShadow:
                  '0 1px 0 #94a3b8, 0 2px 0 #64748b, 0 3px 0 #475569, 0 4px 0 #334155, 0 6px 14px rgba(15, 23, 42, 0.45)',
              }}
            >
              ENGINEERED FOR BUSINESS
            </h2>
          </div>
        </div>

        {/* Small Subtitle */}
        <p className="mt-3 text-xs sm:text-sm md:text-base font-black text-black uppercase tracking-widest max-w-2xl px-4">
          Tailored Digital Systems, Web Ecosystems & Enterprise Software
        </p>

        {/* Subtle Glowing Purple Divider Beam */}
        <div className="w-14 sm:w-16 h-[2px] mx-auto mt-3 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
      </div>

      {/* --- EXACT REFERENCE STYLE 6 CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
        {SOLUTIONS.map((sol) => {
          const Icon = sol.icon;

          return (
            <div
              key={sol.id}
              className={`group relative rounded-3xl bg-white p-6 sm:p-7 border ${sol.borderColor} transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1.5`}
            >
              <div>
                {/* Top Left Soft Pastel Icon Box */}
                <div className={`w-12 h-12 rounded-2xl ${sol.iconBg} ${sol.iconColor} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Card Title (Bold Uppercase Sans) */}
                <h3 className="text-base sm:text-lg font-black font-display tracking-wide text-black uppercase mb-2">
                  {sol.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-[13.5px] text-black leading-relaxed font-semibold mb-5">
                  {sol.desc}
                </p>

                {/* Horizontal Pastel Pill Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                  {sol.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`px-3 py-1 rounded-full text-[10px] sm:text-[10.5px] font-black tracking-wide uppercase border ${sol.tagBg} ${sol.tagText} ${sol.tagBorder}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Blue Uppercase CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleArrowClick(sol.title)}
                  className={`text-xs sm:text-[13px] font-black uppercase tracking-wide ${sol.ctaColor} flex items-center gap-1.5 cursor-pointer group/link`}
                >
                  <span>{sol.ctaText}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- ROW 3: 07 BESPOKE CUSTOM SOFTWARE CARD --- */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border-2 border-emerald-400 hover:border-emerald-600 transition-all duration-300 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Boxes className="w-6 h-6" />
            </div>

            <h3 className="text-base sm:text-xl font-black font-display tracking-wide text-black uppercase mb-2">
              CUSTOM SOFTWARE & ECOSYSTEMS
            </h3>

            <p className="text-xs sm:text-[13.5px] text-black leading-relaxed font-semibold mb-5">
              When off-the-shelf software does not fit your business model, we design, architect, and engineer high-performance bespoke digital systems tailored exactly to your operational workflows.
            </p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
              {['TAILORED LOGIC', 'API INTEGRATION', 'ENTERPRISE SCALE', 'SUB-SECOND EXECUTION'].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-[10px] sm:text-[10.5px] font-black tracking-wide uppercase border bg-emerald-50 text-emerald-700 border-emerald-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              type="button"
              onClick={() => handleArrowClick('Custom Software')}
              className="text-xs sm:text-sm font-black uppercase tracking-wide text-blue-700 hover:text-blue-900 flex items-center gap-2 cursor-pointer"
            >
              <span>EXPLORE CUSTOM ARCHITECTURE →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
