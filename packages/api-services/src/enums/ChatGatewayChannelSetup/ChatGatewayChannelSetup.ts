/** [Claude] the chat service page where a channel is set up, opened in a popup */
export const ChatGatewayChannelSetup = {
	Facebook: 'pages=setup',
	Instagram: 'instagram=setup',
	Whatsapp: 'whatsapp=setup',
	TelegramApp: 'auth',
} as const;

export type ChatGatewayChannelSetup =
	(typeof ChatGatewayChannelSetup)[keyof typeof ChatGatewayChannelSetup];
