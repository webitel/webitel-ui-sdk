import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DeleteBackendProfileParams, ReadBackendProfileParams, SearchBackendProfileParams, StorageBackendProfile, StorageBackendProfileServicePatchBackendProfileBody, StorageBackendProfileServiceUpdateBackendProfileBody, StorageCreateBackendProfileRequest, StorageListBackendProfile } from '../_models';
export declare const // --- title start
getBackendProfileService: (axiosInstance?: AxiosInstance) => {
    searchBackendProfile: (params?: SearchBackendProfileParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageListBackendProfile>>;
    createBackendProfile: (storageCreateBackendProfileRequest: StorageCreateBackendProfileRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageBackendProfile>>;
    deleteBackendProfile: (id: string, params?: DeleteBackendProfileParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageBackendProfile>>;
    readBackendProfile: (id: string, params?: ReadBackendProfileParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageBackendProfile>>;
    patchBackendProfile: (id: string, storageBackendProfileServicePatchBackendProfileBody: StorageBackendProfileServicePatchBackendProfileBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageBackendProfile>>;
    updateBackendProfile: (id: string, storageBackendProfileServiceUpdateBackendProfileBody: StorageBackendProfileServiceUpdateBackendProfileBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageBackendProfile>>;
};
export type SearchBackendProfileResult = AxiosResponse<StorageListBackendProfile>;
export type CreateBackendProfileResult = AxiosResponse<StorageBackendProfile>;
export type DeleteBackendProfileResult = AxiosResponse<StorageBackendProfile>;
export type ReadBackendProfileResult = AxiosResponse<StorageBackendProfile>;
export type PatchBackendProfileResult = AxiosResponse<StorageBackendProfile>;
export type UpdateBackendProfileResult = AxiosResponse<StorageBackendProfile>;
