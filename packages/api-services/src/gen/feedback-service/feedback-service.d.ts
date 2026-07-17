import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateFeedbackParams, EngineFeedback, GetFeedbackParams } from '../_models';
export declare const // --- title start
getFeedbackService: (axiosInstance?: AxiosInstance) => {
    getFeedback: (params?: GetFeedbackParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineFeedback>>;
    createFeedback: (params?: CreateFeedbackParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineFeedback>>;
};
export type GetFeedbackResult = AxiosResponse<EngineFeedback>;
export type CreateFeedbackResult = AxiosResponse<EngineFeedback>;
