import type { ComposerTranslation as I18nComposerTranslation } from 'vue-i18n';
import type { z } from 'zod/v4';

import { isEmpty } from '../../../scripts';

const isMissingValue = (value) => {
	if (typeof value === 'number') return false;
	return isEmpty(value) as boolean;
};

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
			case 'invalid_union':
				return handleInvalidUnion(issue);
			case 'custom':
				return issue.message || t('validation.invalid');
			default:
				return issue.code;
		}

		function handleTooSmall(
			issue: z.core.$ZodRawIssue<z.core.$ZodIssueTooSmall>,
		) {
			const showRequiredMsg = () => {
				return t('validation.required');
			};

			if (isMissingValue(issue.input)) {
				return showRequiredMsg();
			}

			// if str, show "length" error
			if (issue.origin === 'string') {
				return t('validation.minLength', {
					min: issue.minimum,
				});
			}

			// if date, show formatted date in the "value" error
			if (issue.origin === 'date') {
				return t('validation.minValue', {
					min: new Date(issue.minimum as number).toLocaleString(),
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

			// if date, show formatted date in the "value" error
			if (issue.origin === 'date') {
				return t('validation.maxValue', {
					max: new Date(issue.maximum as number).toLocaleString(),
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

		function handleInvalidUnion(
			issue: z.core.$ZodRawIssue<z.core.$ZodIssueInvalidUnion>,
		) {
			if (isMissingValue(issue.input)) {
				return t('validation.required');
			}

			return t('validation.invalid');
		}
	};
