import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiPresenceStatus, ApiSetStatusRequest, PresenceSetStatusBody } from '../_models';
export declare const // --- title start
getPresence: (axiosInstance?: AxiosInstance) => {
    setStatus2: (apiSetStatusRequest: ApiSetStatusRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiPresenceStatus>>;
    setStatus: (presenceSetStatusBody: PresenceSetStatusBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiPresenceStatus>>;
};
export type SetStatus2Result = AxiosResponse<ApiPresenceStatus>;
export type SetStatusResult = AxiosResponse<ApiPresenceStatus>;
