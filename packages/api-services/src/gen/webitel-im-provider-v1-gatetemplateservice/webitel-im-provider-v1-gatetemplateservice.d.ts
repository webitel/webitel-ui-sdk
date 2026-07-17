import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { WebitelImProviderV1GateTemplateServiceSetGateTemplateBody, WebitelImProviderV1ProviderDeleteGateTemplateResponse, WebitelImProviderV1ProviderListGateTemplatesResponse, WebitelImProviderV1ProviderSetGateTemplateResponse } from '../_models';
export declare const // --- title start
getWebitelImProviderV1Gatetemplateservice: (axiosInstance?: AxiosInstance) => {
    gateTemplateServiceListGateTemplates: (gateId: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImProviderV1ProviderListGateTemplatesResponse>>;
    gateTemplateServiceDeleteGateTemplate: (gateId: string, eventType: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImProviderV1ProviderDeleteGateTemplateResponse>>;
    gateTemplateServiceSetGateTemplate: (gateId: string, eventType: string, webitelImProviderV1GateTemplateServiceSetGateTemplateBody: WebitelImProviderV1GateTemplateServiceSetGateTemplateBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImProviderV1ProviderSetGateTemplateResponse>>;
};
export type GateTemplateServiceListGateTemplatesResult = AxiosResponse<WebitelImProviderV1ProviderListGateTemplatesResponse>;
export type GateTemplateServiceDeleteGateTemplateResult = AxiosResponse<WebitelImProviderV1ProviderDeleteGateTemplateResponse>;
export type GateTemplateServiceSetGateTemplateResult = AxiosResponse<WebitelImProviderV1ProviderSetGateTemplateResponse>;
