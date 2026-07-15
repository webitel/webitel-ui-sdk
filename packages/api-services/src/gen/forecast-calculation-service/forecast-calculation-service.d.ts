import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ForecastCalculationServiceExecuteForecastCalculationParams, ForecastCalculationServiceReadForecastCalculationParams, ForecastCalculationServiceSearchForecastCalculationParams, ForecastCalculationServiceUpdateForecastCalculationBody, WfmCreateForecastCalculationRequest, WfmCreateForecastCalculationResponse, WfmDeleteForecastCalculationResponse, WfmExecuteForecastCalculationResponse, WfmReadForecastCalculationResponse, WfmSearchForecastCalculationResponse, WfmUpdateForecastCalculationResponse } from '../_models';
export declare const // --- title start
getForecastCalculationService: (axiosInstance?: AxiosInstance) => {
    forecastCalculationServiceSearchForecastCalculation: (params?: ForecastCalculationServiceSearchForecastCalculationParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmSearchForecastCalculationResponse>>;
    forecastCalculationServiceCreateForecastCalculation: (wfmCreateForecastCalculationRequest: WfmCreateForecastCalculationRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmCreateForecastCalculationResponse>>;
    forecastCalculationServiceDeleteForecastCalculation: (id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmDeleteForecastCalculationResponse>>;
    forecastCalculationServiceReadForecastCalculation: (id: string, params?: ForecastCalculationServiceReadForecastCalculationParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmReadForecastCalculationResponse>>;
    forecastCalculationServiceExecuteForecastCalculation: (id: string, params?: ForecastCalculationServiceExecuteForecastCalculationParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmExecuteForecastCalculationResponse>>;
    forecastCalculationServiceUpdateForecastCalculation: (forecastCalculationServiceUpdateForecastCalculationBody: ForecastCalculationServiceUpdateForecastCalculationBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<WfmUpdateForecastCalculationResponse>>;
};
export type ForecastCalculationServiceSearchForecastCalculationResult = AxiosResponse<WfmSearchForecastCalculationResponse>;
export type ForecastCalculationServiceCreateForecastCalculationResult = AxiosResponse<WfmCreateForecastCalculationResponse>;
export type ForecastCalculationServiceDeleteForecastCalculationResult = AxiosResponse<WfmDeleteForecastCalculationResponse>;
export type ForecastCalculationServiceReadForecastCalculationResult = AxiosResponse<WfmReadForecastCalculationResponse>;
export type ForecastCalculationServiceExecuteForecastCalculationResult = AxiosResponse<WfmExecuteForecastCalculationResponse>;
export type ForecastCalculationServiceUpdateForecastCalculationResult = AxiosResponse<WfmUpdateForecastCalculationResponse>;
