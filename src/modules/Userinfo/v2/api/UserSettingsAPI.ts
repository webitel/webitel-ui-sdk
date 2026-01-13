import { getDefaultInstance } from '@webitel/api-services/api/defaults';
import {
	applyTransform,
	notify,
	snakeToCamel,
} from '@webitel/api-services/api/transformers';

const instance = getDefaultInstance();

const BASE_URL = '/user/settings';

const getUserTimezone = async (): Promise<{ timezone: string }> => {
	try {
		const response = await instance.get(`${BASE_URL}/timezone`);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const setUserTimezone = async (timezone: string) => {
	const url = `${BASE_URL}/timezone`;
	try {
		const response = await instance.put(url, { timezone });
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

export default {
	getUserTimezone,
	setUserTimezone,
};
