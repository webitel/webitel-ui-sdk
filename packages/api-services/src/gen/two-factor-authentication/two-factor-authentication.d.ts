import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiGenerateUserTfaKeyResponse, ApiGetUserTfaKeyResponse } from '../_models';
export declare const // --- title start
getTwoFactorAuthentication: (axiosInstance?: AxiosInstance) => {
    getUserTfaKey: (userId: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiGetUserTfaKeyResponse>>;
    generateUserTfaKey: (userId: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiGenerateUserTfaKeyResponse>>;
};
export type GetUserTfaKeyResult = AxiosResponse<ApiGetUserTfaKeyResponse>;
export type GenerateUserTfaKeyResult = AxiosResponse<ApiGenerateUserTfaKeyResponse>;
