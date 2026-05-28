/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          50:  '#fff0f6',
          100: '#fde8f0',
          200: '#f5c6d8',
          300: '#eda0be',
          400: '#e07098',
          500: '#c44b72',
          600: '#a83460',
          700: '#8b2650',
          800: '#6e1a3e',
          900: '#3d1520',
        },
        gold: {
          300: '#f0c9b0',
          400: '#e0a888',
          500: '#c9816a',
          600: '#b06b57',
          700: '#8b5042',
        },
        ivory: '#fffbfd',
        blush: '#fff0f6',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'tile-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c44b72' fill-opacity='0.06'%3E%3Crect x='10' y='10' width='16' height='20' rx='2'/%3E%3Crect x='34' y='30' width='16' height='20' rx='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
