/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFCF7',
          100: '#FFF7E6',
          200: '#FFE4BF',
          300: '#FFD199',
          400: '#FFBE73',
          500: '#FFAB4C',
        },
        beige: {
          50: '#FAF6F1',
          100: '#F5EDE3',
          200: '#EBD5C7',
          300: '#E1BDAB',
          400: '#D7A58F',
          500: '#CD8D73',
        },
        brown: {
          50: '#F9F6F4',
          100: '#F3EDE9',
          200: '#E7DBD3',
          300: '#DBC9BD',
          400: '#CFB7A7',
          500: '#C3A591',
          600: '#8B6D57',
          700: '#5F4B3B',
          800: '#33291F',
          900: '#1A1410',
        },
      },
    },
  },
  plugins: [],
};