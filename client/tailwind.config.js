/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#fff8f5',
          dim: '#e0d9d5',
          bright: '#fff8f5',
          'container-lowest': '#ffffff',
          'container-low': '#faf2ee',
          'container': '#f4ece9',
          'container-high': '#eee7e3',
          'container-highest': '#e8e1dd',
        },
        primary: {
          DEFAULT: '#33210d',
          container: '#4b3621',
          fixed: '#fedcbe',
          'fixed-dim': '#e1c1a4',
        },
        'on-primary': {
          DEFAULT: '#ffffff',
          container: '#bd9f83',
          fixed: '#291806',
          'fixed-variant': '#59422c',
        },
        secondary: {
          DEFAULT: '#944925',
          container: '#fe9e72',
          fixed: '#ffdbcd',
          'fixed-dim': '#ffb596',
        },
        'on-secondary': {
          DEFAULT: '#ffffff',
          container: '#773310',
          fixed: '#360f00',
          'fixed-variant': '#76320f',
        },
        tertiary: {
          DEFAULT: '#242516',
          container: '#3a3b2a',
          fixed: '#e4e4cc',
          'fixed-dim': '#c8c8b0',
        },
        'on-tertiary': {
          DEFAULT: '#ffffff',
          container: '#a4a58f',
          fixed: '#1b1d0e',
          'fixed-variant': '#474836',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        'on-error': {
          DEFAULT: '#ffffff',
          container: '#93000a',
        },
        outline: {
          DEFAULT: '#80756c',
          variant: '#d2c4ba',
        },
        'on-surface': {
          DEFAULT: '#1e1b19',
          variant: '#4e453d',
        },
        'inverse-surface': {
          DEFAULT: '#33302d',
        },
        'inverse-on-surface': {
          DEFAULT: '#f7efeb',
        },
        'surface-tint': '#725a42',
        background: {
          DEFAULT: '#fff8f5',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      spacing: {
        unit: '8px',
        gutter: '24px',
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        'soft-1': '0 4px 20px rgba(51, 33, 13, 0.08)',
        'soft-2': '0 8px 32px rgba(51, 33, 13, 0.12)',
        'soft-3': '0 12px 48px rgba(51, 33, 13, 0.16)',
        'press': 'inset 0 2px 4px rgba(51, 33, 13, 0.1)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [],
  },
}
