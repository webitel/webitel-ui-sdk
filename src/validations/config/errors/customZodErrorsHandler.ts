import type { ComposerTranslation as I18nComposerTranslation } from 'vue-i18n';
import type { z } from 'zod/v4';

import { isEmpty } from '../../../scripts';

export const customZodErrorsHandler =
	(t: I18nComposerTranslation) => (issue: z.core.$ZodRawIssue) => {
		switch (issue.code) {
			case 'too_small':
				return handleTooSmall(issue);
			case 'too_big':
				return handleTooBig(issue);
			case 'invalid_value':
			case 'invalid_type':
				return handleInvalid(issue);
			case 'custom':
				return handleCustom(issue);
			default:
				return issue.code;
		}

		/**
		 * Schemas outside the app (`@webitel/api-services/validations`) cannot
		 * translate, so a custom rule reports its message key through
		 * `params.i18nKey` — see the `i18nIssue` helper there. Anything else falls
		 * back to zod's own message.
		 */
		function handleCustom(issue: z.core.$ZodRawIssue<z.core.$ZodIssueCustom>) {
			const key = issue.params?.i18nKey;

			return typeof key === 'string' ? t(`validation.${key}`) : undefined;
		}

		function handleTooSmall(
			issue: z.core.$ZodRawIssue<z.core.$ZodIssueTooSmall>,
		) {
			const showRequiredMsg = () => {
				return t('validation.required');
			};

			// if empty, show "required" error
			if (isEmpty(issue.input) as boolean) {
				return showRequiredMsg();
			}

			// if str, show "length" error
			if (issue.origin === 'string') {
				return t('validation.minLength', {
					min: issue.minimum,
				});
			}

			// else, show "value" error
			return t('validation.minValue', {
				min: issue.minimum,
			});
		}

		function handleTooBig(issue: z.core.$ZodRawIssue<z.core.$ZodIssueTooBig>) {
			// if string, show "length" error
			if (issue.origin === 'string') {
				return t('validation.maxLength', {
					max: issue.maximum,
				});
			}

			// else, show "value" error
			return t('validation.maxValue', {
				max: issue.maximum,
			});
		}

		function handleInvalid(
			issue:
				| z.core.$ZodRawIssue<z.core.$ZodIssueInvalidType>
				| z.core.$ZodRawIssue<z.core.$ZodIssueInvalidValue>,
		) {
			if (isEmpty(issue.input)) {
				return t('validation.required');
			}

			console.error('Unknown Invalid Zod issue:', issue);
		}
	};
