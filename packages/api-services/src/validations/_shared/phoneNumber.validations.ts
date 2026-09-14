import { z } from 'zod';

import { i18nIssue } from './i18nIssue';

/**
 * Dialable number charset: latin letters, digits and `+ - _ . ! ~ * ' ( )`;
 * `+` only as a leading sign. Shared by all phone-shaped fields (member
 * destination, resource number, csv imports).
 *
 * [WTEL-9678](https://webitel.atlassian.net/browse/WTEL-9678),
 * [WTEL-10374](https://webitel.atlassian.net/browse/WTEL-10374)
 */
const phoneNumberPattern = /^\+?[A-Za-z0-9\-_.!~*'()]+$/;

/**
 * Required phone-shaped value.
 *
 * `refine`, not `regex`: only a `custom` issue passes `params.i18nKey` to the ui.
 * Empty string passes the refinement, so a blank field reports only `required`.
 */
export const phoneNumberSchema = z
	.string()
	.min(1)
	.refine(
		(value) => phoneNumberPattern.test(value),
		i18nIssue('phoneNumberSymbolsValidator'),
	);
