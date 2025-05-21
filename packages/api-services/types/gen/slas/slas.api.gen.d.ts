import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesInputSLA, CasesInputSLABody, CasesLocateSLAResponse, CasesSLA, CasesSLAList, CreateSLAParams, ListSLAsParams, LocateSLAParams, UpdateSLA2Params, UpdateSLAParams } from '.././_models';
export declare const // --- title start
getSlas: () => {
    listSLAs: <TData = AxiosResponse<CasesSLAList, any>>(params?: ListSLAsParams, options?: AxiosRequestConfig) => Promise<TData>;
    createSLA: <TData = AxiosResponse<CasesSLA, any>>(casesInputSLABody: CasesInputSLABody, params?: CreateSLAParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteSLA: <TData = AxiosResponse<CasesSLA, any>>(id: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateSLA: <TData = AxiosResponse<CasesLocateSLAResponse, any>>(id: string, params?: LocateSLAParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateSLA2: <TData = AxiosResponse<CasesSLA, any>>(id: string, casesInputSLA: CasesInputSLA, params?: UpdateSLA2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateSLA: <TData = AxiosResponse<CasesSLA, any>>(id: string, casesInputSLA: CasesInputSLA, params?: UpdateSLAParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListSLAsResult = AxiosResponse<CasesSLAList>;
export type CreateSLAResult = AxiosResponse<CasesSLA>;
export type DeleteSLAResult = AxiosResponse<CasesSLA>;
export type LocateSLAResult = AxiosResponse<CasesLocateSLAResponse>;
export type UpdateSLA2Result = AxiosResponse<CasesSLA>;
export type UpdateSLAResult = AxiosResponse<CasesSLA>;
