/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
    "./src/API/*.js",
    "*.html",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#e3f7fd',
        'text-secondary': '#abe1f6',
        'background': '#031a21',
        'background-secondary': '#145365',
        'primary': '#c83806',
        'primary-secondary': '#9b2c0d',
        'secondary': '#063846',
        'secondary-secondary': '#135466',
        'accent': '#ed562c',
        'accent-secondary': '#f07347',
      }
    },
  },
  plugins: [],
}

