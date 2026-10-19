import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { resourceSchema } from '../resource.validations';

const filledResource = {
	name: 'Resource',
	gateway: {
		id: 1,
		name: 'Gateway',
	},
	rps: 10,
	limit: 10,
	maxSuccessivelyErrors: 2,
};

const issuePaths = (value: Record<string, unknown>) =>
	resourceSchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('resourceSchema', () => {
	it('seeds a new resource with the defaults the form expects', () => {
		expect(getDefaultsFromZodSchema(resourceSchema, {})).toMatchObject({
			name: '',
			rps: 10,
			limit: 10,
			description: '',
			maxSuccessivelyErrors: 2,
			errorIds: [],
			patterns: [],
			failureDialDelay: 0,
			parameters: {
				cidType: '',
				ignoreEarlyMedia: '',
			},
		});
	});

	it('accepts a filled resource', () => {
		expect(resourceSchema.safeParse(filledResource).success).toBe(true);
	});

	it('requires a name, a gateway, rps, limit and max successive errors', () => {
		const paths = issuePaths({
			name: '',
			gateway: {},
			rps: null,
			limit: null,
			maxSuccessivelyErrors: null,
		});

		expect(paths).toEqual(
			expect.arrayContaining([
				'name',
				'gateway.id',
				'rps',
				'limit',
				'maxSuccessivelyErrors',
			]),
		);
	});

	it('keeps rps and limit within their ranges', () => {
		expect(
			issuePaths({
				...filledResource,
				rps: 1001,
				limit: 5001,
			}),
		).toEqual([
			'rps',
			'limit',
		]);
		expect(
			issuePaths({
				...filledResource,
				rps: -2,
				limit: -2,
			}),
		).toEqual([
			'rps',
			'limit',
		]);
		expect(
			issuePaths({
				...filledResource,
				rps: -1,
				limit: -1,
			}),
		).toEqual([]);
	});

	it('lets the failure dial delay be cleared', () => {
		expect(
			resourceSchema.safeParse({
				...filledResource,
				failureDialDelay: null,
			}).success,
		).toBe(true);
	});
});
