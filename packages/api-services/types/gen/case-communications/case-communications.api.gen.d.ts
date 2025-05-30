import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { LinkCommunicationParams, ListCommunicationsParams, UnlinkCommunicationParams, WebitelCasesInputCaseCommunication, WebitelCasesLinkCommunicationResponse, WebitelCasesListCommunicationsResponse, WebitelCasesUnlinkCommunicationResponse } from '.././_models';
export declare const // --- title start
getCaseCommunications: () => {
    listCommunications: <TData = AxiosResponse<WebitelCasesListCommunicationsResponse, any>>(caseEtag: string, params?: ListCommunicationsParams, options?: AxiosRequestConfig) => Promise<TData>;
    linkCommunication: <TData = AxiosResponse<WebitelCasesLinkCommunicationResponse, any>>(caseEtag: string, webitelCasesInputCaseCommunication: WebitelCasesInputCaseCommunication, params?: LinkCommunicationParams, options?: AxiosRequestConfig) => Promise<TData>;
    unlinkCommunication: <TData = AxiosResponse<WebitelCasesUnlinkCommunicationResponse, any>>(caseEtag: string, id: string, params?: UnlinkCommunicationParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListCommunicationsResult = AxiosResponse<WebitelCasesListCommunicationsResponse>;
export type LinkCommunicationResult = AxiosResponse<WebitelCasesLinkCommunicationResponse>;
export type UnlinkCommunicationResult = AxiosResponse<WebitelCasesUnlinkCommunicationResponse>;
