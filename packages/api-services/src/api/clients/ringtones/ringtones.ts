import { applyTransform, notify } from '../../transformers';

/*
 * [Claude] not a backend api: a static index of the ringtones served from VITE_RINGTONES_URL
 */
export interface Ringtone {
	name: string;
	label: string;
	[key: string]: unknown;
}

const getRingtonesList = async (): Promise<Ringtone[]> => {
	const url = `${import.meta.env.VITE_RINGTONES_URL}/index.json`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Response from '...ringtones/index.json' was not ok");
		}
		const ringtones = await response.json();
		return ringtones.ringtones;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const RingtonesAPI = {
	getList: getRingtonesList,
};
