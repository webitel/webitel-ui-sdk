import * as qs from 'qs-esm';

const generateUrlTransformer = (baseUrl) => (params) => {
  const stringifyOptions = {
    skipEmptyString: true,
    skipNull: true,
    arrayFormat: 'repeat',
  };

  const url = `${baseUrl}?${qs.stringify(params, stringifyOptions)}`;
  return url;
};

export default generateUrlTransformer;
