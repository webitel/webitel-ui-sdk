import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { GetFileTranscriptPhrasesParams, StorageDeleteFileTranscriptRequest, StorageDeleteFileTranscriptResponse, StorageListPhrases, StoragePutFileTranscriptRequest, StoragePutFileTranscriptResponse, StorageStartFileTranscriptRequest, StorageStartFileTranscriptResponse } from '../_models';
export declare const // --- title start
getFileTranscriptService: (axiosInstance?: AxiosInstance) => {
    deleteFileTranscript: (storageDeleteFileTranscriptRequest: StorageDeleteFileTranscriptRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageDeleteFileTranscriptResponse>>;
    createFileTranscript: (storageStartFileTranscriptRequest: StorageStartFileTranscriptRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageStartFileTranscriptResponse>>;
    putFileTranscript: (storagePutFileTranscriptRequest: StoragePutFileTranscriptRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<StoragePutFileTranscriptResponse>>;
    getFileTranscriptPhrases: (id: string, params?: GetFileTranscriptPhrasesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageListPhrases>>;
};
export type DeleteFileTranscriptResult = AxiosResponse<StorageDeleteFileTranscriptResponse>;
export type CreateFileTranscriptResult = AxiosResponse<StorageStartFileTranscriptResponse>;
export type PutFileTranscriptResult = AxiosResponse<StoragePutFileTranscriptResponse>;
export type GetFileTranscriptPhrasesResult = AxiosResponse<StorageListPhrases>;
