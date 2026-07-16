export declare const DictionariesAPI: {
	getList: ({ repo, ...params }: { [x: string]: any; repo: any }) => Promise<{
		items: any;
		next: any;
	}>;
	get: ({
		itemId: id,
		repo,
	}: {
		itemId: any;
		repo: any;
	}) => Promise<import('@webitel/api-services/gen').LocateData200>;
	add: ({
		itemInstance,
		fieldsToSend,
		repo,
	}: {
		itemInstance: any;
		fieldsToSend: any;
		repo: any;
	}) => Promise<any>;
	update: ({
		itemInstance,
		fieldsToSend,
		itemId: id,
		repo,
	}: {
		itemInstance: any;
		fieldsToSend: any;
		itemId: any;
		repo: any;
	}) => Promise<any>;
	delete: ({
		repo,
		id,
	}: {
		repo: any;
		id: any;
	}) => Promise<import('@webitel/api-services/gen').DataDataset>;
	getLookup: ({
		path,
		display,
		primary,
		...params
	}: {
		[x: string]: any;
		path: any;
		display: any;
		primary: any;
	}) => Promise<{
		items: any;
		next: any;
	}>;
	batchCreate: ({ repo, rows }: { repo: any; rows: any }) => Promise<any>;
	getTypesList: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
	getType: ({ itemId: itemRepo }: { itemId: any }) => Promise<any>;
	addType: ({ itemInstance }: { itemInstance: any }) => Promise<any>;
	updateType: ({
		itemInstance,
		itemId: id,
	}: {
		itemInstance: any;
		itemId: any;
	}) => Promise<any>;
	deleteType: ({ id }: { id: any }) => Promise<any>;
	getTypeLookup: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
};
