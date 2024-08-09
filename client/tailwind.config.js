/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
   
    extend: {
      colors: {
        "appBG": "#f5f4f4",
        "appText": "#021526",
        "appBlue": "#005fbe",
        "appGold": "#FFD700",
        "appRed": "#F87474",
        "appGrey": "#888888",
        "appDarkGrey": "#464646"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

