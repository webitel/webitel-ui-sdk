import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ApiDeleteUsersResponse,
	ApiGeneratePasswordRequest,
	ApiGeneratePasswordResponse,
	ApiGetPasswordSettingsResponse,
	ApiGetUserWarningsResponse,
	ApiInputUser,
	ApiLogoutUserRequest,
	ApiLogoutUserResponse,
	ApiReadUserResponse,
	ApiSearchUsersRequest,
	ApiSearchUsersResponse,
	ApiUpdatePasswordRequest,
	ApiUpdatePasswordResponse,
	ApiUser,
	CreateUserParams,
	DeleteUsers2Params,
	DeleteUsersParams,
	ReadPasswordSettingsParams,
	ReadUser2Params,
	ReadUserParams,
	SearchUsersParams,
	UpdateUser2Params,
	UpdateUserParams,
	UsersLogoutUserBody,
} from '../_models';
export declare const // --- title start
	getUsers: (axiosInstance?: AxiosInstance) => {
		readUser2: (
			params?: ReadUser2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiReadUserResponse>>;
		deleteUsers2: (
			deleteUsers2Body: string[],
			params?: DeleteUsers2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiDeleteUsersResponse>>;
		searchUsers: (
			params?: SearchUsersParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiSearchUsersResponse>>;
		createUser: (
			apiInputUser: ApiInputUser,
			params?: CreateUserParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiUser>>;
		logoutUser2: (
			apiLogoutUserRequest: ApiLogoutUserRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLogoutUserResponse>>;
		updatePassword: (
			apiUpdatePasswordRequest: ApiUpdatePasswordRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiUpdatePasswordResponse>>;
		generatePassword: (
			apiGeneratePasswordRequest: ApiGeneratePasswordRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiGeneratePasswordResponse>>;
		readPasswordSettings: (
			params?: ReadPasswordSettingsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiGetPasswordSettingsResponse>>;
		searchUsers2: (
			apiSearchUsersRequest: ApiSearchUsersRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiSearchUsersResponse>>;
		getUserWarnings: (
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiGetUserWarningsResponse>>;
		deleteUsers: (
			id: string,
			params?: DeleteUsersParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiDeleteUsersResponse>>;
		readUser: (
			id: string,
			params?: ReadUserParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiReadUserResponse>>;
		updateUser2: (
			id: string,
			apiInputUser: ApiInputUser,
			params?: UpdateUser2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiUser>>;
		updateUser: (
			id: string,
			apiInputUser: ApiInputUser,
			params?: UpdateUserParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiUser>>;
		logoutUser: (
			id: string,
			usersLogoutUserBody: UsersLogoutUserBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiLogoutUserResponse>>;
	};
export type ReadUser2Result = AxiosResponse<ApiReadUserResponse>;
export type DeleteUsers2Result = AxiosResponse<ApiDeleteUsersResponse>;
export type SearchUsersResult = AxiosResponse<ApiSearchUsersResponse>;
export type CreateUserResult = AxiosResponse<ApiUser>;
export type LogoutUser2Result = AxiosResponse<ApiLogoutUserResponse>;
export type UpdatePasswordResult = AxiosResponse<ApiUpdatePasswordResponse>;
export type GeneratePasswordResult = AxiosResponse<ApiGeneratePasswordResponse>;
export type ReadPasswordSettingsResult =
	AxiosResponse<ApiGetPasswordSettingsResponse>;
export type SearchUsers2Result = AxiosResponse<ApiSearchUsersResponse>;
export type GetUserWarningsResult = AxiosResponse<ApiGetUserWarningsResponse>;
export type DeleteUsersResult = AxiosResponse<ApiDeleteUsersResponse>;
export type ReadUserResult = AxiosResponse<ApiReadUserResponse>;
export type UpdateUser2Result = AxiosResponse<ApiUser>;
export type UpdateUserResult = AxiosResponse<ApiUser>;
export type LogoutUserResult = AxiosResponse<ApiLogoutUserResponse>;
