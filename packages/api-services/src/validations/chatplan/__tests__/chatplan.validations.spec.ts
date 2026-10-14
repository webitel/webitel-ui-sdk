import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { chatplanSchema } from '../chatplan.validations';

const issuePaths = (value: Record<string, unknown>) =>
	chatplanSchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('chatplanSchema', () => {
	it('seeds a new chatplan enabled, with empty fields', () => {
		expect(getDefaultsFromZodSchema(chatplanSchema, {})).toMatchObject({
			name: '',
			description: '',
			enabled: true,
		});
	});

	it('accepts a filled chatplan', () => {
		expect(
			issuePaths({
				name: 'Chat',
				schema: {
					id: 1,
					name: 'Bot',
				},
			}),
		).toEqual([]);
	});

	it('requires a name and a flow', () => {
		expect(
			issuePaths({
				name: '',
				schema: {},
			}),
		).toEqual([
			'name',
			'schema.id',
		]);
	});
});
