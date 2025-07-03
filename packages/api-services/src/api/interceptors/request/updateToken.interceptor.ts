/**
 * Axios request interceptor that updates the X-Webitel-Access header with the current access token
 */
export const updateTokenInterceptor = [
	(config) => {
		config.headers['X-Webitel-Access'] =
			localStorage.getItem('access-token') || '';
		return config;
	},
	(error) => Promise.reject(error),
];
