import { getAgentService } from '@webitel/api-services/gen-wire';

/*
 * Takes the consuming app's axios instance rather than building one: this
 * component ships inside apps that own their own instance.
 */
const AgentStatusAPIFactory = ({ instance }) => {
	const patchAgentStatus = async ({
		agentId,
		status,
		pauseCause,
		statusComment,
		onlineSkill,
	}) => {
		const res = await getAgentService(instance).updateAgentStatus(agentId, {
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

	return {
		patch: patchAgentStatus,
	};
};

export default AgentStatusAPIFactory;
