export declare const SysTypesAPI: {
    getList: ({ path, display, primary, ...params }: {
        [x: string]: any;
        path: any;
        display: any;
        primary: any;
    }) => Promise<{
        items: any;
        next: any;
    }>;
    getLookup: (params: any) => Promise<{
        items: any;
        next: any;
    }>;
};
