import { createApp } from 'vue';
import 'vue-multiselect/dist/vue-multiselect.css';
import Components from './components/index.js'; // init all components
import Directives from './directives/index.js'; // init all directives
import i18n from './locale/i18n';
import router from './router';
import eventBus from './scripts/eventBus';
import './assets/icons/sprite';

import '@webitel/styleguide/fonts';

// import './css/styleguide/fonts/_fonts.scss';


import { wtlog } from './scripts/logger.js';
import App from './the-app.vue';

const app = createApp(App).use(router).use(i18n).provide('$eventBus', eventBus);

Object.keys(Components).forEach((name) => {
  app.component(name, Components[name]);
});

Object.keys(Directives).forEach((name) => {
  app.directive(name, Directives[name]);
});

app.mount('#app');
