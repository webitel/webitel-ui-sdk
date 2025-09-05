import type { IStringifyOptions } from 'qs-esm';
import * as qs from 'qs-esm';

import { generateInstance } from '../../axios/generateInstance';
import { updateTokenInterceptor } from '../../interceptors/request/updateToken.interceptor';
import { handleUnauthorizedInterceptor } from '../../interceptors/response/handleUnauthorized.interceptor';
import {
  transformRequestCaseInterceptor
} from '../../interceptors/request/transformRequestCaseInterceptor.interceptor';

/**
 * Creates a default Axios instance with standard configuration
 * @returns Configured Axios instance
 */
export const getDefaultInstance = (zodSchema) => {
	const stringifyOptions = {
		arrayFormat: 'repeat',
	};

  return generateInstance({
    interceptors: {
      request: [
        [updateTokenInterceptor],
        [
          (config) => {
            if (!config.meta) config.meta = {};
            config.meta.zodSchema = zodSchema;
            return config;
          },
        ],
        [transformRequestCaseInterceptor],
      ],
      response: [[handleUnauthorizedInterceptor]],
    },
    baseURL: import.meta.env.VITE_API_URL,
    paramsSerializer: (params) => {
      return qs.stringify(params, stringifyOptions as IStringifyOptions);
    },
  });
};
