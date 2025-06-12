import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateSourceParams, ListSourcesParams, LocateSourceParams, UpdateSource2Params, UpdateSourceParams, WebitelCasesInputSource, WebitelCasesLocateSourceResponse, WebitelCasesSource, WebitelCasesSourceList } from '.././_models';
export declare const // --- title start
getSources: () => {
    listSources: <TData = AxiosResponse<WebitelCasesSourceList, any>>(params?: ListSourcesParams, options?: AxiosRequestConfig) => Promise<TData>;
    createSource: <TData = AxiosResponse<WebitelCasesSource, any>>(webitelCasesInputSource: WebitelCasesInputSource, params?: CreateSourceParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteSource: <TData = AxiosResponse<WebitelCasesSource, any>>(id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateSource: <TData = AxiosResponse<WebitelCasesLocateSourceResponse, any>>(id: string, params?: LocateSourceParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateSource2: <TData = AxiosResponse<WebitelCasesSource, any>>(id: string, webitelCasesInputSource: WebitelCasesInputSource, params?: UpdateSource2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateSource: <TData = AxiosResponse<WebitelCasesSource, any>>(id: string, webitelCasesInputSource: WebitelCasesInputSource, params?: UpdateSourceParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListSourcesResult = AxiosResponse<WebitelCasesSourceList>;
export type CreateSourceResult = AxiosResponse<WebitelCasesSource>;
export type DeleteSourceResult = AxiosResponse<WebitelCasesSource>;
export type LocateSourceResult = AxiosResponse<WebitelCasesLocateSourceResponse>;
export type UpdateSource2Result = AxiosResponse<WebitelCasesSource>;
export type UpdateSourceResult = AxiosResponse<WebitelCasesSource>;
