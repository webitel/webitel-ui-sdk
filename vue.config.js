/* eslint-disable */
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/css/main.scss";
        `,
      },
    },
  },
  devServer: {
    https: true,
  },
  chainWebpack: (config) => {
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options.limit = false;
        // изменение настроек...
        return options;
      });

    config
      .plugin('copy-webpack-plugin')
      .use(CopyWebpackPlugin, [
        [{
          from: 'src/assets/icons/plyr.svg',
          to: 'img',
        }, {
          from: 'src/assets/icons/sprite/',
          to: 'img/sprite',
        }],
      ]);

    // if (process.env.NODE_ENV === 'production') {
    // const svgRule = config.module.rule('svg');
    // очищаем все существующие загрузчики.
    // если вы этого не сделаете, загрузчик ниже будет добавлен
    // к уже существующим загрузчикам для этого правила.
    // svgRule.uses.clear();

    // добавляем загрузчик для замены
    // svgRule
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //     limit: false,
    //     name: 'img/[name].[ext]',
    //   })
    //   .end();
    // }
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear();

    svgRule
      .test(/\.svg/)
      .exclude.add(/^(.*sprite).*\.svg/) // same as in svg-sprite-loader
      .end()
      .use('svg-url-loader')
      .loader('svg-url-loader');

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
