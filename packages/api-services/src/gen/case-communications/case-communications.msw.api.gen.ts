/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { faker } from '@faker-js/faker';

import { delay, HttpResponse, http } from 'msw';

import type {
	WebitelCasesLinkCommunicationResponse,
	WebitelCasesListCommunicationsResponse,
	WebitelCasesUnlinkCommunicationResponse,
} from '.././_models';

export const getListCommunicationsResponseMock = (
	overrideResponse: Partial<WebitelCasesListCommunicationsResponse> = {},
): WebitelCasesListCommunicationsResponse => ({
	data: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			communicationId: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			communicationType: faker.helpers.arrayElement([
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
			etag: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			ver: faker.helpers.arrayElement([
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
	page: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	...overrideResponse,
});

export const getLinkCommunicationResponseMock = (
	overrideResponse: Partial<WebitelCasesLinkCommunicationResponse> = {},
): WebitelCasesLinkCommunicationResponse => ({
	data: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			communicationId: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			communicationType: faker.helpers.arrayElement([
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
			etag: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			ver: faker.helpers.arrayElement([
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
	...overrideResponse,
});

export const getUnlinkCommunicationResponseMock = (
	overrideResponse: Partial<WebitelCasesUnlinkCommunicationResponse> = {},
): WebitelCasesUnlinkCommunicationResponse => ({
	affected: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	...overrideResponse,
});

export const getListCommunicationsMockHandler = (
	overrideResponse?:
		| WebitelCasesListCommunicationsResponse
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) =>
				| Promise<WebitelCasesListCommunicationsResponse>
				| WebitelCasesListCommunicationsResponse),
) => {
	return http.get('*/cases/:caseEtag/communication', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getListCommunicationsResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getLinkCommunicationMockHandler = (
	overrideResponse?:
		| WebitelCasesLinkCommunicationResponse
		| ((
				info: Parameters<Parameters<typeof http.post>[1]>[0],
		  ) =>
				| Promise<WebitelCasesLinkCommunicationResponse>
				| WebitelCasesLinkCommunicationResponse),
) => {
	return http.post('*/cases/:caseEtag/communication', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getLinkCommunicationResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getUnlinkCommunicationMockHandler = (
	overrideResponse?:
		| WebitelCasesUnlinkCommunicationResponse
		| ((
				info: Parameters<Parameters<typeof http.delete>[1]>[0],
		  ) =>
				| Promise<WebitelCasesUnlinkCommunicationResponse>
				| WebitelCasesUnlinkCommunicationResponse),
) => {
	return http.delete('*/cases/:caseEtag/communication/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getUnlinkCommunicationResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};
export const getCaseCommunicationsMock = () => [
	getListCommunicationsMockHandler(),
	getLinkCommunicationMockHandler(),
	getUnlinkCommunicationMockHandler(),
];
