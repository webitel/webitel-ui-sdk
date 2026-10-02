const en = {
	composer: {
		placeholder: 'Write a message...',
		attach: 'Attach files',
		emoji: 'Emoji',
		send: 'Send',
	},
	history: {
		today: 'Today',
		waitingForOperator: 'Waiting for operator to accept…',
		deletedMessage: 'Message deleted',
		unsupportedMessage: 'Unsupported message',
		download: 'Download',
	},
	systemNotice: {
		started: 'Chat started by {actor}',
		joined: '{actor} joined the chat',
		accepted: '{actor} accepted the chat',
		transferred: '{actor} transferred the chat',
		left: '{actor} left the chat',
		ended: 'Chat ended by {actor}',
		unknown: 'System event',
		system: 'system',
	},
};

export type ChatsV2Locale = typeof en;

export default en;
