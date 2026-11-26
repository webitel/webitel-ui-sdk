import type { EngineHistoryCall } from '@webitel/api-services/gen/models';

import { FormatDateMode } from '../../../enums';
import { groupFilesByType } from '../../../scripts/groupFilesByType';
import { formatDate } from '../../../utils/formatDate';
import type { CallVisualizationCall } from '../types/callVisualization';

export const toCallVisualizationCall = (
	call: EngineHistoryCall,
): CallVisualizationCall => ({
	id: call.id ?? '',
	createdAt: call.createdAt
		? formatDate(Number(call.createdAt), FormatDateMode.DATETIME)
		: '',
	timestamps: {
		createdAt: call.createdAt,
		answeredAt: call.answeredAt,
		bridgedAt: call.bridgedAt,
		queueBridgedAt: call.queueBridgedAt,
		duration: call.duration,
		billSec: call.billSec,
	},
	direction: call.direction,
	destination: call.destination,
	hold: (call.hold ?? []).map(({ start, stop, sec }) => ({
		start: Number(start),
		stop: Number(stop),
		sec,
	})),
	files: groupFilesByType(call.files),
	from: call.from ?? {},
	to: call.to,
	annotations: (call.annotations ?? []).map((annotation) => ({
		startSec: 0,
		endSec: 0,
		note: '',
		...annotation,
	})),
	transcripts: (call.transcripts ?? []).map((transcript) => ({
		...transcript,
		name: transcript.file?.name,
	})),
	filesJob: call.filesJob ?? [],
});
