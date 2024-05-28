import './css/main.scss';
import 'vue-multiselect/dist/vue-multiselect.css';
import generateInstance from './api/axios/generateInstance.js';
import Components from './components/index.js'; // init all components
import Directives from './directives/index.js'; // init all directives
import './css/styleguide/fonts/_fonts.scss';
import './assets/icons/sprite/index.js';

export default {
  install(app, { eventBus, router, globals = {} }) {
    Object.keys(Directives).forEach((name) => {
      app.directive(name, Directives[name]);
    });
    Object.keys(Components).forEach((name) => {
      app.component(name, Components[name]);
    });
    // Vue.prototype.$webitelUI = {
    //   // locale: this.$i18n.locale,
    // };
    Object.keys(globals).forEach((globalKey) => {
      app.provide(globalKey, globals[globalKey]);
    });
    app.provide('$eventBus', eventBus);
    if (router) app.use(router);
  },
  generateInstance,
};
