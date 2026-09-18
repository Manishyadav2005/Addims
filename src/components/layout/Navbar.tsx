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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled || location.pathname !== '/'
          ? 'opacity-100 translate-y-0 pointer-events-auto bg-white/90 backdrop-blur-2xl border-b border-purple-100 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.06)]'
          : 'opacity-0 -translate-y-full pointer-events-none py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name: MS Logo + ADDIMS */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-3 group cursor-pointer"
        >
          {/* Modern Premium MS Vector Logo Badge */}
          <MSLogo size={40} glow={true} className="transition-transform duration-300 group-hover:scale-105" />

          {/* ADDIMS Text */}
          <div className="flex flex-col">
            <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-slate-950 group-hover:text-purple-700 transition-colors">
              ADDIMS
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-200 bg-white/95 shadow-sm backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === '/' && activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                  isActive
                    ? 'text-purple-700 bg-purple-100/70 shadow-xs'
                    : 'text-slate-950 hover:text-purple-700 hover:bg-purple-50/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Header Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onStartProject}
            className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-700 transition-all flex items-center gap-1.5 shadow-[0_4px_15px_rgba(147,51,234,0.25)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.35)] group cursor-pointer active:scale-98"
          >
            <span>Launch Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Header Controls: Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-100 px-6 py-6 mt-3 flex flex-col gap-3 bg-white/98 backdrop-blur-2xl shadow-xl animate-fadeIn">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === '/' && activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm font-black py-2.5 px-3 rounded-xl border transition-all ${
                  isActive
                    ? 'text-purple-700 bg-purple-50 border-purple-200'
                    : 'text-slate-950 border-transparent hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onStartProject) onStartProject();
            }}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider text-center mt-2 shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <span>Launch Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      )}
    </header>
  );
};

