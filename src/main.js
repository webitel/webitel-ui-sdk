import '@webitel/styleguide/fonts';
import 'vue-multiselect/dist/vue-multiselect.css';
import './assets/icons/sprite';

import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

import Components from './components/index.js'; // init all components
import Directives from './directives/index.js'; // init all directives
import i18n from './locale/i18n';
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

const WebitelTheme = definePreset(Aura, {
  primary: {
    50: '{indigo.50}',
    100: '{indigo.100}',
    200: '{indigo.200}',
    300: '{indigo.300}',
    400: '{indigo.400}',
    500: '{indigo.500}',
    600: '{indigo.600}',
    700: '{indigo.700}',
    800: '{indigo.800}',
    900: '{indigo.900}',
    950: '{indigo.950}',
  },
});

app.use(PrimeVue, {
  prefix: 'p',
  theme: {
    preset: WebitelTheme,
  },
});

app.mount('#app');
