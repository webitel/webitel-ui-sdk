import { http } from 'msw';
import type { WebitelCasesLocateStatusConditionResponse, WebitelCasesStatusCondition, WebitelCasesStatusConditionList } from '.././_models';
export declare const getListStatusConditionsResponseMock: (overrideResponse?: Partial<WebitelCasesStatusConditionList>) => WebitelCasesStatusConditionList;
export declare const getCreateStatusConditionResponseMock: (overrideResponse?: Partial<WebitelCasesStatusCondition>) => WebitelCasesStatusCondition;
export declare const getDeleteStatusConditionResponseMock: (overrideResponse?: Partial<WebitelCasesStatusCondition>) => WebitelCasesStatusCondition;
export declare const getLocateStatusConditionResponseMock: (overrideResponse?: Partial<WebitelCasesLocateStatusConditionResponse>) => WebitelCasesLocateStatusConditionResponse;
export declare const getUpdateStatusCondition2ResponseMock: (overrideResponse?: Partial<WebitelCasesStatusCondition>) => WebitelCasesStatusCondition;
export declare const getUpdateStatusConditionResponseMock: (overrideResponse?: Partial<WebitelCasesStatusCondition>) => WebitelCasesStatusCondition;
export declare const getListStatusConditionsMockHandler: (overrideResponse?: WebitelCasesStatusConditionList | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<WebitelCasesStatusConditionList> | WebitelCasesStatusConditionList)) => import("msw").HttpHandler;
export declare const getCreateStatusConditionMockHandler: (overrideResponse?: WebitelCasesStatusCondition | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<WebitelCasesStatusCondition> | WebitelCasesStatusCondition)) => import("msw").HttpHandler;
export declare const getDeleteStatusConditionMockHandler: (overrideResponse?: WebitelCasesStatusCondition | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<WebitelCasesStatusCondition> | WebitelCasesStatusCondition)) => import("msw").HttpHandler;
export declare const getLocateStatusConditionMockHandler: (overrideResponse?: WebitelCasesLocateStatusConditionResponse | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<WebitelCasesLocateStatusConditionResponse> | WebitelCasesLocateStatusConditionResponse)) => import("msw").HttpHandler;
export declare const getUpdateStatusCondition2MockHandler: (overrideResponse?: WebitelCasesStatusCondition | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<WebitelCasesStatusCondition> | WebitelCasesStatusCondition)) => import("msw").HttpHandler;
export declare const getUpdateStatusConditionMockHandler: (overrideResponse?: WebitelCasesStatusCondition | ((info: Parameters<Parameters<typeof http.put>[1]>[0]) => Promise<WebitelCasesStatusCondition> | WebitelCasesStatusCondition)) => import("msw").HttpHandler;
export declare const getStatusConditionsMock: () => import("msw").HttpHandler[];
