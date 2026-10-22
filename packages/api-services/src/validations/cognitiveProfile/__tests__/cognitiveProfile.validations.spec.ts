import { StorageProviderType } from '@webitel/api-services/gen/models';
import { describe, expect, it } from 'vitest';

import { getCognitiveProfileDefaults } from '../../../api/clients/cognitiveProfiles/defaults/cognitiveProfileDefaults';
import { cognitiveProfileSchema } from '../cognitiveProfile.validations';

const issuePaths = (
	result: ReturnType<typeof cognitiveProfileSchema.safeParse>,
) => result.error?.issues.map(({ path }) => path.join('.')) ?? [];

describe('cognitiveProfileSchema', () => {
	it('requires name, key and region for a new microsoft profile', () => {
		const paths = issuePaths(
			cognitiveProfileSchema.safeParse(
				getCognitiveProfileDefaults(StorageProviderType.Microsoft),
			),
		);

		expect(paths).toEqual(
			expect.arrayContaining([
				'name',
				'properties.key',
				'properties.region',
			]),
		);
	});

	it('does not require the key of a saved microsoft or elevenlabs profile', () => {
		for (const provider of [
			StorageProviderType.Microsoft,
			StorageProviderType.ElevenLabs,
		]) {
			const paths = issuePaths(
				cognitiveProfileSchema.safeParse({
					...getCognitiveProfileDefaults(provider),
					id: '1',
					name: 'profile',
					properties: {
						region: 'West Europe',
					},
				}),
			);

			expect(paths).not.toContain('properties.key');
		}
	});

	it('requires a google key until a key file is chosen', () => {
		const profile = {
			...getCognitiveProfileDefaults(StorageProviderType.Google),
			id: '1',
			name: 'profile',
		};

		expect(issuePaths(cognitiveProfileSchema.safeParse(profile))).toContain(
			'properties.key',
		);
		expect(
			cognitiveProfileSchema.safeParse({
				...profile,
				properties: {
					keyFilename: 'key.json',
				},
			}).success,
		).toBe(true);
	});

	it('keeps the provider settings it does not list', () => {
		const result = cognitiveProfileSchema.safeParse({
			...getCognitiveProfileDefaults(StorageProviderType.ElevenLabs),
			name: 'profile',
			properties: {
				key: 'secret',
				voice: 'rachel',
			},
		});

		expect(result.data?.properties).toMatchObject({
			key: 'secret',
			voice: 'rachel',
		});
	});
});
