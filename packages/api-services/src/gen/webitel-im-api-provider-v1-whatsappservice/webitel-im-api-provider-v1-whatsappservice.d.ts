import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	WebitelImApiProviderV1ProviderDeleteWhatsAppGateResponse,
	WebitelImApiProviderV1ProviderGetWhatsAppGateResponse,
	WebitelImApiProviderV1ProviderUpdateWhatsAppGateResponse,
	WebitelImApiProviderV1WhatsAppServiceUpdateWhatsAppGateBody,
} from '../_models';
export declare const // --- title start
	getWebitelImApiProviderV1Whatsappservice: (axiosInstance?: AxiosInstance) => {
		whatsAppServiceDeleteWhatsAppGateWebitelImApiProviderV1WhatsAppService: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiProviderV1ProviderDeleteWhatsAppGateResponse>
		>;
		whatsAppServiceGetWhatsAppGateWebitelImApiProviderV1WhatsAppService: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiProviderV1ProviderGetWhatsAppGateResponse>
		>;
		whatsAppServiceUpdateWhatsAppGateWebitelImApiProviderV1WhatsAppService: (
			id: string,
			webitelImApiProviderV1WhatsAppServiceUpdateWhatsAppGateBody: WebitelImApiProviderV1WhatsAppServiceUpdateWhatsAppGateBody,
			options?: AxiosRequestConfig,
		) => Promise<
			AxiosResponse<WebitelImApiProviderV1ProviderUpdateWhatsAppGateResponse>
		>;
	};
export type WhatsAppServiceDeleteWhatsAppGateWebitelImApiProviderV1WhatsAppServiceResult =
	AxiosResponse<WebitelImApiProviderV1ProviderDeleteWhatsAppGateResponse>;
export type WhatsAppServiceGetWhatsAppGateWebitelImApiProviderV1WhatsAppServiceResult =
	AxiosResponse<WebitelImApiProviderV1ProviderGetWhatsAppGateResponse>;
export type WhatsAppServiceUpdateWhatsAppGateWebitelImApiProviderV1WhatsAppServiceResult =
	AxiosResponse<WebitelImApiProviderV1ProviderUpdateWhatsAppGateResponse>;
