import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateServiceParams, ListServicesParams, LocateServiceParams, UpdateService2Params, UpdateServiceParams, WebitelCasesInputCreateService, WebitelCasesInputService, WebitelCasesLocateServiceResponse, WebitelCasesService, WebitelCasesServiceList } from '../_models';
export declare const // --- title start
getServices: (axiosInstance?: AxiosInstance) => {
    listServices: (params?: ListServicesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesServiceList>>;
    createService: (webitelCasesInputCreateService: WebitelCasesInputCreateService, params?: CreateServiceParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesService>>;
    deleteService: (id: string[], options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesServiceList>>;
    locateService: (id: string, params?: LocateServiceParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesLocateServiceResponse>>;
    updateService2: (id: string, webitelCasesInputService: WebitelCasesInputService, params?: UpdateService2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesService>>;
    updateService: (id: string, webitelCasesInputService: WebitelCasesInputService, params?: UpdateServiceParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesService>>;
};
export type ListServicesResult = AxiosResponse<WebitelCasesServiceList>;
export type CreateServiceResult = AxiosResponse<WebitelCasesService>;
export type DeleteServiceResult = AxiosResponse<WebitelCasesServiceList>;
export type LocateServiceResult = AxiosResponse<WebitelCasesLocateServiceResponse>;
export type UpdateService2Result = AxiosResponse<WebitelCasesService>;
export type UpdateServiceResult = AxiosResponse<WebitelCasesService>;
