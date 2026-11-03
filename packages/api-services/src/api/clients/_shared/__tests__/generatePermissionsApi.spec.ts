import { describe, expect, it } from 'vitest';

import { toAclFields } from '../generatePermissionsApi';

describe('toAclFields', () => {
	it('asks for one `granted` in place of the rule columns, and never for `id`', () => {
		expect(
			toAclFields({
				fields: [
					'id',
					'grantee',
					'r',
					'w',
					'd',
				],
				sort: '+w',
			}),
		).toEqual({
			fields: [
				'grantee',
				'granted',
			],
			sort: '+w',
		});
	});

	it('leaves missing `fields` as is', () => {
		expect(
			toAclFields({
				sort: '+w',
			}),
		).toEqual({
			fields: undefined,
			sort: '+w',
		});
	});
});
