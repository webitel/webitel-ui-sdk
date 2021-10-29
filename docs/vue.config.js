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
      .rule('svg')
      .exclude.add(/^(.*sprites).*\.svg/);

    config.module
      .rule('svg-sprite')
      .test(/^(.*sprites).*\.svg/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: (filePath) => filePath.includes('wt-icon.svg') ? '' : filePath.split('/').pop().replace('.svg', '') }); // only file name without ".svg" ext
  },
};
