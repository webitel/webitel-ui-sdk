import Vue from 'vue';
import App from './the-app.vue';
import router from './router';
// import store from './store';
import i18n from './locale/i18n';
import eventBus from '../../src/scripts/eventBus';

import 'prismjs/themes/prism.css';
import './plugins/webitel-ui';
import './css/main.scss';
import './components/shared';

Vue.config.productionTip = false;
Vue.prototype.$eventBus = eventBus;

new Vue({
  router,
  // store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
