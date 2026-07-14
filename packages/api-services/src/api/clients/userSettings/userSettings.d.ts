export declare const UserSettingsAPI: {
	get: ({ key }: { key: any }) => Promise<ApiUserSetting>;
	set: ({ key, value }: { key: any; value: any }) => Promise<ApiUserSetting>;
};
