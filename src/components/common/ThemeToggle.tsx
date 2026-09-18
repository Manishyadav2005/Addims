import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
      aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl border transition-all duration-300 group cursor-pointer ${
        isLight
          ? 'bg-slate-100/90 border-slate-300 text-slate-800 hover:bg-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.06)]'
          : 'bg-[#0A101E]/80 border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {/* Sun Icon for switching to light or while in light */}
        <Sun
          className={`w-4 h-4 text-amber-500 transition-all duration-300 absolute ${
            isLight
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
        {/* Moon Icon for dark mode */}
        <Moon
          className={`w-4 h-4 text-cyan-400 transition-all duration-300 absolute ${
            isLight
              ? 'opacity-0 rotate-90 scale-0'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-mono font-medium tracking-wide">
          {isLight ? 'LIGHT' : 'DARK'}
        </span>
      )}
    </button>
  );
};
