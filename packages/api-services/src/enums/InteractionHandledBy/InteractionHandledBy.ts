export const InteractionHandledBy = {
	Agent: 'HANDLED_BY_AGENT',
	Bot: 'HANDLED_BY_BOT',
	Ivr: 'HANDLED_BY_IVR',
} as const;

export type InteractionHandledBy =
	(typeof InteractionHandledBy)[keyof typeof InteractionHandledBy];
