import { getAgentAbsenceService } from '@webitel/api-services/gen';

import { getDefaultGetParams } from '../../defaults';
import {
  applyTransform,
  merge,
  notify,
  snakeToCamel,
} from '../../transformers';

export const agentAbsenceService = getAgentAbsenceService();

const getAgentAbsenceList = async (params) => {
  const { q, page, size, sort, fields } = applyTransform(params, [
    merge(getDefaultGetParams()),
  ]);

  try {
    const response =
      await agentAbsenceService.agentAbsenceServiceSearchAgentsAbsences({
        q,
        page,
        size,
        sort,
        fields,
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

const getAgentAbsence = async ({ itemId: id }) => {
  try {
    const response =
      await agentAbsenceService.agentAbsenceServiceSearchAgentAbsence(id);
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const addAgentAbsence = async ({ agentId, itemInstance }) => {
  try {
    const response =
      await agentAbsenceService.agentAbsenceServiceCreateAgentAbsence(
        agentId,
        itemInstance,
      );
    return applyTransform(response.data, [snakeToCamel()]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const updateAgentAbsence = async ({ itemInstance, itemId: id }) => {};

const deleteAgentAbsence = async ({ id }) => {};

const getAgentAbsenceLookup = (params) => {
  return getAgentAbsenceList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });
};

export const AgentAbsenceAPI = {
  getList: getAgentAbsenceList,
  get: getAgentAbsence,
  add: addAgentAbsence,
  update: updateAgentAbsence,
  delete: deleteAgentAbsence,
  getLookup: getAgentAbsenceLookup,
};
