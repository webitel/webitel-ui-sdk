import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	ContactsInputVariable,
	ContactsVariable,
	ContactsVariableList,
	DeleteVariableParams,
	DeleteVariablesParams,
	ListVariablesParams,
	MergeVariablesParams,
	ResetVariablesParams,
	UpdateVariable2Body,
	UpdateVariable2Params,
	UpdateVariableBody,
	UpdateVariableParams,
} from '../_models';
export declare const // --- title start
	getVariables: (axiosInstance?: AxiosInstance) => {
		deleteVariables: (
			contactId: string,
			params: DeleteVariablesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsVariableList>>;
		listVariables: (
			contactId: string,
			params?: ListVariablesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsVariableList>>;
		mergeVariables: (
			contactId: string,
			contactsInputVariable: ContactsInputVariable[],
			params?: MergeVariablesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsVariableList>>;
		resetVariables: (
			contactId: string,
			contactsInputVariable: ContactsInputVariable[],
			params?: ResetVariablesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsVariableList>>;
		deleteVariable: (
			contactId: string,
			etag: string,
			params?: DeleteVariableParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsVariable>>;
		updateVariable2: (
			contactId: string,
			etag: string,
			updateVariable2Body: UpdateVariable2Body,
			params?: UpdateVariable2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsVariableList>>;
		updateVariable: (
			contactId: string,
			etag: string,
			updateVariableBody: UpdateVariableBody,
			params?: UpdateVariableParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ContactsVariableList>>;
	};
export type DeleteVariablesResult = AxiosResponse<ContactsVariableList>;
export type ListVariablesResult = AxiosResponse<ContactsVariableList>;
export type MergeVariablesResult = AxiosResponse<ContactsVariableList>;
export type ResetVariablesResult = AxiosResponse<ContactsVariableList>;
export type DeleteVariableResult = AxiosResponse<ContactsVariable>;
export type UpdateVariable2Result = AxiosResponse<ContactsVariableList>;
export type UpdateVariableResult = AxiosResponse<ContactsVariableList>;
