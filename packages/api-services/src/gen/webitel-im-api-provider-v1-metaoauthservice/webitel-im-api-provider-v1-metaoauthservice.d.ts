import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	WebitelImApiProviderV1MetaOAuthServiceMetaOAuthCallbackBody,
	WebitelImApiProviderV1MetaOAuthServiceStartMetaOAuthBody,
	WebitelImApiProviderV1ProviderMetaOAuthCallbackResponse,
	WebitelImApiProviderV1ProviderMetaOAuthStartResponse,
} from '../_models';
export declare const // --- title start
	getWebitelImApiProviderV1Metaoauthservice: (
		axiosInstance?: AxiosInstance,
	) => {
		metaOAuthServiceMetaOAuthCallbackWebitelImApiProviderV1MetaOAuthService: (
			metaAppId: string,
			webitelImApiProviderV1MetaOAuthServiceMetaOAuthCallbackBody: WebitelImApiProviderV1MetaOAuthServiceMetaOAuthCallbackBody,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiProviderV1ProviderMetaOAuthCallbackResponse>
		>;
		metaOAuthServiceStartMetaOAuthWebitelImApiProviderV1MetaOAuthService: (
			metaAppId: string,
			webitelImApiProviderV1MetaOAuthServiceStartMetaOAuthBody: WebitelImApiProviderV1MetaOAuthServiceStartMetaOAuthBody,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiProviderV1ProviderMetaOAuthStartResponse>
		>;
	};
export type MetaOAuthServiceMetaOAuthCallbackWebitelImApiProviderV1MetaOAuthServiceResult =
	AxiosResponse<WebitelImApiProviderV1ProviderMetaOAuthCallbackResponse>;
export type MetaOAuthServiceStartMetaOAuthWebitelImApiProviderV1MetaOAuthServiceResult =
	AxiosResponse<WebitelImApiProviderV1ProviderMetaOAuthStartResponse>;
