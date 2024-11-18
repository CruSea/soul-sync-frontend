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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        title: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        "custom-bottom": "0px 1px 4px 0px rgba(0, 0, 0, 0.5)",
        "custom-search": "0px 1px 2px 0px rgba(0,0,0,0.05)",
        "custom-chat": "0px 2px 10px 0 rgba(0,0,0,0.25)",
        "custom-profile": "0px 0px 4px 0px rgba(0,0,0,0.25)"
      }
    },
  },
  plugins: [],
};

export default config;
