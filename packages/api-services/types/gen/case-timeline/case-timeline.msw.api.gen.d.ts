import { http } from 'msw';
import type { CasesGetTimelineCounterResponse, CasesGetTimelineResponse } from '.././_models';
export declare const getGetTimelineResponseMock: (overrideResponse?: Partial<CasesGetTimelineResponse>) => CasesGetTimelineResponse;
export declare const getGetTimelineCounterResponseMock: (overrideResponse?: Partial<CasesGetTimelineCounterResponse>) => CasesGetTimelineCounterResponse;
export declare const getGetTimelineMockHandler: (overrideResponse?: CasesGetTimelineResponse | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<CasesGetTimelineResponse> | CasesGetTimelineResponse)) => import("msw").HttpHandler;
export declare const getGetTimelineCounterMockHandler: (overrideResponse?: CasesGetTimelineCounterResponse | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<CasesGetTimelineCounterResponse> | CasesGetTimelineCounterResponse)) => import("msw").HttpHandler;
export declare const getCaseTimelineMock: () => import("msw").HttpHandler[];
