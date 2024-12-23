/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyberpunk: {
          purple: '#B026FF',
          accent: '#FF26B0',
          dark: '#13111C',
          darker: '#0C0A14',
        }
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.purple.500), 0 0 20px theme(colors.purple.500)',
        'neon-sm': '0 0 2px theme(colors.purple.500), 0 0 10px theme(colors.purple.500)',
      }
    },
  },
  plugins: [],
};