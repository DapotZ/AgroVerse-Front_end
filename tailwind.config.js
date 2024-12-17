/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        mulish: ["Mulish", "sans-serif"],
      },
      colors: {
        hijau: "#269D26",
        secondary: "#000000",
      },
    },
  },
  plugins: [],
};
