import { getUserHelperService } from '../../../gen-wire';
import { convertDuration } from '../../../scripts';
import {
	applyTransform,
	merge,
	notify,
	snakeToCamel,
} from '../../transformers';
import type { ApiParams } from '../_shared/types';

/**
 * The agent workspace's activity widget bar: one flat stats object, with the
 * duration fields pre-formatted for display.
 */
const getWorkspaceWidgets = async () => {
	const defaultObject = {
		callInbound: 0,
		callHandled: 0,
		callMissed: 0,
		callManual: 0,
		callQueueMissed: 0,
		callInboundQueue: 0,
		callDialerQueue: 0,
		avgHoldSec: 0,
		avgTalkSec: 0,
		occupancy: 0,
		utilization: 0,
		chatAccepts: 0,
		chatAht: 0,
		scoreCount: 0,
		scoreRequiredAvg: 0,
		sumTalkSec: 0,
		processing: 0,
		available: 0,
		voiceMail: 0,
		queueTalkSec: 0,
		taskAccepts: 0,
	};

	const responseHandler = (stats: ApiParams) => ({
		...stats,
		avgHoldSec: convertDuration(stats.avgHoldSec),
		avgTalkSec: convertDuration(stats.avgTalkSec),
		occupancy: `${stats.occupancy.toFixed(2)}%`,
		utilization: `${stats.utilization.toFixed(2)}%`,
		chatAht: convertDuration(stats.chatAht),
		sumTalkSec: convertDuration(stats.sumTalkSec),
		processing: convertDuration(stats.processing),
		voiceMail: convertDuration(stats.voiceMail),
		queueTalkSec: convertDuration(stats.queueTalkSec),
		available: convertDuration(stats.available),

		// left unformatted on purpose: https://webitel.atlassian.net/browse/DEV-4691?focusedCommentId=637940
		scoreRequiredAvg: stats.scoreRequiredAvg,
	});

	try {
		const response = await getUserHelperService().activityWorkspaceWidget();
		return applyTransform(response.data, [
			snakeToCamel(),
			merge(defaultObject),
			responseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const WorkspaceWidgetsAPI = {
	getWidgets: getWorkspaceWidgets,
};
