export declare const downloadMedia: (id: any) => Promise<any>;
export declare const downloadFile: (id: any) => void;
export declare const getCallMediaUrl: (
	id: any,
	{
		download,
	}?: {
		download?: boolean;
	},
) => string;
export declare const getMediaUrl: (id: any, isThumb?: boolean) => string;
export declare const MediaAPI: {
	getList: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
	get: ({ itemId }: { itemId: any }) => Promise<any>;
	add: (params: any) => Promise<any>;
	delete: ({ id }: { id: any }) => Promise<any>;
	getLookup: (params: any) => Promise<{
		items: any;
		next: any;
	}>;
};
