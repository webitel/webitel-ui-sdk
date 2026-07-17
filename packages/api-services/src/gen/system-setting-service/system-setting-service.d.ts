import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { EngineCreateSystemSettingRequest, EngineListAvailableSystemSetting, EngineListSystemSetting, EngineSystemSetting, EngineSystemSettingServicePatchSystemSettingBody, EngineSystemSettingServiceUpdateSystemSettingBody, SearchAvailableSystemSettingParams, SearchSystemSettingParams } from '../_models';
export declare const // --- title start
getSystemSettingService: (axiosInstance?: AxiosInstance) => {
    searchSystemSetting: (params?: SearchSystemSettingParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListSystemSetting>>;
    createSystemSetting: (engineCreateSystemSettingRequest: EngineCreateSystemSettingRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineSystemSetting>>;
    searchAvailableSystemSetting: (params?: SearchAvailableSystemSettingParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListAvailableSystemSetting>>;
    deleteSystemSetting: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineSystemSetting>>;
    readSystemSetting: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineSystemSetting>>;
    patchSystemSetting: (id: number, engineSystemSettingServicePatchSystemSettingBody: EngineSystemSettingServicePatchSystemSettingBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineSystemSetting>>;
    updateSystemSetting: (id: number, engineSystemSettingServiceUpdateSystemSettingBody: EngineSystemSettingServiceUpdateSystemSettingBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineSystemSetting>>;
};
export type SearchSystemSettingResult = AxiosResponse<EngineListSystemSetting>;
export type CreateSystemSettingResult = AxiosResponse<EngineSystemSetting>;
export type SearchAvailableSystemSettingResult = AxiosResponse<EngineListAvailableSystemSetting>;
export type DeleteSystemSettingResult = AxiosResponse<EngineSystemSetting>;
export type ReadSystemSettingResult = AxiosResponse<EngineSystemSetting>;
export type PatchSystemSettingResult = AxiosResponse<EngineSystemSetting>;
export type UpdateSystemSettingResult = AxiosResponse<EngineSystemSetting>;
