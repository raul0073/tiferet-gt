/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
   
    extend: {
      colors: {
        "appBG": "#F9F2ED",
        "appText": "#021526",
        "appBlue": "#003366",
        "appGold": "#FFD700",
        "appRed": "#F87474",
        "appGrey": "#757575"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

