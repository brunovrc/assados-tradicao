import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:           "#0D0500",
          card:         "#180A00",
          orange:       "#E8650A",
          "orange-lt":  "#FF7A1A",
          gold:         "#C8860A",
          "gold-lt":    "#E0A010",
          brown:        "#5C2E00",
          cream:        "#FFF0D0",
          muted:        "#A07040",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body:    ["var(--font-body)"],
      },
      keyframes: {
        ember: {
          "0%":   { transform: "translateY(0) scale(1)",   opacity: "0.9" },
          "100%": { transform: "translateY(-120px) scale(0)", opacity: "0" },
        },
        flicker: {
          "0%,100%": { opacity: "0.85" },
          "50%":     { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        "glow-pulse": {
          "0%,100%": { boxShadow: "0 0 20px #E8650A30, 0 0 60px #E8650A10" },
          "50%":     { boxShadow: "0 0 40px #E8650A60, 0 0 100px #E8650A30" },
        },
      },
      animation: {
        ember:       "ember var(--dur,3s) ease-out infinite",
        flicker:     "flicker 2s ease-in-out infinite",
        shimmer:     "shimmer 2s linear infinite",
        "glow-pulse":"glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
export default config
