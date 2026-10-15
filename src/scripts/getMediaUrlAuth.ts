import type { MediaUrlAuth } from '@webitel/api-services/api';

/** [Claude] API url and token for api-services media URL helpers, which don't read env or storage themselves; read on every call, as the token changes after login */
export const getMediaUrlAuth = (): MediaUrlAuth => ({
	baseUrl: import.meta.env.VITE_API_URL,
	accessToken: localStorage.getItem('access-token') || '',
});
