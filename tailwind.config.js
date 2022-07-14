/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./windows/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    fontFamily: {
      Larsseit: ["Larsseit", "normal"],
      Larsseit: ["Larsseit", "medium"],
      Larsseit: ["Larsseit", "bold"],
      Larsseit: ["Larsseit", "thin"],
    },
    extend: {
      colors: {
      'cream_extralight': '#FAF8ED',
      'cream_light': '#e8dfb7',
      'cream_medium': '#ebd478',
      'cream_dark': '#ebcc49',
      'peri_light': '#d4d5ec',
      'peri_medium': '#666aab',
      'peri_dark': '#373cab',
    }},
  },
  plugins: [],
}
