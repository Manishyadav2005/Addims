import React from 'react';

interface MSLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const MSLogo: React.FC<MSLogoProps> = ({
  size = 40,
  className = '',
  glow = true,
}) => {
  const fontSize = Math.round(size * 0.42);

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none rounded-xl sm:rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/80 shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_16px_rgba(168,85,247,0.3)] hover:scale-105 transition-all duration-300 group overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Soft Ambient Inner Glow on Hover */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/25 via-transparent to-indigo-600/25 opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      {/* Subtle Top Glass Reflection Line */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Ultra-Clean Modern MS Brand Typography */}
      <div
        className="relative z-10 flex items-center justify-center font-display font-black leading-none tracking-tight"
        style={{ fontSize: `${fontSize}px` }}
      >
        <span className="text-white">M</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
          S
        </span>
      </div>
    </div>
  );
};





