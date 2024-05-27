import { createI18n } from 'vue-i18n';
import en from './en/en.js';
import es from './es/es.js';
import kz from './kz/kz.js';
import ru from './ru/ru.js';
import ua from './ua/ua.js';

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
