/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'background-image': "url('/bg.jpg')",
        'background-texture': "url('/bg-main.png')",
        'footer-texture': "url('/img/footer.png')",
        'header-texture': "url('/img/header.png')",
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(66px, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
      }
    }
  },
  plugins: [require("daisyui")],
};
