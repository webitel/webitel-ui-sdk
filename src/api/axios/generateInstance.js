import axios from 'axios';

// 'X-Webitel-Access' ~ 'X-Access-Token'
const generateInstance = ({ interceptors } = {}) => {
  const instance = axios.create({
    baseURL: process ? process.env.VUE_APP_API_URL : import.meta.env.VITE_API_URL,
    headers: {
      'X-Webitel-Access': localStorage.getItem('access-token') || '',
    },
  });

  if (interceptors) {
    const { request, response } = interceptors;
    if (request) {
      request.forEach((interceptor) => instance.interceptors.request.use(...interceptor));
    }
    if (response) {
      response.forEach((interceptor) => instance.interceptors.response.use(...interceptor));
    }
  }

  return instance;
};

export default generateInstance;
