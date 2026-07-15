import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DeleteRoutingVariableParams, EngineCreateRoutingVariableRequest, EngineListRoutingVariable, EngineRoutingVariable, EngineRoutingVariableServiceUpdateRoutingVariableBody, ReadRoutingVariableParams, SearchRoutingVariableParams } from '../_models';
export declare const // --- title start
getRoutingVariableService: (axiosInstance?: AxiosInstance) => {
    searchRoutingVariable: (params?: SearchRoutingVariableParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListRoutingVariable>>;
    createRoutingVariable: (engineCreateRoutingVariableRequest: EngineCreateRoutingVariableRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRoutingVariable>>;
    deleteRoutingVariable: (id: string, params?: DeleteRoutingVariableParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRoutingVariable>>;
    readRoutingVariable: (id: string, params?: ReadRoutingVariableParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRoutingVariable>>;
    updateRoutingVariable: (id: string, engineRoutingVariableServiceUpdateRoutingVariableBody: EngineRoutingVariableServiceUpdateRoutingVariableBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRoutingVariable>>;
};
export type SearchRoutingVariableResult = AxiosResponse<EngineListRoutingVariable>;
export type CreateRoutingVariableResult = AxiosResponse<EngineRoutingVariable>;
export type DeleteRoutingVariableResult = AxiosResponse<EngineRoutingVariable>;
export type ReadRoutingVariableResult = AxiosResponse<EngineRoutingVariable>;
export type UpdateRoutingVariableResult = AxiosResponse<EngineRoutingVariable>;
