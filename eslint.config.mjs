// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default withNuxt([
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.nuxt/**',
      'coverage/**',
      '**/*.log*',
      '**/.DS_Store',
      '.code/**',
      '**/*.iml',
      'package-lock.json',
      'templates/**',
      'sw.js',
    ],
  },
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    plugins: {
      // 2. Explicitly map the plugin namespace using the internal dependency
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parserOptions: {
        // 3. Ensure the parser understands TS inside this specific block
        parser: tseslint.parser,
      },
    },
    rules: {
      // TypeScript Overrides
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // General & Vue Overrides
      'no-console': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/one-component-per-file': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-multiple-template-root': 'off',
      camelcase: 'off',
    },
  },
]);
// Your custom configs here
