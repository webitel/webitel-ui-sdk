export declare const downloadMedia: (id: any) => Promise<import("axios").AxiosResponse<any, any, {}>>;
export declare const downloadFile: (id: any) => void;
export declare const getCallMediaUrl: (id: any, { download }?: {
    download?: boolean;
}) => string;
export declare const getMediaUrl: (id: any, isThumb?: boolean) => string;
export declare const MediaAPI: {
    getList: (params: any) => Promise<{
        items: any;
        next: any;
    }>;
    get: ({ itemId }: {
        itemId: any;
    }) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    add: (params: any) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    delete: ({ id }: {
        id: any;
    }) => Promise<any>;
    getLookup: (params: any) => Promise<{
        items: any;
        next: any;
    }>;
};
