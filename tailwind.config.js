const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      red: '#ff0000',
      ui: {
        primary: '#7fd1b5',
        'primary-light': '#8dd9bf',
        'primary-dark': '#73c9ad',
        'primary-lightest': '#f0fffa',

        secondary: '#f8b053',

        // black & white shades
        'shade-100': '#333', // darker
        'shade-80': '#666',
        'shade-60': '#999',
        'shade-40': '#bbb',
        'shade-20': '#ddd',
        'shade-0': '#f7f7f7', // lighter

        // semantic
        success: '#23baa6',
        warning: '#ffc144',
        error: '#fc4158',
      },
    },
    extend: {
      width: {
        'fit-content': 'fit-content',
      },
      boxShadow: {
        ui: '0 0 10px 1px #ededed',
      },
    },
    fontFamily: {
      sans: ['Effra', ...defaultTheme.fontFamily.sans],
    },
  },
  purge: {
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
    options: {
      safelist: [],
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          minWidth: '960px',
          maxWidth: '100%',
          display: 'block',
          margin: 'auto',
          padding: '0 45px',
          '@screen lg': {
            maxWidth: '1280px',
          },
          '@screen xl': {
            maxWidth: '1440px',
          },
        },
      })
    },
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
  corePlugins: {
    container: false,
  },
}
