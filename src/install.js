import Components from './components'; // init all components
import Directives from './directives'; // init all directives
import Filters from './filters'; // init all directives
import './css/fonts.scss';

export default {
  install(Vue, options) {
    console.info('webitel-sdk-options', options);
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
      locale: this.$i18n.locale,
    };
  },
};
