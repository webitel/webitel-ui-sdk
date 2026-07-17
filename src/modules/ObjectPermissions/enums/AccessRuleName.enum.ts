export const AccessRuleName = {
	X: 'x',
	R: 'r',
	W: 'w',
	D: 'd',
};

export type AccessRuleName =
	(typeof AccessRuleName)[keyof typeof AccessRuleName];
