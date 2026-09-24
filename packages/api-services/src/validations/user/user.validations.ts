import { z } from 'zod';

import { i18nIssue } from '../_shared/i18nIssue';
import { flexibleLookupSchema } from '../_shared/lookup.validations';
import { variablePairSchema } from '../_shared/variablePair.validations';

const digitsRegex = /^[0-9]*$/;

export const userSchemaBase = z.object({
	id: z.string().optional(),
	name: z.string().min(1).default(''),
	username: z.string().min(1).default(''),
	password: z.string().optional().default(''),
	extension: z
		.string()
		.optional()
		.default('')
		.refine((value) => !value || digitsRegex.test(value), i18nIssue('numeric')),
	email: z.string().optional().default(''),
	chatName: z.string().optional().default(''),
	contact: flexibleLookupSchema.nullish().default({}),
	roles: z.array(flexibleLookupSchema).optional().default([]),
	license: z.array(z.any()).optional().default([]),
	devices: z.array(flexibleLookupSchema).optional().default([]),
	device: flexibleLookupSchema.nullish().default({}),
	forcePasswordChange: z.boolean().optional().default(false),
	generateDevice: z.boolean().optional().default(false),
	variables: z.array(variablePairSchema).optional().default([]),
});

export const userSchema = userSchemaBase.superRefine((user, ctx) => {
	if (!user.id && !user.password) {
		ctx.addIssue({
			code: 'custom',
			path: [
				'password',
			],
			...i18nIssue('required'),
		});
	}

	user.variables?.forEach(({ key, value }, index) => {
		if (value && !key) {
			ctx.addIssue({
				code: 'custom',
				path: [
					'variables',
					index,
					'key',
				],
				...i18nIssue('required'),
			});
		}
		if (key && !value) {
			ctx.addIssue({
				code: 'custom',
				path: [
					'variables',
					index,
					'value',
				],
				...i18nIssue('required'),
			});
		}
	});
});

export interface UserPasswordRules {
	passwordRegExp?: string;
	passwordValidationText?: string;
}

export const buildUserSchema = ({
	passwordRegExp,
	passwordValidationText,
}: UserPasswordRules = {}) =>
	userSchema.superRefine((user, ctx) => {
		if (!passwordRegExp || !user.password) return;
		if (new RegExp(passwordRegExp).test(user.password)) return;

		ctx.addIssue({
			code: 'custom',
			path: [
				'password',
			],
			...(passwordValidationText
				? {
						message: passwordValidationText,
					}
				: i18nIssue('isRegExpMatched')),
		});
	});

export type UserFormShape = z.input<typeof userSchemaBase>;
