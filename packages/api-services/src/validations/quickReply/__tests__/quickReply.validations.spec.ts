import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { quickReplySchema } from '../quickReply.validations';

const issuePaths = (value: Record<string, unknown>) =>
	quickReplySchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('quickReplySchema', () => {
	it('seeds a new quick reply with empty teams and queues', () => {
		expect(getDefaultsFromZodSchema(quickReplySchema, {})).toMatchObject({
			teams: [],
			queues: [],
		});
	});

	it('requires a name and a text', () => {
		expect(
			issuePaths({
				name: '',
				text: '',
			}),
		).toEqual([
			'name',
			'text',
		]);
	});

	it('accepts a filled quick reply with numeric lookup ids', () => {
		expect(
			issuePaths({
				name: 'Greeting',
				text: 'Hello!',
				teams: [
					{
						id: 1,
						name: 'Support',
					},
				],
				queues: [
					{
						id: '2',
						name: 'Inbound',
					},
				],
			}),
		).toEqual([]);
	});
});
