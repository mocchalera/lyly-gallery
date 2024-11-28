/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#8BA69C',
          light: '#A7BCB4',
          dark: '#6F8A80',
        },
        sand: {
          DEFAULT: '#C7B7A3',
          light: '#D6CAB9',
          dark: '#B8A48D',
        },
      },
      fontFamily: {
        serif: ['Noto Serif JP', 'serif'],
      },
    },
  },
  plugins: [],
}

