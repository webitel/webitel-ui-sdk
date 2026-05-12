import { ApiUserWarningId } from '@webitel/api-services/gen/models';
import type { NotificationsType } from '../types/UserNotifications';

const HOURS_IN_DAY = 24;

export const USER_NOTIFICATION_CONFIGS_MAP = new Map<
	ApiUserWarningId,
	(warningId: ApiUserWarningId) => NotificationsType
>([
	[
		ApiUserWarningId.PasswordExpiresSoon,
		({ warningData: data }) => ({
			type: 'info',
			localeKey: data.passwordExpiry.daysRemaining
				? 'passwordExpirationMessageDays'
				: 'passwordExpirationMessageHours',
			params: {
				amount: data.passwordExpiry.daysRemaining || HOURS_IN_DAY,
			},
		}),
	],
	[
		ApiUserWarningId.LicenseExpiresSoon,
		({ warningData: data }) => ({
			type: 'info',
			localeKey: 'licenseExpirationSoonMessage',
			params: {
				amount: data.licenseExpiry.daysRemaining,
				name: data.licenseExpiry.licenseName,
			},
		}),
	],
]);
