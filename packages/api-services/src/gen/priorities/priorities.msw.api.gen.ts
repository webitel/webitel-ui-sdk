/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { faker } from '@faker-js/faker';

import { delay, HttpResponse, http } from 'msw';

import type {
	WebitelCasesLocatePriorityResponse,
	WebitelCasesPriority,
	WebitelCasesPriorityList,
} from '.././_models';

export const getListPrioritiesResponseMock = (
	overrideResponse: Partial<WebitelCasesPriorityList> = {},
): WebitelCasesPriorityList => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			color: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			createdAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			createdBy: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			description: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			updatedAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			updatedBy: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
		})),
		undefined,
	]),
	next: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	page: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	...overrideResponse,
});

export const getCreatePriorityResponseMock = (
	overrideResponse: Partial<WebitelCasesPriority> = {},
): WebitelCasesPriority => ({
	color: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	description: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	id: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	name: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	...overrideResponse,
});

export const getDeletePriorityResponseMock = (
	overrideResponse: Partial<WebitelCasesPriority> = {},
): WebitelCasesPriority => ({
	color: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	description: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	id: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	name: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	...overrideResponse,
});

export const getLocatePriorityResponseMock = (
	overrideResponse: Partial<WebitelCasesLocatePriorityResponse> = {},
): WebitelCasesLocatePriorityResponse => ({
	priority: faker.helpers.arrayElement([
		{
			color: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			createdAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			createdBy: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
			description: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			updatedAt: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			updatedBy: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
					name: faker.helpers.arrayElement([
						faker.string.alpha({ length: { min: 10, max: 20 } }),
						undefined,
					]),
				},
				undefined,
			]),
		},
		undefined,
	]),
	...overrideResponse,
});

export const getUpdatePriority2ResponseMock = (
	overrideResponse: Partial<WebitelCasesPriority> = {},
): WebitelCasesPriority => ({
	color: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	description: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	id: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	name: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	...overrideResponse,
});

export const getUpdatePriorityResponseMock = (
	overrideResponse: Partial<WebitelCasesPriority> = {},
): WebitelCasesPriority => ({
	color: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	createdBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	description: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	id: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	name: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedAt: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	updatedBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			name: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
		},
		undefined,
	]),
	...overrideResponse,
});

export const getListPrioritiesMockHandler = (
	overrideResponse?:
		| WebitelCasesPriorityList
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<WebitelCasesPriorityList> | WebitelCasesPriorityList),
) => {
	return http.get('*/cases/priorities', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getListPrioritiesResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getCreatePriorityMockHandler = (
	overrideResponse?:
		| WebitelCasesPriority
		| ((
				info: Parameters<Parameters<typeof http.post>[1]>[0],
		  ) => Promise<WebitelCasesPriority> | WebitelCasesPriority),
) => {
	return http.post('*/cases/priorities', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCreatePriorityResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getDeletePriorityMockHandler = (
	overrideResponse?:
		| WebitelCasesPriority
		| ((
				info: Parameters<Parameters<typeof http.delete>[1]>[0],
		  ) => Promise<WebitelCasesPriority> | WebitelCasesPriority),
) => {
	return http.delete('*/cases/priorities/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getDeletePriorityResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getLocatePriorityMockHandler = (
	overrideResponse?:
		| WebitelCasesLocatePriorityResponse
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) =>
				| Promise<WebitelCasesLocatePriorityResponse>
				| WebitelCasesLocatePriorityResponse),
) => {
	return http.get('*/cases/priorities/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getLocatePriorityResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getUpdatePriority2MockHandler = (
	overrideResponse?:
		| WebitelCasesPriority
		| ((
				info: Parameters<Parameters<typeof http.patch>[1]>[0],
		  ) => Promise<WebitelCasesPriority> | WebitelCasesPriority),
) => {
	return http.patch('*/cases/priorities/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getUpdatePriority2ResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getUpdatePriorityMockHandler = (
	overrideResponse?:
		| WebitelCasesPriority
		| ((
				info: Parameters<Parameters<typeof http.put>[1]>[0],
		  ) => Promise<WebitelCasesPriority> | WebitelCasesPriority),
) => {
	return http.put('*/cases/priorities/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getUpdatePriorityResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};
export const getPrioritiesMock = () => [
	getListPrioritiesMockHandler(),
	getCreatePriorityMockHandler(),
	getDeletePriorityMockHandler(),
	getLocatePriorityMockHandler(),
	getUpdatePriority2MockHandler(),
	getUpdatePriorityMockHandler(),
];
