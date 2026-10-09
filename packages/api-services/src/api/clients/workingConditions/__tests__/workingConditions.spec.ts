import { beforeEach, describe, expect, it, vi } from 'vitest';

const wireItem = {
	id: '1',
	name: 'FTE 1',
	description: 'desc',
	workday_hours: 9,
	workdays_per_month: 20,
	vacation: 24,
	sick_leaves: 10,
	days_off: 5,
	pause_duration: 60,
	pause_template: {
		id: '7',
		name: '30-15-15',
	},
	shift_template: {
		id: '3',
		name: 'Full time',
	},
	domain_id: '1',
};

const service = {
	workingConditionServiceSearchWorkingCondition: vi.fn(() =>
		Promise.resolve({
			data: {
				items: [
					wireItem,
				],
				next: true,
			},
		}),
	),
	workingConditionServiceReadWorkingCondition: vi.fn(() =>
		Promise.resolve({
			data: {
				item: wireItem,
			},
		}),
	),
	workingConditionServiceCreateWorkingCondition: vi.fn(() =>
		Promise.resolve({
			data: {
				item: wireItem,
			},
		}),
	),
	workingConditionServiceUpdateWorkingCondition: vi.fn(() =>
		Promise.resolve({
			data: {
				item: wireItem,
			},
		}),
	),
};

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getWorkingConditionService: () => service,
}));

const { WorkingConditionsAPI } = await import('../workingConditions');

const formItem = {
	id: '1',
	name: 'FTE 1',
	description: 'desc',
	workdayHours: 9,
	workdaysPerMonth: 20,
	vacation: 24,
	sickLeaves: 10,
	daysOff: 5,
	pauseDuration: 60,
	pauseTemplate: {
		id: '7',
		name: '30-15-15',
	},
	shiftTemplate: null,
	domainId: '1',
	createdAt: '1',
	_dirty: true,
};

describe('WorkingConditionsAPI', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('getList sends the search as `q`', async () => {
		const { items, next } = await WorkingConditionsAPI.getList({
			search: 'fte',
			page: 2,
			size: 10,
		});

		expect(
			service.workingConditionServiceSearchWorkingCondition,
		).toHaveBeenCalledWith(
			expect.objectContaining({
				q: 'fte*',
				page: 2,
				size: 10,
			}),
		);
		expect(items[0].workdaysPerMonth).toBe(20);
		expect(next).toBe(true);
	});

	it('get and update unwrap the `item` envelope', async () => {
		const item = await WorkingConditionsAPI.get({
			itemId: '1',
		});
		expect(item.pauseTemplate).toEqual(wireItem.pause_template);

		const updated = await WorkingConditionsAPI.update({
			itemId: '1',
			itemInstance: formItem,
		});
		expect(updated.name).toBe('FTE 1');
	});

	it('add wraps the item and sends only the form fields', async () => {
		await WorkingConditionsAPI.add({
			itemInstance: formItem,
		});

		const [body] =
			service.workingConditionServiceCreateWorkingCondition.mock.calls[0];
		expect(body).toEqual({
			item: {
				name: 'FTE 1',
				description: 'desc',
				workday_hours: 9,
				workdays_per_month: 20,
				vacation: 24,
				sick_leaves: 10,
				days_off: 5,
				pause_duration: 60,
				pause_template: {
					id: '7',
					name: '30-15-15',
				},
				shift_template: null,
			},
		});
	});

	it('update sends the id separately and drops it from the item', async () => {
		await WorkingConditionsAPI.update({
			itemId: '1',
			itemInstance: formItem,
		});

		const [id, body] =
			service.workingConditionServiceUpdateWorkingCondition.mock.calls[0];
		expect(id).toBe('1');
		expect(body.item).not.toHaveProperty('id');
		expect(body.item).not.toHaveProperty('domain_id');
		expect(body.item).not.toHaveProperty('_dirty');
	});
});
