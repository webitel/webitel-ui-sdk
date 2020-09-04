import Vue from 'vue';

import WebitelUI from '@webitel/ui-sdk/dist/ui-sdk.common';
import WebitelUIEn from '@webitel/ui-sdk/src/locale/en/en';
import WebitelUIRu from '@webitel/ui-sdk/src/locale/ru/ru';
import '@webitel/ui-sdk/dist/ui-sdk.css';
import '@webitel/ui-sdk/src/css/main.scss';

// import WebitelUI from '../../../dist/ui-sdk.common';
// import WebitelUIEn from '../../../src/locale/en/en';
// import WebitelUIRu from '../../../src/locale/ru/ru';
// import '../../../dist/ui-sdk.css';
// import '../../../src/css/main.scss';

import i18n from '../locale/i18n';
import router from '../router/index';
import eventBus from '../../../src/scripts/eventBus';

Vue.use(WebitelUI, { eventBus, router });
i18n.mergeLocaleMessage('en', WebitelUIEn);
i18n.mergeLocaleMessage('ru', WebitelUIRu);
