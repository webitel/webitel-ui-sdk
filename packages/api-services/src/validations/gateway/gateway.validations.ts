import { z } from 'zod';

import { GatewayIpAclProtocol } from '../../enums/GatewayIpAclProtocol/GatewayIpAclProtocol';

import { clearableNumberSchema } from '../_shared/clearableNumber.validations';
import { i18nIssue } from '../_shared/i18nIssue';
import { ipv4Pattern, isIp } from '../_shared/ip.validations';
import { isFilled } from '../_shared/isFilled';
import { lookupSchema } from '../_shared/lookup.validations';

const gatewayIpHostRegex = new RegExp(
	`^(sips?:)?${ipv4Pattern}(:[0-9]{1,5})?$`,
);
const gatewayFqdnHostRegex =
	/^(sips?:)?(?=.{1,254}$)((?=[a-z0-9-]{1,63}\.)(xn--+)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}/i;
const sipAccountRegex =
	/^(sips?:)?([\w\-.!~*()&=+$,;?/]+)(?:@([\w\-.]+)(?::(\d{3,5}))?)?$/i;
const sipPasswordRegex = /^[A-Za-z0-9\-_.~]+$/;

/** [Claude] format rule only: an empty value passes, required is checked per gateway type */
const isGatewayHost = (value: string) =>
	!value || gatewayIpHostRegex.test(value) || gatewayFqdnHostRegex.test(value);

const gatewayHostSchema = z
	.string()
	.optional()
	.default('')
	.refine(isGatewayHost, i18nIssue('gatewayHostValidator'));

export const gatewayIpAclSchema = z.object({
	ip: z
		.string()
		.refine(isFilled, i18nIssue('required'))
		.refine(isIp, i18nIssue('ipValidator')),
	proto: z.enum(GatewayIpAclProtocol).default(GatewayIpAclProtocol.Any),
	port: clearableNumberSchema,
});

export const GATEWAY_EXPIRES_MIN = 32;
export const GATEWAY_EXPIRES_MAX = 3600;

/** [Claude] checked only for a registration: trunks don't use expires and may come with 0 */
const expiresRangeSchema = z
	.number()
	.min(GATEWAY_EXPIRES_MIN)
	.max(GATEWAY_EXPIRES_MAX);

/**
 * [Claude] One schema for both gateway types, `register` tells them apart:
 * a SIP registration needs account, password (on create) and expires,
 * a SIP trunk needs host and an ip for every ACL entry.
 */
export const gatewaySchema = z
	.object({
		id: z
			.union([
				z.string(),
				z.number(),
			])
			.optional(),
		name: z.string().default(''),
		register: z.boolean().default(false),
		enable: z.boolean().default(true),
		proxy: gatewayHostSchema,
		schema: lookupSchema.optional().default({}),
		usage: z.string().default(''),
		// [Claude] registration
		account: z
			.string()
			.optional()
			.default('')
			.refine(
				(value) => !value || sipAccountRegex.test(value),
				i18nIssue('sipAccountValidator'),
			),
		username: z.string().default(''),
		password: z
			.string()
			.optional()
			.default('')
			.refine(
				(value) => !value || sipPasswordRegex.test(value),
				i18nIssue('sipPasswordSymbolsValidator'),
			),
		expires: clearableNumberSchema.default(600),
		// [Claude] trunking
		host: gatewayHostSchema,
		ipacl: z.array(gatewayIpAclSchema).optional().default([]),
	})
	.superRefine((data, ctx) => {
		/** [Claude] password is required only on create: an empty one on update keeps the stored password */
		const requiredFields = data.register
			? ([
					'proxy',
					'account',
					'expires',
					...(data.id ? [] : (['password'] as const)),
				] as const)
			: ([
					'proxy',
					'host',
				] as const);

		requiredFields
			.filter((field) => !isFilled(data[field]))
			.forEach((field) =>
				ctx.addIssue({
					code: 'custom',
					path: [
						field,
					],
					...i18nIssue('required'),
				}),
			);

		if (data.register && isFilled(data.expires)) {
			expiresRangeSchema
				.safeParse(data.expires)
				.error?.issues.forEach((issue) =>
					ctx.addIssue({
						...issue,
						path: [
							'expires',
						],
					}),
				);
		}
	});

export type GatewayFormShape = z.input<typeof gatewaySchema>;
export type GatewayCard = GatewayFormShape & {
	rState?: number;
};
export type GatewayIpAcl = z.input<typeof gatewayIpAclSchema>;
