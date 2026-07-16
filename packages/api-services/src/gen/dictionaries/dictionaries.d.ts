import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	CreateData200,
	CreateDataBody,
	DataBatchCreateDatasetResponse,
	DataDataset,
	DataInputDictionary,
	DataStructList,
	DeleteData2Params,
	DeleteDataParams,
	DeleteTypeParams,
	DictionariesBatchCreateDataBody,
	DictionariesImportCSVBody,
	LocateData200,
	LocateDataParams,
	ProtoDataStruct,
	SearchDataParams,
	SearchTypeParams,
	UpdateData2Body,
	UpdateData2Params,
	UpdateData200,
	UpdateData2200,
	UpdateDataBody,
	UpdateDataParams,
	UpdateTypeParams,
} from '../_models';
export declare const // --- title start
	getDictionaries: (axiosInstance?: AxiosInstance) => {
		deleteData: (
			repo: string,
			params: DeleteDataParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<DataDataset>>;
		searchData: (
			repo: string,
			params?: SearchDataParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<DataDataset>>;
		createData: (
			repo: string,
			createDataBody: CreateDataBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<CreateData200>>;
		batchCreateData: (
			repo: string,
			dictionariesBatchCreateDataBody: DictionariesBatchCreateDataBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<DataBatchCreateDatasetResponse>>;
		importCSV: (
			repo: string,
			dictionariesImportCSVBody: DictionariesImportCSVBody,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<DataDataset>>;
		deleteData2: (
			repo: string,
			id: string[],
			params?: DeleteData2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<DataDataset>>;
		locateData: (
			repo: string,
			id: string,
			params?: LocateDataParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<LocateData200>>;
		updateData: (
			repo: string,
			id: string,
			updateDataBody: UpdateDataBody,
			params?: UpdateDataParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<UpdateData200>>;
		updateData2: (
			repo: string,
			id: string,
			updateData2Body: UpdateData2Body,
			params?: UpdateData2Params,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<UpdateData2200>>;
		deleteType: (
			params: DeleteTypeParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<DataStructList>>;
		searchType: (
			params?: SearchTypeParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<DataStructList>>;
		locateType: (
			repo: string,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ProtoDataStruct>>;
		createType: (
			repo: string,
			dataInputDictionary: DataInputDictionary,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ProtoDataStruct>>;
		updateType: (
			repo: string,
			dataInputDictionary: DataInputDictionary,
			params?: UpdateTypeParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<ProtoDataStruct>>;
	};
export type DeleteDataResult = AxiosResponse<DataDataset>;
export type SearchDataResult = AxiosResponse<DataDataset>;
export type CreateDataResult = AxiosResponse<CreateData200>;
export type BatchCreateDataResult =
	AxiosResponse<DataBatchCreateDatasetResponse>;
export type ImportCSVResult = AxiosResponse<DataDataset>;
export type DeleteData2Result = AxiosResponse<DataDataset>;
export type LocateDataResult = AxiosResponse<LocateData200>;
export type UpdateDataResult = AxiosResponse<UpdateData200>;
export type UpdateData2Result = AxiosResponse<UpdateData2200>;
export type DeleteTypeResult = AxiosResponse<DataStructList>;
export type SearchTypeResult = AxiosResponse<DataStructList>;
export type LocateTypeResult = AxiosResponse<ProtoDataStruct>;
export type CreateTypeResult = AxiosResponse<ProtoDataStruct>;
export type UpdateTypeResult = AxiosResponse<ProtoDataStruct>;
