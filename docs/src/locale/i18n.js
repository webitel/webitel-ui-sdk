import { createI18n } from 'vue-i18n';
import en from './en/en';
import ru from './ru/ru';

const messages = {
  en,
  ru,
};

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});
