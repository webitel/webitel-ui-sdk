/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { faker } from '@faker-js/faker';

import { delay, HttpResponse, http } from 'msw';

import type {
	EngineListRoutingOutboundCall,
	EngineMovePositionRoutingOutboundCallResponse,
	EngineRoutingOutboundCall,
} from '.././_models';

export const getSearchRoutingOutboundCallResponseMock = (
	overrideResponse: Partial<EngineListRoutingOutboundCall> = {},
): EngineListRoutingOutboundCall => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			description: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			disabled: faker.helpers.arrayElement([
				faker.datatype.boolean(),
				undefined,
			]),
			domainId: faker.helpers.arrayElement([
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
			pattern: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			position: faker.helpers.arrayElement([
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
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

export const getCreateRoutingOutboundCallResponseMock = (
	overrideResponse: Partial<EngineRoutingOutboundCall> = {},
): EngineRoutingOutboundCall => ({
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
	disabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	domainId: faker.helpers.arrayElement([
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
	pattern: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
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

export const getMovePositionRoutingOutboundCallResponseMock = (
	overrideResponse: Partial<EngineMovePositionRoutingOutboundCallResponse> = {},
): EngineMovePositionRoutingOutboundCallResponse => ({
	success: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	...overrideResponse,
});

export const getDeleteRoutingOutboundCallResponseMock = (
	overrideResponse: Partial<EngineRoutingOutboundCall> = {},
): EngineRoutingOutboundCall => ({
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
	disabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	domainId: faker.helpers.arrayElement([
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
	pattern: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
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

export const getReadRoutingOutboundCallResponseMock = (
	overrideResponse: Partial<EngineRoutingOutboundCall> = {},
): EngineRoutingOutboundCall => ({
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
	disabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	domainId: faker.helpers.arrayElement([
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
	pattern: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
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

export const getPatchRoutingOutboundCallResponseMock = (
	overrideResponse: Partial<EngineRoutingOutboundCall> = {},
): EngineRoutingOutboundCall => ({
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
	disabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	domainId: faker.helpers.arrayElement([
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
	pattern: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
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

export const getUpdateRoutingOutboundCallResponseMock = (
	overrideResponse: Partial<EngineRoutingOutboundCall> = {},
): EngineRoutingOutboundCall => ({
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
	disabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	domainId: faker.helpers.arrayElement([
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
	pattern: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
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

export const getSearchRoutingOutboundCallMockHandler = (
	overrideResponse?:
		| EngineListRoutingOutboundCall
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) =>
				| Promise<EngineListRoutingOutboundCall>
				| EngineListRoutingOutboundCall),
) => {
	return http.get('*/routing/outbound/calls', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getSearchRoutingOutboundCallResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getCreateRoutingOutboundCallMockHandler = (
	overrideResponse?:
		| EngineRoutingOutboundCall
		| ((
				info: Parameters<Parameters<typeof http.post>[1]>[0],
		  ) => Promise<EngineRoutingOutboundCall> | EngineRoutingOutboundCall),
) => {
	return http.post('*/routing/outbound/calls', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCreateRoutingOutboundCallResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getMovePositionRoutingOutboundCallMockHandler = (
	overrideResponse?:
		| EngineMovePositionRoutingOutboundCallResponse
		| ((
				info: Parameters<Parameters<typeof http.patch>[1]>[0],
		  ) =>
				| Promise<EngineMovePositionRoutingOutboundCallResponse>
				| EngineMovePositionRoutingOutboundCallResponse),
) => {
	return http.patch(
		'*/routing/outbound/calls/:fromId/to/:toId',
		async (info) => {
			await delay(1000);

			return new HttpResponse(
				JSON.stringify(
					overrideResponse !== undefined
						? typeof overrideResponse === 'function'
							? await overrideResponse(info)
							: overrideResponse
						: getMovePositionRoutingOutboundCallResponseMock(),
				),
				{ status: 200, headers: { 'Content-Type': 'application/json' } },
			);
		},
	);
};

export const getDeleteRoutingOutboundCallMockHandler = (
	overrideResponse?:
		| EngineRoutingOutboundCall
		| ((
				info: Parameters<Parameters<typeof http.delete>[1]>[0],
		  ) => Promise<EngineRoutingOutboundCall> | EngineRoutingOutboundCall),
) => {
	return http.delete('*/routing/outbound/calls/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getDeleteRoutingOutboundCallResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getReadRoutingOutboundCallMockHandler = (
	overrideResponse?:
		| EngineRoutingOutboundCall
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<EngineRoutingOutboundCall> | EngineRoutingOutboundCall),
) => {
	return http.get('*/routing/outbound/calls/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getReadRoutingOutboundCallResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getPatchRoutingOutboundCallMockHandler = (
	overrideResponse?:
		| EngineRoutingOutboundCall
		| ((
				info: Parameters<Parameters<typeof http.patch>[1]>[0],
		  ) => Promise<EngineRoutingOutboundCall> | EngineRoutingOutboundCall),
) => {
	return http.patch('*/routing/outbound/calls/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getPatchRoutingOutboundCallResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getUpdateRoutingOutboundCallMockHandler = (
	overrideResponse?:
		| EngineRoutingOutboundCall
		| ((
				info: Parameters<Parameters<typeof http.put>[1]>[0],
		  ) => Promise<EngineRoutingOutboundCall> | EngineRoutingOutboundCall),
) => {
	return http.put('*/routing/outbound/calls/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getUpdateRoutingOutboundCallResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};
export const getRoutingOutboundCallServiceMock = () => [
	getSearchRoutingOutboundCallMockHandler(),
	getCreateRoutingOutboundCallMockHandler(),
	getMovePositionRoutingOutboundCallMockHandler(),
	getDeleteRoutingOutboundCallMockHandler(),
	getReadRoutingOutboundCallMockHandler(),
	getPatchRoutingOutboundCallMockHandler(),
	getUpdateRoutingOutboundCallMockHandler(),
];
