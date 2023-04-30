module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'next/core-web-vitals',
    'prettier',
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
    'simple-import-sort/imports': 'error',
    'react/jsx-sort-props': 'error'
  }
}
