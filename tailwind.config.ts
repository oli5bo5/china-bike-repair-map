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
        // Urban Pedal Craft Inspired Colors
        primary: {
          DEFAULT: '#800000',
          50: '#fff5f5',
          100: '#ffe0e0',
          200: '#ffc0c0',
          300: '#ff9090',
          400: '#e05050',
          500: '#800000',  // Dunkelrot - Hauptfarbe
          600: '#A52A2A',  // Braun-Rot für Hover
          700: '#5C0000',  // Dunkleres Rot
          800: '#400000',
          900: '#2a0000',
        },
        secondary: {
          DEFAULT: '#F5F5DC',
          50: '#FFFEF8',
          100: '#FFF8F0',   // Cream
          200: '#F5F5DC',   // Beige
          300: '#E8E8C8',
          400: '#D2B48C',   // Wood/Tan
          500: '#C4A572',
          600: '#A68B5B',
          700: '#8B7355',
          800: '#6B5344',
          900: '#4A3728',
        },
        dark: {
          DEFAULT: '#000000',
          100: '#333333',
          200: '#666666',
          300: '#999999',
        }
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Noto Sans SC', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(128, 0, 0, 0.1)',
        'medium': '0 4px 15px rgba(128, 0, 0, 0.15)',
        'hard': '0 8px 25px rgba(128, 0, 0, 0.2)',
      },
      letterSpacing: {
        'extra-wide': '0.15em',
      },
    },
  },
  plugins: [],
}
export default config
