export const MemberStopCause = {
	MISSED: 'missed',
	TIMEOUT: 'timeout',
	FAILED: 'failed',
	ABANDONED: 'abandoned',
	SUCCESS: 'success',
	CANCEL: 'cancel',
	EXPIRED: 'expired',
	CANCELED_BY_TIMEOUT: 'canceled_by_timeout',
} as const;

export type MemberStopCause =
	(typeof MemberStopCause)[keyof typeof MemberStopCause];
