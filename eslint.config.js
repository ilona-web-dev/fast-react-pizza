import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
   globalIgnores(['dist']),
   {
      files: ['**/*.{js,jsx}'],
      languageOptions: {
         ecmaVersion: 'latest',
         sourceType: 'module',
         globals: globals.browser,
         parserOptions: {
            ecmaFeatures: { jsx: true },
         },
      },
      plugins: {
         react,
         'react-hooks': reactHooks,
         'react-refresh': reactRefresh,
      },
      rules: {
         ...js.configs.recommended.rules,
         ...react.configs.recommended.rules,
         ...reactHooks.configs.recommended.rules,
         'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
         ],
         'react/prop-types': 'off',
         'react/react-in-jsx-scope': 'off',
         // 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
         'react/no-unescaped-entities': 'off',
         'no-unused-vars': 'off',
         'no-undef': 'off',
      },
      settings: {
         react: { version: 'detect' },
      },
   },
]);
