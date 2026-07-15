export declare const WtTypeExtensionAPI: {
    getList: ({ itemId: typeRepo }: {
        itemId: any;
    }) => Promise<any>;
    add: ({ itemInstance, itemId: typeRepo }: {
        itemInstance: any;
        itemId: any;
    }) => Promise<any>;
    update: ({ itemInstance, itemId: typeRepo }: {
        itemInstance: any;
        itemId: any;
    }) => Promise<any>;
    delete: ({ itemId: typeRepo }: {
        itemId: any;
    }) => Promise<void>;
};
