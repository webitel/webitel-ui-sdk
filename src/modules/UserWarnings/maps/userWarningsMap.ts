import type { UserWarningsMapConfig } from '../types/UserWarnings';

export const USER_WARNINGS_MAP = new Map<string, UserWarningsMapConfig>([
	[
		'app.password.expires_soon',
		{
			type: 'info',
			localeKey: 'passwordExpirationMessage',
			getDays: (warningData) => warningData.passwordExpiry.daysRemaining || 0,
		},
	],
]);
