import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  CasesInputSource,
  CasesInputSourceBody,
  CasesLocateSourceResponse,
  CasesSource,
  CasesSourceList,
  CreateSourceParams,
  ListSourcesParams,
  LocateSourceParams,
  UpdateSource2Params,
  UpdateSourceParams,
} from '.././_models';
export declare const // --- title start
  getSources: () => {
    listSources: <TData = AxiosResponse<CasesSourceList, any>>(
      params?: ListSourcesParams,
      options?: AxiosRequestConfig,
    ) => Promise<TData>;
    createSource: <TData = AxiosResponse<CasesSource, any>>(
      casesInputSourceBody: CasesInputSourceBody,
      params?: CreateSourceParams,
      options?: AxiosRequestConfig,
    ) => Promise<TData>;
    deleteSource: <TData = AxiosResponse<CasesSource, any>>(
      id: string,
      options?: AxiosRequestConfig,
    ) => Promise<TData>;
    locateSource: <TData = AxiosResponse<CasesLocateSourceResponse, any>>(
      id: string,
      params?: LocateSourceParams,
      options?: AxiosRequestConfig,
    ) => Promise<TData>;
    updateSource2: <TData = AxiosResponse<CasesSource, any>>(
      id: string,
      casesInputSource: CasesInputSource,
      params?: UpdateSource2Params,
      options?: AxiosRequestConfig,
    ) => Promise<TData>;
    updateSource: <TData = AxiosResponse<CasesSource, any>>(
      id: string,
      casesInputSource: CasesInputSource,
      params?: UpdateSourceParams,
      options?: AxiosRequestConfig,
    ) => Promise<TData>;
  };
export type ListSourcesResult = AxiosResponse<CasesSourceList>;
export type CreateSourceResult = AxiosResponse<CasesSource>;
export type DeleteSourceResult = AxiosResponse<CasesSource>;
export type LocateSourceResult = AxiosResponse<CasesLocateSourceResponse>;
export type UpdateSource2Result = AxiosResponse<CasesSource>;
export type UpdateSourceResult = AxiosResponse<CasesSource>;
