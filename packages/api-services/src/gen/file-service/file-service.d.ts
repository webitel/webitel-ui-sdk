import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { SearchFilesByCallParams, SearchFilesParams, SearchScreenRecordingsByAgentParams, SearchScreenRecordingsParams, StorageDeleteFilesRequest, StorageDeleteFilesResponse, StorageDeleteQuarantineFilesRequest, StorageFileServiceDeleteScreenRecordingsBody, StorageFileServiceDeleteScreenRecordingsByAgentBody, StorageFileServiceDeleteVideocallFilesBody, StorageListFile, StorageRestoreFilesRequest, StorageRestoreFilesResponse } from '../_models';
export declare const // --- title start
getFileService: (axiosInstance?: AxiosInstance) => {
    deleteVideocallFiles: (callId: string, storageFileServiceDeleteVideocallFilesBody: StorageFileServiceDeleteVideocallFilesBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageDeleteFilesResponse>>;
    searchFilesByCall: (callId: string, params?: SearchFilesByCallParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageListFile>>;
    searchScreenRecordingsByAgent: (agentId: string, params?: SearchScreenRecordingsByAgentParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageListFile>>;
    deleteScreenRecordingsByAgent: (agentId: string, id: string[], storageFileServiceDeleteScreenRecordingsByAgentBody: StorageFileServiceDeleteScreenRecordingsByAgentBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageDeleteFilesResponse>>;
    deleteFiles: (storageDeleteFilesRequest: StorageDeleteFilesRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageDeleteFilesResponse>>;
    searchFiles: (params?: SearchFilesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageListFile>>;
    deleteQuarantineFiles: (storageDeleteQuarantineFilesRequest: StorageDeleteQuarantineFilesRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageDeleteFilesResponse>>;
    restoreFiles: (storageRestoreFilesRequest: StorageRestoreFilesRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageRestoreFilesResponse>>;
    searchScreenRecordings: (userId: string, params?: SearchScreenRecordingsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageListFile>>;
    deleteScreenRecordings: (userId: string, id: string[], storageFileServiceDeleteScreenRecordingsBody: StorageFileServiceDeleteScreenRecordingsBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageDeleteFilesResponse>>;
};
export type DeleteVideocallFilesResult = AxiosResponse<StorageDeleteFilesResponse>;
export type SearchFilesByCallResult = AxiosResponse<StorageListFile>;
export type SearchScreenRecordingsByAgentResult = AxiosResponse<StorageListFile>;
export type DeleteScreenRecordingsByAgentResult = AxiosResponse<StorageDeleteFilesResponse>;
export type DeleteFilesResult = AxiosResponse<StorageDeleteFilesResponse>;
export type SearchFilesResult = AxiosResponse<StorageListFile>;
export type DeleteQuarantineFilesResult = AxiosResponse<StorageDeleteFilesResponse>;
export type RestoreFilesResult = AxiosResponse<StorageRestoreFilesResponse>;
export type SearchScreenRecordingsResult = AxiosResponse<StorageListFile>;
export type DeleteScreenRecordingsResult = AxiosResponse<StorageDeleteFilesResponse>;
