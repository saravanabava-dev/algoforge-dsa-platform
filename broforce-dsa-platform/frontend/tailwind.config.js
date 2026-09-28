/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // AlgoForge v2 — professional light/white EdTech system.
        // "forge" is now a light neutral scale: 50 = white page background,
        // 900 = near-black heading text. Same token NAMES as v1 (dark theme)
        // are reused so every component's class stays semantically correct
        // after the numeric-scale reversal (bg-forge-50 = page bg,
        // text-forge-900 = primary text) — only the underlying hex changed.
        forge: {
          50: "#FFFFFF",
          100: "#F7F8FA",
          200: "#EEF0F4",
          300: "#DFE3EA",
          400: "#C4CAD6",
          500: "#8D96A8",
          600: "#5C6478",
          700: "#3D4457",
          800: "#252B3B",
          900: "#12151F",
        },
        ember: {
          50: "#FFF4EC",
          100: "#FFE4D1",
          300: "#F5A05C",
          400: "#EC7F2E",
          500: "#DE5E14",
          600: "#B84810",
          700: "#8F380D",
        },
        circuit: {
          50: "#EAFBFD",
          100: "#CEF4F8",
          300: "#4FC4D6",
          400: "#1FA8BD",
          500: "#128299",
          600: "#0D677C",
          700: "#0A5163",
        },
        success: { 100: "#E1F7EC", 500: "#1A9E5C", 600: "#137A3F" },
        warning: { 100: "#FCF0D8", 500: "#C4890A", 600: "#8F6207" },
        danger: { 100: "#FBE4E2", 500: "#D6392E" },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,21,31,0.04), 0 1px 12px rgba(18,21,31,0.04)",
        "card-hover": "0 4px 8px rgba(18,21,31,0.06), 0 8px 24px rgba(18,21,31,0.08)",
      },
    },
  },
  plugins: [],
};
