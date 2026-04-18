import { ApiUserWarningId } from '@webitel/api-services/gen/models';
import type { UserNotificationsConfigsMap } from '../types/UserWarnings';

export const USER_NOTIFICATION_CONFIGS_MAP = new Map<
	string,
	UserNotificationsConfigsMap
>([
	[
		ApiUserWarningId.PasswordExpiresSoon,
		{
			type: 'info',
			localeKey: 'passwordExpirationMessage',
			getDays: (warningData) => warningData.passwordExpiry.daysRemaining || 0,
		},
	],
]);
