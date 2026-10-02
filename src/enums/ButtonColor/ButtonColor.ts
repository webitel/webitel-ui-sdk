export const ButtonColor = {
	PRIMARY: 'primary',
	SECONDARY: 'secondary',
	SUCCESS: 'success',
	WARN: 'warn',
	ERROR: 'error',
	TRANSFER: 'transfer',
	JOB: 'job',
	INFO: 'info',
	CHAT: 'chat',
	EMAIL: 'email',
} as const;

export type ButtonColor = (typeof ButtonColor)[keyof typeof ButtonColor];
