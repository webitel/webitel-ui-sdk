/*
 * @author @Lera24
 * @description Enum for Chat Gateway Providers
 * https://webitel.atlassian.net/browse/WTEL-7842?focusedCommentId=702198
 * */

export const ChatGatewayProvider = Object.freeze({
	TELEGRAM_BOT: 'telegram',
	TELEGRAM_APP: 'gotd',
	MESSENGER: 'messenger',
	VIBER: 'viber',
	WEBCHAT: 'webchat',
	INFOBIP: 'infobip_whatsapp',
	CUSTOM: 'custom',
	PORTAL: 'portal',
});

export type ChatGatewayProvider =
	(typeof ChatGatewayProvider)[keyof typeof ChatGatewayProvider];
