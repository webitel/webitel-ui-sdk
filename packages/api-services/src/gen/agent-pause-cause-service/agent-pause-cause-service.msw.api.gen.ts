/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { faker } from '@faker-js/faker';

import { delay, HttpResponse, http } from 'msw';

import type {
	EngineAgentPauseCause,
	EngineListAgentPauseCause,
} from '.././_models';

export const getSearchAgentPauseCauseResponseMock = (
	overrideResponse: Partial<EngineListAgentPauseCause> = {},
): EngineListAgentPauseCause => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			allowAdmin: faker.helpers.arrayElement([
				faker.datatype.boolean(),
				undefined,
			]),
			allowAgent: faker.helpers.arrayElement([
				faker.datatype.boolean(),
				undefined,
			]),
			allowSupervisor: faker.helpers.arrayElement([
				faker.datatype.boolean(),
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
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
				undefined,
			]),
			limitMin: faker.helpers.arrayElement([
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
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
	...overrideResponse,
});

export const getCreateAgentPauseCauseResponseMock = (
	overrideResponse: Partial<EngineAgentPauseCause> = {},
): EngineAgentPauseCause => ({
	allowAdmin: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	allowAgent: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	allowSupervisor: faker.helpers.arrayElement([
		faker.datatype.boolean(),
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
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	limitMin: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
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

export const getDeleteAgentPauseCauseResponseMock = (
	overrideResponse: Partial<EngineAgentPauseCause> = {},
): EngineAgentPauseCause => ({
	allowAdmin: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	allowAgent: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	allowSupervisor: faker.helpers.arrayElement([
		faker.datatype.boolean(),
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
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	limitMin: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
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

export const getReadAgentPauseCauseResponseMock = (
	overrideResponse: Partial<EngineAgentPauseCause> = {},
): EngineAgentPauseCause => ({
	allowAdmin: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	allowAgent: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	allowSupervisor: faker.helpers.arrayElement([
		faker.datatype.boolean(),
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
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	limitMin: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
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

export const getPatchAgentPauseCauseResponseMock = (
	overrideResponse: Partial<EngineAgentPauseCause> = {},
): EngineAgentPauseCause => ({
	allowAdmin: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	allowAgent: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	allowSupervisor: faker.helpers.arrayElement([
		faker.datatype.boolean(),
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
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	limitMin: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
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

export const getUpdateAgentPauseCauseResponseMock = (
	overrideResponse: Partial<EngineAgentPauseCause> = {},
): EngineAgentPauseCause => ({
	allowAdmin: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	allowAgent: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	allowSupervisor: faker.helpers.arrayElement([
		faker.datatype.boolean(),
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
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	limitMin: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
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

export const getSearchAgentPauseCauseMockHandler = (
	overrideResponse?:
		| EngineListAgentPauseCause
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<EngineListAgentPauseCause> | EngineListAgentPauseCause),
) => {
	return http.get('*/call_center/pause_causes', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getSearchAgentPauseCauseResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getCreateAgentPauseCauseMockHandler = (
	overrideResponse?:
		| EngineAgentPauseCause
		| ((
				info: Parameters<Parameters<typeof http.post>[1]>[0],
		  ) => Promise<EngineAgentPauseCause> | EngineAgentPauseCause),
) => {
	return http.post('*/call_center/pause_causes', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCreateAgentPauseCauseResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getDeleteAgentPauseCauseMockHandler = (
	overrideResponse?:
		| EngineAgentPauseCause
		| ((
				info: Parameters<Parameters<typeof http.delete>[1]>[0],
		  ) => Promise<EngineAgentPauseCause> | EngineAgentPauseCause),
) => {
	return http.delete('*/call_center/pause_causes/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getDeleteAgentPauseCauseResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getReadAgentPauseCauseMockHandler = (
	overrideResponse?:
		| EngineAgentPauseCause
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<EngineAgentPauseCause> | EngineAgentPauseCause),
) => {
	return http.get('*/call_center/pause_causes/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getReadAgentPauseCauseResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getPatchAgentPauseCauseMockHandler = (
	overrideResponse?:
		| EngineAgentPauseCause
		| ((
				info: Parameters<Parameters<typeof http.patch>[1]>[0],
		  ) => Promise<EngineAgentPauseCause> | EngineAgentPauseCause),
) => {
	return http.patch('*/call_center/pause_causes/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getPatchAgentPauseCauseResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getUpdateAgentPauseCauseMockHandler = (
	overrideResponse?:
		| EngineAgentPauseCause
		| ((
				info: Parameters<Parameters<typeof http.put>[1]>[0],
		  ) => Promise<EngineAgentPauseCause> | EngineAgentPauseCause),
) => {
	return http.put('*/call_center/pause_causes/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getUpdateAgentPauseCauseResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};
export const getAgentPauseCauseServiceMock = () => [
	getSearchAgentPauseCauseMockHandler(),
	getCreateAgentPauseCauseMockHandler(),
	getDeleteAgentPauseCauseMockHandler(),
	getReadAgentPauseCauseMockHandler(),
	getPatchAgentPauseCauseMockHandler(),
	getUpdateAgentPauseCauseMockHandler(),
];
