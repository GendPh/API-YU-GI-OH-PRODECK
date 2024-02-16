/** 
 * @type {import('tailwindcss').Config} // Specifies the type of the configuration as Tailwind CSS config
 */
module.exports = {
  content: [
    "./src/**/*.js",
    "./src/API/*.js",
    "./Card/*.html",
    "./Card/*.js",
    "*.html",
  ],
  theme: {
    extend: {
      colors: { // Extend or override default colors
        'text': '#e3f7fd',                // Main text color
        'text-secondary': '#abe1f6',      // Secondary text color
        'background': '#031a21',          // Main background color
        'background-secondary': '#145365',// Secondary background color
        'primary': '#c83806',             // Primary color
        'primary-secondary': '#9b2c0d',   // Secondary primary color
        'secondary': '#063846',           // Secondary color
        'secondary-secondary': '#135466', // Secondary secondary color
        'accent': '#ed562c',              // Accent color
        'accent-secondary': '#f07347',    // Secondary accent color
      }
    },
  },
  plugins: [], // Additional plugins can be added here
}
