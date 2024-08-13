/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        primary: "#000000",
        background: "#F0EEED",
        highlight: "#F4F2EA",
        bghighlight: "#C8C6BE"
      },
      width: {
        'parent-plus-100': 'calc(100% + 100px)',
      },
      fontSize: {
        mobile: '12px',
      }
    },
  },
  plugins: [],
}

