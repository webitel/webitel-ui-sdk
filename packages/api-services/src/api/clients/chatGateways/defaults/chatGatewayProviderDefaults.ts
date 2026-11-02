import { ChatGatewayProvider } from '../../../../enums';
import { defaultChatGateway } from './defaultChatGateway';
import { webChatGateway } from './webChatGateway';

/**
 * [Claude] Every metadata key a provider's form can touch is seeded here, on
 * create and on read: regle builds its `$fields` from the state keys, so a
 * key missing from the draft has no validation status in the form.
 */
const telegramBotChatGateway = () => ({
	...defaultChatGateway(),
	provider: ChatGatewayProvider.TELEGRAM_BOT,
	metadata: {
		token: '',
	},
});

const telegramAppChatGateway = () => ({
	...defaultChatGateway(),
	provider: ChatGatewayProvider.TELEGRAM_APP,
	metadata: {
		apiId: '',
		apiHash: '',
	},
});

const infobipChatGateway = () => ({
	...defaultChatGateway(),
	provider: ChatGatewayProvider.INFOBIP,
	metadata: {
		apiKey: '',
		url: '',
	},
});

const messengerChatGateway = () => ({
	...defaultChatGateway(),
	provider: ChatGatewayProvider.MESSENGER,
	metadata: {
		clientId: '',
		clientSecret: '',
		version: '',
		instagramComments: false,
		instagramMentions: false,
	},
});

export const VIBER_BTN_BACK_COLOR = '#1d2733';
export const VIBER_BTN_FONT_COLOR = '#ffffff';

const viberChatGateway = () => ({
	...defaultChatGateway(),
	provider: ChatGatewayProvider.VIBER,
	metadata: {
		token: '',
		botName: '',
		btnBackColor: VIBER_BTN_BACK_COLOR,
		btnFontColor: VIBER_BTN_FONT_COLOR,
	},
});

const customChatGateway = () => ({
	...defaultChatGateway(),
	provider: ChatGatewayProvider.CUSTOM,
	metadata: {
		secret: '',
		webhook: '',
	},
});

const chatGatewayProviderDefaults: Record<
	string,
	() => ReturnType<typeof defaultChatGateway>
> = {
	[ChatGatewayProvider.TELEGRAM_BOT]: telegramBotChatGateway,
	[ChatGatewayProvider.TELEGRAM_APP]: telegramAppChatGateway,
	[ChatGatewayProvider.INFOBIP]: infobipChatGateway,
	[ChatGatewayProvider.MESSENGER]: messengerChatGateway,
	[ChatGatewayProvider.VIBER]: viberChatGateway,
	[ChatGatewayProvider.WEBCHAT]: webChatGateway,
	[ChatGatewayProvider.CUSTOM]: customChatGateway,
};

/**
 * [Claude] The field set a chat gateway of `provider` is created with.
 * An unknown provider gets the provider-agnostic base.
 */
export const getChatGatewayDefaults = (provider?: string) => {
	const defaults = provider ? chatGatewayProviderDefaults[provider] : undefined;
	return defaults ? defaults() : defaultChatGateway();
};
