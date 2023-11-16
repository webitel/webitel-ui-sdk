// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import WebitelUI from '../../../src/install.js';
import i18n from '../../../src/locale/i18n';
import sharedComponents from '../../shared/index';
import 'prismjs/themes/prism.min.css';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(i18n);
    WebitelUI.install(app, {});
    Object.keys(sharedComponents).forEach((name) => {
      app.component(name, sharedComponents[name]);
    });
    return app;
  },
};
