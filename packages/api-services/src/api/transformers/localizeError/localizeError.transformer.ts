import { snakeToCamel } from '@webitel/api-services/utils';
import { getCurrentLocale, getMessages } from '../../../locale/localeRegistry';

const BACKEND_ERRORS_PREFIX = 'backendErrors';

// Transformer to localize error messages from backend API responses
// Converts snake_case error IDs from backend to camelCase keys
// Looks up translations in api-services locale files under 'backendErrors' prefix
// Adds the localized message to err.response.data.locale for use by notify transformer
const localizeError = (err) => {
  const errorId = err?.response?.data?.id;
  if (!errorId) return err;

  const messages = getMessages(getCurrentLocale());
  if (!messages) return err;

  // Convert snake_case error ID to camelCase and build full key path
  const fullKey = `${BACKEND_ERRORS_PREFIX}.${snakeToCamel(errorId)}`;

  // Navigate nested message object: backendErrors.camelCaseErrorId
  const translation = fullKey.split('.').reduce((obj, part) => obj?.[part], messages);

  // Add translation to error response if found
  if (translation && err.response?.data) {
    err.response.data.locale = translation;
  }

  return err;
};

export default localizeError;
