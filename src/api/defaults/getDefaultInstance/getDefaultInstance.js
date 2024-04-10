import generateInstance from '../../axios/generateInstance';
import updateTokenInterceptor
  from '../../interceptors/request/updateToken.interceptor';
import handleUnauthorizedInterceptor
  from '../../interceptors/response/handleUnauthorized.interceptor';

const getDefaultInstance = () => generateInstance({
  interceptors: {
    request: [updateTokenInterceptor],
    response: [handleUnauthorizedInterceptor],
  },
});

export default getDefaultInstance;
