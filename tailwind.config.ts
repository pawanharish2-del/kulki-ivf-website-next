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
        ink: "var(--ink)",
        plum: "var(--plum)",
        rose: "var(--rose)",
        gold: "var(--gold)",
        white: "var(--white)",
        text: "var(--text)",
        mid: "var(--mid)",
        soft: "var(--soft)",
        border: "var(--border)",
        blush: "var(--blush)",
        mist: "var(--mist)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "Poppins", "sans-serif"],
        display: ["var(--font-display)", "Poppins", "sans-serif"],
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      transitionTimingFunction: {
        base: "cubic-bezier(0.16, 1, 0.3, 1)",
        slow: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
