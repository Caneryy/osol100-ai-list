/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyberpunk-darker': '#0f1116',
        'cyberpunk-dark': '#161920',
      },
    },
  },
  plugins: [],
}