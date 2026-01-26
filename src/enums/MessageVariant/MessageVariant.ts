export const MessageVariant = {
	FILLED: 'filled',
	OUTLINED: 'outlined',
	SIMPLE: 'simple',
} as const;

export type MessageVariant = keyof typeof MessageVariant;
