export declare const CallHistoryAPI: {
	getList: ({
		options,
		...params
	}: {
		[x: string]: any;
		options: any;
	}) => Promise<{
		items: any;
		next: any;
	}>;
	getListPost: ({ data, options }: { data: any; options: any }) => Promise<{
		items: any;
		next: any;
	}>;
	getLookup: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
};
