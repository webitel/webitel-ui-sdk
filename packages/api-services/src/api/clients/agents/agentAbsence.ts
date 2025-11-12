import type {
	AgentAbsenceServiceCreateAgentAbsenceBody,
	AgentAbsenceServiceSearchAgentsAbsencesParams,
} from '@webitel/api-services/gen';
import { getAgentAbsenceService } from '@webitel/api-services/gen';

import { getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	snakeToCamel,
} from '../../transformers';

const getAgentAbsenceList = async (
	params: AgentAbsenceServiceSearchAgentsAbsencesParams,
) => {
	const { q, page, size, sort, fields } = applyTransform(params, [
		merge(getDefaultGetParams()),
	]);

	try {
		const response =
			await getAgentAbsenceService().agentAbsenceServiceSearchAgentsAbsences({
				q,
				page,
				size,
				sort,
				fields,
			});
		const { items, next } = applyTransform(response.data, [snakeToCamel()]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

export interface GetAgentAbsenceParams {
	agentId: string;
	itemId: string;
}

const getAgentAbsence = async ({
	agentId,
	itemId: id,
}: GetAgentAbsenceParams) => {
	try {
		const response =
			await getAgentAbsenceService().agentAbsenceServiceReadAgentAbsence(
				agentId,
				id,
			);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

export interface AddAgentAbsenceParams {
	agentId: string;
	itemInstance: AgentAbsenceServiceCreateAgentAbsenceBody;
}

const addAgentAbsence = async ({
	agentId,
	itemInstance,
}: AddAgentAbsenceParams) => {
	try {
		const response =
			await getAgentAbsenceService().agentAbsenceServiceCreateAgentAbsence(
				agentId,
				itemInstance,
			);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

export interface UpdateAgentAbsenceParams {
	itemId: string;
	itemInstance: AgentAbsenceServiceCreateAgentAbsenceBody;
}

const updateAgentAbsence = async ({
	itemInstance,
	itemId,
}: UpdateAgentAbsenceParams) => {
	try {
		const response =
			await getAgentAbsenceService().agentAbsenceServiceUpdateAgentAbsence(
				itemId,
				itemInstance,
			);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

export interface DeleteAgentAbsenceParams {
	id: string;
	agentId: string;
}

const deleteAgentAbsence = async ({
	id,
	agentId,
}: DeleteAgentAbsenceParams) => {
	try {
		const response =
			await getAgentAbsenceService().agentAbsenceServiceDeleteAgentAbsence(
				agentId,
				id,
			);
		return applyTransform(response.data, [snakeToCamel()]);
	} catch (err) {
		throw applyTransform(err, [notify]);
	}
};

const getAgentAbsenceLookup = (
	params: AgentAbsenceServiceSearchAgentsAbsencesParams,
) => {
	return getAgentAbsenceList({
		...params,
		fields: params.fields || ['id', 'name'],
	});
};

export const AgentAbsenceAPI = {
	getList: getAgentAbsenceList,
	get: getAgentAbsence,
	add: addAgentAbsence,
	update: updateAgentAbsence,
	delete: deleteAgentAbsence,
	getLookup: getAgentAbsenceLookup,
};
