import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { WtApplication } from '../../../enums';

import { roleSchema } from '../role.validations';

const issuePaths = (result: ReturnType<typeof roleSchema.safeParse>) =>
	result.error?.issues.map(({ path }) => path.join('.')) ?? [];

const defaults = () => getDefaultsFromZodSchema(roleSchema, {});

describe('roleSchema', () => {
	it('seeds a new role without permissions and with every app allowed', () => {
		expect(defaults()).toMatchObject({
			name: '',
			description: '',
			permissions: [],
			metadata: {
				access: {
					[WtApplication.Admin]: {
						_enabled: true,
					},
				},
			},
		});
	});

	it('requires the name', () => {
		expect(issuePaths(roleSchema.safeParse(defaults()))).toEqual([
			'name',
		]);
	});

	it('keeps the access tree as is', () => {
		const access = {
			admin: {
				_enabled: true,
				users: {
					_enabled: false,
				},
			},
		};
		const result = roleSchema.safeParse({
			name: 'role',
			metadata: {
				access,
			},
		});

		expect(result.data?.metadata.access).toEqual(access);
	});
});
