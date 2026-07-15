import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { WebitelImApiGatewayV1Authorization, WebitelImApiGatewayV1LogoutResponse, WebitelImApiGatewayV1PUSHSubscriptionBody, WebitelImApiGatewayV1RegisterDeviceResponse, WebitelImApiGatewayV1TokenRequest, WebitelImApiGatewayV1UnregisterDeviceResponse } from '../_models';
export declare const // --- title start
getWebitelImApiGatewayV1Account: (axiosInstance?: AxiosInstance) => {
    accountRegisterDevice: (webitelImApiGatewayV1PUSHSubscriptionBody: WebitelImApiGatewayV1PUSHSubscriptionBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImApiGatewayV1RegisterDeviceResponse>>;
    accountUnregisterDevice: (webitelImApiGatewayV1PUSHSubscriptionBody: WebitelImApiGatewayV1PUSHSubscriptionBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImApiGatewayV1UnregisterDeviceResponse>>;
    accountLogout: (options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImApiGatewayV1LogoutResponse>>;
    accountInspect: (options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImApiGatewayV1Authorization>>;
    accountToken: (webitelImApiGatewayV1TokenRequest: WebitelImApiGatewayV1TokenRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelImApiGatewayV1Authorization>>;
};
export type AccountRegisterDeviceResult = AxiosResponse<WebitelImApiGatewayV1RegisterDeviceResponse>;
export type AccountUnregisterDeviceResult = AxiosResponse<WebitelImApiGatewayV1UnregisterDeviceResponse>;
export type AccountLogoutResult = AxiosResponse<WebitelImApiGatewayV1LogoutResponse>;
export type AccountInspectResult = AxiosResponse<WebitelImApiGatewayV1Authorization>;
export type AccountTokenResult = AxiosResponse<WebitelImApiGatewayV1Authorization>;
