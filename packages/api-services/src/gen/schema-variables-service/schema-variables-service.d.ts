import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	EngineCreateSchemaVariableRequest,
	EngineListSchemaVariable,
	EngineSchemaVariable,
	EngineSchemaVariablesServicePatchSchemaVariableBody,
	EngineSchemaVariablesServiceUpdateSchemaVariableBody,
	SearchSchemaVariableParams,
} from '../_models';
export declare const // --- title start
	getSchemaVariablesService: (axiosInstance?: AxiosInstance) => {
		searchSchemaVariable: (
			params?: SearchSchemaVariableParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineListSchemaVariable>>;
		createSchemaVariable: (
			engineCreateSchemaVariableRequest: EngineCreateSchemaVariableRequest,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineSchemaVariable>>;
		deleteSchemaVariable: (
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineSchemaVariable>>;
		readSchemaVariable: (
			id: number,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineSchemaVariable>>;
		patchSchemaVariable: (
			id: number,
			engineSchemaVariablesServicePatchSchemaVariableBody: EngineSchemaVariablesServicePatchSchemaVariableBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineSchemaVariable>>;
		updateSchemaVariable: (
			id: number,
			engineSchemaVariablesServiceUpdateSchemaVariableBody: EngineSchemaVariablesServiceUpdateSchemaVariableBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<EngineSchemaVariable>>;
	};
export type SearchSchemaVariableResult =
	AxiosResponse<EngineListSchemaVariable>;
export type CreateSchemaVariableResult = AxiosResponse<EngineSchemaVariable>;
export type DeleteSchemaVariableResult = AxiosResponse<EngineSchemaVariable>;
export type ReadSchemaVariableResult = AxiosResponse<EngineSchemaVariable>;
export type PatchSchemaVariableResult = AxiosResponse<EngineSchemaVariable>;
export type UpdateSchemaVariableResult = AxiosResponse<EngineSchemaVariable>;
