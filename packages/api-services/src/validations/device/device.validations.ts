import type { ApiDevice } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { i18nIssue } from '../_shared/i18nIssue';
import { isIp } from '../_shared/ip.validations';
import { flexibleLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

const optionalIpSchema = z
	.string()
	.optional()
	.default('')
	.refine(isIp, i18nIssue('ipValidator'));

const optionalMacSchema = z
	.string()
	.optional()
	.default('')
	.refine((value) => !value || macRegex.test(value), i18nIssue('macValidator'));

/**
 * Device card schema.
 *
 * Password is required only when creating (`id` absent) — an empty password on
 * update means "keep the current one" (see DevicesAPI.preRequestHandler).
 */
export const deviceSchema = z
	.object<ZodShape<ApiDevice>>({
		id: z.string().optional(),
		name: z.string().min(1).default(''),
		account: z.string().min(1).default(''),
		password: z.string().optional().default(''),
		user: flexibleLookupSchema.optional().default({}),
		ip: optionalIpSchema,
		brand: z.string().optional().default(''),
		model: z.string().optional().default(''),
		mac: optionalMacSchema,
		// No defaults — regular devices must omit these (see DevicesAPI.preRequestHandler / WTEL-10460).
		// Hotdesk create sets them in opened-device via applyHotdeskDefaults.
		hotdesk: z.boolean().optional(),
		hotdesks: z.array(z.string()).optional(),
	})
	.superRefine((data, ctx) => {
		if (!data.id && !data.password) {
			ctx.addIssue({
				code: 'custom',
				path: [
					'password',
				],
				...i18nIssue('required'),
			});
		}

		const hotdesks = data.hotdesks as string[] | undefined;
		if (data.hotdesk && hotdesks?.some((hotdesk) => !/\w+/.test(hotdesk))) {
			ctx.addIssue({
				code: 'custom',
				path: [
					'hotdesks',
				],
				...i18nIssue('required'),
			});
		}
	});
