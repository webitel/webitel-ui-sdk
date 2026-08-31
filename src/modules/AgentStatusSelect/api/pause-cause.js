import { getDefaultGetListResponse } from '@webitel/api-services/api/defaults';
import {
	applyTransform,
	merge,
	mergeEach,
	notify,
	snakeToCamel,
} from '@webitel/api-services/api/transformers';
import { getAgentService } from '@webitel/api-services/gen-wire';

const getList = async ({ agentId }) => {
	const defaultObject = {
		name: '',
		durationMin: 0,
		limitMin: 0,
	};

	try {
		const response = await getAgentService().searchPauseCauseForAgent(agentId, {
			allow_change: true,
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
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const PauseCauseAPI = {
	getList,
};

export default PauseCauseAPI;
