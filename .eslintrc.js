module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'next/core-web-vitals',
    'prettier',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: './',
    project: ['tsconfig.json'],
    sourceType: 'module'
  },
  plugins: ['simple-import-sort'],
  rules: {
    'quotes': ['error', 'single'],
    'semi': [2, 'always'],
    'react/jsx-sort-props': 'error',
    'react/no-unescaped-entities': 'off',
    'simple-import-sort/imports': 'error',
    'react-hooks/exhaustive-deps': 'off',
  }
};
