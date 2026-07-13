import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	WebitelImProviderV1MetaOAuthServiceMetaOAuthCallbackBody,
	WebitelImProviderV1MetaOAuthServiceStartMetaOAuthBody,
	WebitelImProviderV1ProviderMetaOAuthCallbackResponse,
	WebitelImProviderV1ProviderMetaOAuthStartResponse,
} from '../_models';
export declare const // --- title start
	getWebitelImProviderV1Metaoauthservice: (axiosInstance?: AxiosInstance) => {
		metaOAuthServiceMetaOAuthCallback: (
			metaAppId1: string,
			webitelImProviderV1MetaOAuthServiceMetaOAuthCallbackBody: WebitelImProviderV1MetaOAuthServiceMetaOAuthCallbackBody,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImProviderV1ProviderMetaOAuthCallbackResponse>
		>;
		metaOAuthServiceStartMetaOAuth: (
			metaAppId1: string,
			webitelImProviderV1MetaOAuthServiceStartMetaOAuthBody: WebitelImProviderV1MetaOAuthServiceStartMetaOAuthBody,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImProviderV1ProviderMetaOAuthStartResponse>
		>;
	};
export type MetaOAuthServiceMetaOAuthCallbackResult =
	AxiosResponse<WebitelImProviderV1ProviderMetaOAuthCallbackResponse>;
export type MetaOAuthServiceStartMetaOAuthResult =
	AxiosResponse<WebitelImProviderV1ProviderMetaOAuthStartResponse>;
