export const BroadcastChannelName = {
	UserSettings: 'WtUserSettings',
} as const;

export type BroadcastChannelName =
	(typeof BroadcastChannelName)[keyof typeof BroadcastChannelName];
