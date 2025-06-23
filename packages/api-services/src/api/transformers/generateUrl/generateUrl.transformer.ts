import qs from 'query-string';

const generateUrlTransformer = (baseUrl) => (params) => {
	const stringifyOptions = {
		skipEmptyString: true,
		skipNull: true,
	};

	const url = `${baseUrl}?${qs.stringify(params, stringifyOptions)}`;
	return url;
};

export default generateUrlTransformer;
