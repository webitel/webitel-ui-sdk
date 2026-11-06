export const PasswordAction = {
	Copy: 'copy',
	Generate: 'generate',
	Toggle: 'toggle',
} as const;

export type PasswordAction =
	(typeof PasswordAction)[keyof typeof PasswordAction];

export default PasswordAction;
