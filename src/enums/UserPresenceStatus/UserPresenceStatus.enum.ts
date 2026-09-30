export const UserPresenceStatus = {
	Sip: 'sip',
	Web: 'web',
	Dnd: 'dnd',
	Busy: 'busy',
} as const;

export type UserPresenceStatus =
	(typeof UserPresenceStatus)[keyof typeof UserPresenceStatus];
