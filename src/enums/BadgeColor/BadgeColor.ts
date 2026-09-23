export const BadgeColor = {
	SECONDARY: 'secondary',
	INFO: 'info',
	SUCCESS: 'success',
	WARN: 'warn',
	ERROR: 'error',
	ONLINE: 'online',
	DND: 'dnd',
	BUSY: 'busy',
	PAUSE: 'pause',
	ONLINECC: 'onlineCc',
	OFFLINE: 'offline',
} as const;

export type BadgeColor = (typeof BadgeColor)[keyof typeof BadgeColor];
