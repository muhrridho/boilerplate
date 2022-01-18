const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        ui: {
          primary         : '#e62121',
          'primary-light' : '#f23333',
          'primary-dark'  : '#b50e0e',

          secondary       : '#e62121',

          white           : '#fff',
          black           : '#000',
          
          // black & white shades
          'shade-100'     : '#333', // darker
          'shade-80'      : '#666',
          'shade-60'      : '#999',
          'shade-40'      : '#bbb',
          'shade-20'      : '#ddd',
          'shade-0'       : '#eaeaea', // lighter

          // semantic
          success         : '#7ed321',
          warning         : '#ffede8',
          error           : '#fc4158',

          // color
          red             : '#ff0000'
        }
      },
    },
    fontFamily: {
      sans: ['Effra', ...defaultTheme.fontFamily.sans],
    },
  },
  purge: {
    content: ['./components/**/*.{vue,js}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}'],
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
