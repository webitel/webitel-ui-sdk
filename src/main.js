import Vue from 'vue';
import App from './the-app.vue';
import './directives'; // init all directives
import './filters'; // init all filters
import './components'; // init all components
import i18n from './locale/i18n';
import eventBus from './scripts/eventBus';

import './css/fonts.scss';

Vue.config.productionTip = false;
Vue.prototype.$eventBus = eventBus;

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount('#app');
