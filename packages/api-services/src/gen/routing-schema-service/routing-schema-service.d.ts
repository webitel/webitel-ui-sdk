import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
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
} from '../_models';
export declare const // --- title start
	getRoutingSchemaService: (axiosInstance?: AxiosInstance) => {
		searchRoutingSchema: (
			params?: SearchRoutingSchemaParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListRoutingSchema>>;
		createRoutingSchema: (
			engineCreateRoutingSchemaRequest: EngineCreateRoutingSchemaRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineRoutingSchema>>;
		searchRoutingSchemaTags: (
			params?: SearchRoutingSchemaTagsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListRoutingSchemaTags>>;
		deleteRoutingSchema: (
			id: string,
			params?: DeleteRoutingSchemaParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineRoutingSchema>>;
		readRoutingSchema: (
			id: string,
			params?: ReadRoutingSchemaParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineRoutingSchema>>;
		patchRoutingSchema: (
			id: string,
			engineRoutingSchemaServicePatchRoutingSchemaBody: EngineRoutingSchemaServicePatchRoutingSchemaBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineRoutingSchema>>;
		updateRoutingSchema: (
			id: string,
			engineRoutingSchemaServiceUpdateRoutingSchemaBody: EngineRoutingSchemaServiceUpdateRoutingSchemaBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineRoutingSchema>>;
	};
export type SearchRoutingSchemaResult = AxiosResponse<EngineListRoutingSchema>;
export type CreateRoutingSchemaResult = AxiosResponse<EngineRoutingSchema>;
export type SearchRoutingSchemaTagsResult =
	AxiosResponse<EngineListRoutingSchemaTags>;
export type DeleteRoutingSchemaResult = AxiosResponse<EngineRoutingSchema>;
export type ReadRoutingSchemaResult = AxiosResponse<EngineRoutingSchema>;
export type PatchRoutingSchemaResult = AxiosResponse<EngineRoutingSchema>;
export type UpdateRoutingSchemaResult = AxiosResponse<EngineRoutingSchema>;
