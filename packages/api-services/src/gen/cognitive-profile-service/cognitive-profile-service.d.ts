import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	SearchCognitiveProfileParams,
	SearchCognitiveProfileVoicesParams,
	StorageCognitiveProfile,
	StorageCognitiveProfileServicePatchCognitiveProfileBody,
	StorageCognitiveProfileServiceUpdateCognitiveProfileBody,
	StorageCreateCognitiveProfileRequest,
	StorageListCognitiveProfile,
	StorageListCognitiveProfileVoices,
} from '../_models';
export declare const // --- title start
	getCognitiveProfileService: (axiosInstance?: AxiosInstance) => {
		searchCognitiveProfile: (
			params?: SearchCognitiveProfileParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageListCognitiveProfile>>;
		createCognitiveProfile: (
			storageCreateCognitiveProfileRequest: StorageCreateCognitiveProfileRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageCognitiveProfile>>;
		deleteCognitiveProfile: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageCognitiveProfile>>;
		readCognitiveProfile: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageCognitiveProfile>>;
		patchCognitiveProfile: (
			id: string,
			storageCognitiveProfileServicePatchCognitiveProfileBody: StorageCognitiveProfileServicePatchCognitiveProfileBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageCognitiveProfile>>;
		updateCognitiveProfile: (
			id: string,
			storageCognitiveProfileServiceUpdateCognitiveProfileBody: StorageCognitiveProfileServiceUpdateCognitiveProfileBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageCognitiveProfile>>;
		searchCognitiveProfileVoices: (
			id: string,
			params?: SearchCognitiveProfileVoicesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageListCognitiveProfileVoices>>;
	};
export type SearchCognitiveProfileResult =
	AxiosResponse<StorageListCognitiveProfile>;
export type CreateCognitiveProfileResult =
	AxiosResponse<StorageCognitiveProfile>;
export type DeleteCognitiveProfileResult =
	AxiosResponse<StorageCognitiveProfile>;
export type ReadCognitiveProfileResult = AxiosResponse<StorageCognitiveProfile>;
export type PatchCognitiveProfileResult =
	AxiosResponse<StorageCognitiveProfile>;
export type UpdateCognitiveProfileResult =
	AxiosResponse<StorageCognitiveProfile>;
export type SearchCognitiveProfileVoicesResult =
	AxiosResponse<StorageListCognitiveProfileVoices>;
