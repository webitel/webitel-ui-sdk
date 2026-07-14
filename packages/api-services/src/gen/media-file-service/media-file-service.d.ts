import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DeleteMediaFileParams, ReadMediaFileParams, SearchMediaFileParams, StorageListMedia, StorageMediaFile } from '../_models';
export declare const // --- title start
getMediaFileService: (axiosInstance?: AxiosInstance) => {
    searchMediaFile: (params?: SearchMediaFileParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageListMedia>>;
    deleteMediaFile: (id: string, params?: DeleteMediaFileParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageMediaFile>>;
    readMediaFile: (id: string, params?: ReadMediaFileParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageMediaFile>>;
};
export type SearchMediaFileResult = AxiosResponse<StorageListMedia>;
export type DeleteMediaFileResult = AxiosResponse<StorageMediaFile>;
export type ReadMediaFileResult = AxiosResponse<StorageMediaFile>;
