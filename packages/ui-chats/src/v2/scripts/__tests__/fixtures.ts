import type { ChatParticipant, MessageModel, ThreadModel } from '../../types';

export const operator: ChatParticipant = {
	id: 'm-operator',
	contact: {
		name: 'Alina Timoshenko',
		type: 'webitel',
	},
};
export const colleague: ChatParticipant = {
	id: 'm-colleague',
	contact: {
		name: 'Oleh Bondar',
		type: 'webitel',
	},
};
export const bot: ChatParticipant = {
	id: 'm-bot',
	contact: {
		name: 'Helper',
		type: 'webchat',
		isBot: true,
	},
};
export const client: ChatParticipant = {
	id: 'm-client',
	contact: {
		name: 'Emily Johnson',
		type: 'telegram',
	},
};

let seq = 0;
export const message = (
	overrides: Partial<MessageModel> = {},
): MessageModel => {
	seq += 1;
	return {
		id: `msg-${seq}`,
		seq: String(seq),
		createdAt: String(Date.UTC(2026, 8, 15, 10, 0) + seq * 60_000),
		sender: client,
		body: `text ${seq}`,
		...overrides,
	};
};

export const thread = (overrides: Partial<ThreadModel> = {}): ThreadModel => ({
	id: 'thread-1',
	members: [
		operator,
		client,
	],
	readStates: [],
	...overrides,
});
