import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { EngineCreateRegionRequest, EngineListRegion, EngineRegion, EngineRegionServicePatchRegionBody, EngineRegionServiceUpdateRegionBody, SearchRegionParams } from '../_models';
export declare const // --- title start
getRegionService: (axiosInstance?: AxiosInstance) => {
    searchRegion: (params?: SearchRegionParams, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineListRegion>>;
    createRegion: (engineCreateRegionRequest: EngineCreateRegionRequest, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRegion>>;
    deleteRegion: (id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRegion>>;
    readRegion: (id: string, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRegion>>;
    patchRegion: (id: string, engineRegionServicePatchRegionBody: EngineRegionServicePatchRegionBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRegion>>;
    updateRegion: (id: string, engineRegionServiceUpdateRegionBody: EngineRegionServiceUpdateRegionBody, options?: AxiosRequestConfig) => Promise<AxiosResponse<EngineRegion>>;
};
export type SearchRegionResult = AxiosResponse<EngineListRegion>;
export type CreateRegionResult = AxiosResponse<EngineRegion>;
export type DeleteRegionResult = AxiosResponse<EngineRegion>;
export type ReadRegionResult = AxiosResponse<EngineRegion>;
export type PatchRegionResult = AxiosResponse<EngineRegion>;
export type UpdateRegionResult = AxiosResponse<EngineRegion>;
