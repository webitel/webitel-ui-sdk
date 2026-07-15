import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ConfigServicePatchConfigBody, ConfigServiceReadSystemObjectsParams, ConfigServiceSearchConfigParams, ConfigServiceUpdateConfigBody, LoggerConfig, LoggerConfigs, LoggerCreateConfigRequest, LoggerEmpty, LoggerSystemObjects } from '../_models';
export declare const // --- title start
getConfigService: (axiosInstance?: AxiosInstance) => {
    configServiceReadSystemObjects: (params?: ConfigServiceReadSystemObjectsParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<LoggerSystemObjects>>;
    configServiceSearchConfig: (params?: ConfigServiceSearchConfigParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<LoggerConfigs>>;
    configServiceCreateConfig: (loggerCreateConfigRequest: LoggerCreateConfigRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<LoggerConfig>>;
    configServiceDeleteConfig: (configId: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<LoggerEmpty>>;
    configServiceReadConfig: (configId: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<LoggerConfig>>;
    configServicePatchConfig: (configId: number, configServicePatchConfigBody: ConfigServicePatchConfigBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<LoggerConfig>>;
    configServiceUpdateConfig: (configId: number, configServiceUpdateConfigBody: ConfigServiceUpdateConfigBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<LoggerConfig>>;
};
export type ConfigServiceReadSystemObjectsResult = AxiosResponse<LoggerSystemObjects>;
export type ConfigServiceSearchConfigResult = AxiosResponse<LoggerConfigs>;
export type ConfigServiceCreateConfigResult = AxiosResponse<LoggerConfig>;
export type ConfigServiceDeleteConfigResult = AxiosResponse<LoggerEmpty>;
export type ConfigServiceReadConfigResult = AxiosResponse<LoggerConfig>;
export type ConfigServicePatchConfigResult = AxiosResponse<LoggerConfig>;
export type ConfigServiceUpdateConfigResult = AxiosResponse<LoggerConfig>;
