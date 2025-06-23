const updateTokenInterceptor = [
  (config) => {
    config.headers['X-Webitel-Access'] =
      localStorage.getItem('access-token') || '';
    return config;
  },
  (error) => Promise.reject(error),
];

export default updateTokenInterceptor;
