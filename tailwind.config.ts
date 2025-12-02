import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#b9d7ff',
          300: '#7db4ff',
          400: '#4a8cff',
          500: '#2a5aaa',  // Dunkelblau für Buttons und Akzente
          600: '#1e4ba6',  // Dunkleres Blau für Hover
          700: '#1a3d8f',
          800: '#153378',
          900: '#0f2559',
        },
        secondary: {
          50: '#f8f9fa',   // Hellgrau für Hintergrund
          100: '#e9ecef',  // Hellgrau für Karten
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#1a1d20',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'medium': '0 6px 12px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
export default config

