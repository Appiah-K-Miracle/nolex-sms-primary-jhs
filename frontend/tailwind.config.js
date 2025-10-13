/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'light-green-100': '#E6F4EA',
        'light-green-200': '#C1E1C1',
      },
    },
  },
  plugins: [],
};