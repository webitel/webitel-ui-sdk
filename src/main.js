import '@webitel/styleguide/fonts';
import 'vue-multiselect/dist/vue-multiselect.css';
import './assets/icons/sprite';
import './css/main.scss';

import { createApp } from 'vue';

// Initialize Vidstack
import 'vidstack/bundle';

import Components from './components/index.js'; // init all components
import Directives from './directives/index.js'; // init all directives
import i18n from './locale/i18n';
import initPrimevue from './plugins/primevue/primevue.plugin.js';
import router from './router';
import eventBus from './scripts/eventBus';
import App from './the-app.vue';

const app = createApp(App).use(router).use(i18n).provide('$eventBus', eventBus);

Object.keys(Components).forEach((name) => {
  app.component(name, Components[name]);
});

Object.keys(Directives).forEach((name) => {
  app.directive(name, Directives[name]);
});

initPrimevue(app);

app.mount('#app');
