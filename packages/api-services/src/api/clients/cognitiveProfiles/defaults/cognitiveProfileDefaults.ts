import {
	StorageProviderType,
	StorageServiceType,
} from '@webitel/api-services/gen/models';

const DEFAULT_LOCALE = 'en-US';

/** [Claude] the settings each provider starts with, in `properties` */
const providerProperties: Partial<
	Record<StorageProviderType, Record<string, string>>
> = {
	[StorageProviderType.Microsoft]: {
		key: '',
		region: '',
		locale: DEFAULT_LOCALE,
	},
	[StorageProviderType.Google]: {
		key: '',
		locale: DEFAULT_LOCALE,
	},
	[StorageProviderType.ElevenLabs]: {
		key: '',
	},
};

/** [Claude] a new cognitive profile of the provider chosen in the create popup */
export const getCognitiveProfileDefaults = (
	provider?: StorageProviderType,
) => ({
	name: '',
	default: false,
	enabled: true,
	provider,
	service: StorageServiceType.Tts,
	description: '',
	properties: {
		...(provider && providerProperties[provider]),
	},
});
