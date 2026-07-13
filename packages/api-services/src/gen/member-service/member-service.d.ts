import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	DeleteMemberParams,
	EngineAssignAttemptResponse,
	EngineAttemptRenewalResultResponse,
	EngineAttemptResultResponse,
	EngineCreateAttemptResponse,
	EngineDeleteAllMembersRequest,
	EngineListAttempt,
	EngineListHistoryAttempt,
	EngineListMember,
	EngineListMemberAttempt,
	EngineMemberBulkResponse,
	EngineMemberInQueue,
	EngineMemberServiceAssignAttemptBody,
	EngineMemberServiceAttemptCallbackBody,
	EngineMemberServiceAttemptResultBody,
	EngineMemberServiceAttemptsRenewalResultBody,
	EngineMemberServiceCreateAttemptBody,
	EngineMemberServiceCreateMemberBody,
	EngineMemberServiceCreateMemberBulkBody,
	EngineMemberServiceDeleteMembersBody,
	EngineMemberServicePatchMemberBody,
	EngineMemberServicePatchMemberOneBody,
	EngineMemberServiceResetMembersBody,
	EngineMemberServiceUpdateMemberBody,
	EngineResetActiveAttemptsRequest,
	EngineResetActiveAttemptsResponse,
	EngineResetMembersResponse,
	ReadMemberParams,
	SearchAttemptsHistoryParams,
	SearchAttemptsParams,
	SearchMemberAttemptsParams,
	SearchMemberInQueueParams,
	SearchMembersParams,
} from '../_models';
export declare const // --- title start
	getMemberService: (axiosInstance?: AxiosInstance) => {
		attemptCallback: (
			attemptId: string,
			engineMemberServiceAttemptCallbackBody: EngineMemberServiceAttemptCallbackBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAttemptResultResponse>>;
		searchMembers: (
			params?: SearchMembersParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListMember>>;
		patchMemberOne: (
			id: string,
			engineMemberServicePatchMemberOneBody: EngineMemberServicePatchMemberOneBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineMemberInQueue>>;
		searchAttempts: (
			params?: SearchAttemptsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListAttempt>>;
		resetActiveAttempts: (
			engineResetActiveAttemptsRequest: EngineResetActiveAttemptsRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineResetActiveAttemptsResponse>>;
		searchAttemptsHistory: (
			params?: SearchAttemptsHistoryParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListHistoryAttempt>>;
		assignAttempt: (
			attemptId: string,
			engineMemberServiceAssignAttemptBody: EngineMemberServiceAssignAttemptBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAssignAttemptResponse>>;
		attemptsRenewalResult: (
			attemptId: string,
			engineMemberServiceAttemptsRenewalResultBody: EngineMemberServiceAttemptsRenewalResultBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAttemptRenewalResultResponse>>;
		deleteAllMembers: (
			engineDeleteAllMembersRequest: EngineDeleteAllMembersRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListMember>>;
		deleteMembers: (
			queueId: string,
			engineMemberServiceDeleteMembersBody: EngineMemberServiceDeleteMembersBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListMember>>;
		searchMemberInQueue: (
			queueId: number,
			params?: SearchMemberInQueueParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListMember>>;
		createMember: (
			queueId: string,
			engineMemberServiceCreateMemberBody: EngineMemberServiceCreateMemberBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineMemberInQueue>>;
		createMemberBulk: (
			queueId: string,
			engineMemberServiceCreateMemberBulkBody: EngineMemberServiceCreateMemberBulkBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineMemberBulkResponse>>;
		resetMembers: (
			queueId: string,
			engineMemberServiceResetMembersBody: EngineMemberServiceResetMembersBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineResetMembersResponse>>;
		deleteMember: (
			queueId: string,
			id: string,
			params?: DeleteMemberParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineMemberInQueue>>;
		readMember: (
			queueId: string,
			id: string,
			params?: ReadMemberParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineMemberInQueue>>;
		patchMember: (
			queueId: string,
			id: string,
			engineMemberServicePatchMemberBody: EngineMemberServicePatchMemberBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineMemberInQueue>>;
		updateMember: (
			queueId: string,
			id: string,
			engineMemberServiceUpdateMemberBody: EngineMemberServiceUpdateMemberBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineMemberInQueue>>;
		searchMemberAttempts: (
			queueId: string,
			memberId: string,
			params?: SearchMemberAttemptsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListMemberAttempt>>;
		createAttempt: (
			queueId: string,
			memberId: string,
			engineMemberServiceCreateAttemptBody: EngineMemberServiceCreateAttemptBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineCreateAttemptResponse>>;
		attemptResult: (
			queueId: number,
			memberId: string,
			attemptId: string,
			engineMemberServiceAttemptResultBody: EngineMemberServiceAttemptResultBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineAttemptResultResponse>>;
	};
export type AttemptCallbackResult = AxiosResponse<EngineAttemptResultResponse>;
export type SearchMembersResult = AxiosResponse<EngineListMember>;
export type PatchMemberOneResult = AxiosResponse<EngineMemberInQueue>;
export type SearchAttemptsResult = AxiosResponse<EngineListAttempt>;
export type ResetActiveAttemptsResult =
	AxiosResponse<EngineResetActiveAttemptsResponse>;
export type SearchAttemptsHistoryResult =
	AxiosResponse<EngineListHistoryAttempt>;
export type AssignAttemptResult = AxiosResponse<EngineAssignAttemptResponse>;
export type AttemptsRenewalResultResult =
	AxiosResponse<EngineAttemptRenewalResultResponse>;
export type DeleteAllMembersResult = AxiosResponse<EngineListMember>;
export type DeleteMembersResult = AxiosResponse<EngineListMember>;
export type SearchMemberInQueueResult = AxiosResponse<EngineListMember>;
export type CreateMemberResult = AxiosResponse<EngineMemberInQueue>;
export type CreateMemberBulkResult = AxiosResponse<EngineMemberBulkResponse>;
export type ResetMembersResult = AxiosResponse<EngineResetMembersResponse>;
export type DeleteMemberResult = AxiosResponse<EngineMemberInQueue>;
export type ReadMemberResult = AxiosResponse<EngineMemberInQueue>;
export type PatchMemberResult = AxiosResponse<EngineMemberInQueue>;
export type UpdateMemberResult = AxiosResponse<EngineMemberInQueue>;
export type SearchMemberAttemptsResult = AxiosResponse<EngineListMemberAttempt>;
export type CreateAttemptResult = AxiosResponse<EngineCreateAttemptResponse>;
export type AttemptResultResult = AxiosResponse<EngineAttemptResultResponse>;
