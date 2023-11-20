import WebitelUI from '../../../src/install';
import WebitelUIEn from '../../../src/locale/en/en';
import WebitelUIRu from '../../../src/locale/ru/ru';
import WebitelUIUa from '../../../src/locale/ua/ua';
import eventBus from '../../../src/scripts/eventBus';
import i18n from '../locale/i18n';
// import '../../../src/css/main.scss';
import '../../../src/assets/icons/sprite';

const globals = {
  $baseURL: process.env.BASE_URL,
};
export default [WebitelUI, { eventBus, globals }];

i18n.global.mergeLocaleMessage('en', WebitelUIEn);
i18n.global.mergeLocaleMessage('ru', WebitelUIRu);
i18n.global.mergeLocaleMessage('ua', WebitelUIUa);
