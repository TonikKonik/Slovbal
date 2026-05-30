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
        "tile-correct": "#538d4e",
        "tile-present": "#b59f3b",
        "tile-absent": "#3a3a3c",
        "tile-empty": "#121213",
        "tile-filled": "#121213",
        "key-correct": "#538d4e",
        "key-present": "#b59f3b",
        "key-absent": "#3a3a3c",
        "key-default": "#818384",
        "bg-primary": "#121213",
        "bg-secondary": "#1a1a1b",
        "border-default": "#3a3a3c",
        "border-filled": "#565758",
        "text-primary": "#ffffff",
        "text-secondary": "#818384",
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
