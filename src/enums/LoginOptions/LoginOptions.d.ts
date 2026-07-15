export declare const LoginOptions: {
	readonly LOCAL_PASSWORD_ONLY: 'local_password_only';
	readonly SSO_AND_LOCAL: 'sso_and_local';
	readonly SSO_ONLY: 'sso_only';
};
export type LoginOptions = keyof typeof LoginOptions;
