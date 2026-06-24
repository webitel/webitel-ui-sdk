export const SingleSignOnProvider = {
	MICROSOFT: 'microsoft',
	GOOGLE: 'google',
	FACEBOOK: 'facebook',
	CUSTOM: 'custom',
} as const;

export type SingleSignOnProvider =
	(typeof SingleSignOnProvider)[keyof typeof SingleSignOnProvider];
