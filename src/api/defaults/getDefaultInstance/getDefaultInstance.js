import generateInstance from '../../axios/generateInstance.js';
import updateTokenInterceptor
  from '../../interceptors/request/updateToken.interceptor.js';
import handleUnauthorizedInterceptor
  from '../../interceptors/response/handleUnauthorized.interceptor.js';

const getDefaultInstance = () => generateInstance({
  interceptors: {
    request: [updateTokenInterceptor],
    response: [handleUnauthorizedInterceptor],
  },
  baseURL: import.meta.env.VITE_API_URL,
});

export default getDefaultInstance;
