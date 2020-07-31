import Vue from 'vue';
import WebitelUI from '../../../dist/ui-sdk.common';
import WebitelUIEn from '../../../src/locale/en/en';
import WebitelUIRu from '../../../src/locale/ru/ru';
import i18n from '../locale/i18n';
import '../../../dist/ui-sdk.css';
import '../../../src/css/main.scss';
import eventBus from '../../../src/scripts/eventBus';

Vue.use(WebitelUI, { eventBus });
i18n.mergeLocaleMessage('en', WebitelUIEn);
i18n.mergeLocaleMessage('ru', WebitelUIRu);
