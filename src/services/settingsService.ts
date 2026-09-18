import type { SocialLinks, SiteSettings } from '../types/settings';

const SETTINGS_LS_KEY = 'addims_site_settings';
export const SOCIAL_LINKS_UPDATED_EVENT = 'addims_social_links_updated';

export const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  linkedin: 'https://linkedin.com/company/addims',
  facebook: 'https://facebook.com/addims',
  youtube: 'https://youtube.com/@addims',
  instagram: 'https://instagram.com/addims',
  x: 'https://x.com/addims',
};

const DEFAULT_SETTINGS: SiteSettings = {
  socialLinks: DEFAULT_SOCIAL_LINKS,
  updatedAt: new Date().toISOString(),
};

/**
 * Reads settings synchronously from localStorage with defaults fallback.
 */
export function getSettingsSync(): SiteSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_LS_KEY);
    if (!raw) {
      // Initialize with default
      localStorage.setItem(SETTINGS_LS_KEY, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      socialLinks: {
        ...DEFAULT_SOCIAL_LINKS,
        ...(parsed.socialLinks || {}),
      },
    };
  } catch (err) {
    console.warn('Error reading settings from localStorage:', err);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Gets social links synchronously.
 */
export function getSocialLinksSync(): SocialLinks {
  return getSettingsSync().socialLinks;
}

/**
 * Gets social links asynchronously (for consistent API pattern).
 */
export async function getSocialLinks(): Promise<SocialLinks> {
  return getSocialLinksSync();
}

/**
 * Saves new social links to localStorage and notifies all listeners.
 */
export async function saveSocialLinks(links: Partial<SocialLinks>): Promise<SocialLinks> {
  const current = getSettingsSync();
  const updatedLinks: SocialLinks = {
    ...current.socialLinks,
    ...links,
  };

  const updatedSettings: SiteSettings = {
    ...current,
    socialLinks: updatedLinks,
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(SETTINGS_LS_KEY, JSON.stringify(updatedSettings));
    
    // Broadcast within window
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(SOCIAL_LINKS_UPDATED_EVENT, {
          detail: updatedLinks,
        })
      );
    }
  } catch (err) {
    console.error('Failed to save social links to localStorage:', err);
  }

  return updatedLinks;
}

/**
 * Resets social links to original defaults.
 */
export async function resetSocialLinks(): Promise<SocialLinks> {
  return saveSocialLinks(DEFAULT_SOCIAL_LINKS);
}

/**
 * Subscribes a React component to real-time changes in social links.
 * Returns an unsubscribe function.
 */
export function subscribeToSocialLinks(callback: (links: SocialLinks) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleCustomEvent = (event: Event) => {
    const customEvent = event as CustomEvent<SocialLinks>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    } else {
      callback(getSocialLinksSync());
    }
  };

  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === SETTINGS_LS_KEY) {
      callback(getSocialLinksSync());
    }
  };

  window.addEventListener(SOCIAL_LINKS_UPDATED_EVENT, handleCustomEvent);
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    window.removeEventListener(SOCIAL_LINKS_UPDATED_EVENT, handleCustomEvent);
    window.removeEventListener('storage', handleStorageEvent);
  };
}
