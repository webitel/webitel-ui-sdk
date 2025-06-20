/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import axios from '@aliasedDeps/api-services/axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
	EngineAuditForm,
	EngineAuditFormServicePatchAuditFormBody,
	EngineAuditFormServiceUpdateAuditFormBody,
	EngineAuditFormServiceUpdateAuditRateBody,
	EngineAuditRate,
	EngineCreateAuditFormRateRequest,
	EngineCreateAuditFormRequest,
	EngineListAuditForm,
	EngineListAuditRate,
	SearchAuditFormParams,
	SearchAuditRateParams,
} from '.././_models';

// --- header start
//

export const // --- title start
	getAuditFormService =
		// --- title end
		() => {
			// --- header end
			const searchAuditForm = <TData = AxiosResponse<EngineListAuditForm>>(
				params?: SearchAuditFormParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get('/call_center/audit/forms', {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			const createAuditForm = <TData = AxiosResponse<EngineAuditForm>>(
				engineCreateAuditFormRequest: EngineCreateAuditFormRequest,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.post(
					'/call_center/audit/forms',
					engineCreateAuditFormRequest,
					options,
				);
			};
			const searchAuditRate = <TData = AxiosResponse<EngineListAuditRate>>(
				formId: number,
				params?: SearchAuditRateParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/call_center/audit/forms/${formId}/rate`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			const deleteAuditForm = <TData = AxiosResponse<EngineAuditForm>>(
				id: number,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.delete(`/call_center/audit/forms/${id}`, options);
			};
			const readAuditForm = <TData = AxiosResponse<EngineAuditForm>>(
				id: number,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/call_center/audit/forms/${id}`, options);
			};
			const patchAuditForm = <TData = AxiosResponse<EngineAuditForm>>(
				id: number,
				engineAuditFormServicePatchAuditFormBody: EngineAuditFormServicePatchAuditFormBody,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.patch(
					`/call_center/audit/forms/${id}`,
					engineAuditFormServicePatchAuditFormBody,
					options,
				);
			};
			const updateAuditForm = <TData = AxiosResponse<EngineAuditForm>>(
				id: number,
				engineAuditFormServiceUpdateAuditFormBody: EngineAuditFormServiceUpdateAuditFormBody,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.put(
					`/call_center/audit/forms/${id}`,
					engineAuditFormServiceUpdateAuditFormBody,
					options,
				);
			};
			const createAuditFormRate = <TData = AxiosResponse<EngineAuditRate>>(
				engineCreateAuditFormRateRequest: EngineCreateAuditFormRateRequest,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.post(
					'/call_center/audit/rate',
					engineCreateAuditFormRateRequest,
					options,
				);
			};
			const deleteAuditRate = <TData = AxiosResponse<EngineAuditRate>>(
				id: string,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.delete(`/call_center/audit/rate/${id}`, options);
			};
			const readAuditRate = <TData = AxiosResponse<EngineAuditRate>>(
				id: string,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/call_center/audit/rate/${id}`, options);
			};
			const updateAuditRate = <TData = AxiosResponse<EngineAuditRate>>(
				id: string,
				engineAuditFormServiceUpdateAuditRateBody: EngineAuditFormServiceUpdateAuditRateBody,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.put(
					`/call_center/audit/rate/${id}`,
					engineAuditFormServiceUpdateAuditRateBody,
					options,
				);
			};

			// --- footer start
			return {
				searchAuditForm,
				createAuditForm,
				searchAuditRate,
				deleteAuditForm,
				readAuditForm,
				patchAuditForm,
				updateAuditForm,
				createAuditFormRate,
				deleteAuditRate,
				readAuditRate,
				updateAuditRate,
			};
		};
export type SearchAuditFormResult = AxiosResponse<EngineListAuditForm>;
export type CreateAuditFormResult = AxiosResponse<EngineAuditForm>;
export type SearchAuditRateResult = AxiosResponse<EngineListAuditRate>;
export type DeleteAuditFormResult = AxiosResponse<EngineAuditForm>;
export type ReadAuditFormResult = AxiosResponse<EngineAuditForm>;
export type PatchAuditFormResult = AxiosResponse<EngineAuditForm>;
export type UpdateAuditFormResult = AxiosResponse<EngineAuditForm>;
export type CreateAuditFormRateResult = AxiosResponse<EngineAuditRate>;
export type DeleteAuditRateResult = AxiosResponse<EngineAuditRate>;
export type ReadAuditRateResult = AxiosResponse<EngineAuditRate>;
export type UpdateAuditRateResult = AxiosResponse<EngineAuditRate>;

// --- footer end
