/** @typedef  {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig | SortImportsConfig } */
module.exports = {
  arrowParens: 'always',
  semi: true,
  printWidth: 80,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.cjs',
  singleAttributePerLine: true,
  htmlWhitespaceSensitivity: 'ignore',
  proseWrap: 'always',
};
