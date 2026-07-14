import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ActivityWorkspaceWidgetParams,
	EngineActivityWorkspaceWidgetResponse,
	EngineDefaultDeviceConfigResponse,
	EngineListOpenedWebSocket,
	OpenedWebSocketsParams,
} from '../_models';
export declare const // --- title start
	getUserHelperService: (axiosInstance?: AxiosInstance) => {
		defaultDeviceConfig: (
			type: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineDefaultDeviceConfigResponse>>;
		activityWorkspaceWidget: (
			params?: ActivityWorkspaceWidgetParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineActivityWorkspaceWidgetResponse>>;
		openedWebSockets: (
			userId: string[],
			params?: OpenedWebSocketsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListOpenedWebSocket>>;
	};
export type DefaultDeviceConfigResult =
	AxiosResponse<EngineDefaultDeviceConfigResponse>;
export type ActivityWorkspaceWidgetResult =
	AxiosResponse<EngineActivityWorkspaceWidgetResponse>;
export type OpenedWebSocketsResult = AxiosResponse<EngineListOpenedWebSocket>;
