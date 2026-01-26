export const MessageColor = {
	SECONDARY: 'secondary',
	SUCCESS: 'success',
	ERROR: 'error',
	WARN: 'warn',
	INFO: 'info',
	CONTRAST: 'contrast',
} as const;

export type MessageColor = keyof typeof MessageColor;
