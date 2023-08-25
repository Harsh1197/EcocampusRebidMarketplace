/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#191e29"
      }

    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
