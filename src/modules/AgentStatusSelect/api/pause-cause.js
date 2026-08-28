import { getDefaultGetListResponse } from '@webitel/api-services/api/defaults';
import {
	applyTransform,
	merge,
	mergeEach,
	notify,
	snakeToCamel,
} from '@webitel/api-services/api/transformers';
import { getAgentService } from '@webitel/api-services/gen-wire';

/*
 * Takes the consuming app's axios instance rather than building one: this
 * component ships inside apps that own their own instance.
 */
const PauseCauseAPIFactory = ({ instance }) => {
	const getList = async ({ agentId }) => {
		const defaultObject = {
			name: '',
			durationMin: 0,
			limitMin: 0,
		};

		try {
			const response = await getAgentService(instance).searchPauseCauseForAgent(
				agentId,
				{
					allow_change: true,
				},
			);
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

	return {
		getList,
	};
};

export default PauseCauseAPIFactory;
