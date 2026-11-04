import { readdirSync } from 'node:fs';

import js from '@eslint/js';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import checkFile from 'eslint-plugin-check-file';
import importX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** Shared code: anything here may be used by features and app, and may not import them. */
const SHARED = [
  './src/components',
  './src/config',
  './src/hooks',
  './src/lib',
  './src/types',
  './src/utils',
];

const features = readdirSync(new URL('./src/features', import.meta.url), {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

/**
 * Imports flow one way: shared -> features -> app. A feature may not import
 * another feature or the app; shared code may not import features or the app.
 */
const importBoundaries = [
  ...features.map((feature) => ({
    target: `./src/features/${feature}`,
    from: './src/features',
    except: [`./${feature}`],
    message: 'A feature may not import another feature. Compose features in src/app instead.',
  })),
  {
    target: './src/features',
    from: './src/app',
    message: 'Features may not import from src/app.',
  },
  {
    target: SHARED,
    from: ['./src/features', './src/app'],
    message: 'Shared code may not import from features or src/app.',
  },
];

export default tseslint.config(
  { ignores: ['dist', 'coverage'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
      importX.flatConfigs.typescript,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({ project: './tsconfig.app.json' }),
      ],
      'import-x/internal-regex': '^@/',
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/no-cycle': 'error',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'check-file': checkFile },
    rules: {
      'import-x/no-restricted-paths': ['error', { zones: importBoundaries }],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^\\.\\./',
              message: 'Import from another folder with the @/ alias instead of ../',
            },
          ],
        },
      ],
      'import-x/no-default-export': 'error',
      'check-file/filename-naming-convention': [
        'error',
        { 'src/**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': ['error', { 'src/**/': 'KEBAB_CASE' }],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/main.tsx', 'src/testing/**', '**/*.test.{ts,tsx}'],
    rules: {
      'import-x/no-restricted-paths': [
        'error',
        {
          zones: [
            ...importBoundaries,
            {
              target: './src',
              from: './src/testing',
              message: 'Only tests and src/main.tsx may import from src/testing.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/components/ui/**/*.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
);
