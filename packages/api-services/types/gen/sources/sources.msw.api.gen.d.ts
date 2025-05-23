import { http } from 'msw';
import type { CasesLocateSourceResponse, CasesSource, CasesSourceList } from '.././_models';
export declare const getListSourcesResponseMock: (overrideResponse?: Partial<CasesSourceList>) => CasesSourceList;
export declare const getCreateSourceResponseMock: (overrideResponse?: Partial<CasesSource>) => CasesSource;
export declare const getDeleteSourceResponseMock: (overrideResponse?: Partial<CasesSource>) => CasesSource;
export declare const getLocateSourceResponseMock: (overrideResponse?: Partial<CasesLocateSourceResponse>) => CasesLocateSourceResponse;
export declare const getUpdateSource2ResponseMock: (overrideResponse?: Partial<CasesSource>) => CasesSource;
export declare const getUpdateSourceResponseMock: (overrideResponse?: Partial<CasesSource>) => CasesSource;
export declare const getListSourcesMockHandler: (overrideResponse?: CasesSourceList | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<CasesSourceList> | CasesSourceList)) => import("msw").HttpHandler;
export declare const getCreateSourceMockHandler: (overrideResponse?: CasesSource | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<CasesSource> | CasesSource)) => import("msw").HttpHandler;
export declare const getDeleteSourceMockHandler: (overrideResponse?: CasesSource | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<CasesSource> | CasesSource)) => import("msw").HttpHandler;
export declare const getLocateSourceMockHandler: (overrideResponse?: CasesLocateSourceResponse | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<CasesLocateSourceResponse> | CasesLocateSourceResponse)) => import("msw").HttpHandler;
export declare const getUpdateSource2MockHandler: (overrideResponse?: CasesSource | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<CasesSource> | CasesSource)) => import("msw").HttpHandler;
export declare const getUpdateSourceMockHandler: (overrideResponse?: CasesSource | ((info: Parameters<Parameters<typeof http.put>[1]>[0]) => Promise<CasesSource> | CasesSource)) => import("msw").HttpHandler;
export declare const getSourcesMock: () => import("msw").HttpHandler[];
