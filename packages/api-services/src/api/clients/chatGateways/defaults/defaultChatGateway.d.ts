/**
 * Creates a default chat gateway configuration
 * @returns Default chat gateway object
 */
export declare const defaultChatGateway: () => {
	name: string;
	uri: string;
	flow: {};
	enabled: boolean;
	provider: string;
	metadata: {};
	updates: {
		title: string;
		close: string;
		join: string;
		left: string;
	};
};
