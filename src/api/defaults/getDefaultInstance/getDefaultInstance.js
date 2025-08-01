import * as qs from 'qs-esm';

import generateInstance from '../../axios/generateInstance.js';
import updateTokenInterceptor from '../../interceptors/request/updateToken.interceptor.js';
import handleUnauthorizedInterceptor from '../../interceptors/response/handleUnauthorized.interceptor.js';

const getDefaultInstance = () => {
  const stringifyOptions = {
    arrayFormat: 'repeat',
  };

  return generateInstance({
    interceptors: {
      request: [updateTokenInterceptor],
      response: [handleUnauthorizedInterceptor],
    },
    baseURL: import.meta.env.VITE_API_URL,
    paramsSerializer: (params) => {
      return qs.stringify(params, stringifyOptions);
    },
  });
};

export { getDefaultInstance };

export default getDefaultInstance;
