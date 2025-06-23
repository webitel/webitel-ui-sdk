import axios from 'axios';

// 'X-Webitel-Access' ~ 'X-Access-Token'
const generateInstance = ({ interceptors, baseURL, ...rest } = {}) => {
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

export default generateInstance;
