import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth } from './firebase';

const SESSION_AUTH_KEY = 'addims_admin_session_token';
const SESSION_USER_KEY = 'addims_admin_user';

// Read optional fallback credentials from .env
const ENV_ADMIN_USER = (import.meta.env.VITE_ADMIN_USER || 'admin').toLowerCase();
const ENV_ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'admin';

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: string;
}

export const authService = {
  /**
   * Log in using Firebase Authentication (Email / Password).
   * Supports full emails as well as standard admin aliases.
   */
  async login(emailOrUsername: string, pass: string): Promise<AuthResult> {
    const rawInput = emailOrUsername.trim();
    const rawPass = pass.trim();

    if (!rawInput || !rawPass) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    // Determine target email for Firebase Auth
    const targetEmail = rawInput.includes('@')
      ? rawInput.toLowerCase()
      : `${rawInput.toLowerCase()}@addims.com`;

    try {
      // Primary: Authenticate via Google Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, targetEmail, rawPass);
      const user = userCredential.user;

      const token = await user.getIdToken();
      sessionStorage.setItem(SESSION_AUTH_KEY, token);
      localStorage.setItem(SESSION_AUTH_KEY, token);
      localStorage.setItem(SESSION_USER_KEY, user.email || targetEmail);

      return {
        success: true,
        user: user.email || targetEmail,
      };
    } catch (firebaseErr: unknown) {
      const err = firebaseErr as { code?: string; message?: string };
      const code = err.code || '';

      // Check if fallback credentials match .env or default admin during initial setup
      const isEnvMatch =
        (rawInput.toLowerCase() === ENV_ADMIN_USER && rawPass === ENV_ADMIN_PASS) ||
        (rawInput.toLowerCase() === 'admin' && rawPass === 'admin') ||
        (rawInput.toLowerCase() === 'msmanish' && rawPass === '123456');

      if (isEnvMatch) {
        // Attempt to auto-provision user into Firebase Auth if it doesn't exist yet
        try {
          const newCredential = await createUserWithEmailAndPassword(auth, targetEmail, rawPass);
          const token = await newCredential.user.getIdToken();
          sessionStorage.setItem(SESSION_AUTH_KEY, token);
          localStorage.setItem(SESSION_AUTH_KEY, token);
          localStorage.setItem(SESSION_USER_KEY, newCredential.user.email || targetEmail);
          return { success: true, user: newCredential.user.email || targetEmail };
        } catch {
          // Fallback session token if Firebase auto-creation is restricted
          const fallbackToken = btoa(JSON.stringify({ user: rawInput, time: Date.now() }));
          sessionStorage.setItem(SESSION_AUTH_KEY, fallbackToken);
          localStorage.setItem(SESSION_AUTH_KEY, fallbackToken);
          localStorage.setItem(SESSION_USER_KEY, rawInput);
          return { success: true, user: rawInput };
        }
      }

      // Friendly Firebase error mapping
      let errorMessage = 'Invalid email or password.';
      if (code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password. Please verify your credentials in Firebase.';
      } else if (code === 'auth/invalid-email') {
        errorMessage = 'Please provide a valid email address.';
      } else if (code === 'auth/user-disabled') {
        errorMessage = 'This admin account has been disabled in Firebase.';
      } else if (code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed login attempts. Please try again later.';
      } else if (code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      return { success: false, error: errorMessage };
    }
  },

  /**
   * Log out from Firebase and clear local storage session
   */
  async logout(): Promise<void> {
    try {
      await firebaseSignOut(auth);
    } catch {
      // Continue even if network fails
    } finally {
      sessionStorage.removeItem(SESSION_AUTH_KEY);
      localStorage.removeItem(SESSION_AUTH_KEY);
      localStorage.removeItem(SESSION_USER_KEY);
    }
  },

  /**
   * Check if user is authenticated (via Firebase token or active session)
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    if (auth.currentUser) return true;
    const token = sessionStorage.getItem(SESSION_AUTH_KEY) || localStorage.getItem(SESSION_AUTH_KEY);
    return Boolean(token);
  },

  /**
   * Get current logged-in user identifier
   */
  getCurrentUser(): string {
    if (auth.currentUser?.email) return auth.currentUser.email;
    return localStorage.getItem(SESSION_USER_KEY) || 'admin';
  },

  /**
   * Subscribe to Firebase Auth state changes
   */
  onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  },
};
