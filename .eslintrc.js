module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-catch': 'off',
    'no-shadow': 'off',
    'no-empty': 'off',
    'no-underscore-dangle': 'off',
    'max-len': 'off',
    indent: 'off',
    'no-param-reassign': ['error', { props: false }],
  },
};
