import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.extends('google'),
  ...compat.extends('prettier'), // This must come after google to override quote rules
  ...compat.plugins('prettier'),
  {
    rules: {
      'prettier/prettier': 'error',
      // Override Google's strict rules for better Next.js/React compatibility
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'no-unused-vars': 'off', // TypeScript handles this
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      'max-len': 'off', // Prettier handles line length
      'object-curly-spacing': 'off', // Prettier handles spacing
      indent: 'off', // Prettier handles indentation
      camelcase: 'off', // Allow snake_case for external libraries
      'new-cap': 'off', // Allow React components and Next.js conventions
      'no-invalid-this': 'off', // React components use this
      'comma-dangle': 'off', // Prettier handles trailing commas
      quotes: 'off', // Prettier handles quotes - this is crucial
      // Explicitly configure Prettier to use single quotes
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          jsxSingleQuote: true,
          bracketSpacing: true,
          arrowParens: 'always',
          trailingComma: 'all',
        },
      ],
    },
    ignores: [
      // Ignore build output directories
      'node_modules',
      'dist',
      'build',
      'out',
      // Ignore specific files or directories
      'coverage',
      '.next',
      'public/static',
      'public/assets',
      // Ignore configuration files
      '*.config.js',
      '*.config.ts',
    ],
  },
];

export default eslintConfig;
