import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { AddUserAccessTokenBody, AddUserAccessTokenParams, ApiUserAccessToken, ApiUserAccessTokenList, DeleteUserAccessTokenParams, GetUserAccessTokenParams, ListUserAccessTokenParams, UpdateUserAccessToken2Body, UpdateUserAccessToken2Params, UpdateUserAccessTokenBody, UpdateUserAccessTokenParams } from '../_models';
export declare const // --- title start
getUserAccessTokens: (axiosInstance?: AxiosInstance) => {
    addUserAccessToken: (addUserAccessTokenBody: AddUserAccessTokenBody, params?: AddUserAccessTokenParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiUserAccessToken>>;
    updateUserAccessToken2: (updateUserAccessToken2Body: UpdateUserAccessToken2Body, params?: UpdateUserAccessToken2Params, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiUserAccessToken>>;
    updateUserAccessToken: (updateUserAccessTokenBody: UpdateUserAccessTokenBody, params?: UpdateUserAccessTokenParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiUserAccessToken>>;
    listUserAccessToken: (params?: ListUserAccessTokenParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiUserAccessTokenList>>;
    deleteUserAccessToken: (id: string, params?: DeleteUserAccessTokenParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiUserAccessToken>>;
    getUserAccessToken: (id: string, params?: GetUserAccessTokenParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<ApiUserAccessToken>>;
};
export type AddUserAccessTokenResult = AxiosResponse<ApiUserAccessToken>;
export type UpdateUserAccessToken2Result = AxiosResponse<ApiUserAccessToken>;
export type UpdateUserAccessTokenResult = AxiosResponse<ApiUserAccessToken>;
export type ListUserAccessTokenResult = AxiosResponse<ApiUserAccessTokenList>;
export type DeleteUserAccessTokenResult = AxiosResponse<ApiUserAccessToken>;
export type GetUserAccessTokenResult = AxiosResponse<ApiUserAccessToken>;
