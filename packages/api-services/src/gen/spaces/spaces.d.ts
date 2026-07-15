import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateSpaceSpacesParams, DeleteSpaceSpacesParams, KnowledgebaseInputSpace, KnowledgebaseSpace, KnowledgebaseSpaceList, ListSpacesSpacesParams, LocateSpaceSpacesParams, UpdateSpaceSpacesBody, UpdateSpaceSpacesParams } from '../_models';
export declare const // --- title start
getSpaces: (axiosInstance?: AxiosInstance) => {
    listSpacesSpaces: (params?: ListSpacesSpacesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<KnowledgebaseSpaceList>>;
    createSpaceSpaces: (knowledgebaseInputSpace: KnowledgebaseInputSpace[], params?: CreateSpaceSpacesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<KnowledgebaseSpace>>;
    deleteSpaceSpaces: (etag: string, params?: DeleteSpaceSpacesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<KnowledgebaseSpace>>;
    locateSpaceSpaces: (etag: string, params?: LocateSpaceSpacesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<KnowledgebaseSpace>>;
    updateSpaceSpaces: (etag: string, updateSpaceSpacesBody: UpdateSpaceSpacesBody, params?: UpdateSpaceSpacesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<KnowledgebaseSpace>>;
};
export type ListSpacesSpacesResult = AxiosResponse<KnowledgebaseSpaceList>;
export type CreateSpaceSpacesResult = AxiosResponse<KnowledgebaseSpace>;
export type DeleteSpaceSpacesResult = AxiosResponse<KnowledgebaseSpace>;
export type LocateSpaceSpacesResult = AxiosResponse<KnowledgebaseSpace>;
export type UpdateSpaceSpacesResult = AxiosResponse<KnowledgebaseSpace>;
