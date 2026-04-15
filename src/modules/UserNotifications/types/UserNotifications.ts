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

type RawNotification = {
	id: string;
	details: string;
	warningData: object;
};

export type { NotificationsType, RawNotification, UserNotificationsConfigsMap };
