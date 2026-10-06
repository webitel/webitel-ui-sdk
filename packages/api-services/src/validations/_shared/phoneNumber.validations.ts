import { z } from 'zod';

import { i18nIssue } from './i18nIssue';

// optional leading `+`, then latin letters, digits and `- _ . ! ~ * ' ( )`
const phoneNumberPattern = /^\+?[A-Za-z0-9\-_.!~*'()]*$/;

// `refine`, not `regex`: only a `custom` issue carries `params.i18nKey`
export const phoneNumberSchema = z
	.string()
	.min(1)
	.refine(
		(value) => value === '' || phoneNumberPattern.test(value),
		i18nIssue('phoneNumberSymbolsValidator'),
	);
