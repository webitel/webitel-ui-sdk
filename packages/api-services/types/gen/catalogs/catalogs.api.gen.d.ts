import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesCatalog, CasesCatalogList, CasesInputCatalog, CasesLocateCatalogResponse, CreateCatalogParams, ListCatalogsParams, LocateCatalogParams, UpdateCatalog2Params, UpdateCatalogParams } from '.././_models';
export declare const // --- title start
getCatalogs: () => {
    listCatalogs: <TData = AxiosResponse<CasesCatalogList, any>>(params?: ListCatalogsParams, options?: AxiosRequestConfig) => Promise<TData>;
    createCatalog: <TData = AxiosResponse<CasesCatalog, any>>(casesInputCatalog: CasesInputCatalog, params?: CreateCatalogParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteCatalog: <TData = AxiosResponse<CasesCatalogList, any>>(id: string[], options?: AxiosRequestConfig) => Promise<TData>;
    locateCatalog: <TData = AxiosResponse<CasesLocateCatalogResponse, any>>(id: string, params?: LocateCatalogParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateCatalog2: <TData = AxiosResponse<CasesCatalog, any>>(id: string, casesInputCatalog: CasesInputCatalog, params?: UpdateCatalog2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateCatalog: <TData = AxiosResponse<CasesCatalog, any>>(id: string, casesInputCatalog: CasesInputCatalog, params?: UpdateCatalogParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListCatalogsResult = AxiosResponse<CasesCatalogList>;
export type CreateCatalogResult = AxiosResponse<CasesCatalog>;
export type DeleteCatalogResult = AxiosResponse<CasesCatalogList>;
export type LocateCatalogResult = AxiosResponse<CasesLocateCatalogResponse>;
export type UpdateCatalog2Result = AxiosResponse<CasesCatalog>;
export type UpdateCatalogResult = AxiosResponse<CasesCatalog>;
