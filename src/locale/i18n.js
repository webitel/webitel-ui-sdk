import { createI18n } from 'vue-i18n';
import en from './en/en';
import es from './es/es';
import kz from './kz/kz';
import ru from './ru/ru';
import ua from './ua/ua';

const messages = {
  en,
  es,
  ru,
  ua,
  kz,
};

// eslint-disable-next-line new-cap
export default new createI18n({
  // legacy: false,
  locale: 'en',
  allowComposition: true,
  fallbackLocale: 'en',
  messages,
});
