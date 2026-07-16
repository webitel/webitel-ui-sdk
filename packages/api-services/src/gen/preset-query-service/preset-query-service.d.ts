import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	EngineCreatePresetQueryRequest,
	EngineListPresetQuery,
	EnginePresetQuery,
	EnginePresetQueryServicePatchPresetQueryBody,
	EnginePresetQueryServiceUpdatePresetQueryBody,
	SearchPresetQueryParams,
} from '../_models';
export declare const // --- title start
	getPresetQueryService: (axiosInstance?: AxiosInstance) => {
		searchPresetQuery: (
			params?: SearchPresetQueryParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListPresetQuery>>;
		createPresetQuery: (
			engineCreatePresetQueryRequest: EngineCreatePresetQueryRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EnginePresetQuery>>;
		deletePresetQuery: (
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EnginePresetQuery>>;
		readPresetQuery: (
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EnginePresetQuery>>;
		patchPresetQuery: (
			id: number,
			enginePresetQueryServicePatchPresetQueryBody: EnginePresetQueryServicePatchPresetQueryBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EnginePresetQuery>>;
		updatePresetQuery: (
			id: number,
			enginePresetQueryServiceUpdatePresetQueryBody: EnginePresetQueryServiceUpdatePresetQueryBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EnginePresetQuery>>;
	};
export type SearchPresetQueryResult = AxiosResponse<EngineListPresetQuery>;
export type CreatePresetQueryResult = AxiosResponse<EnginePresetQuery>;
export type DeletePresetQueryResult = AxiosResponse<EnginePresetQuery>;
export type ReadPresetQueryResult = AxiosResponse<EnginePresetQuery>;
export type PatchPresetQueryResult = AxiosResponse<EnginePresetQuery>;
export type UpdatePresetQueryResult = AxiosResponse<EnginePresetQuery>;
