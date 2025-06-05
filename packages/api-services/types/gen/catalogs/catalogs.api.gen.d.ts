import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateCatalogParams, ListCatalogsParams, LocateCatalogParams, UpdateCatalog2Params, UpdateCatalogParams, WebitelCasesCatalog, WebitelCasesCatalogList, WebitelCasesInputCatalog, WebitelCasesLocateCatalogResponse } from '.././_models';
export declare const // --- title start
getCatalogs: () => {
    listCatalogs: <TData = AxiosResponse<WebitelCasesCatalogList, any>>(params?: ListCatalogsParams, options?: AxiosRequestConfig) => Promise<TData>;
    createCatalog: <TData = AxiosResponse<WebitelCasesCatalog, any>>(webitelCasesInputCatalog: WebitelCasesInputCatalog, params?: CreateCatalogParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteCatalog: <TData = AxiosResponse<WebitelCasesCatalogList, any>>(id: string[], options?: AxiosRequestConfig) => Promise<TData>;
    locateCatalog: <TData = AxiosResponse<WebitelCasesLocateCatalogResponse, any>>(id: string, params?: LocateCatalogParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateCatalog2: <TData = AxiosResponse<WebitelCasesCatalog, any>>(id: string, webitelCasesInputCatalog: WebitelCasesInputCatalog, params?: UpdateCatalog2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateCatalog: <TData = AxiosResponse<WebitelCasesCatalog, any>>(id: string, webitelCasesInputCatalog: WebitelCasesInputCatalog, params?: UpdateCatalogParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListCatalogsResult = AxiosResponse<WebitelCasesCatalogList>;
export type CreateCatalogResult = AxiosResponse<WebitelCasesCatalog>;
export type DeleteCatalogResult = AxiosResponse<WebitelCasesCatalogList>;
export type LocateCatalogResult = AxiosResponse<WebitelCasesLocateCatalogResponse>;
export type UpdateCatalog2Result = AxiosResponse<WebitelCasesCatalog>;
export type UpdateCatalogResult = AxiosResponse<WebitelCasesCatalog>;
