export const MessageVariant = {
	FILLED: 'filled',
	OUTLINED: 'outlined',
	SIMPLE: 'simple',
} as const;

export type MessageVariant =
	(typeof MessageVariant)[keyof typeof MessageVariant];
