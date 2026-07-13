export declare const AgentsAPI: {
	getList: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
	get: ({ itemId: id }: { itemId: any }) => Promise<any>;
	add: ({ itemInstance }: { itemInstance: any }) => Promise<any>;
	patch: ({ changes, id }: { changes: any; id: any }) => Promise<any>;
	update: ({
		itemInstance,
		itemId: id,
	}: {
		itemInstance: any;
		itemId: any;
	}) => Promise<any>;
	delete: ({ id }: { id: any }) => Promise<any>;
	getLookup: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
	getAgentHistory: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
	getRegularAgentsOptions: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
	getAgentUsersOptions: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
	getSupervisorOptions: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
	getUsersStatus: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
};
