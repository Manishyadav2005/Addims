import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MSLogo } from '../common/MSLogo';
import { scrollToSection, scrollToTop } from '../../utils/scrollUtils';

interface NavbarProps {
  onStartProject?: () => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Hero' },
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

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isPastHero = window.scrollY > 80;
      setScrolled(isPastHero);

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
        if (sectionId === 'hero') {
          scrollToTop();
        } else {
          scrollToSection(sectionId, 80);
        }
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

  const isVisible = !isHome || scrolled;
  const visibilityClass = isVisible
    ? 'opacity-100 translate-y-0 pointer-events-auto'
    : 'opacity-0 -translate-y-full pointer-events-none';

  const headerBgClass = scrolled
    ? 'bg-[#080512]/95 backdrop-blur-2xl border-b border-white/[0.12] py-3 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(147,51,234,0.15)]'
    : 'bg-[#080512]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-out ${visibilityClass} ${headerBgClass}`}
    >
      {/* Specular Top Hairline Reflection */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

      {/* Ambient Subtle Bottom Neon Glow */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 via-cyan-400/20 to-transparent pointer-events-none" />

      <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between relative z-10">
        {/* Brand Logo & Editorial Studio Badge */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer select-none"
        >
          {/* Modern Premium MS Vector Logo Badge with Glow */}
          <div className="relative">
            <MSLogo size={38} glow={true} className="transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute -inset-1 rounded-2xl bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          {/* ADDIMS Wordmark */}
          <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-purple-200 group-hover:to-cyan-300 transition-all">
            ADDIMS
          </span>
        </div>

        {/* Center Glass Dock Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)]">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === '/' && activeSection === item.id;
            const itemStyle = isActive
              ? 'text-white bg-gradient-to-r from-purple-600/40 via-indigo-600/40 to-cyan-500/30 border border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.35)]'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.07] border border-transparent';

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center cursor-pointer ${itemStyle}`}
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 px-4 sm:px-8 pt-4 pb-4 mt-3 flex flex-col gap-2 bg-[#080512]/95 backdrop-blur-2xl animate-fadeIn">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === '/' && activeSection === item.id;
            const mobileItemStyle = isActive
              ? 'text-white bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
              : 'text-slate-300 border-white/5 hover:bg-white/[0.05] hover:text-white';

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-xs font-black uppercase tracking-wider py-2.5 px-3.5 rounded-xl border transition-all flex items-center justify-between ${mobileItemStyle}`}
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
    </header>
  );
};
