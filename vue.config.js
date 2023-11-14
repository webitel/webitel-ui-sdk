/* eslint-disable */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/css/main.scss";
        `,
      },
    },
  },
  // devServer: {
  //   https: true,
  // },
  chainWebpack: (config) => {
    config.resolve.alias.set('vue', '@vue/compat');

    config.module
    .rule('vue')
    .use('vue-loader')
    .tap((options) => {
      return {
        ...options,
        compilerOptions: {
          compatConfig: {
            MODE: 2,
          }
        }
      }
    });

    config.plugin('polyfills').use(NodePolyfillPlugin);

    config.module
          .rule('fonts')
          .type('asset/inline')
          .delete('generator');


    config
      .plugin('copy-webpack-plugin')
      .use(CopyWebpackPlugin, [
        {
          patterns: [
            {
              from: 'src/assets/icons/plyr.svg',
              to: 'img',
            }, {
              from: 'src/assets/icons/sprite/',
              to: 'img/sprite',
            },
          ],
        },
      ]);


    config.module
          .rule('svg')
          .test(/\.svg/)
          .type('asset/inline')
          .delete('generator')
          .exclude.add(/^(.*sprite).*\.svg/); // same as in svg-sprite-loader

    config.module
          .rule('svg-sprite')
          .test(/^(.*sprite).*\.svg/)  // same as in svg-url-loader
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader');
    /*
     // only file name without ".svg" ext
      .options({ symbolId: (filePath) => filePath.includes('wt-icon.svg')
       ? ''
        : filePath.split('/').pop().replace('.svg', '') });
     */
  },
};
