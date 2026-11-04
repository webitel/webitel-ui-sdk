export const AuditFormMode = {
	Create: 'create',
	Fill: 'fill',
} as const;

export type AuditFormMode = (typeof AuditFormMode)[keyof typeof AuditFormMode];
