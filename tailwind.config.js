/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    maxWidth: {
      '1/2': '50%',
    },
    maxHeight: {
      '98/100': '98%'
    }
  },
  plugins: [],
}

