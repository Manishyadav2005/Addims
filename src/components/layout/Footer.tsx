import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  ArrowUp,
  ArrowUpRight,
} from 'lucide-react';
import { MSLogo } from '../common/MSLogo';
import { SocialIcons } from '../common/SocialIcons';
import { scrollToSection, scrollToTop } from '../../utils/scrollUtils';

interface FooterProps {
  onStartProject?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onStartProject }) => {
  const navigate = useNavigate();

  return (
    <footer className="relative border-t border-purple-950/50 bg-[#09060E] text-slate-400 pt-16 pb-12 px-4 sm:px-6 lg:px-8 z-10 select-none overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-violet-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Info (Col Span 5) */}
          <div className="lg:col-span-5 space-y-5">
            <div
              onClick={() => scrollToTop()}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <MSLogo size={40} glow={true} className="transition-transform duration-300 group-hover:scale-105" />
              <span className="font-display font-black text-2xl tracking-wider text-white group-hover:text-purple-300 transition-colors">
                ADDIMS
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md font-medium">
              Ideas. Built Forward.{' '}
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="text-slate-300 hover:text-purple-300 transition-colors font-medium cursor-pointer underline decoration-dotted decoration-purple-500/70 hover:decoration-purple-300 underline-offset-4"
                title="Admin Gateway"
              >
                Architecting
              </button>{' '}
              custom software, intelligent enterprise platforms, and bespoke digital ecosystems built for tangible business impact.
            </p>

            {/* Direct Contact Links */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs font-mono font-semibold text-slate-300">
              <a
                href="mailto:msproject9918@gmail.com"
                className="inline-flex items-center gap-2 hover:text-purple-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>msproject9918@gmail.com</span>
              </a>

              <a
                href="tel:+919250710533"
                className="inline-flex items-center gap-2 hover:text-purple-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>+91 9250710533</span>
              </a>
            </div>

            {/* Social Media Links (Admin Dynamic Configuration) */}
            <div className="pt-3 space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Connect With Us
              </span>
              <SocialIcons variant="dark" size="md" />
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Quick Navigation (Col Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('capabilities', 80)}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Services & Capabilities
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('showcase', 80)}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Featured Work
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('about', 80)}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  About Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('founder', 80)}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Founder's Message
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onStartProject) onStartProject();
                    else scrollToSection('contact', 80);
                  }}
                  className="hover:text-purple-300 transition-colors cursor-pointer text-purple-400 font-bold flex items-center gap-1"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Engineered Solutions (Col Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('capabilities', 80)}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Business Management
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('capabilities', 80)}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Healthcare Systems
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('capabilities', 80)}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Hotel & Booking OS
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('capabilities', 80)}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Restaurant Cloud POS
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('capabilities', 80)}
                  className="hover:text-purple-300 transition-colors cursor-pointer"
                >
                  Autonomous AI & Automation
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="pt-8 border-t border-purple-950/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} ADDIMS. All rights reserved.
          </div>

          <button
            type="button"
            onClick={() => scrollToTop()}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/60 transition-all flex items-center justify-center cursor-pointer shadow-xs"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
