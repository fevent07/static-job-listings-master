/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/*.js"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1240px",
    },
    extend: {
      colors: {
        desaturatedDarkCyan: "hsl(180, 29%, 50%)",
        lightGrayishCyanBG: "hsl(180, 52%, 96%)",
        lightGrayishCyanFilter: "hsl(180, 31%, 95%)",
        darkGrayishCyan: "hsl(180, 8%, 52%)",
        veryDarkGrayishCyan: "hsl(180, 14%, 20%)",
      },
    },
  },
  plugins: [],
}