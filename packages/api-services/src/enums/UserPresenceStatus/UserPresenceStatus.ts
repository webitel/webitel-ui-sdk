export const UserPresenceStatus = {
	WEB: 'web',
	SIP: 'sip',
	DLG: 'dlg',
	DND: 'dnd',
} as const;

export type UserPresenceStatus =
	(typeof UserPresenceStatus)[keyof typeof UserPresenceStatus];
