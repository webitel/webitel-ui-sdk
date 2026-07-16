import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	DeleteOutboundResourceGroupParams,
	DeleteOutboundResourceInGroupParams,
	EngineCreateOutboundResourceGroupRequest,
	EngineListOutboundResourceGroup,
	EngineListOutboundResourceInGroup,
	EngineOutboundResourceGroup,
	EngineOutboundResourceGroupServiceCreateOutboundResourceInGroupBody,
	EngineOutboundResourceGroupServiceUpdateOutboundResourceGroupBody,
	EngineOutboundResourceGroupServiceUpdateOutboundResourceInGroupBody,
	EngineOutboundResourceInGroup,
	ReadOutboundResourceGroupParams,
	ReadOutboundResourceInGroupParams,
	SearchOutboundResourceGroupParams,
	SearchOutboundResourceInGroupParams,
} from '../_models';
export declare const // --- title start
	getOutboundResourceGroupService: (axiosInstance?: AxiosInstance) => {
		searchOutboundResourceGroup: (
			params?: SearchOutboundResourceGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListOutboundResourceGroup>>;
		createOutboundResourceGroup: (
			engineCreateOutboundResourceGroupRequest: EngineCreateOutboundResourceGroupRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineOutboundResourceGroup>>;
		searchOutboundResourceInGroup: (
			groupId: string,
			params?: SearchOutboundResourceInGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListOutboundResourceInGroup>>;
		createOutboundResourceInGroup: (
			groupId: string,
			engineOutboundResourceGroupServiceCreateOutboundResourceInGroupBody: EngineOutboundResourceGroupServiceCreateOutboundResourceInGroupBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineOutboundResourceInGroup>>;
		deleteOutboundResourceInGroup: (
			groupId: string,
			id: string,
			params?: DeleteOutboundResourceInGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineOutboundResourceInGroup>>;
		readOutboundResourceInGroup: (
			groupId: string,
			id: string,
			params?: ReadOutboundResourceInGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineOutboundResourceInGroup>>;
		updateOutboundResourceInGroup: (
			groupId: string,
			id: string,
			engineOutboundResourceGroupServiceUpdateOutboundResourceInGroupBody: EngineOutboundResourceGroupServiceUpdateOutboundResourceInGroupBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineOutboundResourceInGroup>>;
		deleteOutboundResourceGroup: (
			id: string,
			params?: DeleteOutboundResourceGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineOutboundResourceGroup>>;
		readOutboundResourceGroup: (
			id: string,
			params?: ReadOutboundResourceGroupParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineOutboundResourceGroup>>;
		updateOutboundResourceGroup: (
			id: string,
			engineOutboundResourceGroupServiceUpdateOutboundResourceGroupBody: EngineOutboundResourceGroupServiceUpdateOutboundResourceGroupBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineOutboundResourceGroup>>;
	};
export type SearchOutboundResourceGroupResult =
	AxiosResponse<EngineListOutboundResourceGroup>;
export type CreateOutboundResourceGroupResult =
	AxiosResponse<EngineOutboundResourceGroup>;
export type SearchOutboundResourceInGroupResult =
	AxiosResponse<EngineListOutboundResourceInGroup>;
export type CreateOutboundResourceInGroupResult =
	AxiosResponse<EngineOutboundResourceInGroup>;
export type DeleteOutboundResourceInGroupResult =
	AxiosResponse<EngineOutboundResourceInGroup>;
export type ReadOutboundResourceInGroupResult =
	AxiosResponse<EngineOutboundResourceInGroup>;
export type UpdateOutboundResourceInGroupResult =
	AxiosResponse<EngineOutboundResourceInGroup>;
export type DeleteOutboundResourceGroupResult =
	AxiosResponse<EngineOutboundResourceGroup>;
export type ReadOutboundResourceGroupResult =
	AxiosResponse<EngineOutboundResourceGroup>;
export type UpdateOutboundResourceGroupResult =
	AxiosResponse<EngineOutboundResourceGroup>;
