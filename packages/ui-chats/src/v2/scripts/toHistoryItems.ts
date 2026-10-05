import { getUserTimeZone } from '@webitel/api-services/utils';
import type { MessageModel } from '../types';

import { isSameDayInZone } from './formatDate';
import { toTimestamp } from './toTimestamp';

export type ChatHistoryItem =
	| {
			kind: 'divider';
			key: string;
			/** timestamp of the first item of that day */
			date: number;
	  }
	| {
			kind: 'message' | 'system';
			key: string;
			message: MessageModel;
	  };

/**
 * Messages (oldest → newest) as render rows, with a divider before the first
 * item of each calendar day in `timeZone` (the operator's setting by default).
 * Items without a usable `createdAt` never open a new day.
 */
export const toHistoryItems = (
	messages: readonly MessageModel[],
	{
		timeZone = getUserTimeZone(),
	}: {
		timeZone?: string;
	} = {},
): ChatHistoryItem[] => {
	const items: ChatHistoryItem[] = [];
	// timestamp of the item that opened the current day
	let currentDayStart: number | null = null;

	for (const message of messages) {
		const timestamp = toTimestamp(message.createdAt);

		if (timestamp !== null) {
			if (
				currentDayStart === null ||
				!isSameDayInZone(currentDayStart, timestamp, timeZone)
			) {
				items.push({
					kind: 'divider',
					// keyed by the day's first message: a day can recur out of order
					key: `divider-${message.id}`,
					date: timestamp,
				});
				currentDayStart = timestamp;
			}
		}

		items.push({
			kind: message.system ? 'system' : 'message',
			key: message.id,
			message,
		});
	}

	return items;
};
