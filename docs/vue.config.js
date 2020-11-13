module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
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
      .rule('svg')
      .exclude.add(/^(.*sprites).*\.svg/);

    config.module
      .rule('svg-sprite')
      .test(/^(.*sprites).*\.svg/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: () => '' });
  },
};
