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
        // Glassmorphism Gradient Flow Color System
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Main Gradient Palette
        purple: {
          DEFAULT: "#6B46C1",
          light: "#8B5CF6",
          dark: "#5B21B6",
        },
        cyan: {
          DEFAULT: "#06B6D4",
          light: "#22D3EE",
          dark: "#0891B2",
        },
        coral: {
          DEFAULT: "#FF6B6B",
          light: "#FF8787",
          dark: "#FF5252",
        },

        // Neutral Palette
        glass: {
          bg: "var(--glass-bg)",
          border: "var(--glass-border)",
          shadow: "var(--glass-shadow)",
        },

        // Semantic colors
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-accent": "var(--text-accent)",
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "xl": "16px",
        "2xl": "24px",
        "3xl": "32px",
      },
      boxShadow: {
        "glass": "0 8px 32px var(--glass-shadow)",
        "glass-lg": "0 12px 48px var(--glass-shadow)",
        "glass-xl": "0 20px 64px var(--glass-shadow)",
        "glow-purple": "0 0 40px rgba(107, 70, 193, 0.4)",
        "glow-cyan": "0 0 40px rgba(6, 182, 212, 0.4)",
        "glow-coral": "0 0 40px rgba(255, 107, 107, 0.4)",
      },
      backdropBlur: {
        "xs": "2px",
        "sm": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "40px",
      },
      transitionDuration: {
        "400": "400ms",
      },
      animation: {
        "gradient-flow": "gradient-flow 20s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "shimmer": "shimmer 3s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
