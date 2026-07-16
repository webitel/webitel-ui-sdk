import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	_DeleteParams,
	Create200,
	CreateBody,
	DataDataset,
	LocateRecords200,
	LocateRecordsParams,
	SearchRecordsParams,
	Update2Body,
	Update2Params,
	Update200,
	Update2200,
	UpdateBody,
	UpdateParams,
} from '../_models';
export declare const // --- title start
	getRecords: (axiosInstance?: AxiosInstance) => {
		_delete: (
			repo: string,
			params: _DeleteParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<DataDataset>>;
		searchRecords: (
			repo: string,
			params?: SearchRecordsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<DataDataset>>;
		create: (
			repo: string,
			createBody: CreateBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<Create200>>;
		locateRecords: (
			repo: string,
			id: string,
			params?: LocateRecordsParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<LocateRecords200>>;
		update: (
			repo: string,
			id: string,
			updateBody: UpdateBody,
			params?: UpdateParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<Update200>>;
		update2: (
			repo: string,
			id: string,
			update2Body: Update2Body,
			params?: Update2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<Update2200>>;
	};
export type _DeleteResult = AxiosResponse<DataDataset>;
export type SearchRecordsResult = AxiosResponse<DataDataset>;
export type CreateResult = AxiosResponse<Create200>;
export type LocateRecordsResult = AxiosResponse<LocateRecords200>;
export type UpdateResult = AxiosResponse<Update200>;
export type Update2Result = AxiosResponse<Update2200>;
