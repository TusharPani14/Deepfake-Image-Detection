/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1D1E2C',
        primary: '#31204C',
        accent: '#452A6F',
      },
    },
  },
  plugins: [],
}
