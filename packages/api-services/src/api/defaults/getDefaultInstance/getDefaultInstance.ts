import qs from 'qs';
import { generateInstance } from '../../axios/generateInstance';
import { updateTokenInterceptor } from '../../interceptors/request/updateToken.interceptor';
import { handleUnauthorizedInterceptor } from '../../interceptors/response/handleUnauthorized.interceptor';

/**
 * Creates a default Axios instance with standard configuration
 * @returns Configured Axios instance
 */
export const getDefaultInstance = () => {
	return generateInstance({
		interceptors: {
			request: [updateTokenInterceptor],
			response: [handleUnauthorizedInterceptor],
		},
		baseURL: import.meta.env.VITE_API_URL,
		paramsSerializer: (params) => {
			return qs.stringify(params);
		},
	});
};
