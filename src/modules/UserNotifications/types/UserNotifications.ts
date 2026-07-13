interface UserNotificationsConfigsParams {
	/** generated API types serialize int64 counters as strings */
	amount?: number | string;
	name?: string;
}

interface NotificationsType {
	type: 'info' | 'warning' | 'error';
	localeKey: string;
	params?: UserNotificationsConfigsParams;
}

export type { NotificationsType, UserNotificationsConfigsParams };
