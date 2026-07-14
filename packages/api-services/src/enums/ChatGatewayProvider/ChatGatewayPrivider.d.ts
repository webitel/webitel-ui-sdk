export declare const ChatGatewayProvider: Readonly<{
	TELEGRAM_BOT: 'telegram';
	TELEGRAM_APP: 'gotd';
	MESSENGER: 'messenger';
	VIBER: 'viber';
	WEBCHAT: 'webchat';
	INFOBIP: 'infobip_whatsapp';
	CUSTOM: 'custom';
	PORTAL: 'portal';
}>;
export type ChatGatewayProvider =
	(typeof ChatGatewayProvider)[keyof typeof ChatGatewayProvider];
