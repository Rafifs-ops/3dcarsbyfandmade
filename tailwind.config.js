/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        'rust-red': {
          DEFAULT: '#E11D2A',
          dark: '#9E101A',
          light: '#FF3B47',
          glow: 'rgba(225, 29, 42, 0.4)'
        },
        'lightning-yellow': {
          DEFAULT: '#FFC700',
          dark: '#CCA000',
          light: '#FFD738',
          glow: 'rgba(255, 199, 0, 0.4)'
        },
        'dinoco-blue': {
          DEFAULT: '#00A3E0',
          dark: '#007AA8',
          light: '#33BAEC',
          glow: 'rgba(0, 163, 224, 0.4)'
        },
        'asphalt-black': {
          DEFAULT: '#0F1115',
          deep: '#090A0D',
          light: '#161920'
        },
        'carbon-gray': {
          DEFAULT: '#1C1F26',
          light: '#262A34',
          dark: '#14171E'
        },
        'pure-white': '#F8FAFC',
        'muted-silver': {
          DEFAULT: '#94A3B8',
          light: '#CBD5E1',
          dark: '#64748B'
        }
      },
      fontFamily: {
        racing: ['"Racing Sans One"', 'cursive', 'sans-serif'],
        russo: ['"Russo One"', 'sans-serif'],
        teko: ['"Teko"', 'sans-serif'],
        chakra: ['"Chakra Petch"', 'monospace', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif']
      }
    }
  },
  plugins: []
}
