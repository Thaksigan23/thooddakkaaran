/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
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
        soft: "#f0fdf4",      // light agriculture background

        // 🌙 Dark Theme Colors
        darkbg: "#0b1f16",        // main background
        darksection: "#0f2a1d",   // section background
        darkcard: "#143524",      // cards
        darkfooter: "#081710",    // footer
      }

    },
  },
  plugins: [],
}