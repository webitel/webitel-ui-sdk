import { getAgentService } from '@webitel/api-services/gen-wire';

import type { StatusChangePayload } from '../types/StatusChangePayload.types';

const patchAgentStatus = async ({
	agentId,
	status,
	pauseCause,
	statusComment,
	onlineSkill,
}: StatusChangePayload): Promise<{
	success: boolean;
}> => {
	/*
	 * `id` used to ride along in the body. The path already carries it and the
	 * endpoint does not declare it, so it was being ignored; dropped rather
	 * than cast past the type.
	 */
	const res = await getAgentService().updateAgentStatus(String(agentId), {
		status,
		payload: pauseCause,
		status_comment: statusComment,
		/*
		 * `LookupOption.id` is typed `string | number`, the endpoint declares a
		 * string. The values are already strings — they come straight from
		 * `EngineOnlineSkills.id` — so this narrows the type without changing
		 * what goes on the wire. Mapped rather than cast: a cast here would hide
		 * the day the two shapes genuinely diverge.
		 */
		online_skill: onlineSkill && {
			id: String(onlineSkill.id),
			name: onlineSkill.name,
		},
	});
	return {
		success: !!res,
	};
};

const AgentStatusAPI = {
	patch: patchAgentStatus,
};

export default AgentStatusAPI;
