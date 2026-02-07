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
        gold: {
          light: "#fee198",
          DEFAULT: "#fee198",
          dark: "#e6c46d",
        },
        red: {
          brand: "#c1121f",
        },
        black: {
          DEFAULT: "#1a1a1a",
        },
        gray: {
          light: "#f5f5f5",
          mid: "#999999",
          dark: "#333333",
        },
      },
      fontFamily: {
        display: [
          "Cormorant Garamond",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        body: ["Inter", "system-ui", "sans-serif"],
        logo: ["Codec Pro", "Inter", "sans-serif"],
      },
      fontSize: {
        "hero-xl": ["72px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        hero: ["56px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        section: ["40px", { lineHeight: "1.15" }],
        "section-sm": ["32px", { lineHeight: "1.2" }],
        card: ["24px", { lineHeight: "1.3" }],
        "card-sm": ["20px", { lineHeight: "1.3" }],
        eyebrow: ["12px", { lineHeight: "1", letterSpacing: "0.1em" }],
        "eyebrow-sm": ["11px", { lineHeight: "1", letterSpacing: "0.1em" }],
        meta: ["14px", { lineHeight: "1.4" }],
        "meta-sm": ["13px", { lineHeight: "1.4" }],
      },
      maxWidth: {
        site: "1280px",
        content: "720px",
        "content-sm": "680px",
      },
      width: {
        sidebar: "340px",
        "sidebar-sm": "300px",
      },
      spacing: {
        "section-lg": "96px",
        section: "64px",
        "gutter-lg": "32px",
        gutter: "24px",
      },
      letterSpacing: {
        eyebrow: "0.1em",
      },
    },
  },
  plugins: [],
};

export default config;
