import type { MessageModel } from '../types';
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

const localDayKey = (timestamp: number) => {
	const date = new Date(timestamp);
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

/**
 * Messages (oldest → newest) as render rows, with a divider before the first
 * item of each local calendar day. Items without a usable `createdAt` never
 * open a new day.
 */
export const toHistoryItems = (
	messages: readonly MessageModel[],
): ChatHistoryItem[] => {
	const items: ChatHistoryItem[] = [];
	let currentDay: string | null = null;

	for (const message of messages) {
		const timestamp = toTimestamp(message.createdAt);

		if (timestamp !== null) {
			const day = localDayKey(timestamp);
			if (day !== currentDay) {
				items.push({
					kind: 'divider',
					key: `divider-${day}`,
					date: timestamp,
				});
				currentDay = day;
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
