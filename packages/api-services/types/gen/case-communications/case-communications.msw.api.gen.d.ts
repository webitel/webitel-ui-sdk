import { http } from 'msw';
import type { WebitelCasesLinkCommunicationResponse, WebitelCasesListCommunicationsResponse, WebitelCasesUnlinkCommunicationResponse } from '.././_models';
export declare const getListCommunicationsResponseMock: (overrideResponse?: Partial<WebitelCasesListCommunicationsResponse>) => WebitelCasesListCommunicationsResponse;
export declare const getLinkCommunicationResponseMock: (overrideResponse?: Partial<WebitelCasesLinkCommunicationResponse>) => WebitelCasesLinkCommunicationResponse;
export declare const getUnlinkCommunicationResponseMock: (overrideResponse?: Partial<WebitelCasesUnlinkCommunicationResponse>) => WebitelCasesUnlinkCommunicationResponse;
export declare const getListCommunicationsMockHandler: (overrideResponse?: WebitelCasesListCommunicationsResponse | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<WebitelCasesListCommunicationsResponse> | WebitelCasesListCommunicationsResponse)) => import("msw").HttpHandler;
export declare const getLinkCommunicationMockHandler: (overrideResponse?: WebitelCasesLinkCommunicationResponse | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<WebitelCasesLinkCommunicationResponse> | WebitelCasesLinkCommunicationResponse)) => import("msw").HttpHandler;
export declare const getUnlinkCommunicationMockHandler: (overrideResponse?: WebitelCasesUnlinkCommunicationResponse | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<WebitelCasesUnlinkCommunicationResponse> | WebitelCasesUnlinkCommunicationResponse)) => import("msw").HttpHandler;
export declare const getCaseCommunicationsMock: () => import("msw").HttpHandler[];
