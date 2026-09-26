import { z } from 'zod';

import { i18nIssue } from './i18nIssue';
import { isFilled } from './isFilled';

export const lookupSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
});

export const requiredLookupSchema = z.object({
	id: z.string().min(1),
	name: z.string().optional(),
});

/**
 * @description
 * A lookup whose `id` may arrive as a number. Several call-center endpoints
 * return numeric ids, and validating those against `lookupSchema`'s
 * string-only `id` would fail a field the user filled in correctly.
 */
export const flexibleLookupSchema = z.object({
	id: z
		.union([
			z.string(),
			z.number(),
		])
		.optional(),
	name: z.string().optional(),
});

/**
 * The same, but required — reproducing Vuelidate's `required` on a lookup,
 * which treated an empty object as missing.
 *
 * The issue lands on `id`, not on the lookup itself: Regle builds a *nested*
 * field status for an object-typed field, and an issue whose path stops at
 * that object has nowhere to land there — it reaches neither `$errors` nor
 * `$invalid`, so a cleared lookup showed no message and left the save button
 * enabled. A leaf path is where Regle looks. WTEL-10408
 */
export const filledLookupSchema = flexibleLookupSchema.superRefine(
	(value, ctx) => {
		if (isFilled(value)) return;

		ctx.addIssue({
			code: 'custom',
			path: [
				'id',
			],
			...i18nIssue('required'),
		});
	},
);
