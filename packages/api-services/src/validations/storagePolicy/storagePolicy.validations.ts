import type { StorageFilePolicy } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import type { ZodShape } from '../types';

/** [Claude] the api keeps speeds and the upload size as int64 strings, the form edits them as numbers */
export type StoragePolicyCard = Omit<
	StorageFilePolicy,
	'speedDownload' | 'speedUpload' | 'maxUploadSize'
> & {
	speedDownload?: string | number;
	speedUpload?: string | number;
	maxUploadSize?: string | number;
};

const sizeSchema = z
	.union([
		z.string(),
		z.number(),
	])
	.optional()
	.default(0);

export const storagePolicySchema = z.object<ZodShape<StorageFilePolicy>>({
	id: z.number().optional(),
	name: z.string().min(1).default(''),
	description: z.string().optional().default(''),
	enabled: z.boolean().default(true),
	encrypt: z.boolean().default(false),
	channels: z.array(z.string()).min(1).default([]),
	mimeTypes: z.array(z.string()).min(1).default([]),
	retentionDays: z.number().min(0).optional().default(0),
	speedDownload: sizeSchema,
	speedUpload: sizeSchema,
	maxUploadSize: sizeSchema,
});
