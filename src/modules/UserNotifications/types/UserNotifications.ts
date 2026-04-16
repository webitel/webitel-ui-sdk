interface UserNotificationsConfigsMap {
	id: string;
	type: 'info' | 'warning' | 'error';
	localeKey: string;
	getDays: (warningData: number) => number;
}

interface NotificationsType {
	type: 'info' | 'warning' | 'error';
	localeKey: string;
	days: number;
}

export type { NotificationsType, UserNotificationsConfigsMap };
