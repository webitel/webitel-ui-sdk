export const LoginOptions = {
	LOCAL_PASSWORD_ONLY: 'local_password_only',
	SSO_AND_LOCAL: 'sso_and_local',
	SSO_ONLY: 'sso_only',
} as const;

export type LoginOptions = keyof typeof LoginOptions;
