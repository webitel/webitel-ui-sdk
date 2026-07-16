export declare const ServiceCatalogsAPI: {
	getList: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
	get: ({ itemId: id }: { itemId: any }) => Promise<any>;
	add: ({ itemInstance }: { itemInstance: any }) => Promise<any>;
	update: ({
		itemInstance,
		itemId: id,
	}: {
		itemInstance: any;
		itemId: any;
	}) => Promise<any>;
	patch: ({
		itemInstance,
		itemId: id,
	}: {
		itemInstance: any;
		itemId: any;
	}) => Promise<any>;
	delete: ({ id }: { id: any }) => Promise<any>;
};
