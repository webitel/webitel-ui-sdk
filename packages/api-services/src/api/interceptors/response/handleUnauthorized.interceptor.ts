/**
 * Axios response interceptor that handles 401 Unauthorized responses
 * by removing the access token from localStorage
 */
export const handleUnauthorizedInterceptor = [
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			console.warn('intercepted 401');
			localStorage.removeItem('access-token');
		}
		return Promise.reject(error);
	},
];
