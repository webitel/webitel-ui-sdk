import type { EngineLookup } from '@webitel/api-services/gen/models';
import type {
	ApiId,
	ApiParams,
	NestedAddItemParams,
	NestedDeleteItemParams,
	NestedGetItemParams,
	NestedUpdateItemParams,
} from '../_shared/types';
import { AgentsAPI } from './agents';

const getSupervisors = async (agentId: ApiId): Promise<EngineLookup[]> => {
	const { supervisor } = await AgentsAPI.get({
		itemId: agentId,
	});
	return supervisor ?? [];
};

const patchSupervisors = (agentId: ApiId, supervisor: EngineLookup[]) =>
	AgentsAPI.patch({
		id: agentId,
		changes: {
			supervisor,
		},
	});

const getAgentSubordinatesList = ({ parentId, ...params }: ApiParams) =>
	AgentsAPI.getList({
		...params,
		supervisorId: [
			Number(parentId),
		],
	});

const getAgentSubordinate = async ({ itemId }: NestedGetItemParams) => ({
	agent: await AgentsAPI.get({
		itemId,
	}),
});

const addAgentSubordinate = async ({
	parentId,
	itemInstance,
}: NestedAddItemParams) => {
	const agentId = itemInstance.agent.id;
	const supervisor = await getSupervisors(agentId);
	const supervisorIds = new Set([
		...supervisor.map(({ id }) => String(id)),
		String(parentId),
	]);
	return patchSupervisors(
		agentId,
		[
			...supervisorIds,
		].map((id) => ({
			id,
		})),
	);
};

const deleteAgentSubordinate = async ({
	parentId,
	id,
}: NestedDeleteItemParams) => {
	const supervisor = await getSupervisors(id);
	return patchSupervisors(
		id,
		supervisor.filter((sup) => String(sup.id) !== String(parentId)),
	);
};

const updateAgentSubordinate = async ({
	parentId,
	itemId,
	itemInstance,
}: NestedUpdateItemParams) => {
	const response = await addAgentSubordinate({
		parentId,
		itemInstance,
	});
	if (String(itemInstance.agent.id) !== String(itemId)) {
		await deleteAgentSubordinate({
			parentId,
			id: itemId,
		});
	}
	return response;
};

export const AgentSubordinatesAPI = {
	getList: getAgentSubordinatesList,
	get: getAgentSubordinate,
	add: addAgentSubordinate,
	update: updateAgentSubordinate,
	delete: deleteAgentSubordinate,
};
