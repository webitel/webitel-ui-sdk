import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	WebitelImApiProviderV1MetaAppServiceUpdateMetaAppBody,
	WebitelImApiProviderV1ProviderDeleteMetaAppResponse,
	WebitelImApiProviderV1ProviderGetMetaAppResponse,
	WebitelImApiProviderV1ProviderUpdateMetaAppResponse,
} from '../_models';
export declare const // --- title start
	getWebitelImApiProviderV1Metaappservice: (axiosInstance?: AxiosInstance) => {
		metaAppServiceDeleteMetaAppWebitelImApiProviderV1MetaAppService: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiProviderV1ProviderDeleteMetaAppResponse>
		>;
		metaAppServiceGetMetaAppWebitelImApiProviderV1MetaAppService: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiProviderV1ProviderGetMetaAppResponse>
		>;
		metaAppServiceUpdateMetaAppWebitelImApiProviderV1MetaAppService: (
			id: string,
			webitelImApiProviderV1MetaAppServiceUpdateMetaAppBody: WebitelImApiProviderV1MetaAppServiceUpdateMetaAppBody,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiProviderV1ProviderUpdateMetaAppResponse>
		>;
	};
export type MetaAppServiceDeleteMetaAppWebitelImApiProviderV1MetaAppServiceResult =
	AxiosResponse<WebitelImApiProviderV1ProviderDeleteMetaAppResponse>;
export type MetaAppServiceGetMetaAppWebitelImApiProviderV1MetaAppServiceResult =
	AxiosResponse<WebitelImApiProviderV1ProviderGetMetaAppResponse>;
export type MetaAppServiceUpdateMetaAppWebitelImApiProviderV1MetaAppServiceResult =
	AxiosResponse<WebitelImApiProviderV1ProviderUpdateMetaAppResponse>;
