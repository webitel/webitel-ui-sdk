import qs from 'qs';
import generateInstance from '../../axios/generateInstance';
import updateTokenInterceptor from '../../interceptors/request/updateToken.interceptor';
import handleUnauthorizedInterceptor from '../../interceptors/response/handleUnauthorized.interceptor';

const getDefaultInstance = () => {
  return generateInstance({
    interceptors: {
      request: [updateTokenInterceptor],
      response: [handleUnauthorizedInterceptor],
    },
    baseURL: import.meta.env.VITE_API_URL,
    paramsSerializer: (params) => {
      return qs.stringify(params);
    },
  });
};

export { getDefaultInstance };

export default getDefaultInstance;
