// Locale registry for error localization in api-services
// Manages locale from consuming applications and provides access to api-services error translations
import i18n from './i18n';

let appI18n = null;

// Get the current locale from the registered i18n instance
// Falls back to 'en' if no i18n instance is registered or if locale is invalid
export const getCurrentLocale = (): string => {
  const locale = appI18n?.global?.locale?.value || appI18n?.global?.locale;
  return  locale || 'en';
};

// Get api-services error translation messages for a given locale
// Returns the full locale message object containing backendErrors translations
export const getMessages = (locale: string): Record<string, any> | null => {
  return i18n.global.messages[locale] || null;
};

// Setup error localization by registering the app's i18n instance
// Error messages are automatically loaded from api-services locale files
export const setupErrorLocalization = (config: { i18n: any }): void => {
  appI18n = config.i18n;
};
