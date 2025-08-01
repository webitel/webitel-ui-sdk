/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import axios from '@aliasedDeps/api-services/axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

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
} from '.././_models';

// --- header start
//

export const // --- title start
	getCatalogs =
		// --- title end
		() => {
			// --- header end
			/**
			 * @summary Retrieve a list of catalogs or search catalogs
			 */
			const listCatalogs = <TData = AxiosResponse<WebitelCasesCatalogList>>(
				params?: ListCatalogsParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get('/cases/catalogs', {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Create a new catalog
			 */
			const createCatalog = <TData = AxiosResponse<WebitelCasesCatalog>>(
				webitelCasesInputCatalog: WebitelCasesInputCatalog,
				params?: CreateCatalogParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.post('/cases/catalogs', webitelCasesInputCatalog, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Delete a catalog
			 */
			const deleteCatalog = <TData = AxiosResponse<WebitelCasesCatalogList>>(
				id: string[],
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.delete(`/cases/catalogs/${id}`, options);
			};
			/**
			 * @summary Locate a catalog by ID
			 */
			const locateCatalog = <
				TData = AxiosResponse<WebitelCasesLocateCatalogResponse>,
			>(
				id: string,
				params?: LocateCatalogParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/cases/catalogs/${id}`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Update an existing catalog
			 */
			const updateCatalog2 = <TData = AxiosResponse<WebitelCasesCatalog>>(
				id: string,
				webitelCasesInputCatalog: WebitelCasesInputCatalog,
				params?: UpdateCatalog2Params,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.patch(`/cases/catalogs/${id}`, webitelCasesInputCatalog, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Update an existing catalog
			 */
			const updateCatalog = <TData = AxiosResponse<WebitelCasesCatalog>>(
				id: string,
				webitelCasesInputCatalog: WebitelCasesInputCatalog,
				params?: UpdateCatalogParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.put(`/cases/catalogs/${id}`, webitelCasesInputCatalog, {
					...options,
					params: { ...params, ...options?.params },
				});
			};

			// --- footer start
			return {
				listCatalogs,
				createCatalog,
				deleteCatalog,
				locateCatalog,
				updateCatalog2,
				updateCatalog,
			};
		};
export type ListCatalogsResult = AxiosResponse<WebitelCasesCatalogList>;
export type CreateCatalogResult = AxiosResponse<WebitelCasesCatalog>;
export type DeleteCatalogResult = AxiosResponse<WebitelCasesCatalogList>;
export type LocateCatalogResult =
	AxiosResponse<WebitelCasesLocateCatalogResponse>;
export type UpdateCatalog2Result = AxiosResponse<WebitelCasesCatalog>;
export type UpdateCatalogResult = AxiosResponse<WebitelCasesCatalog>;

// --- footer end
