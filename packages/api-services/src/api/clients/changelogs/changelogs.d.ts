export declare const ChangelogsAPI: {
    getList: (params: any) => Promise<{
        items: any;
        next: any;
    }>;
    get: ({ itemId: id }: {
        itemId: any;
    }) => Promise<any>;
    add: ({ itemInstance }: {
        itemInstance: any;
    }) => Promise<any>;
    update: ({ itemInstance, itemId: id }: {
        itemInstance: any;
        itemId: any;
    }) => Promise<any>;
    patch: ({ id, changes }: {
        id: any;
        changes: any;
    }) => Promise<any>;
    delete: ({ id }: {
        id: any;
    }) => Promise<any>;
    getLookup: (params: any) => Promise<{
        items: any;
        next: any;
    }>;
    getObjectsList: (params: any) => Promise<{
        items: any;
        next: any;
    }>;
};
