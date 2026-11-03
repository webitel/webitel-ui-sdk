export const InteractionStatus = {
	NotEvaluated: 'not_evaluated',
	Pending: 'pending',
	Skipped: 'skipped',
	Completed: 'completed',
} as const;

export type InteractionStatus =
	(typeof InteractionStatus)[keyof typeof InteractionStatus];
