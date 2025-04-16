import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultInstance,
} from '../../../defaults';
import applyTransform, {
  camelToSnake,
  generateUrl,
  merge,
  notify,
  sanitize,
} from '../../../transformers';

const instance = getDefaultInstance();

const getSysTypeRecordsList = async ({ path, display, primary, ...params }) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(path),
  ]);
  try {
    const response = await instance.get(url);
    const { data, items, next } = applyTransform(response.data, [
      merge(getDefaultGetListResponse()),
    ]);

    return {
      // Some endpoints return data, some return items so we need to check for both of them
      items:
        applyTransform(data || items, [
          // transformItemsForSelect({ display, primary }),
        ]) ?? [],
      next,
    };
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const getSysTypeRecordsLookup = (params) =>
  getSysTypeRecordsList({
    ...params,
    fields: params.fields || ['id', 'name'],
  });

const SysTypesApi = {
  getList: getSysTypeRecordsList,
  getLookup: getSysTypeRecordsLookup,
};

export { getSysTypeRecordsList, getSysTypeRecordsLookup };

export default SysTypesApi;
