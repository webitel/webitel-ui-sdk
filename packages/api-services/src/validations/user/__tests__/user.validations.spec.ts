import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { buildUserSchema, userSchema } from '../user.validations';

const issuePaths = (result: ReturnType<typeof userSchema.safeParse>) =>
	result.error?.issues.map(({ path }) => path.join('.')) ?? [];

describe('userSchema', () => {
	it('seeds a new user with the form defaults', () => {
		expect(getDefaultsFromZodSchema(userSchema, {})).toMatchObject({
			name: '',
			username: '',
			password: '',
			extension: '',
			roles: [],
			license: [],
			devices: [],
			device: {},
			variables: [],
			forcePasswordChange: false,
			generateDevice: false,
		});
	});

	it('requires name, login and password for a new user', () => {
		const paths = issuePaths(
			userSchema.safeParse(getDefaultsFromZodSchema(userSchema, {})),
		);

		expect(paths).toEqual(
			expect.arrayContaining([
				'name',
				'username',
				'password',
			]),
		);
	});

	it('does not require password for an existing user', () => {
		const result = userSchema.safeParse({
			id: '1',
			name: 'John',
			username: 'john',
		});

		expect(result.success).toBe(true);
	});

	it('accepts digits-only extension', () => {
		expect(
			issuePaths(
				userSchema.safeParse({
					id: '1',
					name: 'John',
					username: 'john',
					extension: '12a',
				}),
			),
		).toEqual([
			'extension',
		]);
	});

	it('requires the other half of a filled variable pair', () => {
		const paths = issuePaths(
			userSchema.safeParse({
				id: '1',
				name: 'John',
				username: 'john',
				variables: [
					{
						key: 'k',
						value: '',
					},
					{
						key: '',
						value: 'v',
					},
					{
						key: '',
						value: '',
					},
				],
			}),
		);

		expect(paths).toEqual([
			'variables.0.value',
			'variables.1.key',
		]);
	});
});

describe('buildUserSchema', () => {
	const user = {
		id: '1',
		name: 'John',
		username: 'john',
	};

	it('checks a filled password against the configured regexp', () => {
		const schema = buildUserSchema({
			passwordRegExp: '^\\d+$',
			passwordValidationText: 'Digits only',
		});

		const result = schema.safeParse({
			...user,
			password: 'abc',
		});

		expect(result.error?.issues).toEqual([
			expect.objectContaining({
				path: [
					'password',
				],
				message: 'Digits only',
			}),
		]);
		expect(
			schema.safeParse({
				...user,
				password: '123',
			}).success,
		).toBe(true);
	});

	it('skips the regexp for an empty password on an existing user', () => {
		const schema = buildUserSchema({
			passwordRegExp: '^\\d+$',
		});

		expect(schema.safeParse(user).success).toBe(true);
	});
});
