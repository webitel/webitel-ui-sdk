import { getDefaultInstance } from '@webitel/api-services/api/defaults';
import { getUsers } from '@webitel/api-services/gen';
import {
	applyTransform,
	snakeToCamel,
} from '@webitel/api-services/api/transformers';

const instance = getDefaultInstance();
const usersApi = getUsers(instance);

const getUserWarnings = async () => {
	try {
		const response = await usersApi.getUserWarnings();
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, []);
	}
};

export { getUserWarnings };
