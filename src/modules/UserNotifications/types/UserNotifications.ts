import type { ApiUserWarning } from '@webitel/api-services/gen/models';

interface UserNotificationsConfigsParams {
	amount?: number;
	name?: string;
}

interface UserNotificationsConfigs {
	type: 'info' | 'warning' | 'error';
	getId: (data: ApiUserWarning) => string;
	getLocaleKey: (data: ApiUserWarning) => string;
	getParams?: (data: ApiUserWarning) => UserNotificationsConfigsParams;
}

interface NotificationsType {
	id: string;
	type: 'info' | 'warning' | 'error';
	localeKey: string;
	params?: UserNotificationsConfigsParams;
	shown?: boolean;
}

export type {
	NotificationsType,
	UserNotificationsConfigs,
	UserNotificationsConfigsParams,
};
