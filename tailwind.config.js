/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        primary: "#166534",   // deep farm green
        secondary: "#22c55e", // fresh green
        accent: "#ef4444",    // pomegranate red
        soft: "#f0fdf4"       // light agriculture background
      }

    },
  },
  plugins: [],
}