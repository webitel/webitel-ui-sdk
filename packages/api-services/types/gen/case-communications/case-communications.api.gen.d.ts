import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesInputCaseCommunication, CasesLinkCommunicationResponse, CasesListCommunicationsResponse, CasesUnlinkCommunicationResponse, LinkCommunicationParams, ListCommunicationsParams, UnlinkCommunicationParams } from '.././_models';
export declare const // --- title start
getCaseCommunications: () => {
    listCommunications: <TData = AxiosResponse<CasesListCommunicationsResponse, any>>(caseEtag: string, params?: ListCommunicationsParams, options?: AxiosRequestConfig) => Promise<TData>;
    linkCommunication: <TData = AxiosResponse<CasesLinkCommunicationResponse, any>>(caseEtag: string, casesInputCaseCommunication: CasesInputCaseCommunication, params?: LinkCommunicationParams, options?: AxiosRequestConfig) => Promise<TData>;
    unlinkCommunication: <TData = AxiosResponse<CasesUnlinkCommunicationResponse, any>>(caseEtag: string, id: string, params?: UnlinkCommunicationParams, options?: AxiosRequestConfig) => Promise<TData>;
};
export type ListCommunicationsResult = AxiosResponse<CasesListCommunicationsResponse>;
export type LinkCommunicationResult = AxiosResponse<CasesLinkCommunicationResponse>;
export type UnlinkCommunicationResult = AxiosResponse<CasesUnlinkCommunicationResponse>;
