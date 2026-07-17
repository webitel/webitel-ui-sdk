import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DeleteListCommunicationParams, DeleteListParams, EngineCreateListRequest, EngineList, EngineListCommunication, EngineListOfList, EngineListOfListCommunication, EngineListServiceCreateListCommunicationBody, EngineListServiceUpdateListBody, EngineListServiceUpdateListCommunicationBody, ReadListCommunicationParams, ReadListParams, SearchListCommunicationParams, SearchListParams } from '../_models';
export declare const // --- title start
getListService: (axiosInstance?: AxiosInstance) => {
    searchList: (params?: SearchListParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListOfList>>;
    createList: (engineCreateListRequest: EngineCreateListRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineList>>;
    deleteList: (id: string, params?: DeleteListParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineList>>;
    readList: (id: string, params?: ReadListParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineList>>;
    updateList: (id: string, engineListServiceUpdateListBody: EngineListServiceUpdateListBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineList>>;
    searchListCommunication: (listId: string, params?: SearchListCommunicationParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListOfListCommunication>>;
    createListCommunication: (listId: string, engineListServiceCreateListCommunicationBody: EngineListServiceCreateListCommunicationBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListCommunication>>;
    deleteListCommunication: (listId: string, id: string, params?: DeleteListCommunicationParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListCommunication>>;
    readListCommunication: (listId: string, id: string, params?: ReadListCommunicationParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListCommunication>>;
    updateListCommunication: (listId: string, id: string, engineListServiceUpdateListCommunicationBody: EngineListServiceUpdateListCommunicationBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListCommunication>>;
};
export type SearchListResult = AxiosResponse<EngineListOfList>;
export type CreateListResult = AxiosResponse<EngineList>;
export type DeleteListResult = AxiosResponse<EngineList>;
export type ReadListResult = AxiosResponse<EngineList>;
export type UpdateListResult = AxiosResponse<EngineList>;
export type SearchListCommunicationResult = AxiosResponse<EngineListOfListCommunication>;
export type CreateListCommunicationResult = AxiosResponse<EngineListCommunication>;
export type DeleteListCommunicationResult = AxiosResponse<EngineListCommunication>;
export type ReadListCommunicationResult = AxiosResponse<EngineListCommunication>;
export type UpdateListCommunicationResult = AxiosResponse<EngineListCommunication>;
