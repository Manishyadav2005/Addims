const SESSION_AUTH_KEY = 'addims_admin_session_token';

// Read credentials from .env via Vite import.meta.env or default presets
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USER || 'admin';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin';

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

export const authService = {
  login(user: string, pass: string): boolean {
    const trimmedUser = user.trim().toLowerCase();
    const trimmedPass = pass.trim();

    // Accept primary credentials as well as standard admin aliases
    const isValid =
      (trimmedUser === 'admin' && trimmedPass === 'admin') ||
      (trimmedUser === 'admin' && trimmedPass === '123456') ||
      (trimmedUser === 'msmanish' && trimmedPass === '123456') ||
      (trimmedUser === ADMIN_USERNAME.toLowerCase() && trimmedPass === ADMIN_PASSWORD);

    if (isValid) {
      const token = btoa(JSON.stringify({ user: trimmedUser, timestamp: Date.now() }));
      sessionStorage.setItem(SESSION_AUTH_KEY, token);
      localStorage.setItem('addims_admin_user', trimmedUser);
      return true;
    }
    return false;
  },

  logout(): void {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    localStorage.removeItem('addims_admin_user');
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const token = sessionStorage.getItem(SESSION_AUTH_KEY);
    if (!token) return false;
    try {
      const decoded = JSON.parse(atob(token));
      return Boolean(decoded && decoded.user);
    } catch {
      return false;
    }
  },

  getCurrentUser(): string {
    return localStorage.getItem('addims_admin_user') || 'admin';
  },
};
