/**
 * Creates a default webchat gateway configuration
 * @param _btnCodeDirty - Flag indicating if the "copy code" button should be highlighted
 * @returns Default webchat gateway object
 */
export declare const webChatGateway: (_btnCodeDirty?: boolean) => {
	provider: 'webchat';
	metadata: {
		allowOrigin: any[];
		readTimeout: string;
		writeTimeout: string;
		handshakeTimeout: string;
		mediaMaxSize: string;
		_btnCodeDirty: boolean;
		view: {
			borderRadiusStyle: string;
			lang: string;
			btnOpacity: string;
			logoUrl: string;
			accentColor: string;
			position: string;
		};
		captcha: {
			enabled: boolean;
			sitekey: string;
			secret: string;
			threshold: number;
			showFlag: boolean;
		};
		chat: {
			enabled: boolean;
			timeoutIsActive: boolean;
			openTimeout: string;
			url: string;
		};
		appointment: {
			enabled: boolean;
			url: string;
			queue: {};
			communicationType: {};
			duration: string;
			days: number;
			availableAgents: number;
			successTitle: string;
			successSubtitle: string;
			showDefaultHeading: boolean;
			showEmailField: boolean;
			showMessageField: boolean;
		};
		call: {
			enabled: boolean;
			url: string;
			flow: {};
			id: string;
		};
		alternativeChannels: Record<
			string,
			{
				url: string;
				enabled: boolean;
			}
		>;
	};
	name: string;
	uri: string;
	flow: {};
	enabled: boolean;
	updates: {
		title: string;
		close: string;
		join: string;
		left: string;
	};
};
