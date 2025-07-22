import { createI18n } from 'vue-i18n';

import en from './en/en.js';
import es from './es/es.js';
import kz from './kz/kz.js';
import pl from './pl/pl';
import ro from './ro/ro.js';
import ru from './ru/ru.js';
import uk from './uk/uk.js';
import uz from './uz/uz';
import vi from './vi/vi';

const messages = {
  en,
  es,
  ru,
  ro,
  uk,
  kz,
  pl,
  uz,
  vi,
};

export default createI18n({
  // legacy: false,
  locale: 'en',
  allowComposition: true,
  fallbackLocale: 'en',
  messages,
});
