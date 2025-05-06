/** @type {import('tailwindcss').Config} */
export const content = ["./app/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      corporate: ['Corporate', 'sans-serif'],
      plemo: ['PlemoJP', 'sans-serif'],
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  },
};
export const plugins = [];