import { describe, expect, it } from 'vitest';

import type { DataField } from '../../../../../gen/_models';
import { stringifyContactExtensionFilters } from '../stringifyContactExtensionFilters';

const fields: DataField[] = [
	{
		id: 'tee',
		kind: 'string',
	},
	{
		id: 'test',
		kind: 'int32',
	},
	{
		id: 'my_bool',
		kind: 'bool',
	},
	{
		id: 'ca',
		kind: 'datetime',
	},
	{
		id: 'my_priority',
		kind: 'lookup',
	},
	{
		id: 'tags',
		kind: 'list',
	},
];

describe('stringifyContactExtensionFilters', () => {
	it('builds a CEL expression by field kind', () => {
		expect(
			stringifyContactExtensionFilters(
				{
					tee: '123',
					test: 42,
					my_bool: false,
					ca: {
						from: 1700000000000,
					},
					my_priority: '1',
					tags: [
						'1',
						'2',
					],
				},
				fields,
			),
		).toBe(
			'tee == "123" && test == 42 && my_bool == false && ca >= 1700000000000 && my_priority.id == "1" && (tags.exists(x, x.id == "1") || tags.exists(x, x.id == "2"))',
		);
	});

	it('skips a list filter with no selected items', () => {
		expect(
			stringifyContactExtensionFilters(
				{
					tee: '123',
					tags: [],
				},
				fields,
			),
		).toBe('tee == "123"');
	});

	it('returns undefined when no extension filter is applied', () => {
		expect(
			stringifyContactExtensionFilters(
				{
					page: 1,
					tee: null,
				},
				fields,
			),
		).toBeUndefined();
	});
});
