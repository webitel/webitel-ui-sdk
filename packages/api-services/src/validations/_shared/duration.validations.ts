import { z } from 'zod';

/**
 * [Claude] Duration may come as a numeric string (e.g. "0" from wt-timepicker),
 * so compare the numeric value, not the string length.
 */
export const requiredDurationSchema = (min = 1) =>
	z
		.union([
			z.string(),
			z.number(),
		])
		.superRefine((value, ctx) => {
			if (Number(value) >= min) return;

			ctx.addIssue({
				code: 'too_small',
				origin: 'number',
				minimum: min,
				inclusive: true,
				input: value,
			});
		});
