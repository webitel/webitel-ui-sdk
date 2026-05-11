import type { ApiUserWarning } from '@webitel/api-services/gen/models';
import { ApiUserWarningId } from '@webitel/api-services/gen/models';
import type { NotificationsType } from '../types/UserNotifications';

const HOURS_IN_DAY = 24;

class PasswordExpirationNotification implements NotificationsType {
	id: string;
	type: string = 'info';
	localeKey: string;
	params: Record<string, unknown>;
	shown = false;

	constructor(warning: ApiUserWarning) {
		const data = warning.warningData;
		this.id = ApiUserWarningId.PasswordExpiresSoon;
		this.localeKey = data.passwordExpiry.daysRemaining
			? 'passwordExpirationMessageDays'
			: 'passwordExpirationMessageHours';
		this.params = {
			amount: data.passwordExpiry.daysRemaining || HOURS_IN_DAY,
		};
	}
}

class LicenseExpirationNotification implements NotificationsType {
	id: string;
	type: string = 'info';
	localeKey: string;
	params: Record<string, unknown>;
	shown = false;

	constructor(warning: ApiUserWarning) {
		const data = warning.warningData;
		this.id = `${ApiUserWarningId.LicenseExpiresSoon}_${data.licenseExpiry.licenseName}`;
		this.localeKey = 'licenseExpirationSoonMessage';
		this.params = {
			amount: data.licenseExpiry.daysRemaining,
			name: data.licenseExpiry.licenseName,
		};
	}
}

export const USER_NOTIFICATION_CONFIGS_MAP = new Map<string, any>([
	[
		ApiUserWarningId.PasswordExpiresSoon,
		PasswordExpirationNotification,
	],
	[
		ApiUserWarningId.LicenseExpiresSoon,
		LicenseExpirationNotification,
	],
]);
