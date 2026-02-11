import type { Config } from "tailwindcss";

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
        // Brutalist Editorial Color System
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Terra/Natural Palette
        terracotta: {
          DEFAULT: "#D16847",
          light: "#E38968",
          dark: "#B5523C",
        },
        sage: {
          DEFAULT: "#7F9173",
          light: "#9BAA90",
          dark: "#667558",
        },
        cream: {
          DEFAULT: "#F5F1E8",
          warm: "#EDE6D6",
          cool: "#FAF8F3",
        },
        charcoal: {
          DEFAULT: "#2B2B2B",
          light: "#3D3D3D",
          dark: "#1A1A1A",
        },
        clay: "#C89B7B",
        stone: "#8B8680",
        ink: "#1C1C1C",

        // Semantic colors
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-accent": "var(--text-accent)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      spacing: {
        "xs": "0.25rem",
        "sm": "0.5rem",
        "md": "1rem",
        "lg": "1.5rem",
        "xl": "2rem",
        "2xl": "3rem",
        "3xl": "4rem",
        "4xl": "6rem",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
      },
      borderWidth: {
        "3": "3px",
        "5": "5px",
        "6": "6px",
      },
      boxShadow: {
        brutal: "8px 8px 0px 0px rgba(0, 0, 0, 0.9)",
        "brutal-sm": "4px 4px 0px 0px rgba(0, 0, 0, 0.8)",
        "brutal-lg": "12px 12px 0px 0px rgba(0, 0, 0, 0.9)",
        "brutal-terracotta": "8px 8px 0px 0px #D16847",
        "brutal-sage": "8px 8px 0px 0px #7F9173",
      },
      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
      },
    },
  },
  plugins: [],
};
export default config;
