import {
	type StorageCognitiveProfile,
	StorageProviderType,
} from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { i18nIssue } from '../_shared/i18nIssue';
import { isFilled } from '../_shared/isFilled';

/** [Claude] the generated model leaves out `properties`, the provider's own settings */
export type CognitiveProfileCard = StorageCognitiveProfile & {
	properties?: Record<string, unknown>;
};

/**
 * [Claude] Keys are optional here: which ones a provider requires is checked
 * in `superRefine` below. A google key is the parsed json of its key file.
 */
const cognitiveProfilePropertiesSchema = z
	.object({
		key: z.unknown().optional(),
		keyFilename: z.string().optional(),
		region: z.string().optional(),
		locale: z.string().optional(),
	})
	.passthrough();

/**
 * [Claude] Cognitive profile card schema.
 *
 * A saved key is not sent back, so an empty key on update means "keep the
 * current one": microsoft and elevenlabs require it only when creating. A
 * google key comes from a file, so it is required until a file is chosen.
 */
export const cognitiveProfileSchema = z
	.object({
		id: z.string().optional(),
		name: z.string().min(1).default(''),
		provider: z.string().min(1),
		service: z.string().min(1),
		default: z.boolean().default(false),
		enabled: z.boolean().default(true),
		description: z.string().optional(),
		properties: cognitiveProfilePropertiesSchema.prefault({}),
	})
	.passthrough()
	.superRefine((profile, ctx) => {
		const { properties } = profile;

		const requireProperty = (key: string) => {
			if (isFilled(properties[key])) return;
			ctx.addIssue({
				code: 'custom',
				path: [
					'properties',
					key,
				],
				...i18nIssue('required'),
			});
		};

		switch (profile.provider) {
			case StorageProviderType.Microsoft:
				if (!profile.id) requireProperty('key');
				requireProperty('region');
				break;
			case StorageProviderType.ElevenLabs:
				if (!profile.id) requireProperty('key');
				break;
			case StorageProviderType.Google:
				if (!properties.keyFilename) requireProperty('key');
				break;
		}
	});
