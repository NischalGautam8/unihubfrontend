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
    colors: {
      background: "#030303",
      white: "#ffffff",
    },
    extend: {},
  },
  plugins: [],
};
