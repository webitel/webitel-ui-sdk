import WebitelCCUI from '@webitel/cc-ui-sdk/dist/cc-ui-sdk.common';
import WebitelCCUIEn from '@webitel/cc-ui-sdk/src/locale/en/en';
import WebitelCCUIUa from '@webitel/cc-ui-sdk/src/locale/ua/ua';
import WebitelCCUIRu from '@webitel/cc-ui-sdk/src/locale/ru/ru';
import i18n from '../locale/i18n';
import '@webitel/cc-ui-sdk/dist/cc-ui-sdk.css';

// import instance from '../api/instance';
// import openAPIConfig from '../api/openAPIConfig';

// Vue.use(WebitelCCUI, { instance, openAPIConfig });
export default [WebitelCCUI];
i18n.global.mergeLocaleMessage('en', WebitelCCUIEn);
i18n.global.mergeLocaleMessage('ru', WebitelCCUIRu);
i18n.global.mergeLocaleMessage('ua', WebitelCCUIUa);
