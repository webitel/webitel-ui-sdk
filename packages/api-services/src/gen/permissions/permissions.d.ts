import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ApiSearchPermissionResponse,
	GetPermissionsParams,
} from '../_models';
export declare const // --- title start
	getPermissions: (axiosInstance?: AxiosInstance) => {
		getPermissions: (
			params?: GetPermissionsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ApiSearchPermissionResponse>>;
	};
export type GetPermissionsResult = AxiosResponse<ApiSearchPermissionResponse>;
