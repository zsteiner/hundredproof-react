module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'next/core-web-vitals',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: './',
    project: ['tsconfig.json'],
    sourceType: 'module'
  },
  plugins: ['simple-import-sort', '@typescript-eslint'],
  rules: {
    'quotes': ['error', 'single'],
    'react/jsx-sort-props': 'error',
    "react/no-unescaped-entities": "off",
    'simple-import-sort/imports': 'error'
  }
}
