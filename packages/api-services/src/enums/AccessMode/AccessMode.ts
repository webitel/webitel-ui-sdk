/** [Claude] the access a grantee has to one rule of an object (acl) */
export const AccessMode = {
	Forbidden: 1,
	Allow: 2,
	Manage: 3,
} as const;

export type AccessMode = (typeof AccessMode)[keyof typeof AccessMode];
