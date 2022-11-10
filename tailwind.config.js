/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1000px",
      xl: "1111px",
    },
    colors: {
      white: "hsl(0, 0%, 100%)",
      text: "hsl(0, 0%, 83%)",
      gray: "hsl(217, 13%, 27%)",
    },
    fontFamily: {
      pop: [`"Poppins", "sans-serif"`],
    },
    extend: {},
  },
  plugins: [],
}
