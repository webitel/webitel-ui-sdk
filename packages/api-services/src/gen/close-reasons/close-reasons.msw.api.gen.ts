/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * service.proto
 * OpenAPI spec version: version not set
 */
import { faker } from '@faker-js/faker';

import { http, HttpResponse, delay } from 'msw';

import type {
	CasesCloseReason,
	CasesCloseReasonList,
	CasesLocateCloseReasonResponse,
} from '.././_models';

export const getListCloseReasonsResponseMock = (
	overrideResponse: Partial<CasesCloseReasonList> = {},
): CasesCloseReasonList => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			closeReasonGroupId: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			createdAt: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			createdBy: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.number.int({ min: undefined, max: undefined }),
						undefined,
					]),
					name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
				},
				undefined,
			]),
			description: faker.helpers.arrayElement([
				faker.string.alpha(20),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
			updatedAt: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			updatedBy: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.number.int({ min: undefined, max: undefined }),
						undefined,
					]),
					name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
				},
				undefined,
			]),
		})),
		undefined,
	]),
	next: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	page: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	...overrideResponse,
});

export const getCreateCloseReasonResponseMock = (
	overrideResponse: Partial<CasesCloseReason> = {},
): CasesCloseReason => ({
	closeReasonGroupId: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	createdAt: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	createdBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
		},
		undefined,
	]),
	description: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
	updatedAt: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	updatedBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
		},
		undefined,
	]),
	...overrideResponse,
});

export const getDeleteCloseReasonResponseMock = (
	overrideResponse: Partial<CasesCloseReason> = {},
): CasesCloseReason => ({
	closeReasonGroupId: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	createdAt: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	createdBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
		},
		undefined,
	]),
	description: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
	updatedAt: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	updatedBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
		},
		undefined,
	]),
	...overrideResponse,
});

export const getLocateCloseReasonResponseMock = (
	overrideResponse: Partial<CasesLocateCloseReasonResponse> = {},
): CasesLocateCloseReasonResponse => ({
	closeReason: faker.helpers.arrayElement([
		{
			closeReasonGroupId: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			createdAt: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			createdBy: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.number.int({ min: undefined, max: undefined }),
						undefined,
					]),
					name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
				},
				undefined,
			]),
			description: faker.helpers.arrayElement([
				faker.string.alpha(20),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
			updatedAt: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			updatedBy: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.number.int({ min: undefined, max: undefined }),
						undefined,
					]),
					name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
				},
				undefined,
			]),
		},
		undefined,
	]),
	...overrideResponse,
});

export const getUpdateCloseReason2ResponseMock = (
	overrideResponse: Partial<CasesCloseReason> = {},
): CasesCloseReason => ({
	closeReasonGroupId: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	createdAt: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	createdBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
		},
		undefined,
	]),
	description: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
	updatedAt: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	updatedBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
		},
		undefined,
	]),
	...overrideResponse,
});

export const getUpdateCloseReasonResponseMock = (
	overrideResponse: Partial<CasesCloseReason> = {},
): CasesCloseReason => ({
	closeReasonGroupId: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	createdAt: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	createdBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
		},
		undefined,
	]),
	description: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
	updatedAt: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined }),
		undefined,
	]),
	updatedBy: faker.helpers.arrayElement([
		{
			id: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
		},
		undefined,
	]),
	...overrideResponse,
});

export const getListCloseReasonsMockHandler = (
	overrideResponse?:
		| CasesCloseReasonList
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<CasesCloseReasonList> | CasesCloseReasonList),
) => {
	return http.get(
		'*/close_reason_groups/:closeReasonGroupId/close_reasons',
		async (info) => {
			await delay(1000);

			return new HttpResponse(
				JSON.stringify(
					overrideResponse !== undefined
						? typeof overrideResponse === 'function'
							? await overrideResponse(info)
							: overrideResponse
						: getListCloseReasonsResponseMock(),
				),
				{ status: 200, headers: { 'Content-Type': 'application/json' } },
			);
		},
	);
};

export const getCreateCloseReasonMockHandler = (
	overrideResponse?:
		| CasesCloseReason
		| ((
				info: Parameters<Parameters<typeof http.post>[1]>[0],
		  ) => Promise<CasesCloseReason> | CasesCloseReason),
) => {
	return http.post(
		'*/close_reason_groups/:closeReasonGroupId/close_reasons',
		async (info) => {
			await delay(1000);

			return new HttpResponse(
				JSON.stringify(
					overrideResponse !== undefined
						? typeof overrideResponse === 'function'
							? await overrideResponse(info)
							: overrideResponse
						: getCreateCloseReasonResponseMock(),
				),
				{ status: 200, headers: { 'Content-Type': 'application/json' } },
			);
		},
	);
};

export const getDeleteCloseReasonMockHandler = (
	overrideResponse?:
		| CasesCloseReason
		| ((
				info: Parameters<Parameters<typeof http.delete>[1]>[0],
		  ) => Promise<CasesCloseReason> | CasesCloseReason),
) => {
	return http.delete(
		'*/close_reason_groups/:closeReasonGroupId/close_reasons/:id',
		async (info) => {
			await delay(1000);

			return new HttpResponse(
				JSON.stringify(
					overrideResponse !== undefined
						? typeof overrideResponse === 'function'
							? await overrideResponse(info)
							: overrideResponse
						: getDeleteCloseReasonResponseMock(),
				),
				{ status: 200, headers: { 'Content-Type': 'application/json' } },
			);
		},
	);
};

export const getLocateCloseReasonMockHandler = (
	overrideResponse?:
		| CasesLocateCloseReasonResponse
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) =>
				| Promise<CasesLocateCloseReasonResponse>
				| CasesLocateCloseReasonResponse),
) => {
	return http.get(
		'*/close_reason_groups/:closeReasonGroupId/close_reasons/:id',
		async (info) => {
			await delay(1000);

			return new HttpResponse(
				JSON.stringify(
					overrideResponse !== undefined
						? typeof overrideResponse === 'function'
							? await overrideResponse(info)
							: overrideResponse
						: getLocateCloseReasonResponseMock(),
				),
				{ status: 200, headers: { 'Content-Type': 'application/json' } },
			);
		},
	);
};

export const getUpdateCloseReason2MockHandler = (
	overrideResponse?:
		| CasesCloseReason
		| ((
				info: Parameters<Parameters<typeof http.patch>[1]>[0],
		  ) => Promise<CasesCloseReason> | CasesCloseReason),
) => {
	return http.patch(
		'*/close_reason_groups/:closeReasonGroupId/close_reasons/:id',
		async (info) => {
			await delay(1000);

			return new HttpResponse(
				JSON.stringify(
					overrideResponse !== undefined
						? typeof overrideResponse === 'function'
							? await overrideResponse(info)
							: overrideResponse
						: getUpdateCloseReason2ResponseMock(),
				),
				{ status: 200, headers: { 'Content-Type': 'application/json' } },
			);
		},
	);
};

export const getUpdateCloseReasonMockHandler = (
	overrideResponse?:
		| CasesCloseReason
		| ((
				info: Parameters<Parameters<typeof http.put>[1]>[0],
		  ) => Promise<CasesCloseReason> | CasesCloseReason),
) => {
	return http.put(
		'*/close_reason_groups/:closeReasonGroupId/close_reasons/:id',
		async (info) => {
			await delay(1000);

			return new HttpResponse(
				JSON.stringify(
					overrideResponse !== undefined
						? typeof overrideResponse === 'function'
							? await overrideResponse(info)
							: overrideResponse
						: getUpdateCloseReasonResponseMock(),
				),
				{ status: 200, headers: { 'Content-Type': 'application/json' } },
			);
		},
	);
};
export const getCloseReasonsMock = () => [
	getListCloseReasonsMockHandler(),
	getCreateCloseReasonMockHandler(),
	getDeleteCloseReasonMockHandler(),
	getLocateCloseReasonMockHandler(),
	getUpdateCloseReason2MockHandler(),
	getUpdateCloseReasonMockHandler(),
];
