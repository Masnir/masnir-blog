import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Bridge Next.js's shareable configs (still authored in eslintrc format) into
// ESLint 9's flat config. This makes both `next lint` and direct `eslint`
// invocations (lint-staged/husky) work from a single source of truth.
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'warn',
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'public/admin/**'],
  },
];

export default eslintConfig;
