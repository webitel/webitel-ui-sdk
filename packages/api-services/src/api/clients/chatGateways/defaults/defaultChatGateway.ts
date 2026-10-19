import { generateUri } from '../scripts/generateUri';

/**
 * Creates a default chat gateway configuration
 * @returns Default chat gateway object
 */
export const defaultChatGateway = () => ({
	name: '',
	uri: generateUri(),
	/** [Claude] undefined, not {}: regle gives an empty object no field status, so its required error would not show */
	flow: undefined,
	enabled: false,
	provider: '',
	metadata: {},
	updates: {
		title: '',
		close: '',
		join: '',
		left: '',
		filePolicyFail: '',
	},
});
