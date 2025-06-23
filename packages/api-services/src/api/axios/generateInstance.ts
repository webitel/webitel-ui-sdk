import axios from 'axios';

/**
 * Generates an Axios instance with custom configuration
 * @param options - Configuration options
 * @param options.interceptors - Request and response interceptors
 * @param options.baseURL - Base URL for the instance
 * @param options.rest - Additional Axios configuration options
 * @returns Configured Axios instance
 */
export const generateInstance = ({ interceptors, baseURL, ...rest } = {}) => {
	const instance = axios.create({
		baseURL,
		headers: {
			'X-Webitel-Access': localStorage.getItem('access-token') || '',
		},
		...rest,
	});

	if (interceptors) {
		const { request, response } = interceptors;
		if (request) {
			for (const interceptor of request) {
				instance.interceptors.request.use(...interceptor);
			}
		}
		if (response) {
			for (const interceptor of response) {
				instance.interceptors.response.use(...interceptor);
			}
		}
	}

	return instance;
};
