import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { WebMeetingBackendCreateMeetingRequest, WebMeetingBackendCreateMeetingResponse, WebMeetingBackendMeetingServiceSatisfactionMeetingBody, WebMeetingBackendMeetingView, WebMeetingBackendSatisfactionMeetingResponse } from '../_models';
export declare const // --- title start
getMeetingService: (axiosInstance?: AxiosInstance) => {
    createMeeting: (webMeetingBackendCreateMeetingRequest: WebMeetingBackendCreateMeetingRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebMeetingBackendCreateMeetingResponse>>;
    getMeetingView: (id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebMeetingBackendMeetingView>>;
    satisfactionMeeting: (id: string, webMeetingBackendMeetingServiceSatisfactionMeetingBody: WebMeetingBackendMeetingServiceSatisfactionMeetingBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<WebMeetingBackendSatisfactionMeetingResponse>>;
};
export type CreateMeetingResult = AxiosResponse<WebMeetingBackendCreateMeetingResponse>;
export type GetMeetingViewResult = AxiosResponse<WebMeetingBackendMeetingView>;
export type SatisfactionMeetingResult = AxiosResponse<WebMeetingBackendSatisfactionMeetingResponse>;
