/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

const brandColor = colors.green;

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,vue}', './src/app.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.gray,
        brand: brandColor,
      },
      ringColor: {
        default: brandColor['500'],
      },
      textColor: {
        default: colors.slate['700'],
      },
      fill: {
        default: colors.slate['700'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

module.exports = config;
