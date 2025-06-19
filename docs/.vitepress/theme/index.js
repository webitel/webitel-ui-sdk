// .vitepress/theme/index.js
import 'prismjs/themes/prism.min.css';
import '__lib__/assets/icons/sprite';
import './main.scss';

import WebitelUI from '__lib__/install.ts';
import i18n from '__lib__/locale/i18n';
import DefaultTheme from 'vitepress/theme';
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from 'vue-router';

import initPrimevue from '../../../src/plugins/primevue/primevue.plugin.js';
import sharedComponents from '../../shared';
import Layout from './Layout.vue';

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
    initPrimevue(app);
    WebitelUI.install(app, {});
    Object.keys(sharedComponents).forEach((name) => {
      app.component(name, sharedComponents[name]);
    });
    return app;
  },
};
