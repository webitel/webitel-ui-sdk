import { beforeEach, describe, expect, it, vi } from 'vitest';

const time = 123;

const searchActiveCall = vi.fn(() =>
	Promise.resolve({
		data: {
			items: [
				{
					created_at: time,
					duration: 0,
				},
			],
			next: false,
		},
	}),
);

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getCallService: () => ({
		searchActiveCall,
	}),
}));

const { FormatDateMode } = await import('../../../../enums');
const { convertDuration } = await import('../../../../scripts');
const { formatDate } = await import('../../../../utils');
const { ActiveCallsAPI } = await import('../activeCalls');

/**
 * getList owns the display formatting: createdAt as a full DATETIME and
 * duration through the shared convertDuration helper.
 */
describe('ActiveCallsAPI.getList', () => {
	beforeEach(() => searchActiveCall.mockClear());

	it('formats duration and createdAt on each item', async () => {
		const response = await ActiveCallsAPI.getList({});

		expect(response).toEqual({
			items: [
				{
					createdAt: formatDate(+time, FormatDateMode.DATETIME),
					duration: convertDuration(0),
				},
			],
			next: false,
		});
	});
});
