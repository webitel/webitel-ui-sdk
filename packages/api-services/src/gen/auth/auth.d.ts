import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiLoginResponse, ApiUserinfo, SignupParams, UserInfo2Params, UserInfoParams } from '../_models';
export declare const // --- title start
getAuth: (axiosInstance?: AxiosInstance) => {
    signup: (params?: SignupParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiLoginResponse>>;
    userInfo2: (params?: UserInfo2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiUserinfo>>;
    userInfo: (params?: UserInfoParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiUserinfo>>;
};
export type SignupResult = AxiosResponse<ApiLoginResponse>;
export type UserInfo2Result = AxiosResponse<ApiUserinfo>;
export type UserInfoResult = AxiosResponse<ApiUserinfo>;
