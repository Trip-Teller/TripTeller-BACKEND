module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    mocha: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:mocha/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    'mocha',
  ],
  rules: {
    'prefer-arrow-callback': 'off',
    'mocha/prefer-arrow-callback': 'error',
  },
};
