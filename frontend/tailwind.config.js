/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      custom: ["Fraunces", "serif"], // Ensure fonts with spaces have " " surrounding it.
      noto: ["Noto Sans Kawi", "sans-serif"], // Ensure fonts with spaces have " " surrounding it.
      agb: ["Agbalumo"], // Ensure fonts with spaces have " " surrounding it.
    },
    extend: {},
  },
  plugins: [],
};
