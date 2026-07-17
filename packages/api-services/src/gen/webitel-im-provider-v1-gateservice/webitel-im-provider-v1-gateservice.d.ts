import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
	GateServiceListGatesParams,
	WebitelImProviderV1ProviderListGatesResponse,
} from '../_models';
export declare const // --- title start
	getWebitelImProviderV1Gateservice: (axiosInstance?: AxiosInstance) => {
		gateServiceListGates: (
			params?: GateServiceListGatesParams,
			options?: AxiosRequestConfig,
		) => Promise<AxiosResponse<WebitelImProviderV1ProviderListGatesResponse>>;
	};
export type GateServiceListGatesResult =
	AxiosResponse<WebitelImProviderV1ProviderListGatesResponse>;
