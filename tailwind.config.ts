import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Georgia"', "serif"],
        body: ['"Sora"', "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          0: "#06080d",
          1: "#0c1018",
          2: "#121722",
          3: "#1a2030",
          4: "#232a3c",
          5: "#2d3548",
        },
        gold: {
          DEFAULT: "#c9a96e",
          bright: "#e4c98a",
          dim: "#9e8455",
          muted: "#c9a96e20",
          subtle: "#c9a96e08",
        },
        cn: {
          DEFAULT: "#d94f3b",
          light: "#ef7a68",
          muted: "#d94f3b20",
          subtle: "#d94f3b08",
        },
        en: {
          DEFAULT: "#3ba3a0",
          light: "#5cc4c1",
          muted: "#3ba3a020",
          subtle: "#3ba3a008",
        },
        ash: {
          50: "#f0ede8",
          100: "#dedad2",
          200: "#b8b3a8",
          300: "#928d82",
          400: "#706b62",
          500: "#565149",
          600: "#3d3832",
          700: "#2a261f",
          800: "#1a1710",
        },
      },
      keyframes: {
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(24px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "reveal-fade": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "grow-line": {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
        "slide-right": {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "draw-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "reveal-up": "reveal-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "reveal-fade": "reveal-fade 0.5s ease-out forwards",
        "grow-line": "grow-line 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-right": "slide-right 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "draw-line": "draw-line 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        shimmer: "shimmer 3s linear infinite",
        pulse: "pulse 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
