import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesCaseLink, CasesCaseLinkList, CreateLinkParams, ListLinksParams, LocateLinkParams, UpdateLink2Body, UpdateLink2Params, UpdateLinkBody, UpdateLinkParams } from '.././_models';
export declare const // --- title start
getCaseLinks: () => {
    listLinks: <TData = AxiosResponse<CasesCaseLinkList, any>>(caseEtag: string, params?: ListLinksParams, options?: AxiosRequestConfig) => Promise<TData>;
    createLink: <TData = AxiosResponse<CasesCaseLink, any>>(caseEtag: string, params?: CreateLinkParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteLink: <TData = AxiosResponse<CasesCaseLink, any>>(caseEtag: string, etag: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateLink: <TData = AxiosResponse<CasesCaseLink, any>>(caseEtag: string, etag: string, params?: LocateLinkParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateLink2: <TData = AxiosResponse<CasesCaseLink, any>>(caseEtag: string, updateLink2Body: UpdateLink2Body, params?: UpdateLink2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateLink: <TData = AxiosResponse<CasesCaseLink, any>>(caseEtag: string, updateLinkBody: UpdateLinkBody, params?: UpdateLinkParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListLinksResult = AxiosResponse<CasesCaseLinkList>;
export type CreateLinkResult = AxiosResponse<CasesCaseLink>;
export type DeleteLinkResult = AxiosResponse<CasesCaseLink>;
export type LocateLinkResult = AxiosResponse<CasesCaseLink>;
export type UpdateLink2Result = AxiosResponse<CasesCaseLink>;
export type UpdateLinkResult = AxiosResponse<CasesCaseLink>;
