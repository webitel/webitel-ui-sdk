export const PasswordCategories = {
	Uppercase: '[A-Z]',
	Lowercase: '[a-z]',
	Digits: '[0-9]',
	Special: 'special',
} as const;

export type PasswordCategories =
	(typeof PasswordCategories)[keyof typeof PasswordCategories];
