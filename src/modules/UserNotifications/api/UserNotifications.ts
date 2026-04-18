import {
	applyTransform,
	snakeToCamel,
} from '@webitel/api-services/api/transformers';
import { getUsers } from '@webitel/api-services/gen';

const getUserWarnings = async () => {
	try {
		const response = await getUsers().getUserWarnings();
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, []);
	}
};

export { getUserWarnings };
