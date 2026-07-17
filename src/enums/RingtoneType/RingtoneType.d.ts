export declare const RingtoneType: {
	readonly Call: 'call';
	readonly Chat: 'chat';
	readonly Task: 'task';
};
export type RingtoneType = (typeof RingtoneType)[keyof typeof RingtoneType];
