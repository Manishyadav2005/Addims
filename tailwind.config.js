/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#05070D',
          darker: '#020306',
          card: 'rgba(12, 17, 29, 0.75)',
          border: 'rgba(255, 255, 255, 0.08)',
          cyan: '#00F0FF',
          blue: '#3B82F6',
          violet: '#8B5CF6',
          magenta: '#EC4899',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Outfit', 'Cabinet Grotesk', 'sans-serif'],
        signature: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'glow-cyan': '0 0 30px -5px rgba(0, 240, 255, 0.35)',
        'glow-violet': '0 0 30px -5px rgba(139, 92, 246, 0.35)',
        'glow-box': '0 0 50px -10px rgba(0, 240, 255, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
