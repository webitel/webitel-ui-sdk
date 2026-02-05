const handleUnauthorizedInterceptor = [
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			const desiredUrl = encodeURIComponent(window.location.href);
			const authUrl = import.meta.env.VITE_AUTH_URL;
			window.location.href = `${authUrl}?redirectTo=${desiredUrl}`;
		}
		return Promise.reject(error);
	},
];

export default handleUnauthorizedInterceptor;
