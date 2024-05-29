import pluginVue from 'eslint-plugin-vue';

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-shadow': 'off',
      'no-empty': 'off',
      'no-underscore-dangle': 'off',
      'max-len': 'off',
      indent: 'off',
      'no-param-reassign': ['error', { props: false }],
    },
  },
];
