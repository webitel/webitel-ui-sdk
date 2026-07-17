import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	DeleteCommunicationTypeParams,
	EngineCommunicationType,
	EngineCommunicationTypeRequest,
	EngineCommunicationTypeServicePatchCommunicationTypeBody,
	EngineCommunicationTypeServiceUpdateCommunicationTypeBody,
	EngineListCommunicationType,
	ReadCommunicationTypeParams,
	SearchCommunicationTypeParams,
} from '../_models';
export declare const // --- title start
	getCommunicationTypeService: (axiosInstance?: AxiosInstance) => {
		searchCommunicationType: (
			params?: SearchCommunicationTypeParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListCommunicationType>>;
		createCommunicationType: (
			engineCommunicationTypeRequest: EngineCommunicationTypeRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCommunicationType>>;
		deleteCommunicationType: (
			id: string,
			params?: DeleteCommunicationTypeParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCommunicationType>>;
		readCommunicationType: (
			id: string,
			params?: ReadCommunicationTypeParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCommunicationType>>;
		patchCommunicationType: (
			id: string,
			engineCommunicationTypeServicePatchCommunicationTypeBody: EngineCommunicationTypeServicePatchCommunicationTypeBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCommunicationType>>;
		updateCommunicationType: (
			id: string,
			engineCommunicationTypeServiceUpdateCommunicationTypeBody: EngineCommunicationTypeServiceUpdateCommunicationTypeBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCommunicationType>>;
	};
export type SearchCommunicationTypeResult =
	AxiosResponse<EngineListCommunicationType>;
export type CreateCommunicationTypeResult =
	AxiosResponse<EngineCommunicationType>;
export type DeleteCommunicationTypeResult =
	AxiosResponse<EngineCommunicationType>;
export type ReadCommunicationTypeResult =
	AxiosResponse<EngineCommunicationType>;
export type PatchCommunicationTypeResult =
	AxiosResponse<EngineCommunicationType>;
export type UpdateCommunicationTypeResult =
	AxiosResponse<EngineCommunicationType>;
