export declare const generatePermissionsApi: (baseUrl: any) => {
	getPermissionsList: ({
		parentId,
		...params
	}: {
		[x: string]: any;
		parentId: any;
	}) => Promise<{
		items: any;
		next: any;
	}>;
	patchPermissions: ({
		changes,
		id,
	}: {
		changes: any;
		id: any;
	}) => Promise<any>;
};
