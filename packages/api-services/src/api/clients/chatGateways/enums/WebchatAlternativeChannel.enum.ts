/**
 * Difference between MessangerType enum and WebchatAlternativeChannel:
 * MessangerType - backend fields naming, provider
 * WebchatAlternativeChannel - front-end only "simple" channel naming
 */
export const WebchatAlternativeChannel = Object.freeze({
	VIBER: 'viber',
	WHATSAPP: 'whatsapp',
	TELEGRAM: 'telegram',
	MESSENGER: 'messenger',
	EMAIL: 'email',
});
