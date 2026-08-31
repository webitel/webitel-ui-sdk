import { getAgentService } from '@webitel/api-services/gen-wire';

const patchAgentStatus = async ({
	agentId,
	status,
	pauseCause,
	statusComment,
	onlineSkill,
}) => {
	const res = await getAgentService().updateAgentStatus(agentId, {
		status,
		id: agentId,
		payload: pauseCause,
		status_comment: statusComment,
		online_skill: onlineSkill,
	});
	return {
		success: !!res,
	};
};

const AgentStatusAPI = {
	patch: patchAgentStatus,
};

export default AgentStatusAPI;
