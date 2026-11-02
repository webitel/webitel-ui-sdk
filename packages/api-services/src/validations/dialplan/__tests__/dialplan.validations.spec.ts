import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { dialplanSchema } from '../dialplan.validations';

const filled = {
	name: 'Outbound',
	schema: {
		id: 1,
		name: 'IVR',
	},
	pattern: '^\\+?380\\d{9}$',
};

const issuePaths = (value: Record<string, unknown>) =>
	dialplanSchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('dialplanSchema', () => {
	it('seeds a new dialplan with empty fields', () => {
		expect(getDefaultsFromZodSchema(dialplanSchema, {})).toMatchObject({
			name: '',
			pattern: '',
			description: '',
			allowTransfer: false,
		});
	});

	it('accepts a filled dialplan', () => {
		expect(issuePaths(filled)).toEqual([]);
	});

	it('requires a name, a flow and a pattern', () => {
		expect(
			issuePaths({
				name: '',
				schema: {},
				pattern: '',
			}),
		).toEqual([
			'name',
			'schema.id',
			'pattern',
		]);
	});

	it('rejects a pattern that is not a valid regular expression', () => {
		expect(
			issuePaths({
				...filled,
				pattern: '([0-9]',
			}),
		).toEqual([
			'pattern',
		]);
	});
});
