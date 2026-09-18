import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAQekEseJm9mh9BiLsFUS1hCtN3hBydI1Q',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'addims.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'addims',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'addims.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '499359302528',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:499359302528:web:ad9662ff3fa1871748f765',
};

// Initialize Firebase once
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

