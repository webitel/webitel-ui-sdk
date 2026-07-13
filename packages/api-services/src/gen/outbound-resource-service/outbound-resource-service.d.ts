import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	DeleteOutboundResourceDisplayParams,
	DeleteOutboundResourceDisplaysParams,
	DeleteOutboundResourceParams,
	EngineCreateOutboundResourceRequest,
	EngineEmptyResponse,
	EngineListOutboundResource,
	EngineListOutboundResourceDisplay,
	EngineListResourceDisplay,
	EngineOutboundResource,
	EngineOutboundResourceServiceCreateOutboundResourceDisplayBody,
	EngineOutboundResourceServiceCreateOutboundResourceDisplayBulkBody,
	EngineOutboundResourceServicePatchOutboundResourceBody,
	EngineOutboundResourceServiceUpdateOutboundResourceBody,
	EngineOutboundResourceServiceUpdateOutboundResourceDisplayBody,
	EngineResourceDisplay,
	ReadOutboundResourceDisplayParams,
	ReadOutboundResourceParams,
	SearchOutboundResourceDisplayParams,
	SearchOutboundResourceParams,
} from '../_models';
export declare const // --- title start
	getOutboundResourceService: (axiosInstance?: AxiosInstance) => {
		searchOutboundResource: (
			params?: SearchOutboundResourceParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListOutboundResource>>;
		createOutboundResource: (
			engineCreateOutboundResourceRequest: EngineCreateOutboundResourceRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineOutboundResource>>;
		deleteOutboundResource: (
			id: string,
			params?: DeleteOutboundResourceParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineOutboundResource>>;
		readOutboundResource: (
			id: string,
			params?: ReadOutboundResourceParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineOutboundResource>>;
		patchOutboundResource: (
			id: string,
			engineOutboundResourceServicePatchOutboundResourceBody: EngineOutboundResourceServicePatchOutboundResourceBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineOutboundResource>>;
		updateOutboundResource: (
			id: string,
			engineOutboundResourceServiceUpdateOutboundResourceBody: EngineOutboundResourceServiceUpdateOutboundResourceBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineOutboundResource>>;
		deleteOutboundResourceDisplays: (
			resourceId: string,
			params?: DeleteOutboundResourceDisplaysParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineEmptyResponse>>;
		searchOutboundResourceDisplay: (
			resourceId: string,
			params?: SearchOutboundResourceDisplayParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListOutboundResourceDisplay>>;
		createOutboundResourceDisplay: (
			resourceId: string,
			engineOutboundResourceServiceCreateOutboundResourceDisplayBody: EngineOutboundResourceServiceCreateOutboundResourceDisplayBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineResourceDisplay>>;
		createOutboundResourceDisplayBulk: (
			resourceId: string,
			engineOutboundResourceServiceCreateOutboundResourceDisplayBulkBody: EngineOutboundResourceServiceCreateOutboundResourceDisplayBulkBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListResourceDisplay>>;
		deleteOutboundResourceDisplay: (
			resourceId: string,
			id: string,
			params?: DeleteOutboundResourceDisplayParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineResourceDisplay>>;
		readOutboundResourceDisplay: (
			resourceId: string,
			id: string,
			params?: ReadOutboundResourceDisplayParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineResourceDisplay>>;
		updateOutboundResourceDisplay: (
			resourceId: string,
			id: string,
			engineOutboundResourceServiceUpdateOutboundResourceDisplayBody: EngineOutboundResourceServiceUpdateOutboundResourceDisplayBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineResourceDisplay>>;
	};
export type SearchOutboundResourceResult =
	AxiosResponse<EngineListOutboundResource>;
export type CreateOutboundResourceResult =
	AxiosResponse<EngineOutboundResource>;
export type DeleteOutboundResourceResult =
	AxiosResponse<EngineOutboundResource>;
export type ReadOutboundResourceResult = AxiosResponse<EngineOutboundResource>;
export type PatchOutboundResourceResult = AxiosResponse<EngineOutboundResource>;
export type UpdateOutboundResourceResult =
	AxiosResponse<EngineOutboundResource>;
export type DeleteOutboundResourceDisplaysResult =
	AxiosResponse<EngineEmptyResponse>;
export type SearchOutboundResourceDisplayResult =
	AxiosResponse<EngineListOutboundResourceDisplay>;
export type CreateOutboundResourceDisplayResult =
	AxiosResponse<EngineResourceDisplay>;
export type CreateOutboundResourceDisplayBulkResult =
	AxiosResponse<EngineListResourceDisplay>;
export type DeleteOutboundResourceDisplayResult =
	AxiosResponse<EngineResourceDisplay>;
export type ReadOutboundResourceDisplayResult =
	AxiosResponse<EngineResourceDisplay>;
export type UpdateOutboundResourceDisplayResult =
	AxiosResponse<EngineResourceDisplay>;
