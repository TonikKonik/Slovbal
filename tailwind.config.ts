import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Static game colors */
        "tile-correct": "#538d4e",
        "tile-present": "#b59f3b",
        /* Theme-adaptive colors via CSS variables */
        "tile-absent": "var(--color-key-absent)",
        "tile-empty": "var(--color-tile-empty)",
        "tile-filled": "var(--color-tile-filled)",
        "key-correct": "#538d4e",
        "key-present": "#b59f3b",
        "key-absent": "var(--color-key-absent)",
        "key-default": "var(--color-key-default)",
        "key-special": "var(--color-key-special)",
        "bg-primary": "var(--color-bg)",
        "bg-secondary": "var(--color-bg-secondary)",
        "border-default": "var(--color-border)",
        "border-filled": "var(--color-border-filled)",
        "text-primary": "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        "nav-active": "var(--nav-active-bg)",
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(-90deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
        "bounce-tile": {
          "0%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-20px)" },
          "60%": { transform: "translateY(-10px)" },
        },
        wobble: {
          "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
          "25%": { transform: "translateX(-4px) rotate(-2deg)" },
          "75%": { transform: "translateX(4px) rotate(2deg)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        flip: "flip 0.5s ease-in-out forwards",
        "bounce-tile": "bounce-tile 0.6s ease-in-out",
        wobble: "wobble 0.4s ease-in-out",
        shake: "shake 0.5s ease-in-out",
        pop: "pop 0.1s ease-in-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
