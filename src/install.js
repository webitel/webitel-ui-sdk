import Components from './components'; // init all components
import Directives from './directives'; // init all directives
import './css/fonts.scss';

export default {
  install(Vue, options) {
    console.info('webitel-sdk-options', options);
    Object.keys(Components).forEach((name) => {
      Vue.component(name, Components[name]);
    });
    Object.keys(Components).forEach((name) => {
      Vue.directives(name, Directives[name]);
    });
  },
};
