import { createI18n } from 'vue-i18n';
import en from './en/en';
import ru from './ru/ru';
import ua from './ua/ua';

const messages = {
  en,
  ru,
  ua,
};

// eslint-disable-next-line new-cap
export default new createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});
