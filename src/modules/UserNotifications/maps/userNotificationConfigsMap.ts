import type { UserNotificationsConfigsMap } from '../types/UserWarnings';

export const USER_NOTIFICATION_CONFIGS_MAP = new Map<
	string,
	UserNotificationsConfigsMap
>([
	[
		'app.password.expires_soon',
		{
			type: 'info',
			localeKey: 'passwordExpirationMessage',
			getDays: (warningData) => warningData.passwordExpiry.daysRemaining || 0,
		},
	],
]);
