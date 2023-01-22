const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        overlay: 'rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
