import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateLinkParams, ListLinksParams, LocateLinkParams, UpdateLink2Body, UpdateLink2Params, UpdateLinkBody, UpdateLinkParams, WebitelCasesCaseLink, WebitelCasesCaseLinkList } from '../_models';
export declare const // --- title start
getCaseLinks: (axiosInstance?: AxiosInstance) => {
    listLinks: (caseEtag: string, params?: ListLinksParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCaseLinkList>>;
    createLink: (caseEtag: string, params?: CreateLinkParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCaseLink>>;
    deleteLink: (caseEtag: string, etag: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCaseLink>>;
    locateLink: (caseEtag: string, etag: string, params?: LocateLinkParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCaseLink>>;
    updateLink2: (caseEtag: string, updateLink2Body: UpdateLink2Body, params?: UpdateLink2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCaseLink>>;
    updateLink: (caseEtag: string, updateLinkBody: UpdateLinkBody, params?: UpdateLinkParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesCaseLink>>;
};
export type ListLinksResult = AxiosResponse<WebitelCasesCaseLinkList>;
export type CreateLinkResult = AxiosResponse<WebitelCasesCaseLink>;
export type DeleteLinkResult = AxiosResponse<WebitelCasesCaseLink>;
export type LocateLinkResult = AxiosResponse<WebitelCasesCaseLink>;
export type UpdateLink2Result = AxiosResponse<WebitelCasesCaseLink>;
export type UpdateLinkResult = AxiosResponse<WebitelCasesCaseLink>;
