/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import { faker } from '@faker-js/faker';

import { http, HttpResponse, delay } from 'msw';

import { StorageUploadFileChannel } from '.././_models';
import type { StorageDeleteFilesResponse, StorageListFile } from '.././_models';

export const getFileServiceDeleteFilesResponseMock =
	(): StorageDeleteFilesResponse => ({});

export const getFileServiceSearchFilesResponseMock = (
	overrideResponse: Partial<StorageListFile> = {},
): StorageListFile => ({
	items: faker.helpers.arrayElement([
		Array.from(
			{ length: faker.number.int({ min: 1, max: 10 }) },
			(_, i) => i + 1,
		).map(() => ({
			channel: faker.helpers.arrayElement([
				faker.helpers.arrayElement(Object.values(StorageUploadFileChannel)),
				undefined,
			]),
			id: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			mimeType: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
			name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
			referenceId: faker.helpers.arrayElement([
				faker.string.alpha(20),
				undefined,
			]),
			retentionUntil: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			sha256Sum: faker.helpers.arrayElement([
				faker.string.alpha(20),
				undefined,
			]),
			size: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			thumbnail: faker.helpers.arrayElement([
				{
					mimeType: faker.helpers.arrayElement([
						faker.string.alpha(20),
						undefined,
					]),
					scale: faker.helpers.arrayElement([
						faker.string.alpha(20),
						undefined,
					]),
					size: faker.helpers.arrayElement([
						faker.number.int({ min: undefined, max: undefined }),
						undefined,
					]),
				},
				undefined,
			]),
			uploadedAt: faker.helpers.arrayElement([
				faker.number.int({ min: undefined, max: undefined }),
				undefined,
			]),
			uploadedBy: faker.helpers.arrayElement([
				{
					id: faker.helpers.arrayElement([
						faker.number.int({ min: undefined, max: undefined }),
						undefined,
					]),
					name: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
				},
				undefined,
			]),
			uuid: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
			viewName: faker.helpers.arrayElement([faker.string.alpha(20), undefined]),
		})),
		undefined,
	]),
	next: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
	...overrideResponse,
});

export const getFileServiceDeleteFilesMockHandler = (
	overrideResponse?:
		| StorageDeleteFilesResponse
		| ((
				info: Parameters<Parameters<typeof http.delete>[1]>[0],
		  ) => Promise<StorageDeleteFilesResponse> | StorageDeleteFilesResponse),
) => {
	return http.delete('*/storage/file', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getFileServiceDeleteFilesResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};

export const getFileServiceSearchFilesMockHandler = (
	overrideResponse?:
		| StorageListFile
		| ((
				info: Parameters<Parameters<typeof http.get>[1]>[0],
		  ) => Promise<StorageListFile> | StorageListFile),
) => {
	return http.get('*/storage/file', async (info) => {
		await delay(1000);

		return new HttpResponse(
			JSON.stringify(
				overrideResponse !== undefined
					? typeof overrideResponse === 'function'
						? await overrideResponse(info)
						: overrideResponse
					: getFileServiceSearchFilesResponseMock(),
			),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	});
};
export const getFileServiceMock = () => [
	getFileServiceDeleteFilesMockHandler(),
	getFileServiceSearchFilesMockHandler(),
];
