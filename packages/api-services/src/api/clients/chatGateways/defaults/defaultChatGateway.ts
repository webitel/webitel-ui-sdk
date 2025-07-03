import { generateUri } from '../scripts/generateUri';

/**
 * Creates a default chat gateway configuration
 * @returns Default chat gateway object
 */
export const defaultChatGateway = () => ({
	name: '',
	uri: generateUri(),
	flow: {},
	enabled: false,
	provider: '',
	metadata: {},
	updates: {
		title: '',
		close: '',
		join: '',
		left: '',
	},
});
