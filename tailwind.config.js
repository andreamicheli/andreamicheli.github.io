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
        cream_extralight: "#FAF8ED",
        cream_light: "#e8dfb7",
        cream_medium: "#ebd478",
        cream_dark: "#ebcc49",
        peri_light: "#d4d5ec",
        peri_medium: "#666aab",
        peri_dark: "#373cab",
        new_color: "#ff0000", // Add your new color here
      },
      backgroundImage: {
        "text-gradient": "linear-gradient(to right, #FAF8ED, #d4d5ec, #d4d5ec)", // Add your new color here
      },
      animation: {
        float: "float 20s infinite linear",
        "float-fast": "float 10s infinite linear",
        "float-fastest": "float 8s infinite linear",
      },
      keyframes: {
        float: {
          "0%": {
            transform:
              " rotate(-0.001deg) translate3d(5px, 0, 0) rotate(-0.001deg)",
          },
          "100%": {
            transform:
              "rotate(360.001deg) translate3d(5px, 0, 0) rotate(-360.001deg)",
          },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [],
};
