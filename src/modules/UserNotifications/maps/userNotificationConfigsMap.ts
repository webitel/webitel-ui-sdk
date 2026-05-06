import { ApiUserWarningId } from '@webitel/api-services/gen/models';
import type { UserNotificationsConfigs } from '../types/UserWarnings';

const HOURS_IN_DAY = 24;

export const USER_NOTIFICATION_CONFIGS_MAP = new Map<
	string,
	UserNotificationsConfigs
>([
	[
		ApiUserWarningId.PasswordExpiresSoon,
		{
			type: 'info',
			getId: () => ApiUserWarningId.PasswordExpiresSoon,
			getLocaleKey: (data) =>
				data.passwordExpiry.daysRemaining
					? 'passwordExpirationMessageDays'
					: 'passwordExpirationMessageHours',
			getParams: (data) => {
				return {
					amount: data.passwordExpiry.daysRemaining && HOURS_IN_DAY,
				};
			},
		},
	],
	[
		ApiUserWarningId.LicenseExpiresSoon,
		{
			type: 'info',
			getId: (data) =>
				`${ApiUserWarningId.LicenseExpiresSoon}_${data.licenseExpiry.licenseName}`,
			getLocaleKey: () => 'licenseExpirationSoonMessage',
			getParams: (data) => {
				return {
					amount: data.licenseExpiry.daysRemaining || 0,
					name: data.licenseExpiry.licenseName,
				};
			},
		},
	],
]);
