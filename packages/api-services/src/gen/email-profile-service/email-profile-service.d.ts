import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { EngineCreateEmailProfileRequest, EngineEmailProfile, EngineEmailProfileServicePatchEmailProfileBody, EngineEmailProfileServiceUpdateEmailProfileBody, EngineListEmailProfile, EngineLoginEmailProfileResponse, EngineLogoutEmailProfileResponse, EngineTestEmailProfileResponse, SearchEmailProfileParams } from '../_models';
export declare const // --- title start
getEmailProfileService: (axiosInstance?: AxiosInstance) => {
    searchEmailProfile: (params?: SearchEmailProfileParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListEmailProfile>>;
    createEmailProfile: (engineCreateEmailProfileRequest: EngineCreateEmailProfileRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineEmailProfile>>;
    deleteEmailProfile: (id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineEmailProfile>>;
    readEmailProfile: (id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineEmailProfile>>;
    patchEmailProfile: (id: string, engineEmailProfileServicePatchEmailProfileBody: EngineEmailProfileServicePatchEmailProfileBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineEmailProfile>>;
    updateEmailProfile: (id: string, engineEmailProfileServiceUpdateEmailProfileBody: EngineEmailProfileServiceUpdateEmailProfileBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineEmailProfile>>;
    loginEmailProfile: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineLoginEmailProfileResponse>>;
    logoutEmailProfile: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineLogoutEmailProfileResponse>>;
    testEmailProfile: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineTestEmailProfileResponse>>;
};
export type SearchEmailProfileResult = AxiosResponse<EngineListEmailProfile>;
export type CreateEmailProfileResult = AxiosResponse<EngineEmailProfile>;
export type DeleteEmailProfileResult = AxiosResponse<EngineEmailProfile>;
export type ReadEmailProfileResult = AxiosResponse<EngineEmailProfile>;
export type PatchEmailProfileResult = AxiosResponse<EngineEmailProfile>;
export type UpdateEmailProfileResult = AxiosResponse<EngineEmailProfile>;
export type LoginEmailProfileResult = AxiosResponse<EngineLoginEmailProfileResponse>;
export type LogoutEmailProfileResult = AxiosResponse<EngineLogoutEmailProfileResponse>;
export type TestEmailProfileResult = AxiosResponse<EngineTestEmailProfileResponse>;
