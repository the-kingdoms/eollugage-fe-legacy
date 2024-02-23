import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Grayscale
        White: "#FFFFFF",
        Gray1: "#F2F2F2",
        Gray2: "#EDEDED",
        Gray3: "#CCCCCC",
        Gray4: "#AEAEAE",
        Gray5: "#7C7C7C",
        Gray6: "#4F4F4F",
        Gray7: "#2D2D2D",
        Black: "#000000",

        // Active
        Grapefruit1: "#D22632",
        Grapefruit2: "#D83C2C",
        Grapefruit3: "#DE5625",
        Grapefruit4: "#E4701F",
        Grapefruit5: "#EA8918",
        Grapefruit6: "#F0A212",
        Grapefruit7: "#F6BB0B",

        // Gage
        Approve: "#EC701F",
        PartTime: "#EC701F",
        Manager: "#DA2632",
        ETC: "#2D2D2D",

        // Error
        Red: "#CA043A",

        // Dialog rgba(0, 0, 0, 0.6);
        Dialog: "rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};
export default config;
