/* eslint-disable */
import LibVue from 'vue';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';
import Components from './components'; // init all components
import Directives from './directives'; // init all directives
import Filters from './filters'; // init all directives
import './css/styleguide/fonts/_fonts.scss';

export default {
  install(Vue, { eventBus, router, globals = {} }) {
    Object.keys(Directives).forEach((name) => {
      Vue.directive(name, Directives[name]);
    });
    Object.keys(Filters).forEach((name) => {
      Vue.filter(name, Filters[name]);
    });
    Object.keys(Components).forEach((name) => {
      Vue.component(name, Components[name]);
    });
    Vue.prototype.$webitelUI = {
      // locale: this.$i18n.locale,
    };
    Object.keys(globals).forEach((globalKey) => {
      Vue.prototype[globalKey] = globals[globalKey];
    });
    LibVue.prototype.$eventBus = eventBus;
    if (router) LibVue.use(router);
    LibVue.use(FloatingVue);
  },
};
