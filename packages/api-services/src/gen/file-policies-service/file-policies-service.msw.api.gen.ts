/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { faker } from '@faker-js/faker';

import { delay, HttpResponse, http } from 'msw';
import type {
	StorageFilePolicy,
	StorageFilePolicyApplyResponse,
	StorageListFilePolicies,
	StorageMovePositionFilePolicyResponse,
} from '.././_models';
import { StorageUploadFileChannel } from '.././_models';

export const getFilePoliciesServiceSearchFilePoliciesResponseMock = (
	overrideResponse: Partial<StorageListFilePolicies> = {},
): StorageListFilePolicies => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			channels: faker.helpers.arrayElement([
				faker.helpers.arrayElements(Object.values(StorageUploadFileChannel)),
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
			enabled: faker.helpers.arrayElement([
				faker.datatype.boolean(),
				undefined,
			]),
			encrypt: faker.helpers.arrayElement([
				faker.datatype.boolean(),
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
			maxUploadSize: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			mimeTypes: faker.helpers.arrayElement([
				Array.from(
					{ length: faker.number.int({ min: 1, max: 10 }) },
					(_, i) => i + 1,
				).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
				undefined,
			]),
			name: faker.helpers.arrayElement([
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
			retentionDays: faker.helpers.arrayElement([
				faker.number.int({
					min: undefined,
					max: undefined,
					multipleOf: undefined,
				}),
				undefined,
			]),
			speedDownload: faker.helpers.arrayElement([
				faker.string.alpha({ length: { min: 10, max: 20 } }),
				undefined,
			]),
			speedUpload: faker.helpers.arrayElement([
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

export const getFilePoliciesServiceCreateFilePolicyResponseMock = (
	overrideResponse: Partial<StorageFilePolicy> = {},
): StorageFilePolicy => ({
	channels: faker.helpers.arrayElement([
		faker.helpers.arrayElements(Object.values(StorageUploadFileChannel)),
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
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	encrypt: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	maxUploadSize: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	mimeTypes: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	name: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	position: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	retentionDays: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	speedDownload: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	speedUpload: faker.helpers.arrayElement([
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

export const getFilePoliciesServiceMovePositionFilePolicyResponseMock = (
	overrideResponse: Partial<StorageMovePositionFilePolicyResponse> = {},
): StorageMovePositionFilePolicyResponse => ({
	success: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	...overrideResponse,
});

export const getFilePoliciesServiceDeleteFilePolicyResponseMock = (
	overrideResponse: Partial<StorageFilePolicy> = {},
): StorageFilePolicy => ({
	channels: faker.helpers.arrayElement([
		faker.helpers.arrayElements(Object.values(StorageUploadFileChannel)),
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
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	encrypt: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	maxUploadSize: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	mimeTypes: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	name: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	position: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	retentionDays: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	speedDownload: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	speedUpload: faker.helpers.arrayElement([
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

export const getFilePoliciesServiceReadFilePolicyResponseMock = (
	overrideResponse: Partial<StorageFilePolicy> = {},
): StorageFilePolicy => ({
	channels: faker.helpers.arrayElement([
		faker.helpers.arrayElements(Object.values(StorageUploadFileChannel)),
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
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	encrypt: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	maxUploadSize: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	mimeTypes: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	name: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	position: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	retentionDays: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	speedDownload: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	speedUpload: faker.helpers.arrayElement([
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

export const getFilePoliciesServicePatchFilePolicyResponseMock = (
	overrideResponse: Partial<StorageFilePolicy> = {},
): StorageFilePolicy => ({
	channels: faker.helpers.arrayElement([
		faker.helpers.arrayElements(Object.values(StorageUploadFileChannel)),
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
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	encrypt: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	maxUploadSize: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	mimeTypes: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	name: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	position: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	retentionDays: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	speedDownload: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	speedUpload: faker.helpers.arrayElement([
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

export const getFilePoliciesServiceUpdateFilePolicyResponseMock = (
	overrideResponse: Partial<StorageFilePolicy> = {},
): StorageFilePolicy => ({
	channels: faker.helpers.arrayElement([
		faker.helpers.arrayElements(Object.values(StorageUploadFileChannel)),
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
	enabled: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	encrypt: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	id: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	maxUploadSize: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	mimeTypes: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => faker.string.alpha({ length: { min: 10, max: 20 } })),
		undefined,
	]),
	name: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	position: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	retentionDays: faker.helpers.arrayElement([
		faker.number.int({ min: undefined, max: undefined, multipleOf: undefined }),
		undefined,
	]),
	speedDownload: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	speedUpload: faker.helpers.arrayElement([
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

export const getFilePoliciesServiceFilePolicyApplyResponseMock = (
	overrideResponse: Partial<StorageFilePolicyApplyResponse> = {},
): StorageFilePolicyApplyResponse => ({
	count: faker.helpers.arrayElement([
		faker.string.alpha({ length: { min: 10, max: 20 } }),
		undefined,
	]),
	...overrideResponse,
});

export const getFilePoliciesServiceSearchFilePoliciesMockHandler = (
	overrideResponse?:
		| StorageListFilePolicies
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<StorageListFilePolicies> | StorageListFilePolicies),
) => {
	return http.get('*/storage/file_policies', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getFilePoliciesServiceSearchFilePoliciesResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getFilePoliciesServiceCreateFilePolicyMockHandler = (
	overrideResponse?:
		| StorageFilePolicy
		| ((
				info: Parameters<Parameters<typeof http.post>[1]>[0],
		  ) => Promise<StorageFilePolicy> | StorageFilePolicy),
) => {
	return http.post('*/storage/file_policies', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getFilePoliciesServiceCreateFilePolicyResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getFilePoliciesServiceMovePositionFilePolicyMockHandler = (
	overrideResponse?:
		| StorageMovePositionFilePolicyResponse
		| ((
				info: Parameters<Parameters<typeof http.patch>[1]>[0],
		  ) =>
				| Promise<StorageMovePositionFilePolicyResponse>
				| StorageMovePositionFilePolicyResponse),
) => {
	return http.patch(
		'*/storage/file_policies/:fromId/to/:toId',
		async (info) => {
			await delay(1000);

			return new HttpResponse(
				JSON.stringify(
					overrideResponse !== undefined
						? typeof overrideResponse === 'function'
							? await overrideResponse(info)
							: overrideResponse
						: getFilePoliciesServiceMovePositionFilePolicyResponseMock(),
				),
				{ status: 200, headers: { 'Content-Type': 'application/json' } },
			);
		},
	);
};

export const getFilePoliciesServiceDeleteFilePolicyMockHandler = (
	overrideResponse?:
		| StorageFilePolicy
		| ((
				info: Parameters<Parameters<typeof http.delete>[1]>[0],
		  ) => Promise<StorageFilePolicy> | StorageFilePolicy),
) => {
	return http.delete('*/storage/file_policies/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getFilePoliciesServiceDeleteFilePolicyResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getFilePoliciesServiceReadFilePolicyMockHandler = (
	overrideResponse?:
		| StorageFilePolicy
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<StorageFilePolicy> | StorageFilePolicy),
) => {
	return http.get('*/storage/file_policies/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getFilePoliciesServiceReadFilePolicyResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getFilePoliciesServicePatchFilePolicyMockHandler = (
	overrideResponse?:
		| StorageFilePolicy
		| ((
				info: Parameters<Parameters<typeof http.patch>[1]>[0],
		  ) => Promise<StorageFilePolicy> | StorageFilePolicy),
) => {
	return http.patch('*/storage/file_policies/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getFilePoliciesServicePatchFilePolicyResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getFilePoliciesServiceUpdateFilePolicyMockHandler = (
	overrideResponse?:
		| StorageFilePolicy
		| ((
				info: Parameters<Parameters<typeof http.put>[1]>[0],
		  ) => Promise<StorageFilePolicy> | StorageFilePolicy),
) => {
	return http.put('*/storage/file_policies/:id', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getFilePoliciesServiceUpdateFilePolicyResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getFilePoliciesServiceFilePolicyApplyMockHandler = (
	overrideResponse?:
		| StorageFilePolicyApplyResponse
		| ((
				info: Parameters<Parameters<typeof http.patch>[1]>[0],
		  ) =>
				| Promise<StorageFilePolicyApplyResponse>
				| StorageFilePolicyApplyResponse),
) => {
	return http.patch('*/storage/file_policies/:id/apply', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getFilePoliciesServiceFilePolicyApplyResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};
export const getFilePoliciesServiceMock = () => [
	getFilePoliciesServiceSearchFilePoliciesMockHandler(),
	getFilePoliciesServiceCreateFilePolicyMockHandler(),
	getFilePoliciesServiceMovePositionFilePolicyMockHandler(),
	getFilePoliciesServiceDeleteFilePolicyMockHandler(),
	getFilePoliciesServiceReadFilePolicyMockHandler(),
	getFilePoliciesServicePatchFilePolicyMockHandler(),
	getFilePoliciesServiceUpdateFilePolicyMockHandler(),
	getFilePoliciesServiceFilePolicyApplyMockHandler(),
];
