import { getDefaultAxiosInstance } from '../../axios/genClient';
import { applyTransform, notify } from '../../transformers';

/*
 * Hand-written rather than generated: `/user/settings/{key}` is absent from the
 * OpenAPI spec orval reads, so there is no `gen-wire` service for it.
 */
const url = (key: string) => `/user/settings/${encodeURIComponent(key)}`;

const getUserSettings = async ({ key }: { key: string }) => {
	try {
		const response = await getDefaultAxiosInstance().get(url(key));
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const setUserSettings = async ({
	key,
	value,
}: {
	key: string;
	value: object;
}) => {
	try {
		const response = await getDefaultAxiosInstance().put(url(key), value);
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const UserSettingsAPI = {
	get: getUserSettings,
	set: setUserSettings,
};
