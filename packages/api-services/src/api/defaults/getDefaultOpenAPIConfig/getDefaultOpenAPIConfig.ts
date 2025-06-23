import { Configuration } from 'webitel-sdk';

/**
 * Creates a default configuration for OpenAPI clients
 * @returns Configuration object with basePath, apiKey, and accessToken
 */
export const getDefaultOpenAPIConfig = () =>
	new Configuration({
		basePath: import.meta.env.VITE_API_URL,
		apiKey: localStorage.getItem('access-key') || '',
		accessToken: localStorage.getItem('access-key') || '',
	});
