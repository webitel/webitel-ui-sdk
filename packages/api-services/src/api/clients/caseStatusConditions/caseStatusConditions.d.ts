export declare const CaseStatusConditionsAPI: {
	getList: ({
		statusId,
		parentId,
		...rest
	}: {
		[x: string]: any;
		statusId: any;
		parentId: any;
	}) => Promise<{
		items: any;
		next: any;
	}>;
	getLookup: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
	get: ({
		parentId,
		itemId: id,
	}: {
		parentId: any;
		itemId: any;
	}) => Promise<any>;
	update: ({
		itemInstance,
		itemId: id,
		parentId,
	}: {
		itemInstance: any;
		itemId: any;
		parentId: any;
	}) => Promise<any>;
	patch: ({
		id,
		parentId,
		changes,
	}: {
		id: any;
		parentId: any;
		changes: any;
	}) => Promise<any>;
	delete: ({ id, parentId }: { id: any; parentId: any }) => Promise<any>;
	add: ({
		itemInstance,
		parentId,
	}: {
		itemInstance: any;
		parentId: any;
	}) => Promise<any>;
};
