import Vue from 'vue';
import App from './the-app.vue';
import './components'; // init all components
import './directives'; // init all directives

import './css/fonts.scss';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
