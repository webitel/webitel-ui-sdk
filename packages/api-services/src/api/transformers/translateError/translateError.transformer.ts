import { snakeToCamel } from '@webitel/api-services/utils';
import type { Composer } from 'vue-i18n';

import { config } from '../../../config/config';

const BACKEND_ERRORS_PREFIX = 'backendErrors';

// Transformer to translate error messages from backend API responses
// Converts snake_case error IDs from backend to camelCase keys
// Looks up translations in api-services locale files under 'backendErrors' prefix
// Adds the translated message to err.response.data.translation for use by notify transformer
interface TranslatableError {
	response?: {
		data?: {
			id?: string;
			translation?: string;
		};
	};
}

const translateError = <T extends TranslatableError>(err: T): T => {
	const errorId = err?.response?.data?.id;
	if (!errorId) return err;

	const i18n = config.i18n;
	if (!i18n?.global) return err;

	// Convert snake_case error ID to camelCase and build full key path
	const fullKey = `${BACKEND_ERRORS_PREFIX}.${snakeToCamel(errorId)}`;

	// Use i18n.t() to translate the error message.
	// `i18n.global` is a Composer | VueI18n union whose `t` overloads don't
	// unify, so narrow to the composition-API Composer we run with.
	const translation = (i18n.global as Composer).t(
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
