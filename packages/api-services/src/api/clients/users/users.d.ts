export declare const UsersAPI: {
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
    patch: ({ changes, id }: {
        changes: any;
        id: any;
    }) => Promise<any>;
    update: ({ itemInstance, itemId: id }: {
        itemInstance: any;
        itemId: any;
    }) => Promise<any>;
    delete: ({ id }: {
        id: any;
    }) => Promise<any>;
    getLookup: (params: any) => Promise<{
        items: any;
        next: any;
    }>;
    patchUserPresence: ({ changes, id }: {
        changes: any;
        id: any;
    }) => Promise<any>;
    logoutUser: ({ id }: {
        id: any;
    }) => Promise<any>;
    logoutMultipleUsers: (selection: any) => Promise<any>;
};
