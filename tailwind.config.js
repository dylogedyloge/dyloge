/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  direction: {
    rtl: "rtl",
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "sans-en": ["Montserrat", "sans-serif"],
        "sans-fa": ["Noto Sans Arabic", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: ["cmyk", "dracula"],
  },
  plugins: [require("daisyui")],
};
