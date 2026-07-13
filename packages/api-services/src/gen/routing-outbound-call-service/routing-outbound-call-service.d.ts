import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DeleteRoutingOutboundCallParams, EngineCreateRoutingOutboundCallRequest, EngineListRoutingOutboundCall, EngineMovePositionRoutingOutboundCallResponse, EngineRoutingOutboundCall, EngineRoutingOutboundCallServiceMovePositionRoutingOutboundCallBody, EngineRoutingOutboundCallServicePatchRoutingOutboundCallBody, EngineRoutingOutboundCallServiceUpdateRoutingOutboundCallBody, ReadRoutingOutboundCallParams, SearchRoutingOutboundCallParams } from '../_models';
export declare const // --- title start
getRoutingOutboundCallService: (axiosInstance?: AxiosInstance) => {
    searchRoutingOutboundCall: (params?: SearchRoutingOutboundCallParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListRoutingOutboundCall>>;
    createRoutingOutboundCall: (engineCreateRoutingOutboundCallRequest: EngineCreateRoutingOutboundCallRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRoutingOutboundCall>>;
    movePositionRoutingOutboundCall: (fromId: string, toId: string, engineRoutingOutboundCallServiceMovePositionRoutingOutboundCallBody: EngineRoutingOutboundCallServiceMovePositionRoutingOutboundCallBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineMovePositionRoutingOutboundCallResponse>>;
    deleteRoutingOutboundCall: (id: string, params?: DeleteRoutingOutboundCallParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRoutingOutboundCall>>;
    readRoutingOutboundCall: (id: string, params?: ReadRoutingOutboundCallParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRoutingOutboundCall>>;
    patchRoutingOutboundCall: (id: string, engineRoutingOutboundCallServicePatchRoutingOutboundCallBody: EngineRoutingOutboundCallServicePatchRoutingOutboundCallBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRoutingOutboundCall>>;
    updateRoutingOutboundCall: (id: string, engineRoutingOutboundCallServiceUpdateRoutingOutboundCallBody: EngineRoutingOutboundCallServiceUpdateRoutingOutboundCallBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRoutingOutboundCall>>;
};
export type SearchRoutingOutboundCallResult = AxiosResponse<EngineListRoutingOutboundCall>;
export type CreateRoutingOutboundCallResult = AxiosResponse<EngineRoutingOutboundCall>;
export type MovePositionRoutingOutboundCallResult = AxiosResponse<EngineMovePositionRoutingOutboundCallResponse>;
export type DeleteRoutingOutboundCallResult = AxiosResponse<EngineRoutingOutboundCall>;
export type ReadRoutingOutboundCallResult = AxiosResponse<EngineRoutingOutboundCall>;
export type PatchRoutingOutboundCallResult = AxiosResponse<EngineRoutingOutboundCall>;
export type UpdateRoutingOutboundCallResult = AxiosResponse<EngineRoutingOutboundCall>;
