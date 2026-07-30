import deepcopy from 'deep-copy';
import { get, set } from 'lodash-es';

const starToSearchTransformer =
	(path = 'search') =>
	(params: object) => {
		const copy = deepcopy(params);
		const value: string | undefined = get(copy, path);
		if (!value || value.slice(-1) === '*') return copy;
		return set(copy, path, `${value}*`);
	};

export default starToSearchTransformer;
