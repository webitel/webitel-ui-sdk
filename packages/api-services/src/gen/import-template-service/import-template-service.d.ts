import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { SearchImportTemplateParams, StorageCreateImportTemplateRequest, StorageImportTemplate, StorageImportTemplateServicePatchImportTemplateBody, StorageImportTemplateServiceUpdateImportTemplateBody, StorageListImportTemplate } from '../_models';
export declare const // --- title start
getImportTemplateService: (axiosInstance?: AxiosInstance) => {
    searchImportTemplate: (params?: SearchImportTemplateParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageListImportTemplate>>;
    createImportTemplate: (storageCreateImportTemplateRequest: StorageCreateImportTemplateRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageImportTemplate>>;
    deleteImportTemplate: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageImportTemplate>>;
    readImportTemplate: (id: number, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageImportTemplate>>;
    patchImportTemplate: (id: number, storageImportTemplateServicePatchImportTemplateBody: StorageImportTemplateServicePatchImportTemplateBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageImportTemplate>>;
    updateImportTemplate: (id: number, storageImportTemplateServiceUpdateImportTemplateBody: StorageImportTemplateServiceUpdateImportTemplateBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<StorageImportTemplate>>;
};
export type SearchImportTemplateResult = AxiosResponse<StorageListImportTemplate>;
export type CreateImportTemplateResult = AxiosResponse<StorageImportTemplate>;
export type DeleteImportTemplateResult = AxiosResponse<StorageImportTemplate>;
export type ReadImportTemplateResult = AxiosResponse<StorageImportTemplate>;
export type PatchImportTemplateResult = AxiosResponse<StorageImportTemplate>;
export type UpdateImportTemplateResult = AxiosResponse<StorageImportTemplate>;
