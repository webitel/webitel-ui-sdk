export const InteractionStatus = {
	NotEvaluated: 'EVALUATION_STATUS_NOT_EVALUATED',
	Pending: 'EVALUATION_STATUS_PENDING',
	Skipped: 'EVALUATION_STATUS_SKIPPED',
	Completed: 'EVALUATION_STATUS_COMPLETED',
} as const;

export type InteractionStatus =
	(typeof InteractionStatus)[keyof typeof InteractionStatus];
