import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	WebitelImProviderV1CreateGateRequest,
	WebitelImProviderV1GateResponse,
	WebitelImProviderV1ProviderDeleteWhatsAppGateResponse,
	WebitelImProviderV1ProviderGetWhatsAppGateResponse,
	WebitelImProviderV1ProviderUpdateWhatsAppGateResponse,
	WebitelImProviderV1WhatsAppServiceUpdateWhatsAppGateBody,
} from '../_models';
export declare const // --- title start
	getWebitelImProviderV1Whatsappservice: (axiosInstance?: AxiosInstance) => {
		whatsAppServiceCreateWhatsAppGate: (
			webitelImProviderV1CreateGateRequest: WebitelImProviderV1CreateGateRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImProviderV1GateResponse>>;
		whatsAppServiceDeleteWhatsAppGate: (
			id1: string,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImProviderV1ProviderDeleteWhatsAppGateResponse>
		>;
		whatsAppServiceGetWhatsAppGate: (
			id1: string,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImProviderV1ProviderGetWhatsAppGateResponse>
		>;
		whatsAppServiceUpdateWhatsAppGate: (
			id1: string,
			webitelImProviderV1WhatsAppServiceUpdateWhatsAppGateBody: WebitelImProviderV1WhatsAppServiceUpdateWhatsAppGateBody,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImProviderV1ProviderUpdateWhatsAppGateResponse>
		>;
	};
export type WhatsAppServiceCreateWhatsAppGateResult =
	AxiosResponse<WebitelImProviderV1GateResponse>;
export type WhatsAppServiceDeleteWhatsAppGateResult =
	AxiosResponse<WebitelImProviderV1ProviderDeleteWhatsAppGateResponse>;
export type WhatsAppServiceGetWhatsAppGateResult =
	AxiosResponse<WebitelImProviderV1ProviderGetWhatsAppGateResponse>;
export type WhatsAppServiceUpdateWhatsAppGateResult =
	AxiosResponse<WebitelImProviderV1ProviderUpdateWhatsAppGateResponse>;
