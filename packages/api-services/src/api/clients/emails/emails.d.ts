export declare const EmailsAPI: {
    getList: (params: any) => Promise<{
        items: any;
        next: any;
    }>;
    get: ({ itemId, parentId }: {
        itemId: any;
        parentId: any;
    }) => Promise<any>;
    add: ({ contactId, emails, params, options }: {
        contactId: any;
        emails: any;
        params: any;
        options: any;
    }) => Promise<any>;
    update: ({ itemInstance, etag: id, parentId }: {
        itemInstance: any;
        etag: any;
        parentId: any;
    }) => Promise<any>;
    patch: ({ parentId, changes, etag }: {
        parentId: any;
        changes: any;
        etag: any;
    }) => Promise<any>;
    delete: ({ etag, parentId }: {
        etag: any;
        parentId: any;
    }) => Promise<any>;
};
