/* eslint-disable */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  sourceMap: process.env.NODE_ENV !== 'production',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/css/main.scss";
        `,
      },
    },
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
          from: 'src/assets/icons/svg-sprites/wt-icon.svg',
          to: 'img/svg-sprites',
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
    svgRule.uses.clear()

    svgRule
      .test(/\.svg/)
      .exclude.add(path.resolve(__dirname, 'src/assets/icons/svg-sprites/wt-icon.svg'))
      .end()
      .use('svg-url-loader')
      .loader('svg-url-loader')

    config.module
      .rule('svg-sprite')
      .test(/^(.*sprites).*\.svg/)
      // .test(/\.svg/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: () => '', });
  },
};
