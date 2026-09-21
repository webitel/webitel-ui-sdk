export const ChipColor = {
	MAIN: 'main',
	PRIMARY: 'primary',
	ON_PRIMARY: 'on-primary',
	SECONDARY: 'secondary',
	SUCCESS: 'success',
	WARNING: 'warning',
	ERROR: 'error',
	INFO: 'info',
	TRANSFER: 'transfer',
} as const;

export type ChipColor = (typeof ChipColor)[keyof typeof ChipColor];
