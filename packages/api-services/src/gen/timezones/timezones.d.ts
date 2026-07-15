import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ContactsInputTimezone, ContactsTimezone, ContactsTimezoneList, DeleteTimezoneParams, DeleteTimezonesParams, ListTimezonesParams, LocateTimezoneParams, MergeTimezonesParams, ResetTimezonesParams, UpdateTimezone2Body, UpdateTimezone2Params, UpdateTimezoneBody, UpdateTimezoneParams } from '../_models';
export declare const // --- title start
getTimezones: (axiosInstance?: AxiosInstance) => {
    deleteTimezones: (contactId: string, params: DeleteTimezonesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsTimezoneList>>;
    listTimezones: (contactId: string, params?: ListTimezonesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsTimezoneList>>;
    mergeTimezones: (contactId: string, contactsInputTimezone: ContactsInputTimezone[], params?: MergeTimezonesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsTimezoneList>>;
    resetTimezones: (contactId: string, contactsInputTimezone: ContactsInputTimezone[], params?: ResetTimezonesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsTimezoneList>>;
    deleteTimezone: (contactId: string, etag: string, params?: DeleteTimezoneParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsTimezone>>;
    locateTimezone: (contactId: string, etag: string, params?: LocateTimezoneParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsTimezone>>;
    updateTimezone2: (contactId: string, etag: string, updateTimezone2Body: UpdateTimezone2Body, params?: UpdateTimezone2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsTimezoneList>>;
    updateTimezone: (contactId: string, etag: string, updateTimezoneBody: UpdateTimezoneBody, params?: UpdateTimezoneParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsTimezoneList>>;
};
export type DeleteTimezonesResult = AxiosResponse<ContactsTimezoneList>;
export type ListTimezonesResult = AxiosResponse<ContactsTimezoneList>;
export type MergeTimezonesResult = AxiosResponse<ContactsTimezoneList>;
export type ResetTimezonesResult = AxiosResponse<ContactsTimezoneList>;
export type DeleteTimezoneResult = AxiosResponse<ContactsTimezone>;
export type LocateTimezoneResult = AxiosResponse<ContactsTimezone>;
export type UpdateTimezone2Result = AxiosResponse<ContactsTimezoneList>;
export type UpdateTimezoneResult = AxiosResponse<ContactsTimezoneList>;
