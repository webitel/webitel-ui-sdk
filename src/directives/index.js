import Vue from 'vue';
import clickaway from './clickaway/clickaway';

const Directives = {
  clickaway,
};

Object.keys(Directives).forEach((name) => {
  Vue.directive(name, Directives[name]);
});

export default Directives;
