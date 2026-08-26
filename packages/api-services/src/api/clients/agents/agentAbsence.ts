import type {
	AgentAbsenceServiceCreateAgentAbsenceBody,
	AgentAbsenceServiceSearchAgentsAbsencesParams,
} from '@webitel/api-services/gen/models';
import { getAgentAbsenceService } from '../../../gen-wire';
import type {
	AgentAbsenceServiceCreateAgentAbsenceBody as AgentAbsenceCreateWireBody,
	AgentAbsenceServiceUpdateAgentAbsenceBody as AgentAbsenceUpdateWireBody,
} from '../../../gen-wire/_models';
import { getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	camelToSnake,
	merge,
	notify,
	snakeToCamel,
} from '../../transformers';
import type { ApiId } from '../_shared/types';

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
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export interface GetAgentAbsenceParams {
	agentId: ApiId;
	itemId: ApiId;
}

const getAgentAbsence = async ({
	agentId,
	itemId: id,
}: GetAgentAbsenceParams) => {
	try {
		const response =
			await getAgentAbsenceService().agentAbsenceServiceReadAgentAbsence(
				String(agentId),
				String(id),
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

export interface AddAgentAbsenceParams {
	agentId: ApiId;
	itemInstance: AgentAbsenceServiceCreateAgentAbsenceBody;
}

const addAgentAbsence = async ({
	agentId,
	itemInstance,
}: AddAgentAbsenceParams) => {
	const body = applyTransform<AgentAbsenceCreateWireBody>(itemInstance, [
		camelToSnake(),
	]);

	try {
		const response =
			await getAgentAbsenceService().agentAbsenceServiceCreateAgentAbsence(
				String(agentId),
				body,
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

export interface UpdateAgentAbsenceParams {
	agentId: ApiId;
	itemId: ApiId;
	itemInstance: AgentAbsenceServiceCreateAgentAbsenceBody;
}

const updateAgentAbsence = async ({
	agentId,
	itemInstance,
	itemId,
}: UpdateAgentAbsenceParams) => {
	const body = applyTransform<AgentAbsenceUpdateWireBody>(itemInstance, [
		camelToSnake(),
	]);

	try {
		const response =
			await getAgentAbsenceService().agentAbsenceServiceUpdateAgentAbsence(
				String(agentId),
				String(itemId),
				body,
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

export interface DeleteAgentAbsenceParams {
	id: ApiId;
	agentId: ApiId;
}

const deleteAgentAbsence = async ({
	id,
	agentId,
}: DeleteAgentAbsenceParams) => {
	try {
		const response =
			await getAgentAbsenceService().agentAbsenceServiceDeleteAgentAbsence(
				String(agentId),
				String(id),
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

const getAgentAbsenceLookup = (
	params: AgentAbsenceServiceSearchAgentsAbsencesParams,
) => {
	return getAgentAbsenceList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
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
