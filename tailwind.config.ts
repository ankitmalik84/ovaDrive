import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlack: "#212121",
        customBlack2: "#282929",
        customGray: "#4E4E4E",
        customGray2: "#808080",
        customPurple: "#A600FC",
      },
      backgroundImage: {
        "texture-gradient": "url(/images/hero.png)",
        "texture-gradient2":
          "linear-gradient(16deg, rgba(78,59,157,1) 35%, rgba(134,56,174,1) 59%)",
        "conic-gradient":
          "conic-gradient(from 90deg at 50% 0%, #A600FC, #212121,#212121, #212121)",
        "conic-gradient2":
          "conic-gradient(from 270deg at 50% 0%,#212121, #212121, #212121,  #A600FC)",
        "conic-gradient3":
          "conic-gradient(from 90deg at 20% 0%, #A600FC, #212121,#212121, #212121)",
        "conic-gradient4":
          "conic-gradient(from 270deg at 80% 0%,#212121, #212121, #212121,  #A600FC)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "in-out-expo": "cubic-bezier(0.42, 0, 0.58, 1.0)",
      },
    },
  },
  plugins: [
    function ({ addBase }: { addBase: any }) {
      addBase({
        body: {
          color: "#ffffff",
          fontFamily: "Poppins, sans-serif",
          backgroundColor: "#212121",
        },
      });
    },
  ],
};

export default config;
