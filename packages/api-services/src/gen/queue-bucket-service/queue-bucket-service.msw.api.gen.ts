/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { faker } from '@faker-js/faker';

import { delay, HttpResponse, http } from 'msw';

import type { EngineListQueueBucket, EngineQueueBucket } from '.././_models';

export const getSearchQueueBucketResponseMock = (
	overrideResponse: Partial<EngineListQueueBucket> = {},
): EngineListQueueBucket => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			bucket: faker.helpers.arrayElement([
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
			disabled: faker.helpers.arrayElement([
				faker.datatype.boolean(),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			priority: faker.helpers.arrayElement([
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
				undefined,
			]),
			ratio: faker.helpers.arrayElement([
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
				undefined,
			]),
		})),
		undefined,
	]),
	next: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	...overrideResponse,
});

export const getCreateQueueBucketResponseMock = (
	overrideResponse: Partial<EngineQueueBucket> = {},
): EngineQueueBucket => ({
	bucket: faker.helpers.arrayElement([
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
	disabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	priority: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	ratio: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	...overrideResponse,
});

export const getDeleteQueueBucketResponseMock = (
	overrideResponse: Partial<EngineQueueBucket> = {},
): EngineQueueBucket => ({
	bucket: faker.helpers.arrayElement([
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
	disabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	priority: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	ratio: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	...overrideResponse,
});

export const getReadQueueBucketResponseMock = (
	overrideResponse: Partial<EngineQueueBucket> = {},
): EngineQueueBucket => ({
	bucket: faker.helpers.arrayElement([
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
	disabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	priority: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	ratio: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	...overrideResponse,
});

export const getPatchQueueBucketResponseMock = (
	overrideResponse: Partial<EngineQueueBucket> = {},
): EngineQueueBucket => ({
	bucket: faker.helpers.arrayElement([
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
	disabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	priority: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	ratio: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	...overrideResponse,
});

export const getUpdateQueueBucketResponseMock = (
	overrideResponse: Partial<EngineQueueBucket> = {},
): EngineQueueBucket => ({
	bucket: faker.helpers.arrayElement([
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
	disabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	priority: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	ratio: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	...overrideResponse,
});

export const getSearchQueueBucketMockHandler = (
	overrideResponse?:
		| EngineListQueueBucket
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<EngineListQueueBucket> | EngineListQueueBucket),
) => {
	return http.get('*/call_center/queues/:queueId/buckets', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getSearchQueueBucketResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getCreateQueueBucketMockHandler = (
	overrideResponse?:
		| EngineQueueBucket
		| ((
				info: Parameters<Parameters<typeof http.post>[1]>[0],
		  ) => Promise<EngineQueueBucket> | EngineQueueBucket),
) => {
	return http.post('*/call_center/queues/:queueId/buckets', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCreateQueueBucketResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getDeleteQueueBucketMockHandler = (
	overrideResponse?:
		| EngineQueueBucket
		| ((
				info: Parameters<Parameters<typeof http.delete>[1]>[0],
		  ) => Promise<EngineQueueBucket> | EngineQueueBucket),
) => {
	return http.delete(
		'*/call_center/queues/:queueId/buckets/:id',
		async (info) => {
			await delay(1000);

			return new HttpResponse(
				JSON.stringify(
					overrideResponse !== undefined
						? typeof overrideResponse === 'function'
							? await overrideResponse(info)
							: overrideResponse
						: getDeleteQueueBucketResponseMock(),
				),
				{ status: 200, headers: { 'Content-Type': 'application/json' } },
			);
		},
	);
};

export const getReadQueueBucketMockHandler = (
	overrideResponse?:
		| EngineQueueBucket
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<EngineQueueBucket> | EngineQueueBucket),
) => {
	return http.get('*/call_center/queues/:queueId/buckets/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getReadQueueBucketResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getPatchQueueBucketMockHandler = (
	overrideResponse?:
		| EngineQueueBucket
		| ((
				info: Parameters<Parameters<typeof http.patch>[1]>[0],
		  ) => Promise<EngineQueueBucket> | EngineQueueBucket),
) => {
	return http.patch(
		'*/call_center/queues/:queueId/buckets/:id',
		async (info) => {
			await delay(1000);

			return new HttpResponse(
				JSON.stringify(
					overrideResponse !== undefined
						? typeof overrideResponse === 'function'
							? await overrideResponse(info)
							: overrideResponse
						: getPatchQueueBucketResponseMock(),
				),
				{ status: 200, headers: { 'Content-Type': 'application/json' } },
			);
		},
	);
};

export const getUpdateQueueBucketMockHandler = (
	overrideResponse?:
		| EngineQueueBucket
		| ((
				info: Parameters<Parameters<typeof http.put>[1]>[0],
		  ) => Promise<EngineQueueBucket> | EngineQueueBucket),
) => {
	return http.put('*/call_center/queues/:queueId/buckets/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getUpdateQueueBucketResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};
export const getQueueBucketServiceMock = () => [
	getSearchQueueBucketMockHandler(),
	getCreateQueueBucketMockHandler(),
	getDeleteQueueBucketMockHandler(),
	getReadQueueBucketMockHandler(),
	getPatchQueueBucketMockHandler(),
	getUpdateQueueBucketMockHandler(),
];
