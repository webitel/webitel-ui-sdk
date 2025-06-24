import { getDefaultGetListResponse } from '@webitel/api-services/api';
import applyTransform, {
  merge,
  mergeEach,
  notify,
  snakeToCamel,
} from '@webitel/api-services/api';
import { AgentServiceApiFactory } from 'webitel-sdk';

const PauseCauseAPIFactory = ({ instance, OpenAPIConfig }) => {
  const service = new AgentServiceApiFactory(OpenAPIConfig, '', instance);

  const getList = async ({ agentId }) => {
    const defaultObject = {
      name: '',
      durationMin: 0,
      limitMin: 0,
    };

    const allowChange = true;
    try {
      const response = await service.searchPauseCauseForAgent(
        agentId,
        allowChange,
      );
      const { items, next } = applyTransform(response.data, [
        snakeToCamel(),
        merge(getDefaultGetListResponse()),
      ]);
      return {
        items: applyTransform(items, [mergeEach(defaultObject)]),
        next,
      };
    } catch (err) {
      throw applyTransform(err, [notify]);
    }
  };

  return {
    getList,
  };
};

export default PauseCauseAPIFactory;
