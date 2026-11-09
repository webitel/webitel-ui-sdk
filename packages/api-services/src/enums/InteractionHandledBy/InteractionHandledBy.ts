export const InteractionHandledBy = {
	Agent: 'agent',
	Bot: 'bot',
	Ivr: 'ivr',
} as const;

export type InteractionHandledBy =
	(typeof InteractionHandledBy)[keyof typeof InteractionHandledBy];
