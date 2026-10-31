// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const importX = require('eslint-plugin-import-x');
const security = require('eslint-plugin-security');
const prettier = require('eslint-config-prettier');

module.exports = defineConfig([
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**', '.angular/**', '**/*.min.js'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      security.configs.recommended,
      prettier,
    ],
    plugins: { 'import-x': importX },
    processor: angular.processInlineTemplates,
    rules: {
      // Angular
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }],
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/prefer-inject': 'error',

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'variableLike', format: ['camelCase'] },
        { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'variable', modifiers: ['const', 'global'], format: ['camelCase', 'UPPER_CASE'] },
        { selector: 'typeLike', format: ['PascalCase'] },
      ],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // Security: index access on typed arrays is not user-controlled here
      'security/detect-object-injection': 'off',

      // Imports
      'import-x/no-duplicates': 'error',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],

      // General
      complexity: ['error', 20],
      curly: 'error',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'max-classes-per-file': ['error', 1],
      'no-bitwise': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-eval': 'error',
      'no-shadow': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      radix: 'error',
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'max-classes-per-file': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'error',
    },
  },
]);
