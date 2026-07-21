export const SingleSignOnProvider = {
	Microsoft: 'microsoft',
	Google: 'google',
	Facebook: 'facebook',
	Custom: 'custom',
} as const;

export type SingleSignOnProvider =
	(typeof SingleSignOnProvider)[keyof typeof SingleSignOnProvider];
