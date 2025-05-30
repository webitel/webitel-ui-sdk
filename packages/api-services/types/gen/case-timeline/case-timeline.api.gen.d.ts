import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { GetTimelineParams, WebitelCasesGetTimelineCounterResponse, WebitelCasesGetTimelineResponse } from '.././_models';
export declare const // --- title start
getCaseTimeline: () => {
    getTimeline: <TData = AxiosResponse<WebitelCasesGetTimelineResponse, any>>(caseId: string, params?: GetTimelineParams, options?: AxiosRequestConfig) => Promise<TData>;
    getTimelineCounter: <TData = AxiosResponse<WebitelCasesGetTimelineCounterResponse, any>>(caseId: string, options?: AxiosRequestConfig) => Promise<TData>;
};
export type GetTimelineResult = AxiosResponse<WebitelCasesGetTimelineResponse>;
export type GetTimelineCounterResult = AxiosResponse<WebitelCasesGetTimelineCounterResponse>;
