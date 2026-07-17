/**
 * Chat Gateways API for managing chat gateway configurations
 */
export declare const ChatGatewaysAPI: {
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
};
