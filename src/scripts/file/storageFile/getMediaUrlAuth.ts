import type { MediaUrlAuth } from '@webitel/api-services/api';

export const getMediaUrlAuth = (): MediaUrlAuth => ({
	baseUrl: import.meta.env.VITE_API_URL,
	accessToken: localStorage.getItem('access-token') || '',
});
