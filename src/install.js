/* eslint-disable */
import 'vue-multiselect/dist/vue3-multiselect.css';
import Components from './components'; // init all components
import Directives from './directives'; // init all directives
import './css/styleguide/fonts/_fonts.scss';

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
};
