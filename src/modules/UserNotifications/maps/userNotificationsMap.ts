import type { UserNotificationsMapConfig } from '../types/UserWarnings';

export const USER_NOTIFICATIONS_MAP = new Map<
	string,
	UserNotificationsMapConfig
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
