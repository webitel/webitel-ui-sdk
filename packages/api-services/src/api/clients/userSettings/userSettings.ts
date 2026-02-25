import { UserSettingsApiFactory } from 'webitel-sdk';

import { getDefaultInstance, getDefaultOpenAPIConfig } from '../../defaults';
import { applyTransform, notify } from '../../transformers';

const instance = getDefaultInstance();
const configuration = getDefaultOpenAPIConfig();

const service = UserSettingsApiFactory(configuration, '', instance);

const getUserSettings = async ({ key }) => {
	try {
		const response = await service.getUserSettings(key);
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const setUserSettings = async ({ key, value }) => {
	try {
		const response = await service.setUserSettings(key, value);
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
