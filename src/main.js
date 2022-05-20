import Vue from 'vue';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';
import App from './the-app.vue';
import './directives'; // init all directives
import './filters'; // init all filters
import './components'; // init all components
import i18n from './locale/i18n';
import eventBus from './scripts/eventBus';
import './assets/icons/sprite';

import './css/styleguide/fonts/_fonts.scss';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.$eventBus = eventBus;

Vue.use(FloatingVue, {
  arrowOverflow: true,
});

new Vue({
  i18n,
  router,
  render: (h) => h(App),
}).$mount('#app');
