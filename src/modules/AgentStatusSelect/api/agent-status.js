import { AgentServiceApiFactory } from 'webitel-sdk';

const AgentStatusAPIFactory = ({ instance, OpenAPIConfig }) => {
  const service = new AgentServiceApiFactory(OpenAPIConfig, '', instance);

  const patchAgentStatus = async ({ agentId, status, pauseCause }) => {
    try {
      const res = await service.updateAgentStatus(agentId, {
        status,
        id: agentId,
        payload: pauseCause,
      });
      return { success: !!res };
    } catch (err) {
      throw err;
    }
  };

  return {
    patch: patchAgentStatus,
  };
};

export default AgentStatusAPIFactory;
