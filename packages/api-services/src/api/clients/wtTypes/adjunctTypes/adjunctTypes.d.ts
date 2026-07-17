export declare const AdjunctTypesAPI: {
	getList: (
		{
			repo,
			...params
		}: {
			[x: string]: any;
			repo: any;
		},
		{
			silent,
		}?: {
			silent?: boolean;
		},
	) => Promise<{
		items: any;
		next: any;
	}>;
};
/**
 * @alias AdjunctTypesAPI
 */
export declare const CustomLookupAPI: {
	getList: (
		{
			repo,
			...params
		}: {
			[x: string]: any;
			repo: any;
		},
		{
			silent,
		}?: {
			silent?: boolean;
		},
	) => Promise<{
		items: any;
		next: any;
	}>;
};
