export const ResourceCidType = {
	None: 'none',
	Rpid: 'rpid',
	Pid: 'pid',
} as const;

export type ResourceCidType =
	(typeof ResourceCidType)[keyof typeof ResourceCidType];
