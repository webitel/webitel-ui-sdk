import Vue from 'vue';
import App from './the-app.vue';
import './components'; // init all components
import './directives'; // init all directives
import i18n from './locale/i18n';

import './css/fonts.scss';

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount('#app');
