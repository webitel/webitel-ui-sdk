import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { addDays } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { queueMemberSchema } from '../queueMember.validations';

const filledCommunication = {
	destination: '380000000000',
	type: {
		id: '1',
		name: 'phone',
	},
};

describe('queueMemberSchema', () => {
	/** the card store seeds a new item from the schema defaults */
	it('seeds a new member with the defaults the form expects', () => {
		const defaults = getDefaultsFromZodSchema(queueMemberSchema, {}) as {
			priority?: number;
			expireAt?: number;
		};

		expect(defaults.priority).toBe(0);
		expect(defaults.expireAt).toBeCloseTo(addDays(Date.now(), 7).getTime(), -4);
	});

	it('keeps values already on the draft', () => {
		expect(
			getDefaultsFromZodSchema(queueMemberSchema, {
				name: 'member',
				priority: 5,
				expireAt: 1_700_000_000_000,
				communications: [
					filledCommunication,
				],
			}),
		).toMatchObject({
			priority: 5,
			expireAt: 1_700_000_000_000,
		});
	});

	it('still requires a name and a communication', () => {
		const result = queueMemberSchema.safeParse({});

		expect(result.success).toBe(false);
		expect(result.error?.issues.map((issue) => issue.path.join('.'))).toEqual(
			expect.arrayContaining([
				'name',
				'communications',
			]),
		);
	});
});
