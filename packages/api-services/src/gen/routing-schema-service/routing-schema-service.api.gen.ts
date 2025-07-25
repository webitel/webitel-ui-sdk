/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import axios from '@aliasedDeps/api-services/axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
	DeleteRoutingSchemaParams,
	EngineCreateRoutingSchemaRequest,
	EngineListRoutingSchema,
	EngineListRoutingSchemaTags,
	EngineRoutingSchema,
	EngineRoutingSchemaServicePatchRoutingSchemaBody,
	EngineRoutingSchemaServiceUpdateRoutingSchemaBody,
	ReadRoutingSchemaParams,
	SearchRoutingSchemaParams,
	SearchRoutingSchemaTagsParams,
} from '.././_models';

// --- header start
//

export const // --- title start
	getRoutingSchemaService =
		// --- title end
		() => {
			// --- header end
			/**
			 * @summary List RoutingSchema
			 */
			const searchRoutingSchema = <
				TData = AxiosResponse<EngineListRoutingSchema>,
			>(
				params?: SearchRoutingSchemaParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get('/routing/schema', {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Create RoutingSchema
			 */
			const createRoutingSchema = <TData = AxiosResponse<EngineRoutingSchema>>(
				engineCreateRoutingSchemaRequest: EngineCreateRoutingSchemaRequest,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.post(
					'/routing/schema',
					engineCreateRoutingSchemaRequest,
					options,
				);
			};
			/**
			 * @summary List RoutingSchemaTags
			 */
			const searchRoutingSchemaTags = <
				TData = AxiosResponse<EngineListRoutingSchemaTags>,
			>(
				params?: SearchRoutingSchemaTagsParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get('/routing/schema/tags', {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Remove RoutingSchema
			 */
			const deleteRoutingSchema = <TData = AxiosResponse<EngineRoutingSchema>>(
				id: string,
				params?: DeleteRoutingSchemaParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.delete(`/routing/schema/${id}`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary RoutingSchema item
			 */
			const readRoutingSchema = <TData = AxiosResponse<EngineRoutingSchema>>(
				id: string,
				params?: ReadRoutingSchemaParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/routing/schema/${id}`, {
					...options,
					params: { ...params, ...options?.params },
				});
			};
			/**
			 * @summary Patch RoutingSchema
			 */
			const patchRoutingSchema = <TData = AxiosResponse<EngineRoutingSchema>>(
				id: string,
				engineRoutingSchemaServicePatchRoutingSchemaBody: EngineRoutingSchemaServicePatchRoutingSchemaBody,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.patch(
					`/routing/schema/${id}`,
					engineRoutingSchemaServicePatchRoutingSchemaBody,
					options,
				);
			};
			/**
			 * @summary Update RoutingSchema
			 */
			const updateRoutingSchema = <TData = AxiosResponse<EngineRoutingSchema>>(
				id: string,
				engineRoutingSchemaServiceUpdateRoutingSchemaBody: EngineRoutingSchemaServiceUpdateRoutingSchemaBody,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.put(
					`/routing/schema/${id}`,
					engineRoutingSchemaServiceUpdateRoutingSchemaBody,
					options,
				);
			};

			// --- footer start
			return {
				searchRoutingSchema,
				createRoutingSchema,
				searchRoutingSchemaTags,
				deleteRoutingSchema,
				readRoutingSchema,
				patchRoutingSchema,
				updateRoutingSchema,
			};
		};
export type SearchRoutingSchemaResult = AxiosResponse<EngineListRoutingSchema>;
export type CreateRoutingSchemaResult = AxiosResponse<EngineRoutingSchema>;
export type SearchRoutingSchemaTagsResult =
	AxiosResponse<EngineListRoutingSchemaTags>;
export type DeleteRoutingSchemaResult = AxiosResponse<EngineRoutingSchema>;
export type ReadRoutingSchemaResult = AxiosResponse<EngineRoutingSchema>;
export type PatchRoutingSchemaResult = AxiosResponse<EngineRoutingSchema>;
export type UpdateRoutingSchemaResult = AxiosResponse<EngineRoutingSchema>;

// --- footer end
