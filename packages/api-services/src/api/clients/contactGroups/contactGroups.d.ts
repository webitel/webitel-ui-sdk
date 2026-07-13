export declare const ContactGroupsAPI: {
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
    addContactsToGroups: ({ contactIds, groupIds }: {
        contactIds: any;
        groupIds: any;
    }) => Promise<any>;
    removeContactsFromGroup: ({ id, contactIds }: {
        id: any;
        contactIds: any;
    }) => Promise<any>;
};
