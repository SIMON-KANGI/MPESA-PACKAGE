import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  {
    ignores: ['lib/**', 'node_modules/**'],
  },
];