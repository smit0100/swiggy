/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/tw-elements/dist/js/**/*.js',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors:{
        cardOverlay: "rgba(255,255,255,0)",
        headingColor: "#2e2e2e",
        cartNumBg: "#e80013",
        textColor: "#515151",
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('flowbite/plugin')  
  ],
}
