// Locale registry for error localization in api-services
// Manages locale from consuming applications and provides access to api-services error translations
import { toValue } from 'vue';
import { config } from '../config/config';

// Get the current locale from the registered i18n instance
// Falls back to 'en' if no i18n instance is registered or if locale is invalid
export const getCurrentLocale = (): string => {
  const i18n = config.i18n;
  if (!i18n?.global) return 'en';

  return toValue(i18n.global.locale) || 'en';
};

// Get api-services error translation messages for a given locale
// Returns the full locale message object containing backendErrors translations
export const getMessages = (locale: string): Record<string, any> | null => {
  const i18n = config.i18n;
  if (!i18n?.global?.messages) return null;

  const messagesObj = toValue(i18n.global.messages);

  return messagesObj?.[locale] || null;
};
