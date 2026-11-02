import { StorageUploadFileChannel } from '@webitel/api-services/gen/models';
import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { storagePolicySchema } from '../storagePolicy.validations';

const issuePaths = (result: ReturnType<typeof storagePolicySchema.safeParse>) =>
	result.error?.issues.map(({ path }) => path.join('.')) ?? [];

const defaults = () => getDefaultsFromZodSchema(storagePolicySchema, {});

describe('storagePolicySchema', () => {
	it('seeds a new policy as enabled and not encrypted', () => {
		expect(defaults()).toMatchObject({
			name: '',
			enabled: true,
			encrypt: false,
			channels: [],
			mimeTypes: [],
			retentionDays: 0,
			speedDownload: 0,
			speedUpload: 0,
			maxUploadSize: 0,
		});
	});

	it('requires name, channels and mime types', () => {
		expect(issuePaths(storagePolicySchema.safeParse(defaults()))).toEqual([
			'name',
			'channels',
			'mimeTypes',
		]);
	});

	it('accepts the int64 strings the api returns for speeds and size', () => {
		const result = storagePolicySchema.safeParse({
			...defaults(),
			name: 'policy',
			channels: [
				StorageUploadFileChannel.CallChannel,
			],
			mimeTypes: [
				'audio/mpeg',
			],
			speedDownload: '100',
			speedUpload: '200',
			maxUploadSize: '300',
		});

		expect(result.success).toBe(true);
	});
});
