import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	CreateCatalogParams,
	ListCatalogsParams,
	LocateCatalogParams,
	UpdateCatalog2Params,
	UpdateCatalogParams,
	WebitelCasesCatalog,
	WebitelCasesCatalogList,
	WebitelCasesInputCatalog,
	WebitelCasesLocateCatalogResponse,
} from '../_models';
export declare const // --- title start
	getCatalogs: (axiosInstance?: AxiosInstance) => {
		listCatalogs: (
			params?: ListCatalogsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesCatalogList>>;
		createCatalog: (
			webitelCasesInputCatalog: WebitelCasesInputCatalog,
			params?: CreateCatalogParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesCatalog>>;
		deleteCatalog: (
			id: string[],
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesCatalogList>>;
		locateCatalog: (
			id: string,
			params?: LocateCatalogParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesLocateCatalogResponse>>;
		updateCatalog2: (
			id: string,
			webitelCasesInputCatalog: WebitelCasesInputCatalog,
			params?: UpdateCatalog2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesCatalog>>;
		updateCatalog: (
			id: string,
			webitelCasesInputCatalog: WebitelCasesInputCatalog,
			params?: UpdateCatalogParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelCasesCatalog>>;
	};
export type ListCatalogsResult = AxiosResponse<WebitelCasesCatalogList>;
export type CreateCatalogResult = AxiosResponse<WebitelCasesCatalog>;
export type DeleteCatalogResult = AxiosResponse<WebitelCasesCatalogList>;
export type LocateCatalogResult =
	AxiosResponse<WebitelCasesLocateCatalogResponse>;
export type UpdateCatalog2Result = AxiosResponse<WebitelCasesCatalog>;
export type UpdateCatalogResult = AxiosResponse<WebitelCasesCatalog>;
