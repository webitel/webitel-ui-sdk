interface UserNotificationsConfigsParams {
	amount?: number;
	name?: string;
}

interface NotificationsType {
	id: string;
	type: 'info' | 'warning' | 'error';
	localeKey: string;
	params?: UserNotificationsConfigsParams;
	shown?: boolean;
}

export type { NotificationsType, UserNotificationsConfigsParams };
