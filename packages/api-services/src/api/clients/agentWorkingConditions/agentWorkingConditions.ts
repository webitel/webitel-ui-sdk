import { isAxiosError } from 'axios';
import { getAgentWorkingConditionsService } from '../../../gen-wire';
import {
	applyTransform,
	camelToSnake,
	notify,
	sanitize,
	snakeToCamel,
} from '../../transformers';
import type {
	ApiParams,
	GetItemParams,
	UpdateItemParams,
} from '../_shared/types';

const fieldsToSend = [
	'workingCondition',
	'pauseTemplate',
];

/**
 * [Claude] WFM services wrap both request and response payloads in an `item` envelope.
 */
const itemResponseHandler = (response: ApiParams) => ({
	...response.item,
});

const emptyPauseTemplateHandler = (item: ApiParams) => ({
	...item,
	pauseTemplate: item.pauseTemplate?.id ? item.pauseTemplate : null,
});

const getAgentWorkingConditions = async ({ itemId: id }: GetItemParams) => {
	try {
		const response =
			await getAgentWorkingConditionsService().agentWorkingConditionsServiceReadAgentWorkingConditions(
				String(id),
			);
		return applyTransform(response.data, [
			snakeToCamel(),
			itemResponseHandler,
		]);
	} catch (err) {
		if (isAxiosError(err) && err.response?.status === 404) return {};
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updateAgentWorkingConditions = async ({
	itemInstance,
	itemId: id,
}: UpdateItemParams) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		emptyPauseTemplateHandler,
		camelToSnake(),
	]);
	try {
		const response =
			await getAgentWorkingConditionsService().agentWorkingConditionsServiceUpdateAgentWorkingConditions(
				String(id),
				{
					item,
				},
			);
		return applyTransform(response.data, [
			snakeToCamel(),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const AgentWorkingConditionsAPI = {
	get: getAgentWorkingConditions,
	update: updateAgentWorkingConditions,
};
