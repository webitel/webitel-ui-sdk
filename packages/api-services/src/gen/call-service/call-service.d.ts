import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	EngineActiveCall,
	EngineAggregateHistoryCallRequest,
	EngineBlindTransferCallResponse,
	EngineCallAnnotation,
	EngineCallServiceBlindTransferCallBody,
	EngineCallServiceCreateCallAnnotationBody,
	EngineCallServiceDtmfCallBody,
	EngineCallServiceEavesdropCallBody,
	EngineCallServiceHangupCallBody,
	EngineCallServiceHoldCallBody,
	EngineCallServicePatchHistoryCallBody,
	EngineCallServiceRedialCallBody,
	EngineCallServiceSetVariablesCallBody,
	EngineCallServiceUnHoldCallBody,
	EngineCallServiceUpdateCallAnnotationBody,
	EngineConfirmPushResponse,
	EngineCreateCallRequest,
	EngineCreateCallResponse,
	EngineDtmfCallResponse,
	EngineHangupCallResponse,
	EngineHistoryCall,
	EngineHoldCallResponse,
	EngineListAggregate,
	EngineListCall,
	EngineListHistoryCall,
	EngineSearchHistoryCallRequest,
	EngineSetVariablesCallResponse,
	ReadCallParams,
	SearchActiveCallParams,
	SearchHistoryCallParams,
} from '../_models';
export declare const // --- title start
	getCallService: (axiosInstance?: AxiosInstance) => {
		createCall: (
			engineCreateCallRequest: EngineCreateCallRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCreateCallResponse>>;
		searchActiveCall: (
			params?: SearchActiveCallParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListCall>>;
		hangupCall: (
			id: string,
			engineCallServiceHangupCallBody: EngineCallServiceHangupCallBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineHangupCallResponse>>;
		readCall: (
			id: string,
			params?: ReadCallParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineActiveCall>>;
		confirmPush: (
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineConfirmPushResponse>>;
		dtmfCall: (
			id: string,
			engineCallServiceDtmfCallBody: EngineCallServiceDtmfCallBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineDtmfCallResponse>>;
		eavesdropCall: (
			id: string,
			engineCallServiceEavesdropCallBody: EngineCallServiceEavesdropCallBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCreateCallResponse>>;
		holdCall: (
			id: string,
			engineCallServiceHoldCallBody: EngineCallServiceHoldCallBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineHoldCallResponse>>;
		blindTransferCall: (
			id: string,
			engineCallServiceBlindTransferCallBody: EngineCallServiceBlindTransferCallBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineBlindTransferCallResponse>>;
		unHoldCall: (
			id: string,
			engineCallServiceUnHoldCallBody: EngineCallServiceUnHoldCallBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineHoldCallResponse>>;
		setVariablesCall: (
			id: string,
			engineCallServiceSetVariablesCallBody: EngineCallServiceSetVariablesCallBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineSetVariablesCallResponse>>;
		searchHistoryCall: (
			params?: SearchHistoryCallParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListHistoryCall>>;
		searchHistoryCallPost: (
			engineSearchHistoryCallRequest: EngineSearchHistoryCallRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListHistoryCall>>;
		aggregateHistoryCall: (
			engineAggregateHistoryCallRequest: EngineAggregateHistoryCallRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListAggregate>>;
		createCallAnnotation: (
			callId: string,
			engineCallServiceCreateCallAnnotationBody: EngineCallServiceCreateCallAnnotationBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCallAnnotation>>;
		deleteCallAnnotation: (
			callId: string,
			id: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCallAnnotation>>;
		updateCallAnnotation: (
			callId: string,
			id: string,
			engineCallServiceUpdateCallAnnotationBody: EngineCallServiceUpdateCallAnnotationBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCallAnnotation>>;
		redialCall: (
			callId: string,
			engineCallServiceRedialCallBody: EngineCallServiceRedialCallBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCreateCallResponse>>;
		patchHistoryCall: (
			id: string,
			engineCallServicePatchHistoryCallBody: EngineCallServicePatchHistoryCallBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineHistoryCall>>;
	};
export type CreateCallResult = AxiosResponse<EngineCreateCallResponse>;
export type SearchActiveCallResult = AxiosResponse<EngineListCall>;
export type HangupCallResult = AxiosResponse<EngineHangupCallResponse>;
export type ReadCallResult = AxiosResponse<EngineActiveCall>;
export type ConfirmPushResult = AxiosResponse<EngineConfirmPushResponse>;
export type DtmfCallResult = AxiosResponse<EngineDtmfCallResponse>;
export type EavesdropCallResult = AxiosResponse<EngineCreateCallResponse>;
export type HoldCallResult = AxiosResponse<EngineHoldCallResponse>;
export type BlindTransferCallResult =
	AxiosResponse<EngineBlindTransferCallResponse>;
export type UnHoldCallResult = AxiosResponse<EngineHoldCallResponse>;
export type SetVariablesCallResult =
	AxiosResponse<EngineSetVariablesCallResponse>;
export type SearchHistoryCallResult = AxiosResponse<EngineListHistoryCall>;
export type SearchHistoryCallPostResult = AxiosResponse<EngineListHistoryCall>;
export type AggregateHistoryCallResult = AxiosResponse<EngineListAggregate>;
export type CreateCallAnnotationResult = AxiosResponse<EngineCallAnnotation>;
export type DeleteCallAnnotationResult = AxiosResponse<EngineCallAnnotation>;
export type UpdateCallAnnotationResult = AxiosResponse<EngineCallAnnotation>;
export type RedialCallResult = AxiosResponse<EngineCreateCallResponse>;
export type PatchHistoryCallResult = AxiosResponse<EngineHistoryCall>;
