export declare const CaseCloseReasonsAPI: {
	getList: ({
		parentId,
		...rest
	}: {
		[x: string]: any;
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
	add: ({
		itemInstance,
		parentId,
	}: {
		itemInstance: any;
		parentId: any;
	}) => Promise<any>;
	update: ({
		itemInstance,
		itemId: id,
	}: {
		itemInstance: any;
		itemId: any;
	}) => Promise<any>;
	delete: ({ id, parentId }: { id: any; parentId: any }) => Promise<any>;
};
