import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateLinkParams, ListLinksParams, LocateLinkParams, UpdateLink2Body, UpdateLink2Params, UpdateLinkBody, UpdateLinkParams, WebitelCasesCaseLink, WebitelCasesCaseLinkList } from '.././_models';
export declare const // --- title start
getCaseLinks: () => {
    listLinks: <TData = AxiosResponse<WebitelCasesCaseLinkList, any>>(caseEtag: string, params?: ListLinksParams, options?: AxiosRequestConfig) => Promise<TData>;
    createLink: <TData = AxiosResponse<WebitelCasesCaseLink, any>>(caseEtag: string, params?: CreateLinkParams, options?: AxiosRequestConfig) => Promise<TData>;
    deleteLink: <TData = AxiosResponse<WebitelCasesCaseLink, any>>(caseEtag: string, etag: string, options?: AxiosRequestConfig) => Promise<TData>;
    locateLink: <TData = AxiosResponse<WebitelCasesCaseLink, any>>(caseEtag: string, etag: string, params?: LocateLinkParams, options?: AxiosRequestConfig) => Promise<TData>;
    updateLink2: <TData = AxiosResponse<WebitelCasesCaseLink, any>>(caseEtag: string, updateLink2Body: UpdateLink2Body, params?: UpdateLink2Params, options?: AxiosRequestConfig) => Promise<TData>;
    updateLink: <TData = AxiosResponse<WebitelCasesCaseLink, any>>(caseEtag: string, updateLinkBody: UpdateLinkBody, params?: UpdateLinkParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListLinksResult = AxiosResponse<WebitelCasesCaseLinkList>;
export type CreateLinkResult = AxiosResponse<WebitelCasesCaseLink>;
export type DeleteLinkResult = AxiosResponse<WebitelCasesCaseLink>;
export type LocateLinkResult = AxiosResponse<WebitelCasesCaseLink>;
export type UpdateLink2Result = AxiosResponse<WebitelCasesCaseLink>;
export type UpdateLinkResult = AxiosResponse<WebitelCasesCaseLink>;
