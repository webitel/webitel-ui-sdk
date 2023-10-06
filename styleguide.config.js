const path = require('path');

const cliPath = require.resolve('@vue/cli-service');
const webpackPath = require.resolve('webpack', { paths: [path.dirname(cliPath)] });
process.env.VSG_WEBPACK_PATH = webpackPath;

module.exports = {
  // set your styleguidist configuration here
  title: 'Default Style Guide',
  components: 'src/components/**/wt-*.vue',
  require: [
    path.join(__dirname, 'src/main.js'),
  ],
  // defaultExample: true,
  // sections: [
  //   {
  //     name: 'First Section',
  //     components: 'src/components/**/[A-Z]*.vue'
  //   }
  // ],
  // eslint-disable-next-line global-require,import/extensions
  // webpackConfig: { ...output /* Custom config options */ },
  // webpackConfig: {
  //   // custom config goes here
  // },
  styleguideDir: 'dist',
  exampleMode: 'collapse',
  pagePerSection: true,
  simpleEditor: true, // https://github.com/vue-styleguidist/vue-styleguidist/blob/dev/docs/Configuration.md#simpleeditor
};
