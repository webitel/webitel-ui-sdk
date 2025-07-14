import type { IStringifyOptions } from 'qs-esm';
import * as qs from 'qs-esm';

const generateUrlTransformer = (baseUrl) => (params) => {
  const stringifyOptions = {
    skipEmptyString: true,
    skipNull: true,
    arrayFormat: 'repeat',
  };

  const url = `${baseUrl}?${qs.stringify(params, stringifyOptions as IStringifyOptions)}`;
  return url;
};

export default generateUrlTransformer;
