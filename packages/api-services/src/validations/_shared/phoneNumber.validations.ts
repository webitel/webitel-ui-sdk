import { z } from 'zod';

import { i18nIssue } from './i18nIssue';

/**
 * The character set a dialable number may use: latin letters, digits and
 * `+ - _ . ! ~ * ' ( )`, with `+` allowed only as a leading sign.
 *
 * Single source for every phone-shaped field in the apps — a queue member's
 * communication destination, a resource number, and the csv imports that feed
 * both. Prefer `phoneNumberSchema` over testing the pattern by hand; reach for
 * the pattern itself only where a zod schema does not fit.
 *
 * [WTEL-9678](https://webitel.atlassian.net/browse/WTEL-9678),
 * [WTEL-10374](https://webitel.atlassian.net/browse/WTEL-10374)
 */
export const phoneNumberPattern = /^\+?[A-Za-z0-9\-_.!~*'()]+$/;

/**
 * @description
 * A required phone-shaped value.
 *
 * `refine`, not `regex`: only a `custom` issue carries `params.i18nKey` through
 * to the ui, a `regex` one surfaces its raw zod code instead. See `i18nIssue`.
 *
 * The empty string passes the refinement so that a blank field reports
 * `required` alone — zod runs refinements even after `min(1)` has failed.
 */
export const phoneNumberSchema = z
	.string()
	.min(1)
	.refine(
		(value) => value === '' || phoneNumberPattern.test(value),
		i18nIssue('phoneNumberSymbolsValidator'),
	);
