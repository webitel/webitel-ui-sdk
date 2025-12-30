import { createI18n } from 'vue-i18n';
import { messages } from './index';

// Internal i18n instance for error localization in api-services
// Contains backend error translations that are used by the localizeError transformer
const i18n = createI18n({
  // legacy: false,
  locale: 'en',
  allowComposition: true,
  fallbackLocale: 'en',
  messages,
});

export default i18n;
