import { createI18n } from 'vue-i18n';
import en from './en/en.js';
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

export default createI18n({
  // legacy: false,
  locale: 'en',
  allowComposition: true,
  fallbackLocale: 'en',
  messages,
});
