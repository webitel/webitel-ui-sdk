import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateServiceParams, ListServicesParams, LocateServiceParams, UpdateService2Params, UpdateServiceParams, WebitelCasesInputCreateService, WebitelCasesInputService, WebitelCasesLocateServiceResponse, WebitelCasesService, WebitelCasesServiceList } from '.././_models';
export declare const // --- title start
getServices: () => {
    listServices: <TData = AxiosResponse<WebitelCasesServiceList, any>>(params?: ListServicesParams, options?: AxiosRequestConfig) => Promise<TData>;
    createService: <TData = AxiosResponse<WebitelCasesService, any>>(webitelCasesInputCreateService: WebitelCasesInputCreateService, params?: CreateServiceParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteService: <TData = AxiosResponse<WebitelCasesServiceList, any>>(id: string[], options?: AxiosRequestConfig) => Promise<TData>;
    locateService: <TData = AxiosResponse<WebitelCasesLocateServiceResponse, any>>(id: string, params?: LocateServiceParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateService2: <TData = AxiosResponse<WebitelCasesService, any>>(id: string, webitelCasesInputService: WebitelCasesInputService, params?: UpdateService2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateService: <TData = AxiosResponse<WebitelCasesService, any>>(id: string, webitelCasesInputService: WebitelCasesInputService, params?: UpdateServiceParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListServicesResult = AxiosResponse<WebitelCasesServiceList>;
export type CreateServiceResult = AxiosResponse<WebitelCasesService>;
export type DeleteServiceResult = AxiosResponse<WebitelCasesServiceList>;
export type LocateServiceResult = AxiosResponse<WebitelCasesLocateServiceResponse>;
export type UpdateService2Result = AxiosResponse<WebitelCasesService>;
export type UpdateServiceResult = AxiosResponse<WebitelCasesService>;
