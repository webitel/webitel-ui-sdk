import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { resourceInGroupSchema } from '../resourceInGroup.validations';

const resource = {
	id: '1',
	name: 'Gateway',
};

describe('resourceInGroupSchema', () => {
	it('seeds a new resource with priority 0', () => {
		expect(getDefaultsFromZodSchema(resourceInGroupSchema, {})).toMatchObject({
			priority: 0,
			reserveResource: {},
		});
	});

	it('requires a resource', () => {
		const result = resourceInGroupSchema.safeParse({
			resource: {},
		});

		expect(result.error?.issues.map((issue) => issue.path.join('.'))).toContain(
			'resource.id',
		);
	});

	it('lets priority and reserve resource be cleared', () => {
		expect(
			resourceInGroupSchema.safeParse({
				resource,
				priority: null,
				reserveResource: null,
			}).success,
		).toBe(true);
	});
});
