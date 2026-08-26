import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockCalendarService = {
	searchCalendar: vi.fn(),
	createCalendar: vi.fn(),
	searchTimezones: vi.fn(),
	deleteCalendar: vi.fn(),
	readCalendar: vi.fn(),
	updateCalendar: vi.fn(),
};

const mockPermissionsApi = {
	getPermissionsList: vi.fn(),
	patchPermissions: vi.fn(),
};

const generatePermissionsApiMock = vi.fn(() => mockPermissionsApi);

vi.mock('../../../../gen-wire', () => ({
	getCalendarService: () => mockCalendarService,
}));

vi.mock('../../_shared/generatePermissionsApi', () => ({
	generatePermissionsApi: generatePermissionsApiMock,
}));

const { CalendarsAPI } = await import('../calendars');

/*
 generatePermissionsApi(baseUrl) is invoked once, at module-evaluation time,
 when CalendarsAPI is built - capture that call now, before any `beforeEach`
 has a chance to clear the mock's history.
 */
const permissionsApiCalls = generatePermissionsApiMock.mock.calls;

beforeEach(() => {
	vi.clearAllMocks();
});

describe('CalendarsAPI', () => {
	describe('permissions API composition', () => {
		it('builds the permissions API with the calendars base url', () => {
			expect(permissionsApiCalls).toEqual([
				[
					'/calendars',
				],
			]);
		});

		it('spreads the generated permissions methods onto the public API', () => {
			expect(CalendarsAPI.getPermissionsList).toBe(
				mockPermissionsApi.getPermissionsList,
			);
			expect(CalendarsAPI.patchPermissions).toBe(
				mockPermissionsApi.patchPermissions,
			);
		});
	});

	describe('getList', () => {
		it('applies default pagination and appends a wildcard to a plain search term', async () => {
			mockCalendarService.searchCalendar.mockResolvedValueOnce({
				data: {},
			});

			await CalendarsAPI.getList({
				search: 'foo',
			});

			expect(mockCalendarService.searchCalendar).toHaveBeenCalledWith({
				page: 1,
				size: 10,
				q: 'foo*',
				sort: undefined,
				fields: undefined,
				id: undefined,
			});
		});

		it('prefers an explicit q over search and does not double the wildcard', async () => {
			mockCalendarService.searchCalendar.mockResolvedValueOnce({
				data: {},
			});

			await CalendarsAPI.getList({
				q: 'bar*',
				search: 'ignored',
			});

			expect(mockCalendarService.searchCalendar).toHaveBeenCalledWith(
				expect.objectContaining({
					q: 'bar*',
				}),
			);
		});

		it('leaves a bare wildcard search untouched', async () => {
			mockCalendarService.searchCalendar.mockResolvedValueOnce({
				data: {},
			});

			await CalendarsAPI.getList({
				search: '*',
			});

			expect(mockCalendarService.searchCalendar).toHaveBeenCalledWith(
				expect.objectContaining({
					q: '*',
				}),
			);
		});

		it('lets explicit page/size override the defaults', async () => {
			mockCalendarService.searchCalendar.mockResolvedValueOnce({
				data: {},
			});

			await CalendarsAPI.getList({
				page: 3,
				size: 25,
			});

			expect(mockCalendarService.searchCalendar).toHaveBeenCalledWith(
				expect.objectContaining({
					page: 3,
					size: 25,
				}),
			);
		});

		it('normalizes the response to camelCase items merged with list defaults', async () => {
			mockCalendarService.searchCalendar.mockResolvedValueOnce({
				data: {
					items: [
						{
							id: '1',
							display_name: 'Support Hours',
						},
					],
					next: true,
				},
			});

			const result = await CalendarsAPI.getList({});

			expect(result).toEqual({
				items: [
					{
						id: '1',
						displayName: 'Support Hours',
					},
				],
				next: true,
			});
		});

		it('falls back to empty items/next=false when the response has none', async () => {
			mockCalendarService.searchCalendar.mockResolvedValueOnce({
				data: {},
			});

			const result = await CalendarsAPI.getList({});

			expect(result).toEqual({
				items: [],
				next: false,
			});
		});
	});

	describe('get', () => {
		it('reads the calendar by string id', async () => {
			mockCalendarService.readCalendar.mockResolvedValueOnce({
				data: {
					name: 'Cal',
					timezone: {
						id: 'tz-1',
					},
				},
			});

			await CalendarsAPI.get({
				itemId: 42,
			});

			expect(mockCalendarService.readCalendar).toHaveBeenCalledWith('42');
		});

		it('maps accepts/specials/excepts from snake_case API shape to the UI shape', async () => {
			mockCalendarService.readCalendar.mockResolvedValueOnce({
				data: {
					name: 'Cal',
					description: 'desc',
					timezone: {
						id: 'tz-1',
					},
					start_at: 100,
					end_at: 200,
					accepts: [
						{
							day: 1,
							disabled: false,
							start_time_of_day: 540,
							end_time_of_day: 1200,
						},
					],
					specials: [
						{
							day: 2,
							disabled: true,
							start_time_of_day: 0,
							end_time_of_day: 60,
						},
					],
					excepts: [
						{
							name: 'holiday',
							date: 123,
							repeat: true,
							working: false,
							work_start: 10,
							work_stop: 20,
						},
					],
				},
			});

			const result = await CalendarsAPI.get({
				itemId: 1,
			});

			expect(result).toMatchObject({
				name: 'Cal',
				description: 'desc',
				expires: true,
				accepts: [
					{
						day: 1,
						disabled: false,
						start: 540,
						end: 1200,
					},
				],
				specials: [
					{
						day: 2,
						disabled: true,
						start: 0,
						end: 60,
					},
				],
				excepts: [
					{
						name: 'holiday',
						date: 123,
						repeat: true,
						working: false,
						workStart: 10,
						workStop: 20,
					},
				],
			});
		});

		it('defaults accepts to an empty array instead of throwing when missing', async () => {
			mockCalendarService.readCalendar.mockResolvedValueOnce({
				data: {
					name: 'Cal',
					timezone: {
						id: 'tz-1',
					},
				},
			});

			const result = await CalendarsAPI.get({
				itemId: 1,
			});

			expect(result.accepts).toEqual([]);
		});

		it('defaults specials/excepts to empty arrays when absent from the response', async () => {
			mockCalendarService.readCalendar.mockResolvedValueOnce({
				data: {
					name: 'Cal',
					timezone: {
						id: 'tz-1',
					},
					accepts: [],
				},
			});

			const result = await CalendarsAPI.get({
				itemId: 1,
			});

			expect(result.specials).toEqual([]);
			expect(result.excepts).toEqual([]);
		});

		it('fills missing per-day fields on special entries with falsy defaults', async () => {
			mockCalendarService.readCalendar.mockResolvedValueOnce({
				data: {
					name: 'Cal',
					timezone: {
						id: 'tz-1',
					},
					specials: [
						{
							day: 3,
						},
					],
				},
			});

			const result = await CalendarsAPI.get({
				itemId: 1,
			});

			expect(result.specials).toEqual([
				{
					day: 3,
					disabled: false,
					start: 0,
					end: 0,
				},
			]);
		});

		it('marks expires false and applies default description when the API omits both', async () => {
			mockCalendarService.readCalendar.mockResolvedValueOnce({
				data: {
					name: 'Cal',
					timezone: {
						id: 'tz-1',
					},
				},
			});

			const result = await CalendarsAPI.get({
				itemId: 1,
			});

			expect(result.expires).toBe(false);
			expect(result.description).toBe('');
		});
	});

	describe('add', () => {
		const baseItem = {
			name: 'Test Calendar',
			description: 'A calendar',
			timezone: {
				id: 'tz-1',
				name: 'UTC',
				offset: 60,
			},
			expires: true,
			startAt: 1000,
			endAt: 2000,
			accepts: [
				{
					day: 0,
					disabled: false,
					start: 540,
					end: 1200,
				},
			],
			specials: [
				{
					day: 1,
					disabled: true,
					start: 0,
					end: 60,
				},
			],
			excepts: [
				{
					name: 'holiday',
					date: 123,
					repeat: false,
					working: true,
					workStart: 10,
					workStop: 20,
				},
			],
			notInFieldList: 'should be stripped',
		};

		it('sanitizes, converts to snake_case and sends the calendar payload', async () => {
			mockCalendarService.createCalendar.mockResolvedValueOnce({
				data: {},
			});

			await CalendarsAPI.add({
				itemInstance: baseItem,
			});

			expect(mockCalendarService.createCalendar).toHaveBeenCalledTimes(1);
			const sentItem = mockCalendarService.createCalendar.mock.calls[0][0];

			expect(sentItem).not.toHaveProperty('notInFieldList');
			expect(sentItem).not.toHaveProperty('expires');
			expect(sentItem).toMatchObject({
				name: 'Test Calendar',
				description: 'A calendar',
				start_at: 1000,
				end_at: 2000,
				accepts: [
					{
						day: 0,
						disabled: false,
						start_time_of_day: 540,
						end_time_of_day: 1200,
					},
				],
				specials: [
					{
						day: 1,
						disabled: true,
						start_time_of_day: 0,
						end_time_of_day: 60,
					},
				],
				excepts: [
					{
						name: 'holiday',
						date: 123,
						repeat: false,
						working: true,
						work_start: 10,
						work_stop: 20,
					},
				],
			});
			expect(sentItem.timezone.id).toBe('tz-1');
			expect(sentItem.timezone.offset).toBeUndefined();
		});

		it('strips startAt/endAt and defaults accepts/specials to [] when expires is false', async () => {
			mockCalendarService.createCalendar.mockResolvedValueOnce({
				data: {},
			});

			await CalendarsAPI.add({
				itemInstance: {
					name: 'No expiry',
					timezone: {
						id: 'tz-1',
					},
					expires: false,
					startAt: 500,
					endAt: 600,
				},
			});

			const sentItem = mockCalendarService.createCalendar.mock.calls[0][0];

			expect(sentItem.start_at).toBeUndefined();
			expect(sentItem.end_at).toBeUndefined();
			expect(sentItem.accepts).toEqual([]);
			expect(sentItem.specials).toEqual([]);
		});

		it('does not throw when the item has no timezone', async () => {
			mockCalendarService.createCalendar.mockResolvedValueOnce({
				data: {},
			});

			await expect(
				CalendarsAPI.add({
					itemInstance: {
						name: 'No timezone',
						expires: false,
					},
				}),
			).resolves.toBeDefined();
		});

		it('converts the created item back to camelCase', async () => {
			mockCalendarService.createCalendar.mockResolvedValueOnce({
				data: {
					id: 'cal-1',
					display_name: 'Created',
				},
			});

			const result = await CalendarsAPI.add({
				itemInstance: baseItem,
			});

			expect(result).toMatchObject({
				id: 'cal-1',
				displayName: 'Created',
			});
		});

		it('maps wire schedule fields to UI start/end on create response', async () => {
			mockCalendarService.createCalendar.mockResolvedValueOnce({
				data: {
					id: 'cal-1',
					accepts: [
						{
							day: 0,
							disabled: false,
							start_time_of_day: 540,
							end_time_of_day: 1200,
						},
					],
				},
			});

			const result = await CalendarsAPI.add({
				itemInstance: baseItem,
			});

			expect(result.accepts).toEqual([
				{
					day: 0,
					disabled: false,
					start: 540,
					end: 1200,
				},
			]);
		});
	});

	describe('update', () => {
		it('sends the sanitized payload to updateCalendar with a string id', async () => {
			mockCalendarService.updateCalendar.mockResolvedValueOnce({
				data: {},
			});

			await CalendarsAPI.update({
				itemId: 7,
				itemInstance: {
					name: 'Updated Calendar',
					timezone: {
						id: 'tz-1',
					},
					expires: false,
				},
			});

			expect(mockCalendarService.updateCalendar).toHaveBeenCalledTimes(1);
			const [id, sentItem] = mockCalendarService.updateCalendar.mock.calls[0];
			expect(id).toBe('7');
			expect(sentItem.name).toBe('Updated Calendar');
		});

		it('converts the updated item back to camelCase', async () => {
			mockCalendarService.updateCalendar.mockResolvedValueOnce({
				data: {
					updated_at: 123,
				},
			});

			const result = await CalendarsAPI.update({
				itemId: 7,
				itemInstance: {
					name: 'Updated Calendar',
					timezone: {
						id: 'tz-1',
					},
					expires: false,
				},
			});

			expect(result).toMatchObject({
				updatedAt: 123,
			});
		});

		it('maps wire schedule fields to UI start/end on update response', async () => {
			mockCalendarService.updateCalendar.mockResolvedValueOnce({
				data: {
					id: '7',
					accepts: [
						{
							day: 2,
							disabled: false,
							start_time_of_day: 600,
							end_time_of_day: 1080,
						},
					],
				},
			});

			const result = await CalendarsAPI.update({
				itemId: 7,
				itemInstance: {
					name: 'Updated Calendar',
					timezone: {
						id: 'tz-1',
					},
					expires: false,
					accepts: [
						{
							day: 2,
							disabled: false,
							start: 600,
							end: 1080,
						},
					],
				},
			});

			expect(result.accepts).toEqual([
				{
					day: 2,
					disabled: false,
					start: 600,
					end: 1080,
				},
			]);
		});
	});

	describe('delete', () => {
		it('deletes the calendar by string id and returns the raw response data', async () => {
			mockCalendarService.deleteCalendar.mockResolvedValueOnce({
				data: {
					deleted: true,
				},
			});

			const result = await CalendarsAPI.delete({
				id: 9,
			});

			expect(mockCalendarService.deleteCalendar).toHaveBeenCalledWith('9');
			expect(result).toEqual({
				deleted: true,
			});
		});
	});

	describe('getLookup', () => {
		it('defaults fields to id/name when not provided', async () => {
			mockCalendarService.searchCalendar.mockResolvedValueOnce({
				data: {},
			});

			await CalendarsAPI.getLookup({});

			expect(mockCalendarService.searchCalendar).toHaveBeenCalledWith(
				expect.objectContaining({
					fields: [
						'id',
						'name',
					],
				}),
			);
		});

		it('respects explicitly provided fields', async () => {
			mockCalendarService.searchCalendar.mockResolvedValueOnce({
				data: {},
			});

			await CalendarsAPI.getLookup({
				fields: [
					'id',
					'custom',
				],
			});

			expect(mockCalendarService.searchCalendar).toHaveBeenCalledWith(
				expect.objectContaining({
					fields: [
						'id',
						'custom',
					],
				}),
			);
		});
	});

	describe('getTimezonesLookup', () => {
		it('applies default pagination and search-to-wildcard transform', async () => {
			mockCalendarService.searchTimezones.mockResolvedValueOnce({
				data: {},
			});

			await CalendarsAPI.getTimezonesLookup({
				search: 'euro',
			});

			expect(mockCalendarService.searchTimezones).toHaveBeenCalledWith({
				page: 1,
				size: 10,
				q: 'euro*',
				sort: undefined,
				fields: undefined,
				id: undefined,
			});
		});

		it('normalizes the response to camelCase items merged with list defaults', async () => {
			mockCalendarService.searchTimezones.mockResolvedValueOnce({
				data: {
					items: [
						{
							time_zone_name: 'UTC',
						},
					],
					next: false,
				},
			});

			const result = await CalendarsAPI.getTimezonesLookup({});

			expect(result).toEqual({
				items: [
					{
						timeZoneName: 'UTC',
					},
				],
				next: false,
			});
		});
	});

	describe('error handling', () => {
		const cases = [
			{
				name: 'getList',
				serviceFn: () => mockCalendarService.searchCalendar,
				call: () => CalendarsAPI.getList({}),
			},
			{
				name: 'get',
				serviceFn: () => mockCalendarService.readCalendar,
				call: () =>
					CalendarsAPI.get({
						itemId: 1,
					}),
			},
			{
				name: 'add',
				serviceFn: () => mockCalendarService.createCalendar,
				call: () =>
					CalendarsAPI.add({
						itemInstance: {
							name: 'x',
							timezone: {
								id: 'tz-1',
							},
							expires: false,
						},
					}),
			},
			{
				name: 'update',
				serviceFn: () => mockCalendarService.updateCalendar,
				call: () =>
					CalendarsAPI.update({
						itemId: 1,
						itemInstance: {
							name: 'x',
							timezone: {
								id: 'tz-1',
							},
							expires: false,
						},
					}),
			},
			{
				name: 'delete',
				serviceFn: () => mockCalendarService.deleteCalendar,
				call: () =>
					CalendarsAPI.delete({
						id: 1,
					}),
			},
			{
				name: 'getTimezonesLookup',
				serviceFn: () => mockCalendarService.searchTimezones,
				call: () => CalendarsAPI.getTimezonesLookup({}),
			},
		];

		it.each(
			cases,
		)('$name propagates the original error when the service call rejects', async ({
			serviceFn,
			call,
		}) => {
			const error = new Error('service failure');
			serviceFn().mockRejectedValueOnce(error);

			await expect(call()).rejects.toBe(error);
		});
	});
});
