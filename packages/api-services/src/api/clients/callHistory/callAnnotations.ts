import { getCallService } from '../../../gen-wire';
import {
	applyTransform,
	camelToSnake,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

/** Text notes pinned to a timeframe of a historical call. */
const fieldsToSend = [
	'note',
	'startSec',
	'endSec',
	'fileId',
	'callId',
];

const addCallAnnotation = async ({
	itemInstance,
}: {
	itemInstance: ApiParams;
}) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getCallService().createCallAnnotation(
			String(itemInstance.callId),
			item,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateCallAnnotation = async ({
	itemInstance,
}: {
	itemInstance: ApiParams;
}) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await getCallService().updateCallAnnotation(
			String(itemInstance.callId),
			String(itemInstance.id),
			item,
		);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteCallAnnotation = async ({
	itemInstance,
}: {
	itemInstance: ApiParams;
}) => {
	try {
		const response = await getCallService().deleteCallAnnotation(
			String(itemInstance.callId),
			String(itemInstance.id),
		);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const CallAnnotationsAPI = {
	add: addCallAnnotation,
	update: updateCallAnnotation,
	delete: deleteCallAnnotation,
};
