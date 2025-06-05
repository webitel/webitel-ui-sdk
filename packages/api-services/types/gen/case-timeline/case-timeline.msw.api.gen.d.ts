import { http } from 'msw';
import type { WebitelCasesGetTimelineCounterResponse, WebitelCasesGetTimelineResponse } from '.././_models';
export declare const getGetTimelineResponseMock: (overrideResponse?: Partial<WebitelCasesGetTimelineResponse>) => WebitelCasesGetTimelineResponse;
export declare const getGetTimelineCounterResponseMock: (overrideResponse?: Partial<WebitelCasesGetTimelineCounterResponse>) => WebitelCasesGetTimelineCounterResponse;
export declare const getGetTimelineMockHandler: (overrideResponse?: WebitelCasesGetTimelineResponse | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<WebitelCasesGetTimelineResponse> | WebitelCasesGetTimelineResponse)) => import("msw").HttpHandler;
export declare const getGetTimelineCounterMockHandler: (overrideResponse?: WebitelCasesGetTimelineCounterResponse | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<WebitelCasesGetTimelineCounterResponse> | WebitelCasesGetTimelineCounterResponse)) => import("msw").HttpHandler;
export declare const getCaseTimelineMock: () => import("msw").HttpHandler[];
