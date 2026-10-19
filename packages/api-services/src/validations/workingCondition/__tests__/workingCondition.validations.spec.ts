import { describe, expect, it } from 'vitest';

import { workingConditionSchema } from '../workingCondition.validations';

const valid = {
	name: 'FTE 1',
	pauseTemplate: {
		id: '1',
		name: '30-15-15',
	},
};

describe('workingConditionSchema', () => {
	it('accepts a condition with only a name and a pause template', () => {
		expect(workingConditionSchema.safeParse(valid).success).toBe(true);
	});

	it('requires a pause template', () => {
		expect(
			workingConditionSchema.safeParse({
				name: 'FTE 1',
			}).success,
		).toBe(false);
	});

	it('keeps the workday duration optional and clearable', () => {
		expect(
			workingConditionSchema.safeParse({
				...valid,
				workdayHours: null,
			}).success,
		).toBe(true);
	});

	it('rejects a name longer than 250 symbols', () => {
		expect(
			workingConditionSchema.safeParse({
				...valid,
				name: 'a'.repeat(251),
			}).success,
		).toBe(false);
	});

	it.each([
		[
			'workdayHours',
			25,
		],
		[
			'workdaysPerMonth',
			32,
		],
		[
			'vacation',
			366,
		],
		[
			'sickLeaves',
			366,
		],
		[
			'daysOff',
			366,
		],
		[
			'pauseDuration',
			1441,
		],
		[
			'workdayHours',
			-1,
		],
	])('rejects %s = %j', (field, value) => {
		expect(
			workingConditionSchema.safeParse({
				...valid,
				[field]: value,
			}).success,
		).toBe(false);
	});
});
