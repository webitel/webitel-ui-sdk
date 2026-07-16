import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	WebitelImProviderV1FacebookServiceSetGetStartedBody,
	WebitelImProviderV1FacebookServiceSetPersistentMenuBody,
	WebitelImProviderV1FacebookServiceUpdateFacebookGateBody,
	WebitelImProviderV1ProviderCreateFacebookGateRequest,
	WebitelImProviderV1ProviderCreateFacebookGateResponse,
	WebitelImProviderV1ProviderDeleteFacebookGateResponse,
	WebitelImProviderV1ProviderDeleteGetStartedResponse,
	WebitelImProviderV1ProviderDeletePersistentMenuResponse,
	WebitelImProviderV1ProviderGetFacebookGateResponse,
	WebitelImProviderV1ProviderSetGetStartedResponse,
	WebitelImProviderV1ProviderSetPersistentMenuResponse,
	WebitelImProviderV1ProviderUpdateFacebookGateResponse,
} from '../_models';
export declare const // --- title start
	getWebitelImProviderV1Facebookservice: (axiosInstance?: AxiosInstance) => {
		facebookServiceCreateFacebookGate: (
			webitelImProviderV1ProviderCreateFacebookGateRequest: WebitelImProviderV1ProviderCreateFacebookGateRequest,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImProviderV1ProviderCreateFacebookGateResponse>
		>;
		facebookServiceDeleteGetStarted: (
			gateId1: string,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImProviderV1ProviderDeleteGetStartedResponse>
		>;
		facebookServiceSetGetStarted: (
			gateId1: string,
			webitelImProviderV1FacebookServiceSetGetStartedBody: WebitelImProviderV1FacebookServiceSetGetStartedBody,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImProviderV1ProviderSetGetStartedResponse>
		>;
		facebookServiceDeletePersistentMenu: (
			gateId1: string,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImProviderV1ProviderDeletePersistentMenuResponse>
		>;
		facebookServiceSetPersistentMenu: (
			gateId1: string,
			webitelImProviderV1FacebookServiceSetPersistentMenuBody: WebitelImProviderV1FacebookServiceSetPersistentMenuBody,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImProviderV1ProviderSetPersistentMenuResponse>
		>;
		facebookServiceDeleteFacebookGate: (
			id1: string,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImProviderV1ProviderDeleteFacebookGateResponse>
		>;
		facebookServiceGetFacebookGate: (
			id1: string,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImProviderV1ProviderGetFacebookGateResponse>
		>;
		facebookServiceUpdateFacebookGate: (
			id1: string,
			webitelImProviderV1FacebookServiceUpdateFacebookGateBody: WebitelImProviderV1FacebookServiceUpdateFacebookGateBody,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImProviderV1ProviderUpdateFacebookGateResponse>
		>;
	};
export type FacebookServiceCreateFacebookGateResult =
	AxiosResponse<WebitelImProviderV1ProviderCreateFacebookGateResponse>;
export type FacebookServiceDeleteGetStartedResult =
	AxiosResponse<WebitelImProviderV1ProviderDeleteGetStartedResponse>;
export type FacebookServiceSetGetStartedResult =
	AxiosResponse<WebitelImProviderV1ProviderSetGetStartedResponse>;
export type FacebookServiceDeletePersistentMenuResult =
	AxiosResponse<WebitelImProviderV1ProviderDeletePersistentMenuResponse>;
export type FacebookServiceSetPersistentMenuResult =
	AxiosResponse<WebitelImProviderV1ProviderSetPersistentMenuResponse>;
export type FacebookServiceDeleteFacebookGateResult =
	AxiosResponse<WebitelImProviderV1ProviderDeleteFacebookGateResponse>;
export type FacebookServiceGetFacebookGateResult =
	AxiosResponse<WebitelImProviderV1ProviderGetFacebookGateResponse>;
export type FacebookServiceUpdateFacebookGateResult =
	AxiosResponse<WebitelImProviderV1ProviderUpdateFacebookGateResponse>;
