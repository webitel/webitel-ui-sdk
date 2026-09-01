import { getTeamTriggerService } from '../../../gen-wire';
import { getDefaultGetListResponse } from '../../defaults';
import {
	applyTransform,
	merge,
	mergeEach,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiId, ApiParams } from '../_shared/types';

/**
 * Triggers visible to the signed-in agent, across every team they belong to.
 * `TeamFlowsAPI` is the admin-side view of the same entity, scoped to one team.
 */
const getAgentTriggersList = async (params: ApiParams) => {
	const defaultObject = {
		enabled: false,
	};

	const { page, size, search, sort, fields, id, enabled } = applyTransform(
		params,
		[
			starToSearch('search'),
		],
	);

	const response = await getTeamTriggerService().searchAgentTrigger({
		page,
		size,
		// the generated param is `q`; `search` is what the datalist store sends
		q: search,
		sort,
		fields,
		enabled,
		id,
	});
	const { items, next } = applyTransform(response.data, [
		snakeToCamel(),
		merge(getDefaultGetListResponse()),
	]);
	return {
		items: applyTransform(items, [
			mergeEach(defaultObject),
		]),
		next,
	};
};

/**
 * Deliberately does not notify: callers word the success and failure toasts
 * themselves, and a notify here would double them.
 */
const runAgentTrigger = async ({ id }: { id: ApiId }) => {
	const response = await getTeamTriggerService().runTeamTrigger(Number(id), {});
	return applyTransform(response.data, [
		snakeToCamel(),
	]);
};

const getAgentTriggersLookup = (
	params: Parameters<typeof getAgentTriggersList>[0],
) =>
	getAgentTriggersList({
		...params,
		fields: params.fields || [
			'id',
			'name',
			'enabled',
		],
	});

export const AgentTriggersAPI = {
	getList: getAgentTriggersList,
	run: runAgentTrigger,
	getLookup: getAgentTriggersLookup,
};
