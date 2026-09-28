import { FormatDateMode } from '../../../enums';
import { getCallService } from '../../../gen-wire';
import { convertDuration } from '../../../scripts';
import { formatDate } from '../../../utils';
import { getDefaultGetListResponse, getDefaultGetParams } from '../../defaults';
import {
	applyTransform,
	merge,
	notify,
	snakeToCamel,
	starToSearch,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

/** Calls currently in progress. */
const getActiveCallsList = async (params: ApiParams) => {
	const {
		page,
		size,
		search,
		sort,
		fields,
		user,
		agent,
		queue,
		team,
		gateway,
		supervisor,
		direction,
		result,
		skipParent,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	const listResponseHandler = (items: ApiParams[]) => {
		return items.map((item) => ({
			...item,
			duration: convertDuration(Number(item.duration ?? 0)),
			createdAt: formatDate(Number(item.createdAt), FormatDateMode.DATETIME),
		}));
	};

	try {
		const response = await getCallService().searchActiveCall({
			page,
			size,
			// the generated param is `q`; `search` is what the datalist store sends
			q: search,
			sort,
			fields,
			user_id: user,
			agent_id: agent,
			queue_id: queue,
			team_id: team,
			gateway_id: gateway,
			supervisor_id: supervisor,
			direction,
			state: result,
			skip_parent: skipParent,
		});
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				listResponseHandler,
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const ActiveCallsAPI = {
	getList: getActiveCallsList,
};
