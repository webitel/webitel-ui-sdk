import { http } from 'msw';
import type { CasesLinkCommunicationResponse, CasesListCommunicationsResponse, CasesUnlinkCommunicationResponse } from '.././_models';
export declare const getListCommunicationsResponseMock: (overrideResponse?: Partial<CasesListCommunicationsResponse>) => CasesListCommunicationsResponse;
export declare const getLinkCommunicationResponseMock: (overrideResponse?: Partial<CasesLinkCommunicationResponse>) => CasesLinkCommunicationResponse;
export declare const getUnlinkCommunicationResponseMock: (overrideResponse?: Partial<CasesUnlinkCommunicationResponse>) => CasesUnlinkCommunicationResponse;
export declare const getListCommunicationsMockHandler: (overrideResponse?: CasesListCommunicationsResponse | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<CasesListCommunicationsResponse> | CasesListCommunicationsResponse)) => import("msw").HttpHandler;
export declare const getLinkCommunicationMockHandler: (overrideResponse?: CasesLinkCommunicationResponse | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<CasesLinkCommunicationResponse> | CasesLinkCommunicationResponse)) => import("msw").HttpHandler;
export declare const getUnlinkCommunicationMockHandler: (overrideResponse?: CasesUnlinkCommunicationResponse | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<CasesUnlinkCommunicationResponse> | CasesUnlinkCommunicationResponse)) => import("msw").HttpHandler;
export declare const getCaseCommunicationsMock: () => import("msw").HttpHandler[];
