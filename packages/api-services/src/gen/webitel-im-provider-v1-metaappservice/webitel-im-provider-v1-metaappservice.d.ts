import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { WebitelImProviderV1MetaAppServiceUpdateMetaAppBody, WebitelImProviderV1ProviderCreateMetaAppRequest, WebitelImProviderV1ProviderCreateMetaAppResponse, WebitelImProviderV1ProviderDeleteMetaAppResponse, WebitelImProviderV1ProviderGetMetaAppResponse, WebitelImProviderV1ProviderUpdateMetaAppResponse } from '../_models';
export declare const // --- title start
getWebitelImProviderV1Metaappservice: (axiosInstance?: AxiosInstance) => {
    metaAppServiceCreateMetaApp: (webitelImProviderV1ProviderCreateMetaAppRequest: WebitelImProviderV1ProviderCreateMetaAppRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImProviderV1ProviderCreateMetaAppResponse>>;
    metaAppServiceDeleteMetaApp: (id1: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImProviderV1ProviderDeleteMetaAppResponse>>;
    metaAppServiceGetMetaApp: (id1: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImProviderV1ProviderGetMetaAppResponse>>;
    metaAppServiceUpdateMetaApp: (id1: string, webitelImProviderV1MetaAppServiceUpdateMetaAppBody: WebitelImProviderV1MetaAppServiceUpdateMetaAppBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImProviderV1ProviderUpdateMetaAppResponse>>;
};
export type MetaAppServiceCreateMetaAppResult = AxiosResponse<WebitelImProviderV1ProviderCreateMetaAppResponse>;
export type MetaAppServiceDeleteMetaAppResult = AxiosResponse<WebitelImProviderV1ProviderDeleteMetaAppResponse>;
export type MetaAppServiceGetMetaAppResult = AxiosResponse<WebitelImProviderV1ProviderGetMetaAppResponse>;
export type MetaAppServiceUpdateMetaAppResult = AxiosResponse<WebitelImProviderV1ProviderUpdateMetaAppResponse>;
