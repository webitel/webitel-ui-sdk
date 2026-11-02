import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { flowSchema } from '../flow.validations';

const issuePaths = (value: Record<string, unknown>) =>
	flowSchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('flowSchema', () => {
	it('seeds a new code flow with an empty schema', () => {
		expect(getDefaultsFromZodSchema(flowSchema, {})).toMatchObject({
			schema: '[]',
			tags: [],
			editor: false,
		});
	});

	it('requires a name and a schema', () => {
		expect(
			issuePaths({
				name: '',
				schema: '',
			}),
		).toEqual([
			'name',
			'schema',
		]);
	});

	it('accepts a filled flow with tags', () => {
		expect(
			issuePaths({
				name: 'IVR',
				schema: '[]',
				type: 'voice',
				tags: [
					{
						name: 'main',
					},
				],
			}),
		).toEqual([]);
	});
});
