/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "root-bg": "var(--background-color)",
        "main-text-color": "var(--main-text-color)",
      },
    },
  },
  plugins: [],
}

