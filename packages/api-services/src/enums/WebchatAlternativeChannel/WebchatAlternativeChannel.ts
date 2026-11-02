/**
 * Difference between MessangerType enum and WebchatAlternativeChannel:
 * MessangerType - backend fields naming, provider
 * WebchatAlternativeChannel - front-end only "simple" channel naming
 */
export const WebchatAlternativeChannel = {
	Viber: 'viber',
	Whatsapp: 'whatsapp',
	Telegram: 'telegram',
	Messenger: 'messenger',
	Email: 'email',
} as const;

export type WebchatAlternativeChannel =
	(typeof WebchatAlternativeChannel)[keyof typeof WebchatAlternativeChannel];
