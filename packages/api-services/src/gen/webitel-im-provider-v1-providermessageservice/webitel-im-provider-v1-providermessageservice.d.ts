import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { WebitelImProviderV1ProviderSendDocumentRequest, WebitelImProviderV1ProviderSendImageRequest, WebitelImProviderV1ProviderSendInteractiveRequest, WebitelImProviderV1ProviderSendMessageResponse, WebitelImProviderV1ProviderSendSystemMessageRequest, WebitelImProviderV1ProviderSendTextRequest } from '../_models';
export declare const // --- title start
getWebitelImProviderV1Providermessageservice: (axiosInstance?: AxiosInstance) => {
    providerMessageServiceSendDocument: (webitelImProviderV1ProviderSendDocumentRequest: WebitelImProviderV1ProviderSendDocumentRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImProviderV1ProviderSendMessageResponse>>;
    providerMessageServiceSendImage: (webitelImProviderV1ProviderSendImageRequest: WebitelImProviderV1ProviderSendImageRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImProviderV1ProviderSendMessageResponse>>;
    providerMessageServiceSendInteractive: (webitelImProviderV1ProviderSendInteractiveRequest: WebitelImProviderV1ProviderSendInteractiveRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImProviderV1ProviderSendMessageResponse>>;
    providerMessageServiceSendSystemMessage: (webitelImProviderV1ProviderSendSystemMessageRequest: WebitelImProviderV1ProviderSendSystemMessageRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImProviderV1ProviderSendMessageResponse>>;
    providerMessageServiceSendText: (webitelImProviderV1ProviderSendTextRequest: WebitelImProviderV1ProviderSendTextRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImProviderV1ProviderSendMessageResponse>>;
};
export type ProviderMessageServiceSendDocumentResult = AxiosResponse<WebitelImProviderV1ProviderSendMessageResponse>;
export type ProviderMessageServiceSendImageResult = AxiosResponse<WebitelImProviderV1ProviderSendMessageResponse>;
export type ProviderMessageServiceSendInteractiveResult = AxiosResponse<WebitelImProviderV1ProviderSendMessageResponse>;
export type ProviderMessageServiceSendSystemMessageResult = AxiosResponse<WebitelImProviderV1ProviderSendMessageResponse>;
export type ProviderMessageServiceSendTextResult = AxiosResponse<WebitelImProviderV1ProviderSendMessageResponse>;
