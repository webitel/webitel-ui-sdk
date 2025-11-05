import { getAgentAbsenceService } from '@webitel/api-services/gen';

import { getDefaultGetParams } from '../../defaults';
import {
  applyTransform,
  merge,
  notify,
  snakeToCamel,
} from '../../transformers';

export const agentAbsenceSerive = getAgentAbsenceService()

const getAgentAbsenceList = async (params) => {
  const { q, page, size, sort, fields } = applyTransform(params, [
    merge(getDefaultGetParams()),
  ]);

  try {
    const response = await agentAbsenceSerive.agentAbsenceServiceSearchAgentsAbsences({
      q,
      page,
      size,
      sort,
      fields
    });
    const { items, next } = applyTransform(response.data, [snakeToCamel()]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

export const AgentAbsenceAPI = {
  getList: getAgentAbsenceList,
};
