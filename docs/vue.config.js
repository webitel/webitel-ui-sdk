const MarkdownIt = require('markdown-it');

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  publicPath: '/ui-sdk',
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
  chainWebpack: (config) => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .options({ renderer: MarkdownIt.renderer })
      .end();

    config.module
      .rule('svg')
      .exclude.add(/^(.*sprite).*\.svg/); // same as in svg-sprite-loader

    config.module
      .rule('svg-sprite')
      .test(/^(.*sprite).*\.svg/) // same as in svg-url-loader
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader');
  },
};
