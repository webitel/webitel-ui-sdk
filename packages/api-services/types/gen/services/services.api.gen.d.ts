import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesInputCreateService, CasesInputService, CasesLocateServiceResponse, CasesService, CasesServiceList, CreateServiceParams, ListServicesParams, LocateServiceParams, UpdateService2Params, UpdateServiceParams } from '.././_models';
export declare const // --- title start
getServices: () => {
    listServices: <TData = AxiosResponse<CasesServiceList, any>>(params?: ListServicesParams, options?: AxiosRequestConfig) => Promise<TData>;
    createService: <TData = AxiosResponse<CasesService, any>>(casesInputCreateService: CasesInputCreateService, params?: CreateServiceParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteService: <TData = AxiosResponse<CasesServiceList, any>>(id: string[], options?: AxiosRequestConfig) => Promise<TData>;
    locateService: <TData = AxiosResponse<CasesLocateServiceResponse, any>>(id: string, params?: LocateServiceParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateService2: <TData = AxiosResponse<CasesService, any>>(id: string, casesInputService: CasesInputService, params?: UpdateService2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateService: <TData = AxiosResponse<CasesService, any>>(id: string, casesInputService: CasesInputService, params?: UpdateServiceParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListServicesResult = AxiosResponse<CasesServiceList>;
export type CreateServiceResult = AxiosResponse<CasesService>;
export type DeleteServiceResult = AxiosResponse<CasesServiceList>;
export type LocateServiceResult = AxiosResponse<CasesLocateServiceResponse>;
export type UpdateService2Result = AxiosResponse<CasesService>;
export type UpdateServiceResult = AxiosResponse<CasesService>;
