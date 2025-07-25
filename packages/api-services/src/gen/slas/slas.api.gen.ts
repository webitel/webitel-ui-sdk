/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import axios from '@aliasedDeps/api-services/axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
	CreateSLAParams,
	ListSLAsParams,
	LocateSLAParams,
	UpdateSLA2Params,
	UpdateSLAParams,
	WebitelCasesInputSLA,
	WebitelCasesInputSLABody,
	WebitelCasesLocateSLAResponse,
	WebitelCasesSLA,
	WebitelCasesSLAList,
} from '.././_models';

// --- header start
//

export const // --- title start
	getSlas =
		// --- title end
		() => {
			// --- header end
			/**
			 * @summary Retrieve a list of SLAs or search SLA conditions
			 */
			const listSLAs = <TData = AxiosResponse<WebitelCasesSLAList>>(
				params?: ListSLAsParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get('/cases/slas', {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Create a new SLA
			 */
			const createSLA = <TData = AxiosResponse<WebitelCasesSLA>>(
				webitelCasesInputSLABody: WebitelCasesInputSLABody,
				params?: CreateSLAParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.post('/cases/slas', webitelCasesInputSLABody, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Delete an SLA
			 */
			const deleteSLA = <TData = AxiosResponse<WebitelCasesSLA>>(
				id: string,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.delete(`/cases/slas/${id}`, options);
			};
			/**
			 * @summary Locate an SLA by ID
			 */
			const locateSLA = <TData = AxiosResponse<WebitelCasesLocateSLAResponse>>(
				id: string,
				params?: LocateSLAParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/cases/slas/${id}`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Update an existing SLA
			 */
			const updateSLA2 = <TData = AxiosResponse<WebitelCasesSLA>>(
				id: string,
				webitelCasesInputSLA: WebitelCasesInputSLA,
				params?: UpdateSLA2Params,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.patch(`/cases/slas/${id}`, webitelCasesInputSLA, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Update an existing SLA
			 */
			const updateSLA = <TData = AxiosResponse<WebitelCasesSLA>>(
				id: string,
				webitelCasesInputSLA: WebitelCasesInputSLA,
				params?: UpdateSLAParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.put(`/cases/slas/${id}`, webitelCasesInputSLA, {
					...options,
					params: { ...params, ...options?.params },
				});
			};

			// --- footer start
			return {
				listSLAs,
				createSLA,
				deleteSLA,
				locateSLA,
				updateSLA2,
				updateSLA,
			};
		};
export type ListSLAsResult = AxiosResponse<WebitelCasesSLAList>;
export type CreateSLAResult = AxiosResponse<WebitelCasesSLA>;
export type DeleteSLAResult = AxiosResponse<WebitelCasesSLA>;
export type LocateSLAResult = AxiosResponse<WebitelCasesLocateSLAResponse>;
export type UpdateSLA2Result = AxiosResponse<WebitelCasesSLA>;
export type UpdateSLAResult = AxiosResponse<WebitelCasesSLA>;

// --- footer end
