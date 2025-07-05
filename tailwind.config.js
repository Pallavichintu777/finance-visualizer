module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'finance-bg': "url('/bg.jpg')"
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
}
