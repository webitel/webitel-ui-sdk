module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/css/main.scss";
        `,
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = false;
        // изменение настроек...
        return options
      });

    const svgRule = config.module.rule('svg')
    // очищаем все существующие загрузчики.
    // если вы этого не сделаете, загрузчик ниже будет добавлен
    // к уже существующим загрузчикам для этого правила.
    svgRule.uses.clear()

    // добавляем загрузчик для замены
    svgRule
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: false,
      })
      .end();
  }
};
