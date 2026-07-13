import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ContactsCondition, ContactsConditionList, ContactsInputCondition, ContactsLocateConditionResponse, DynamicConditionsCreateConditionBody, ListConditionsParams, LocateConditionParams } from '../_models';
export declare const // --- title start
getDynamicConditions: (axiosInstance?: AxiosInstance) => {
    deleteCondition: (id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsCondition>>;
    locateCondition: (id: string, params?: LocateConditionParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsLocateConditionResponse>>;
    updateCondition2: (id: string, contactsInputCondition: ContactsInputCondition, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsCondition>>;
    updateCondition: (id: string, contactsInputCondition: ContactsInputCondition, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsCondition>>;
    listConditions: (groupId: string, params?: ListConditionsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsConditionList>>;
    createCondition: (groupId: string, dynamicConditionsCreateConditionBody: DynamicConditionsCreateConditionBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsCondition>>;
};
export type DeleteConditionResult = AxiosResponse<ContactsCondition>;
export type LocateConditionResult = AxiosResponse<ContactsLocateConditionResponse>;
export type UpdateCondition2Result = AxiosResponse<ContactsCondition>;
export type UpdateConditionResult = AxiosResponse<ContactsCondition>;
export type ListConditionsResult = AxiosResponse<ContactsConditionList>;
export type CreateConditionResult = AxiosResponse<ContactsCondition>;
