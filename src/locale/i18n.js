import { createI18n } from 'vue-i18n';

import en from './en/en.js';
import es from './es/es.js';
import kz from './kz/kz.js';
import ru from './ru/ru.js';
import uk from './uk/uk.js';

const messages = {
  en,
  es,
  ru,
  uk,
  kz,
};

export default createI18n({
  // legacy: false,
  locale: 'en',
  allowComposition: true,
  fallbackLocale: 'en',
  messages,
});
