import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ContactsGetTimelineCounterResponse, ContactsGetTimelineResponse, GetTimelineTimelineParams } from '../_models';
export declare const // --- title start
getTimeline: (axiosInstance?: AxiosInstance) => {
    getTimelineTimeline: (contactId: string, params?: GetTimelineTimelineParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsGetTimelineResponse>>;
    getTimelineCounterTimeline: (contactId: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<ContactsGetTimelineCounterResponse>>;
};
export type GetTimelineTimelineResult = AxiosResponse<ContactsGetTimelineResponse>;
export type GetTimelineCounterTimelineResult = AxiosResponse<ContactsGetTimelineCounterResponse>;
