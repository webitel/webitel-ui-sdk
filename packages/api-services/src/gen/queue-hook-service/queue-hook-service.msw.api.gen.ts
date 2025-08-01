/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { faker } from '@faker-js/faker';

import { delay, HttpResponse, http } from 'msw';

import type { EngineListQueueHook, EngineQueueHook } from '.././_models';

export const getSearchQueueHookResponseMock = (
	overrideResponse: Partial<EngineListQueueHook> = {},
): EngineListQueueHook => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			enabled: faker.helpers.arrayElement([
				faker.datatype.boolean(),
				undefined,
			]),
			event: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
				undefined,
			]),
			properties: faker.helpers.arrayElement([
				Array.from(
					{ length: faker.number.int({ min: 1, max: 10 }) },
					(_, i) => i + 1,
				).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
				undefined,
			]),
			schema: faker.helpers.arrayElement([
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
	...overrideResponse,
});

export const getCreateQueueHookResponseMock = (
	overrideResponse: Partial<EngineQueueHook> = {},
): EngineQueueHook => ({
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	event: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	properties: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	schema: faker.helpers.arrayElement([
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

export const getDeleteQueueHookResponseMock = (
	overrideResponse: Partial<EngineQueueHook> = {},
): EngineQueueHook => ({
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	event: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	properties: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	schema: faker.helpers.arrayElement([
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

export const getReadQueueHookResponseMock = (
	overrideResponse: Partial<EngineQueueHook> = {},
): EngineQueueHook => ({
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	event: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	properties: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	schema: faker.helpers.arrayElement([
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

export const getPatchQueueHookResponseMock = (
	overrideResponse: Partial<EngineQueueHook> = {},
): EngineQueueHook => ({
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	event: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	properties: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	schema: faker.helpers.arrayElement([
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

export const getUpdateQueueHookResponseMock = (
	overrideResponse: Partial<EngineQueueHook> = {},
): EngineQueueHook => ({
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	event: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	properties: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	schema: faker.helpers.arrayElement([
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

export const getSearchQueueHookMockHandler = (
	overrideResponse?:
		| EngineListQueueHook
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<EngineListQueueHook> | EngineListQueueHook),
) => {
	return http.get('*/call_center/queues/:queueId/hooks', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getSearchQueueHookResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getCreateQueueHookMockHandler = (
	overrideResponse?:
		| EngineQueueHook
		| ((
				info: Parameters<Parameters<typeof http.post>[1]>[0],
		  ) => Promise<EngineQueueHook> | EngineQueueHook),
) => {
	return http.post('*/call_center/queues/:queueId/hooks', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCreateQueueHookResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getDeleteQueueHookMockHandler = (
	overrideResponse?:
		| EngineQueueHook
		| ((
				info: Parameters<Parameters<typeof http.delete>[1]>[0],
		  ) => Promise<EngineQueueHook> | EngineQueueHook),
) => {
	return http.delete(
		'*/call_center/queues/:queueId/hooks/:id',
		async (info) => {
			await delay(1000);

			return new HttpResponse(
				JSON.stringify(
					overrideResponse !== undefined
						? typeof overrideResponse === 'function'
							? await overrideResponse(info)
							: overrideResponse
						: getDeleteQueueHookResponseMock(),
				),
				{ status: 200, headers: { 'Content-Type': 'application/json' } },
			);
		},
	);
};

export const getReadQueueHookMockHandler = (
	overrideResponse?:
		| EngineQueueHook
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<EngineQueueHook> | EngineQueueHook),
) => {
	return http.get('*/call_center/queues/:queueId/hooks/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getReadQueueHookResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getPatchQueueHookMockHandler = (
	overrideResponse?:
		| EngineQueueHook
		| ((
				info: Parameters<Parameters<typeof http.patch>[1]>[0],
		  ) => Promise<EngineQueueHook> | EngineQueueHook),
) => {
	return http.patch('*/call_center/queues/:queueId/hooks/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getPatchQueueHookResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getUpdateQueueHookMockHandler = (
	overrideResponse?:
		| EngineQueueHook
		| ((
				info: Parameters<Parameters<typeof http.put>[1]>[0],
		  ) => Promise<EngineQueueHook> | EngineQueueHook),
) => {
	return http.put('*/call_center/queues/:queueId/hooks/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getUpdateQueueHookResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};
export const getQueueHookServiceMock = () => [
	getSearchQueueHookMockHandler(),
	getCreateQueueHookMockHandler(),
	getDeleteQueueHookMockHandler(),
	getReadQueueHookMockHandler(),
	getPatchQueueHookMockHandler(),
	getUpdateQueueHookMockHandler(),
];
