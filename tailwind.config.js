/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      ubuntu: ["Ubuntu", "sans-serif"],
    },

    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        hovercolor: "#2b2b2b",
        subtle: "#a5a5a5",
        emphasis: "#f3f4f6",
        black: "#000000",
        white: "#ffffff",
        background: "#101010",
        borderemphasis: "#444",
        bordersubtle: "#e5e7eb",
      },
    },
  },
  plugins: [],
};
