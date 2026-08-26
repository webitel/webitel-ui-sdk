export const CallReportingStatus = {
	ABANDONED: 'abandoned',
	CANCEL: 'cancel',
	SUCCESS: 'success',
	FAILED: 'failed',
	MISSED: 'missed',
	TIMEOUT: 'timeout',
	ENDLESS: 'endless',
	TRANSFERRED: 'transferred',
} as const;

export type CallReportingStatus =
	(typeof CallReportingStatus)[keyof typeof CallReportingStatus];
