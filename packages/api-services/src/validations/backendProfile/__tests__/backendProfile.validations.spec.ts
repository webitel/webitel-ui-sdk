import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { backendProfileSchema } from '../backendProfile.validations';

const issuePaths = (
	result: ReturnType<typeof backendProfileSchema.safeParse>,
) => result.error?.issues.map(({ path }) => path.join('.')) ?? [];

const filledS3 = {
	name: 'storage',
	type: 's3',
	properties: {
		keyId: 'key',
		accessKey: 'secret',
		bucketName: 'bucket',
		region: 'eu-central-1',
		endpoint: 'amazonaws.com',
	},
};

describe('backendProfileSchema', () => {
	it('seeds a new storage as an aws s3 bucket', () => {
		expect(getDefaultsFromZodSchema(backendProfileSchema, {})).toMatchObject({
			name: '',
			type: 's3',
			maxSize: 0,
			expireDays: 0,
			priority: 0,
			properties: {
				keyId: '',
				accessKey: '',
				bucketName: '',
				region: '',
				endpoint: 'amazonaws.com',
				pathPattern: '$DOMAIN/$Y/$M/$D',
			},
		});
	});

	it('requires name and s3 settings for a new storage', () => {
		const paths = issuePaths(
			backendProfileSchema.safeParse(
				getDefaultsFromZodSchema(backendProfileSchema, {}),
			),
		);

		expect(paths).toEqual(
			expect.arrayContaining([
				'name',
				'properties.keyId',
				'properties.accessKey',
				'properties.bucketName',
				'properties.region',
			]),
		);
	});

	it('does not require the access key for an existing storage', () => {
		const paths = issuePaths(
			backendProfileSchema.safeParse({
				...filledS3,
				id: '1',
				properties: {
					...filledS3.properties,
					accessKey: '',
				},
			}),
		);

		expect(paths).not.toContain('properties.accessKey');
	});

	it('does not require s3 settings for other storage types', () => {
		const result = backendProfileSchema.safeParse({
			id: '1',
			name: 'local',
			type: 'local',
			properties: {
				directory: '/data',
			},
		});

		expect(result.success).toBe(true);
	});

	it('rejects negative numbers and reads maxSize given as a string', () => {
		const result = backendProfileSchema.safeParse({
			...filledS3,
			maxSize: '10',
			expireDays: -1,
		});

		expect(issuePaths(result)).toEqual([
			'expireDays',
		]);
		expect(
			backendProfileSchema.safeParse({
				...filledS3,
				maxSize: '10',
			}).data?.maxSize,
		).toBe(10);
	});
});
