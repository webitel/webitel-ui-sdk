import { z } from 'zod';

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
 */
export const filledLookupSchema = flexibleLookupSchema.refine(
	(value) => isFilled(value),
	{
		message: 'Value is required',
	},
);
