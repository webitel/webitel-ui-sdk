import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { AddContactLanguagesParams, ContactsInputLanguage, ContactsLanguage, ContactsLanguageList, DelContactLanguageParams, DelContactLanguagesParams, GetContactLanguagesParams, SetContactLanguage2Body, SetContactLanguage2Params, SetContactLanguageBody, SetContactLanguageParams, SetContactLanguagesParams } from '../_models';
export declare const // --- title start
getLanguages: (axiosInstance?: AxiosInstance) => {
    delContactLanguages: (contactId: string, params: DelContactLanguagesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsLanguageList>>;
    getContactLanguages: (contactId: string, params?: GetContactLanguagesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsLanguageList>>;
    addContactLanguages: (contactId: string, contactsInputLanguage: ContactsInputLanguage[], params?: AddContactLanguagesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsLanguageList>>;
    setContactLanguages: (contactId: string, contactsInputLanguage: ContactsInputLanguage[], params?: SetContactLanguagesParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsLanguageList>>;
    delContactLanguage: (contactId: string, etag: string, params?: DelContactLanguageParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsLanguage>>;
    setContactLanguage2: (contactId: string, etag: string, setContactLanguage2Body: SetContactLanguage2Body, params?: SetContactLanguage2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsLanguageList>>;
    setContactLanguage: (contactId: string, etag: string, setContactLanguageBody: SetContactLanguageBody, params?: SetContactLanguageParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsLanguageList>>;
};
export type DelContactLanguagesResult = AxiosResponse<ContactsLanguageList>;
export type GetContactLanguagesResult = AxiosResponse<ContactsLanguageList>;
export type AddContactLanguagesResult = AxiosResponse<ContactsLanguageList>;
export type SetContactLanguagesResult = AxiosResponse<ContactsLanguageList>;
export type DelContactLanguageResult = AxiosResponse<ContactsLanguage>;
export type SetContactLanguage2Result = AxiosResponse<ContactsLanguageList>;
export type SetContactLanguageResult = AxiosResponse<ContactsLanguageList>;
