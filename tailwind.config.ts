import type { Config } from "tailwindcss";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/*.{js,ts,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "cdark-100": "#16171B",
      "cdark-200": "#202125",
      "cgrey-100": "#1D1E22",
      "cgrey-200": "#292A2E",
      "cgrey-900": "#939393",
      "cblue-500": "#5865F2",
    }
  },
  plugins: [],
};
