import { snakeToCamel } from '@webitel/api-services/utils';
import { config } from '../../../config/config';

const BACKEND_ERRORS_PREFIX = 'backendErrors';

// Transformer to translate error messages from backend API responses
// Converts snake_case error IDs from backend to camelCase keys
// Looks up translations in api-services locale files under 'backendErrors' prefix
// Adds the translated message to err.response.data.translation for use by notify transformer
const translateError = (err) => {
	const errorId = err?.response?.data?.id;
	if (!errorId) return err;

	const i18n = config.i18n;
	if (!i18n?.global) return err;

	// Convert snake_case error ID to camelCase and build full key path
	const fullKey = `${BACKEND_ERRORS_PREFIX}.${snakeToCamel(errorId)}`;

	// Use i18n.t() to translate the error message
	const translation = i18n.global.t(
		fullKey,
		{},
		{
			missingWarn: false,
			fallbackWarn: false,
		},
	);

	// Add translation to error response if found (i18n.t returns the key if translation is missing)
	if (translation && translation !== fullKey && err.response?.data) {
		err.response.data.translation = translation;
	}

	return err;
};

export default translateError;
