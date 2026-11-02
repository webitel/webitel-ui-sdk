import {
	EngineEmailAuthType,
	type EngineEmailProfile,
} from '@webitel/api-services/gen/models';
import { get } from 'lodash-es';
import { z } from 'zod';

import { clearableNumberSchema } from '../_shared/clearableNumber.validations';
import { i18nIssue } from '../_shared/i18nIssue';
import { isFilled } from '../_shared/isFilled';
import { filledLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

/** [Claude] the highest tcp port, the limit of the imap and smtp port fields */
export const EMAIL_PROFILE_MAX_PORT = 65535;

const oauth2Fields = [
	'clientId',
	'clientSecret',
	'redirectUrl',
] as const;

const oauth2Schema = z
	.object({
		clientId: z.string().optional().default(''),
		clientSecret: z.string().optional().default(''),
		redirectUrl: z.string().optional().default(''),
	})
	.passthrough();

/**
 * [Claude] Email profile card schema.
 *
 * Plain auth signs in with a password, oauth2 with the app's client settings.
 * The password is required only when creating: an empty one on update means
 * "keep the current one".
 */
export const emailProfileSchema = z
	.object<ZodShape<EngineEmailProfile>>({
		id: z.string().optional(),
		name: z.string().min(1).default(''),
		description: z.string().optional().default(''),
		enabled: z.boolean().default(true),
		mailbox: z.string().min(1).default(''),
		imapHost: z.string().min(1).default(''),
		imapPort: clearableNumberSchema.default(993),
		smtpHost: z.string().min(1).default(''),
		smtpPort: clearableNumberSchema.default(587),
		// [Claude] `.prefault`, not `.default`: zod 4's `.default({})` would skip the required check
		schema: filledLookupSchema.prefault({}),
		fetchInterval: clearableNumberSchema.default(60),
		listen: z.boolean().default(false),
		logged: z.boolean().default(false),
		authType: z.string().min(1).default(EngineEmailAuthType.Plain),
		login: z.string().min(1).default(''),
		password: z.string().optional().default(''),
		params: z
			.object({
				oauth2: oauth2Schema.prefault({}),
			})
			.passthrough()
			.prefault({}),
	})
	.passthrough()
	.superRefine((profile, ctx) => {
		const requireField = (path: string) => {
			if (isFilled(get(profile, path))) return;
			ctx.addIssue({
				code: 'custom',
				path: path.split('.'),
				...i18nIssue('required'),
			});
		};

		requireField('fetchInterval');

		for (const path of [
			'imapPort',
			'smtpPort',
		]) {
			requireField(path);
			const port = get(profile, path);
			if (
				typeof port === 'number' &&
				(port < 0 || port > EMAIL_PROFILE_MAX_PORT)
			) {
				ctx.addIssue({
					code: port < 0 ? 'too_small' : 'too_big',
					origin: 'number',
					...(port < 0
						? {
								minimum: 0,
							}
						: {
								maximum: EMAIL_PROFILE_MAX_PORT,
							}),
					inclusive: true,
					input: port,
					path: [
						path,
					],
				} as Parameters<typeof ctx.addIssue>[0]);
			}
		}

		if (profile.authType === EngineEmailAuthType.OAuth2) {
			for (const field of oauth2Fields) {
				requireField(`params.oauth2.${field}`);
			}
		} else if (!profile.id) {
			requireField('password');
		}
	});
