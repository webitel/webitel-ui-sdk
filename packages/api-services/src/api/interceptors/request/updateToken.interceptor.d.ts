import type {
	AxiosInterceptorManager,
	InternalAxiosRequestConfig,
} from 'axios';
/**
 * Axios request interceptor that updates the X-Webitel-Access header with the current access token
 */
export declare const updateTokenInterceptor: Parameters<
	AxiosInterceptorManager<InternalAxiosRequestConfig>['use']
>;
