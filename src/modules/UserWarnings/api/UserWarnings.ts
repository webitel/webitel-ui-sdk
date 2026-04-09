import { getDefaultInstance } from '@webitel/api-services/api/defaults';
import {
	applyTransform,
	snakeToCamel,
} from '@webitel/api-services/api/transformers';

const instance = getDefaultInstance();

const getUserWarnings = async () => {
	const url = 'users/warnings';
	try {
		const response = await instance.get(url);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, []);
	}
};

export { getUserWarnings };
