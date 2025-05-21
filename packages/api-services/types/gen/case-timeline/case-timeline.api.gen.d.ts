import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CasesGetTimelineCounterResponse, CasesGetTimelineResponse, GetTimelineParams } from '.././_models';
export declare const // --- title start
getCaseTimeline: () => {
    getTimeline: <TData = AxiosResponse<CasesGetTimelineResponse, any>>(caseId: string, params?: GetTimelineParams, options?: AxiosRequestConfig) => Promise<TData>;
    getTimelineCounter: <TData = AxiosResponse<CasesGetTimelineCounterResponse, any>>(caseId: string, options?: AxiosRequestConfig) => Promise<TData>;
};
export type GetTimelineResult = AxiosResponse<CasesGetTimelineResponse>;
export type GetTimelineCounterResult = AxiosResponse<CasesGetTimelineCounterResponse>;
