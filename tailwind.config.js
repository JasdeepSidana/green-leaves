/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        botanical: {
          50: '#f4f7f4',
          100: '#e5ede5',
          200: '#cdddc9',
          300: '#a6c49e',
          400: '#7aa66f',
          500: '#588a4c',
          600: '#426f37',
          700: '#35572e',
          800: '#2c4627',
          900: '#166534', // forest emerald
          950: '#0f381d',
        },
        emerald: {
          DEFAULT: '#166534',
          light: '#22C55E',
          dark: '#14532D',
          deep: '#064E3B',
        },
        gold: {
          DEFAULT: '#FFC72C', // Dubai 24K pure radiant yellow gold
          light: '#FFE57F',   // Luminous Dubai gold highlight
          dark: '#C58F00',    // Burnished luxury Dubai gold
          amber: '#F59E0B',
          glow: '#FFF3A8',
          dubai: '#FFD700',   // Pure 24K Dubai Gold
          metallic: '#F5C518',
        },
        charcoal: {
          DEFAULT: '#111827',
          pure: '#0B0F0E',
          surface: '#18201D',
          border: '#27322E',
          card: '#1F2925',
        },
        warmWhite: '#F9FAF8',
        softBg: '#F3F6F2',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(22, 101, 52, 0.12), 0 0 20px 0 rgba(0, 0, 0, 0.04)',
        'luxury-dark': '0 25px 50px -12px rgba(0, 0, 0, 0.65), 0 0 30px rgba(255, 199, 44, 0.2)',
        'gold-glow': '0 0 25px rgba(255, 199, 44, 0.45)',
        'gold-dubai': '0 0 35px rgba(255, 199, 44, 0.55), 0 0 12px rgba(255, 215, 0, 0.35)',
        'emerald-glow': '0 0 25px rgba(34, 197, 94, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
