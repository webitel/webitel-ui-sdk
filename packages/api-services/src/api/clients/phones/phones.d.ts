export declare const PhonesAPI: {
	getList: ({
		contactId,
		options,
		...params
	}: {
		[x: string]: any;
		contactId: any;
		options: any;
	}) => Promise<{
		items: any;
		next: any;
	}>;
	getLookup: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
	merge: ({
		contactId,
		phones,
		params,
		options,
	}: {
		contactId: any;
		phones: any;
		params: any;
		options: any;
	}) => Promise<any>;
	reset: ({
		contactId,
		phones,
		params,
		options,
	}: {
		contactId: any;
		phones: any;
		params: any;
		options: any;
	}) => Promise<any>;
	deleteMany: ({
		contactId,
		params,
		options,
	}: {
		contactId: any;
		params: any;
		options: any;
	}) => Promise<any>;
	get: ({
		contactId,
		etag,
		params,
		options,
	}: {
		contactId: any;
		etag: any;
		params: any;
		options: any;
	}) => Promise<any>;
	update: ({
		contactId,
		etag,
		data,
		params,
		options,
	}: {
		contactId: any;
		etag: any;
		data: any;
		params: any;
		options: any;
	}) => Promise<any>;
	patch: ({
		contactId,
		etag,
		changes,
		params,
		options,
	}: {
		contactId: any;
		etag: any;
		changes: any;
		params: any;
		options: any;
	}) => Promise<any>;
	delete: ({
		contactId,
		etag,
		params,
		options,
	}: {
		contactId: any;
		etag: any;
		params: any;
		options: any;
	}) => Promise<any>;
};
