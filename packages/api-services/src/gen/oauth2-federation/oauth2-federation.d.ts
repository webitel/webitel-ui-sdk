import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiDeleteOAuthServiceRequest, ApiDeleteOAuthServiceResponse, ApiOAuthService, ApiSearchOAuthServiceResponse, LocateOAuthServiceParams, OAuth2FederationDeleteOAuthServiceBody, SearchOAuthServiceParams, UpdateOAuthService2Params, UpdateOAuthServiceParams } from '../_models';
export declare const // --- title start
getOauth2Federation: (axiosInstance?: AxiosInstance) => {
    deleteOAuthService: (apiDeleteOAuthServiceRequest: ApiDeleteOAuthServiceRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiDeleteOAuthServiceResponse>>;
    searchOAuthService: (params?: SearchOAuthServiceParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiSearchOAuthServiceResponse>>;
    createOAuthService: (apiOAuthService: ApiOAuthService, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiOAuthService>>;
    deleteOAuthService2: (id: string[], oAuth2FederationDeleteOAuthServiceBody: OAuth2FederationDeleteOAuthServiceBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiDeleteOAuthServiceResponse>>;
    locateOAuthService: (id: string[], params?: LocateOAuthServiceParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiOAuthService>>;
    updateOAuthService2: (id: string, apiOAuthService: ApiOAuthService, params?: UpdateOAuthService2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiOAuthService>>;
    updateOAuthService: (id: string, apiOAuthService: ApiOAuthService, params?: UpdateOAuthServiceParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiOAuthService>>;
};
export type DeleteOAuthServiceResult = AxiosResponse<ApiDeleteOAuthServiceResponse>;
export type SearchOAuthServiceResult = AxiosResponse<ApiSearchOAuthServiceResponse>;
export type CreateOAuthServiceResult = AxiosResponse<ApiOAuthService>;
export type DeleteOAuthService2Result = AxiosResponse<ApiDeleteOAuthServiceResponse>;
export type LocateOAuthServiceResult = AxiosResponse<ApiOAuthService>;
export type UpdateOAuthService2Result = AxiosResponse<ApiOAuthService>;
export type UpdateOAuthServiceResult = AxiosResponse<ApiOAuthService>;
