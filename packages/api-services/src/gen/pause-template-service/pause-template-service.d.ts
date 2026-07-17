import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { PauseTemplateServiceReadPauseTemplateParams, PauseTemplateServiceSearchPauseTemplateParams, PauseTemplateServiceUpdatePauseTemplateBody, WfmCreatePauseTemplateRequest, WfmCreatePauseTemplateResponse, WfmDeletePauseTemplateResponse, WfmReadPauseTemplateResponse, WfmSearchPauseTemplateResponse, WfmUpdatePauseTemplateResponse } from '../_models';
export declare const // --- title start
getPauseTemplateService: (axiosInstance?: AxiosInstance) => {
    pauseTemplateServiceSearchPauseTemplate: (params?: PauseTemplateServiceSearchPauseTemplateParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmSearchPauseTemplateResponse>>;
    pauseTemplateServiceCreatePauseTemplate: (wfmCreatePauseTemplateRequest: WfmCreatePauseTemplateRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmCreatePauseTemplateResponse>>;
    pauseTemplateServiceDeletePauseTemplate: (id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmDeletePauseTemplateResponse>>;
    pauseTemplateServiceReadPauseTemplate: (id: string, params?: PauseTemplateServiceReadPauseTemplateParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmReadPauseTemplateResponse>>;
    pauseTemplateServiceUpdatePauseTemplate: (pauseTemplateServiceUpdatePauseTemplateBody: PauseTemplateServiceUpdatePauseTemplateBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmUpdatePauseTemplateResponse>>;
};
export type PauseTemplateServiceSearchPauseTemplateResult = AxiosResponse<WfmSearchPauseTemplateResponse>;
export type PauseTemplateServiceCreatePauseTemplateResult = AxiosResponse<WfmCreatePauseTemplateResponse>;
export type PauseTemplateServiceDeletePauseTemplateResult = AxiosResponse<WfmDeletePauseTemplateResponse>;
export type PauseTemplateServiceReadPauseTemplateResult = AxiosResponse<WfmReadPauseTemplateResponse>;
export type PauseTemplateServiceUpdatePauseTemplateResult = AxiosResponse<WfmUpdatePauseTemplateResponse>;
