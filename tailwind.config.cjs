/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Be Vietnam Pro', 'system-ui']
    },
    animation: {
      'pulse-once': 'pulse .3s linear 3',
    }
  },
  plugins: [],
}