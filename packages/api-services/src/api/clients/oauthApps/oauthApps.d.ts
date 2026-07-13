export declare const OAuthAppsAPI: {
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
	getList: (params: Record<string, unknown>) => Promise<{
		items: any;
		next: any;
	}>;
	get: ({ itemId: id }: { itemId: string }) => Promise<any>;
	add: ({
		itemInstance,
	}: {
		itemInstance: Record<string, unknown>;
	}) => Promise<any>;
	update: ({
		itemInstance,
		itemId: id,
	}: {
		itemInstance: Record<string, unknown>;
		itemId: string;
	}) => Promise<any>;
	patch: ({
		changes,
		id,
	}: {
		changes: Record<string, unknown>;
		id: string;
	}) => Promise<any>;
	delete: ({ id }: { id: string }) => Promise<any>;
	deleteMany: ({
		id,
		permanent,
	}: {
		id: string[];
		permanent?: boolean;
	}) => Promise<any>;
	getLookup: (params: Record<string, unknown>) => Promise<{
		items: any;
		next: any;
	}>;
};
