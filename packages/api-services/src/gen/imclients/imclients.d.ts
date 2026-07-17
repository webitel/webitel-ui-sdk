import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ContactsEmptyResponse, ContactsIMClientList, ListIMClientsParams } from '../_models';
export declare const // --- title start
getImclients: (axiosInstance?: AxiosInstance) => {
    listIMClients: (contactId: string, params?: ListIMClientsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsIMClientList>>;
    deleteIMClient: (contactId: string, id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsEmptyResponse>>;
};
export type ListIMClientsResult = AxiosResponse<ContactsIMClientList>;
export type DeleteIMClientResult = AxiosResponse<ContactsEmptyResponse>;
