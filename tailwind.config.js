/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

function withOpacity(variableName) {
  return ({opacityValue}) => {
    if(opacityValue) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

module.exports = {
  content: [
    './**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        base: 'var(--color-base)',
        'off-base': 'var(--color-off-base)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        muted: 'var(--color-text-muted)',
      },
      textColor: {
        base: 'var(--color-text-base)',
        muted: 'var(--color-text-muted)',
        'muted-hover': 'var(--color-text-muted-hover)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
    },
  },
  variants: {},
  plugins: [],
}
