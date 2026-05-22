interface UserNotificationsConfigsParams {
	amount?: number;
	name?: string;
}

interface NotificationsType {
	type: 'info' | 'warning' | 'error';
	localeKey: string;
	params?: UserNotificationsConfigsParams;
}

export type { NotificationsType, UserNotificationsConfigsParams };
