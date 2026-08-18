import type { LookupOption } from '../../../types';

export interface StatusChangePayload {
	agentId: string | number;
	status: string;
	pauseCause?: string;
	statusComment?: string;
	onlineSkill?: LookupOption;
}
