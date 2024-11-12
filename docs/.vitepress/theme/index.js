// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from 'vue-router';
import 'prismjs/themes/prism.min.css';
import WebitelUI from '__lib__/install.js';
import i18n from '__lib__/locale/i18n';
import sharedComponents from '../../shared';
import '__lib__/assets/icons/sprite';
import Layout from './Layout.vue';
import './main.scss';

const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes: [],
});

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(i18n);
    app.use(router); // for wt-navigation-bar docs
    WebitelUI.install(app, {});
    Object.keys(sharedComponents).forEach((name) => {
      app.component(name, sharedComponents[name]);
    });
    return app;
  },
};
