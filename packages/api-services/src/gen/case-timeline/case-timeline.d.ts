import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { GetTimelineParams, WebitelCasesGetTimelineCounterResponse, WebitelCasesGetTimelineResponse } from '../_models';
export declare const // --- title start
getCaseTimeline: (axiosInstance?: AxiosInstance) => {
    getTimeline: (caseId: string, params?: GetTimelineParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesGetTimelineResponse>>;
    getTimelineCounter: (caseId: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebitelCasesGetTimelineCounterResponse>>;
};
export type GetTimelineResult = AxiosResponse<WebitelCasesGetTimelineResponse>;
export type GetTimelineCounterResult = AxiosResponse<WebitelCasesGetTimelineCounterResponse>;
