import { getDefaultInstance } from '../../defaults';
import {
	applyTransform,
	mergeEach,
	notify,
	snakeToCamel,
} from '../../transformers';
import type { AppUrls } from '../_shared/appUrls';

/**
 * [Claude] The channels a chat gateway connects through the chat service,
 * addressed by the gateway's uri: telegram app sign-in, meta pages and accounts.
 * The chat service lives outside the api base url, so the app gives its url;
 * the default instance still adds the auth header to each request.
 */
const instance = getDefaultInstance();

export type ChatGatewayChannelParams = {
	uri: string;
	appUrls: Pick<AppUrls, 'chatUrl'>;
};

type SubscriptionParams = ChatGatewayChannelParams & {
	id: string;
	value: boolean;
};

export type ChatGatewayAccount = {
	name?: string;
	[key: string]: unknown;
};

export type FacebookPage = {
	id: string;
	name?: string;
	accounts: ChatGatewayAccount[];
	subscribedFields?: string[];
};

export type InstagramPage = {
	id: string;
	name?: string;
	accounts: ChatGatewayAccount[];
	instagram?: {
		username?: string;
	};
};

export type WhatsappPhoneNumber = {
	verifiedName?: string;
	displayPhoneNumber?: string;
	nameStatus?: string;
	status?: string;
};

export type WhatsappAccount = {
	id: string;
	phoneNumbers: WhatsappPhoneNumber[];
	subscribedFields?: string[];
};

export type TelegramAppAuthState = {
	authorized?: boolean;
	account?: {
		FirstName?: string;
		LastName?: string;
	};
};

/** [Claude] the chat service page where a channel is set up, opened in a popup */
export const ChatGatewayChannelSetup = Object.freeze({
	FACEBOOK: 'pages=setup',
	INSTAGRAM: 'instagram=setup',
	WHATSAPP: 'whatsapp=setup',
	TELEGRAM_APP: 'auth',
});

export type ChatGatewayChannelSetup =
	(typeof ChatGatewayChannelSetup)[keyof typeof ChatGatewayChannelSetup];

const channelUrl = ({ uri, appUrls }: ChatGatewayChannelParams, query = '') =>
	`${appUrls.chatUrl}${uri}${query ? `?${query}` : ''}`;

const getChannelList = async <Item>(
	params: ChatGatewayChannelParams,
	query: string,
	defaultItem: object,
): Promise<Item[]> => {
	try {
		const response = await instance.get(channelUrl(params, query));
		return applyTransform(response.data, [
			snakeToCamel(),
			mergeEach(defaultItem),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getSetupUrl = (
	params: ChatGatewayChannelParams & {
		setup: ChatGatewayChannelSetup;
	},
) => channelUrl(params, params.setup);

const getTelegramAppAuth = async (
	params: ChatGatewayChannelParams,
): Promise<TelegramAppAuthState> => {
	const response = await instance.get(channelUrl(params));
	return response.data;
};

const logoutTelegramApp = (params: ChatGatewayChannelParams) =>
	instance.post(channelUrl(params, 'logout='), {});

const getFacebookPages = (params: ChatGatewayChannelParams) =>
	getChannelList<FacebookPage>(params, 'pages=', {
		accounts: [],
	});

const updateFacebookPageSubscription = ({
	id,
	value,
	...params
}: SubscriptionParams) =>
	instance.get(
		channelUrl(params, `pages=${value ? 'subscribe' : 'unsubscribe'}&id=${id}`),
	);

const getInstagramPages = (params: ChatGatewayChannelParams) =>
	getChannelList<InstagramPage>(params, 'instagram=', {
		accounts: [],
		instagram: {},
	});

const getWhatsappAccounts = (params: ChatGatewayChannelParams) =>
	getChannelList<WhatsappAccount>(params, 'whatsapp=', {
		phoneNumbers: [],
	});

const updateWhatsappSubscription = ({
	id,
	value,
	...params
}: SubscriptionParams) =>
	instance.get(
		channelUrl(
			params,
			`whatsapp=${value ? 'subscribe' : 'unsubscribe'}&id=${id}`,
		),
	);

const deleteWhatsappAccount = ({
	id,
	...params
}: ChatGatewayChannelParams & {
	id: string;
}) => instance.get(channelUrl(params, `whatsapp=remove&id=${id}&ack=true`));

export const ChatGatewayChannelsAPI = {
	getSetupUrl,
	getTelegramAppAuth,
	logoutTelegramApp,
	getFacebookPages,
	updateFacebookPageSubscription,
	getInstagramPages,
	getWhatsappAccounts,
	updateWhatsappSubscription,
	deleteWhatsappAccount,
};
