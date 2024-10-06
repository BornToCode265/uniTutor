/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  important: "#root",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        transparent: "transparent",
        background: "rgba(var(--background))",
        front: "rgba(var(--text))",
        bd: "rgba(var(--border))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
