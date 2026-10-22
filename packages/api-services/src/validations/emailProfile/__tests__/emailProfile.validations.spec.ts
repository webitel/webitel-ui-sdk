import { EngineEmailAuthType } from '@webitel/api-services/gen/models';
import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { emailProfileSchema } from '../emailProfile.validations';

const issuePaths = (result: ReturnType<typeof emailProfileSchema.safeParse>) =>
	result.error?.issues.map(({ path }) => path.join('.')) ?? [];

const filled = {
	name: 'support',
	mailbox: 'support@example.com',
	imapHost: 'imap.example.com',
	smtpHost: 'smtp.example.com',
	login: 'support@example.com',
	password: 'secret',
	schema: {
		id: '1',
		name: 'flow',
	},
};

describe('emailProfileSchema', () => {
	it('seeds a new profile with plain auth and the usual ports', () => {
		expect(getDefaultsFromZodSchema(emailProfileSchema, {})).toMatchObject({
			enabled: true,
			imapPort: 993,
			smtpPort: 587,
			fetchInterval: 60,
			listen: false,
			authType: EngineEmailAuthType.Plain,
			params: {
				oauth2: {
					clientId: '',
					clientSecret: '',
					redirectUrl: '',
				},
			},
		});
	});

	it('requires the connection settings, the flow and a password for a new profile', () => {
		const paths = issuePaths(
			emailProfileSchema.safeParse(
				getDefaultsFromZodSchema(emailProfileSchema, {}),
			),
		);

		expect(paths).toEqual(
			expect.arrayContaining([
				'name',
				'mailbox',
				'imapHost',
				'smtpHost',
				'login',
				'schema.id',
				'password',
			]),
		);
	});

	it('does not require the password of a saved profile', () => {
		const result = emailProfileSchema.safeParse({
			...getDefaultsFromZodSchema(emailProfileSchema, {}),
			...filled,
			id: '1',
			password: '',
		});

		expect(result.success).toBe(true);
	});

	it('requires the client settings instead of a password for oauth2', () => {
		const paths = issuePaths(
			emailProfileSchema.safeParse({
				...getDefaultsFromZodSchema(emailProfileSchema, {}),
				...filled,
				password: '',
				authType: EngineEmailAuthType.OAuth2,
			}),
		);

		expect(paths).toEqual([
			'params.oauth2.clientId',
			'params.oauth2.clientSecret',
			'params.oauth2.redirectUrl',
		]);
	});

	it('rejects a port out of range and an emptied one', () => {
		const paths = issuePaths(
			emailProfileSchema.safeParse({
				...getDefaultsFromZodSchema(emailProfileSchema, {}),
				...filled,
				imapPort: 70000,
				smtpPort: null,
			}),
		);

		expect(paths).toEqual([
			'imapPort',
			'smtpPort',
		]);
	});
});
