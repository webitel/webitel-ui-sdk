import type { StorageBackendProfile } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { StorageType } from '../../enums';
import { i18nIssue } from '../_shared/i18nIssue';
import type { ZodShape } from '../types';

/** [Claude] number inputs give numbers, the api gives `maxSize` as a string */
const nonNegativeNumberSchema = z.coerce.number().min(0).default(0);

/**
 * [Claude] S3 settings, seeded for a new storage: only S3 can be created.
 * The keys of other storage types pass through untouched.
 */
const backendProfilePropertiesSchema = z
	.object({
		keyId: z.string().optional().default(''),
		accessKey: z.string().optional().default(''),
		bucketName: z.string().optional().default(''),
		region: z.string().optional().default(''),
		endpoint: z.string().optional().default('amazonaws.com'),
		pathPattern: z.string().optional().default('$DOMAIN/$Y/$M/$D'),
	})
	.passthrough();

const requiredS3Properties = [
	'keyId',
	'bucketName',
	'region',
	'endpoint',
] as const;

/**
 * [Claude] Storage (backend profile) card schema.
 *
 * Access key is required only when creating (`id` absent): an empty key on
 * update means "keep the current one".
 */
export const backendProfileSchema = z
	.object<ZodShape<StorageBackendProfile>>({
		id: z.string().optional(),
		name: z.string().min(1).default(''),
		type: z.string().default(StorageType.S3),
		maxSize: nonNegativeNumberSchema,
		expireDays: nonNegativeNumberSchema,
		priority: nonNegativeNumberSchema,
		disabled: z.boolean().optional(),
		// [Claude] `.prefault`, not `.default`: zod 4's `.default({})` would skip the s3 defaults
		properties: backendProfilePropertiesSchema.prefault({}),
	})
	.passthrough()
	.superRefine((profile, ctx) => {
		if (profile.type !== StorageType.S3) return;

		const properties = profile.properties as z.infer<
			typeof backendProfilePropertiesSchema
		>;
		const required = [
			...requiredS3Properties,
			...(profile.id
				? []
				: [
						'accessKey' as const,
					]),
		];

		for (const key of required) {
			if (!properties?.[key]) {
				ctx.addIssue({
					code: 'custom',
					path: [
						'properties',
						key,
					],
					...i18nIssue('required'),
				});
			}
		}
	});
