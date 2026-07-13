import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	SearchFilePoliciesParams,
	StorageCreateFilePolicyRequest,
	StorageFilePoliciesServiceFilePolicyApplyBody,
	StorageFilePoliciesServiceMovePositionFilePolicyBody,
	StorageFilePoliciesServicePatchFilePolicyBody,
	StorageFilePoliciesServiceUpdateFilePolicyBody,
	StorageFilePolicy,
	StorageFilePolicyApplyResponse,
	StorageListFilePolicies,
	StorageMovePositionFilePolicyResponse,
} from '../_models';
export declare const // --- title start
	getFilePoliciesService: (axiosInstance?: AxiosInstance) => {
		searchFilePolicies: (
			params?: SearchFilePoliciesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageListFilePolicies>>;
		createFilePolicy: (
			storageCreateFilePolicyRequest: StorageCreateFilePolicyRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageFilePolicy>>;
		movePositionFilePolicy: (
			fromId: number,
			toId: number,
			storageFilePoliciesServiceMovePositionFilePolicyBody: StorageFilePoliciesServiceMovePositionFilePolicyBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageMovePositionFilePolicyResponse>>;
		deleteFilePolicy: (
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageFilePolicy>>;
		readFilePolicy: (
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageFilePolicy>>;
		patchFilePolicy: (
			id: number,
			storageFilePoliciesServicePatchFilePolicyBody: StorageFilePoliciesServicePatchFilePolicyBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageFilePolicy>>;
		updateFilePolicy: (
			id: number,
			storageFilePoliciesServiceUpdateFilePolicyBody: StorageFilePoliciesServiceUpdateFilePolicyBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageFilePolicy>>;
		filePolicyApply: (
			id: number,
			storageFilePoliciesServiceFilePolicyApplyBody: StorageFilePoliciesServiceFilePolicyApplyBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<StorageFilePolicyApplyResponse>>;
	};
export type SearchFilePoliciesResult = AxiosResponse<StorageListFilePolicies>;
export type CreateFilePolicyResult = AxiosResponse<StorageFilePolicy>;
export type MovePositionFilePolicyResult =
	AxiosResponse<StorageMovePositionFilePolicyResponse>;
export type DeleteFilePolicyResult = AxiosResponse<StorageFilePolicy>;
export type ReadFilePolicyResult = AxiosResponse<StorageFilePolicy>;
export type PatchFilePolicyResult = AxiosResponse<StorageFilePolicy>;
export type UpdateFilePolicyResult = AxiosResponse<StorageFilePolicy>;
export type FilePolicyApplyResult =
	AxiosResponse<StorageFilePolicyApplyResponse>;
