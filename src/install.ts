import 'vue-multiselect/dist/vue-multiselect.css';
import '@webitel/styleguide/fonts';
import 'plyr/plyr.scss';
import 'vidstack/bundle';
import './css/main.scss';
import './css/tailwind.css';

import { generateInstance } from '@webitel/api-services/api/axios';

import Components from './components/index.js'; // init all components
import { fillIconsRepository } from './components/wt-icon/utils/iconsRepository';
import Directives from './directives/index.js'; // init all directives
import initPrimevue from './plugins/primevue/primevue.plugin.js';

export { 
  fillIconsRepository,
 };

export default {
  install(app, { eventBus, router, globals = {} }) {
    Object.keys(Directives).forEach((name) => {
      app.directive(name, Directives[name]);
    });
    Object.keys(Components).forEach((name) => {
      app.component(name, Components[name]);
    });
    Object.keys(globals).forEach((globalKey) => {
      app.provide(globalKey, globals[globalKey]);
    });
    app.provide('$eventBus', eventBus);
    if (router) app.use(router);
    initPrimevue(app);
  },
  generateInstance,
};
