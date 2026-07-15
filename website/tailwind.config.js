/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- Locked brand palette (Prompt 16 — final) ---
        primary: {
          DEFAULT: '#0B3D91', // Royal Blue
          light: '#1E40AF', // Secondary
        },
        accent: {
          DEFAULT: '#D4AF37', // Luxury Gold
          light: '#F4D26A',
        },
        success: '#16A34A',
        warning: '#F59E0B',
        error: '#DC2626',
        surface: {
          DEFAULT: '#F8FAFC', // Background light
          dark: '#0F172A', // Background dark
        },
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#1E293B',
        },
        ink: {
          DEFAULT: '#111827', // Text primary
          muted: '#6B7280', // Text secondary
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        btn: '16px',
        card: '20px',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0B3D91 0%, #1E293B 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F4D26A 0%, #D4AF37 100%)',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(11, 61, 145, 0.12)',
        'soft-dark': '0 8px 30px rgba(0, 0, 0, 0.4)',
        gold: '0 8px 24px rgba(212, 175, 55, 0.35)',
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
};
