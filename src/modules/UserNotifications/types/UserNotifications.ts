interface UserNotificationsMapConfig {
	id: string;
	type: 'info' | 'warning' | 'error';
	localeKey: string;
	getDays: (warningData: number) => number;
}

interface MappedUserNotificationsType {
	type: 'info' | 'warning' | 'error';
	localeKey: string;
	days: number;
}

type RawUserNotification = {
	id: string;
	details: string;
	warningData: object;
};

export type {
	MappedUserNotificationsType,
	RawUserNotification,
	UserNotificationsMapConfig,
};
