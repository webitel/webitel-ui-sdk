import type { AxiosInterceptorManager, AxiosResponse } from 'axios';
/**
 * Axios response interceptor that handles 401 Unauthorized responses
 * by removing the access token from localStorage
 */
export declare const handleUnauthorizedInterceptor: Parameters<AxiosInterceptorManager<AxiosResponse>['use']>;
