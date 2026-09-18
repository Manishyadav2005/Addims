import React, { useEffect, useState } from 'react';
import {
  getSocialLinksSync,
  subscribeToSocialLinks,
} from '../../services/settingsService';
import type { SocialLinks } from '../../types/settings';

// Custom SVG Icons for exact brand aesthetics
export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
  </svg>
);

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M21.58 7.19a2.76 2.76 0 0 0-1.95-1.96C17.9 4.75 12 4.75 12 4.75s-5.9 0-7.63.48c-.96.26-1.7.99-1.96 1.96A28.8 28.8 0 0 0 2 12a28.8 28.8 0 0 0 .41 4.81c.26.96.99 1.7 1.96 1.96 1.73.48 7.63.48 7.63.48s5.9 0 7.63-.48a2.76 2.76 0 0 0 1.95-1.96c.28-1.56.42-3.18.42-4.81 0-1.63-.14-3.25-.42-4.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface SocialItemConfig {
  id: keyof SocialLinks;
  name: string;
  icon: React.FC<{ className?: string }>;
  defaultUrl: string;
  hoverClasses: string;
  glowColor: string;
}

export const SOCIAL_PLATFORMS: SocialItemConfig[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: LinkedInIcon,
    defaultUrl: 'https://linkedin.com/company/addims',
    hoverClasses: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10',
    glowColor: 'hover:shadow-[0_0_16px_rgba(10,102,194,0.4)]',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: FacebookIcon,
    defaultUrl: 'https://facebook.com/addims',
    hoverClasses: 'hover:text-[#1877F2] hover:border-[#1877F2]/60 hover:bg-[#1877F2]/10',
    glowColor: 'hover:shadow-[0_0_16px_rgba(24,119,242,0.4)]',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: YouTubeIcon,
    defaultUrl: 'https://youtube.com/@addims',
    hoverClasses: 'hover:text-[#FF0000] hover:border-[#FF0000]/60 hover:bg-[#FF0000]/10',
    glowColor: 'hover:shadow-[0_0_16px_rgba(255,0,0,0.4)]',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: InstagramIcon,
    defaultUrl: 'https://instagram.com/addims',
    hoverClasses: 'hover:text-[#E4405F] hover:border-[#E4405F]/60 hover:bg-[#E4405F]/10',
    glowColor: 'hover:shadow-[0_0_16px_rgba(228,64,95,0.4)]',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    icon: XIcon,
    defaultUrl: 'https://x.com/addims',
    hoverClasses: 'hover:text-white hover:border-white/60 hover:bg-white/10',
    glowColor: 'hover:shadow-[0_0_16px_rgba(255,255,255,0.3)]',
  },
];

interface SocialIconsProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabels?: boolean;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
  showLabels = false,
}) => {
  const [links, setLinks] = useState<SocialLinks>(getSocialLinksSync());

  useEffect(() => {
    // Initial fetch
    setLinks(getSocialLinksSync());

    // Subscribe to live updates from CMS
    const unsubscribe = subscribeToSocialLinks((updated) => {
      setLinks(updated);
    });

    return () => unsubscribe();
  }, []);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  const baseThemeClasses =
    variant === 'dark'
      ? 'bg-slate-900/90 border-purple-900/40 text-slate-400 hover:text-white'
      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs';

  return (
    <div className={`flex items-center gap-2.5 flex-wrap ${className}`}>
      {SOCIAL_PLATFORMS.map((platform) => {
        const IconComponent = platform.icon;
        const targetUrl = (links[platform.id] || platform.defaultUrl).trim();

        return (
          <a
            key={platform.id}
            href={targetUrl || '#'}
            target={targetUrl ? '_blank' : undefined}
            rel="noopener noreferrer"
            aria-label={platform.name}
            title={`${platform.name} (Opens: ${targetUrl || 'Not configured'})`}
            className={`group relative flex items-center justify-center rounded-xl border transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${sizeClasses} ${baseThemeClasses} ${platform.hoverClasses} ${platform.glowColor}`}
          >
            <IconComponent className={`${iconSizes} transition-transform duration-300 group-hover:scale-110`} />

            {/* Micro Tooltip */}
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-950/95 border border-purple-500/30 text-[10px] font-mono text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 shadow-lg">
              {platform.name}
            </span>

            {showLabels && (
              <span className="ml-2 text-xs font-mono font-medium">
                {platform.name}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
};
