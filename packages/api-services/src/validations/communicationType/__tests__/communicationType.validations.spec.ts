import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { communicationTypeSchema } from '../communicationType.validations';

const filledCommunicationType = {
	name: 'Mobile',
	channel: 'Phone',
	code: 'mobile',
};

const issuePaths = (value: Record<string, unknown>) =>
	communicationTypeSchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('communicationTypeSchema', () => {
	it('seeds a new communication type with the defaults the form expects', () => {
		expect(getDefaultsFromZodSchema(communicationTypeSchema, {})).toMatchObject(
			{
				name: '',
				channel: '',
				code: '',
				description: '',
				default: false,
			},
		);
	});

	it('requires a name, a channel and a code', () => {
		const paths = issuePaths({
			name: '',
			channel: '',
			code: '',
		});

		expect(paths).toEqual(
			expect.arrayContaining([
				'name',
				'channel',
				'code',
			]),
		);
	});

	it('accepts a communication type without a description', () => {
		expect(
			communicationTypeSchema.safeParse(filledCommunicationType).success,
		).toBe(true);
	});
});
