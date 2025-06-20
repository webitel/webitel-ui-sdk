/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Webitel API
 * OpenAPI spec version: 24.04.0
 */
import axios from '@aliasedDeps/api-services/axios';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
	ActivityWorkspaceWidgetParams,
	EngineActivityWorkspaceWidgetResponse,
	EngineDefaultDeviceConfigResponse,
} from '.././_models';

// --- header start
//

export const // --- title start
	getUserHelperService =
		// --- title end
		() => {
			// --- header end
			const defaultDeviceConfig = <
				TData = AxiosResponse<EngineDefaultDeviceConfigResponse>,
			>(
				type: string,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get(`/user/device/config/${type}`, options);
			};
			const activityWorkspaceWidget = <
				TData = AxiosResponse<EngineActivityWorkspaceWidgetResponse>,
			>(
				params?: ActivityWorkspaceWidgetParams,
				options?: AxiosRequestConfig,
			): Promise<TData> => {
				return axios.get('/user/widget/activity/today', {
					...options,
					params: { ...params, ...options?.params },
				});
			};

			// --- footer start
			return { defaultDeviceConfig, activityWorkspaceWidget };
		};
export type DefaultDeviceConfigResult =
	AxiosResponse<EngineDefaultDeviceConfigResponse>;
export type ActivityWorkspaceWidgetResult =
	AxiosResponse<EngineActivityWorkspaceWidgetResponse>;

// --- footer end
