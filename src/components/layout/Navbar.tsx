import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MSLogo } from '../common/MSLogo';
import { scrollToSection, scrollToTop } from '../../utils/scrollUtils';

interface NavbarProps {
  onStartProject?: () => void;
}

const NAV_ITEMS = [
  { id: 'capabilities', label: 'Services' },
  { id: 'showcase', label: 'Our Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onStartProject }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      if (location.pathname === '/') {
        const scrollPosition = window.scrollY + 200;
        for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
          const item = NAV_ITEMS[i];
          const elem = document.getElementById(item.id);
          if (elem) {
            const top = elem.offsetTop;
            if (scrollPosition >= top) {
              setActiveSection(item.id);
              break;
            }
          }
        }
      }
    };

    if (location.pathname !== '/') {
      setScrolled(true);
    } else {
      setScrolled(window.scrollY > 80);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (sectionId?: string, route?: string) => {
    setMobileMenuOpen(false);
    if (route) {
      navigate(route);
    } else if (sectionId) {
      if (location.pathname !== '/') {
        navigate(`/#${sectionId}`);
      } else {
        scrollToSection(sectionId, 80);
      }
    }
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      scrollToTop();
    }
  };

  return (
    <header
      className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-500"
    >
      <div
        className={`w-full max-w-6xl pointer-events-auto rounded-2xl sm:rounded-3xl transition-all duration-500 relative overflow-hidden ${
          scrolled
            ? 'bg-[#080512]/90 backdrop-blur-2xl border border-white/[0.14] py-2.5 px-4 sm:px-6 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(147,51,234,0.2)]'
            : 'bg-[#080512]/75 backdrop-blur-xl border border-white/[0.1] py-3 px-4 sm:px-7 shadow-[0_15px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(147,51,234,0.12)]'
        }`}
      >
        {/* Specular Top Hairline Reflection */}
        <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
        
        {/* Ambient Subtle Bottom Neon Glow */}
        <div className="absolute inset-x-12 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          {/* Brand Logo & Editorial Studio Badge */}
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-3 group cursor-pointer select-none"
          >
            {/* Modern Premium MS Vector Logo Badge with Glow */}
            <div className="relative">
              <MSLogo size={38} glow={true} className="transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute -inset-1 rounded-2xl bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* ADDIMS Wordmark & Live Studio Status */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg sm:text-xl tracking-[0.2em] text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-purple-200 group-hover:to-cyan-300 transition-all">
                  ADDIMS
                </span>
              </div>
              <div className="flex items-center gap-1.5 -mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                <span className="text-[9px] font-mono font-bold tracking-[0.22em] text-slate-400 group-hover:text-cyan-400 transition-colors uppercase">
                  DIGITAL STUDIO
                </span>
              </div>
            </div>
          </div>

          {/* Center Glass Dock Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)]">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === '/' && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center cursor-pointer ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-purple-600/40 via-indigo-600/40 to-cyan-500/30 border border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.07] border border-transparent'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] mr-1.5 animate-pulse" />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Header Button: High-End Radiant CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onStartProject}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider text-white transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] active:scale-95 cursor-pointer bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-400 flex items-center gap-2 border border-white/20"
            >
              {/* Shimmer sweep animation */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              
              <span className="relative z-10 font-bold">Launch Project</span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-cyan-200 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Header Controls: Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white hover:bg-white/15 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer (Inside Floating Island) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 pt-4 mt-3 flex flex-col gap-2 animate-fadeIn">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === '/' && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-xs font-black uppercase tracking-wider py-2.5 px-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                      : 'text-slate-300 border-white/5 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                  )}
                </button>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onStartProject) onStartProject();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-black text-xs uppercase tracking-wider text-center mt-2 shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all flex items-center justify-center gap-1.5 border border-white/20 active:scale-98"
            >
              <span>Launch Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-200" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

