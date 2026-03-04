/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "SF Pro Text",
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "Helvetica Neue",
          "Segoe UI",
          "Inter",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
