module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  // required to lint *.vue files Not sure if it needed
  plugins: [
    'vue',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 0,
    'max-len': 'warn',
    'import/no-unresolved': 'off',
    'newline-before-return': 'error',
    'arrow-parens': ['error', 'always'],
    'no-undef': 'off',
    'class-methods-use-this': 'off',
    'no-empty': 'off',
    '@typescript-eslint/member-delimiter-style': 'error',
    "@typescript-eslint/ban-ts-ignore": "off",
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
