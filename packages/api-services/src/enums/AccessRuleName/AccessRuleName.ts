/** [Claude] the acl rules, as letters of the `granted` string: create, read, write, delete */
export const AccessRuleName = {
	X: 'x',
	R: 'r',
	W: 'w',
	D: 'd',
} as const;

export type AccessRuleName =
	(typeof AccessRuleName)[keyof typeof AccessRuleName];
