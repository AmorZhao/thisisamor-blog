import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        "noto": ["Lora", "Noto_Serif_SC", "serif"],
        "noto-medium": ["Lora-Medium", "Noto_Serif_SC-medium", "serif"],
        "noto-semibold": ["Lora-SemiBold", "Noto_Serif_SC-Semibold", "serif"],
        "noto-bold": ["Lora-Bold", "Noto_Serif_SC-Bold", "serif-bold"],
        "noto-light": ["Noto_Serif_SC-Light", "serif-light"],
      },
    },
  },
  plugins: [],
};

export default config;
