/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { faker } from '@faker-js/faker';

import { delay, HttpResponse, http } from 'msw';
import type {
	EngineCommunicationType,
	EngineListCommunicationType,
} from '.././_models';
import { EngineCommunicationChannels } from '.././_models';

export const getSearchCommunicationTypeResponseMock = (
	overrideResponse: Partial<EngineListCommunicationType> = {},
): EngineListCommunicationType => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			channel: faker.helpers.arrayElement([
				faker.helpers.arrayElement(Object.values(EngineCommunicationChannels)),
				undefined,
			]),
			code: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			default: faker.helpers.arrayElement([
				faker.datatype.boolean(),
				undefined,
			]),
			description: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
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
		})),
		undefined,
	]),
	next: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	...overrideResponse,
});

export const getCreateCommunicationTypeResponseMock = (
	overrideResponse: Partial<EngineCommunicationType> = {},
): EngineCommunicationType => ({
	channel: faker.helpers.arrayElement([
		faker.helpers.arrayElement(Object.values(EngineCommunicationChannels)),
		undefined,
	]),
	code: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	default: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	description: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
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
	...overrideResponse,
});

export const getDeleteCommunicationTypeResponseMock = (
	overrideResponse: Partial<EngineCommunicationType> = {},
): EngineCommunicationType => ({
	channel: faker.helpers.arrayElement([
		faker.helpers.arrayElement(Object.values(EngineCommunicationChannels)),
		undefined,
	]),
	code: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	default: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	description: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
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
	...overrideResponse,
});

export const getReadCommunicationTypeResponseMock = (
	overrideResponse: Partial<EngineCommunicationType> = {},
): EngineCommunicationType => ({
	channel: faker.helpers.arrayElement([
		faker.helpers.arrayElement(Object.values(EngineCommunicationChannels)),
		undefined,
	]),
	code: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	default: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	description: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
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
	...overrideResponse,
});

export const getPatchCommunicationTypeResponseMock = (
	overrideResponse: Partial<EngineCommunicationType> = {},
): EngineCommunicationType => ({
	channel: faker.helpers.arrayElement([
		faker.helpers.arrayElement(Object.values(EngineCommunicationChannels)),
		undefined,
	]),
	code: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	default: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	description: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
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
	...overrideResponse,
});

export const getUpdateCommunicationTypeResponseMock = (
	overrideResponse: Partial<EngineCommunicationType> = {},
): EngineCommunicationType => ({
	channel: faker.helpers.arrayElement([
		faker.helpers.arrayElement(Object.values(EngineCommunicationChannels)),
		undefined,
	]),
	code: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	default: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	description: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
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
	...overrideResponse,
});

export const getSearchCommunicationTypeMockHandler = (
	overrideResponse?:
		| EngineListCommunicationType
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<EngineListCommunicationType> | EngineListCommunicationType),
) => {
	return http.get('*/call_center/communication_type', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getSearchCommunicationTypeResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getCreateCommunicationTypeMockHandler = (
	overrideResponse?:
		| EngineCommunicationType
		| ((
				info: Parameters<Parameters<typeof http.post>[1]>[0],
		  ) => Promise<EngineCommunicationType> | EngineCommunicationType),
) => {
	return http.post('*/call_center/communication_type', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getCreateCommunicationTypeResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getDeleteCommunicationTypeMockHandler = (
	overrideResponse?:
		| EngineCommunicationType
		| ((
				info: Parameters<Parameters<typeof http.delete>[1]>[0],
		  ) => Promise<EngineCommunicationType> | EngineCommunicationType),
) => {
	return http.delete('*/call_center/communication_type/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getDeleteCommunicationTypeResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getReadCommunicationTypeMockHandler = (
	overrideResponse?:
		| EngineCommunicationType
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<EngineCommunicationType> | EngineCommunicationType),
) => {
	return http.get('*/call_center/communication_type/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getReadCommunicationTypeResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getPatchCommunicationTypeMockHandler = (
	overrideResponse?:
		| EngineCommunicationType
		| ((
				info: Parameters<Parameters<typeof http.patch>[1]>[0],
		  ) => Promise<EngineCommunicationType> | EngineCommunicationType),
) => {
	return http.patch('*/call_center/communication_type/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getPatchCommunicationTypeResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getUpdateCommunicationTypeMockHandler = (
	overrideResponse?:
		| EngineCommunicationType
		| ((
				info: Parameters<Parameters<typeof http.put>[1]>[0],
		  ) => Promise<EngineCommunicationType> | EngineCommunicationType),
) => {
	return http.put('*/call_center/communication_type/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getUpdateCommunicationTypeResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};
export const getCommunicationTypeServiceMock = () => [
	getSearchCommunicationTypeMockHandler(),
	getCreateCommunicationTypeMockHandler(),
	getDeleteCommunicationTypeMockHandler(),
	getReadCommunicationTypeMockHandler(),
	getPatchCommunicationTypeMockHandler(),
	getUpdateCommunicationTypeMockHandler(),
];
