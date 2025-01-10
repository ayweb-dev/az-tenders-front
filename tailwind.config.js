/** @type {import('tailwindcss').Config} */
import { keepTheme } from "keep-react/keepTheme";
import forms from '@tailwindcss/forms';

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "hesitez-img": "url('./assets/hesitezSection.webp')",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Cabin: ["Cabin", "sans-serif"],
        Satisfy: ["Satisfy", "sans-serif"],
      },
      colors: {
        blueLogo: "#18DBD4",
        lightColor: "#f7f5f2",
        darkColor: "#0F0F30",
        greenLogo: "#40CB56",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "0.9rem",
        },
      },
    },
  },
  plugins: [forms],
};

export default keepTheme(config);
