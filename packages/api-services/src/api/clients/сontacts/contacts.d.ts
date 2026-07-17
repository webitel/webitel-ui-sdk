export declare const ContactsAPI: {
    getPermissionsList: ({ parentId, ...params }: {
        [x: string]: any;
        parentId: any;
    }) => Promise<{
        items: any;
        next: any;
    }>;
    patchPermissions: ({ changes, id }: {
        changes: any;
        id: any;
    }) => Promise<any>;
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
    update: ({ itemInstance }: {
        itemInstance: any;
    }) => Promise<any>;
    delete: ({ id }: {
        id: any;
    }) => Promise<any>;
    getLookup: (params: any) => Promise<{
        items: any;
        next: any;
    }>;
};
