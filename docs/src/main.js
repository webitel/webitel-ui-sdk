import 'prismjs/themes/prism.css';
import { createApp } from 'vue';
import Components from './components/shared';
import i18n from './locale/i18n';
import prismMixin from './mixins/prismMixin';
import WebitelCcUi from './plugins/webitel-cc-ui';

import WebitelUi from './plugins/webitel-ui';
import router from './router';
import App from './the-app.vue';

const app = createApp(App)
  .use(router)
  .use(i18n)
  .use(...WebitelUi)
  .use(...WebitelCcUi)
  .mixin(prismMixin);

Object.keys(Components).forEach((name) => {
  app.component(name, Components[name]);
});

app.mount('#app');
