import {
  getDefaultGetListResponse,
  getDefaultGetParams,
  getDefaultInstance,
} from '../../defaults/index.js';
import applyTransform, {
  camelToSnake,
  generateUrl,
  merge,
  mergeEach,
  notify,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '../../transformers/index.js';

const permissionsUrl = 'acl';

const handlePermissionsList = (items) => {
  return items.map((item) => ({
    ...item,
    access: {
      x: {
        id: (item.granted.match(/x/g) || []).length + 1,
        rule: 'x'.repeat((item.granted.match(/x/g) || []).length),
      },
      r: {
        id: (item.granted.match(/r/g) || []).length + 1,
        rule: 'r'.repeat((item.granted.match(/r/g) || []).length),
      },
      w: {
        id: (item.granted.match(/w/g) || []).length + 1,
        rule: 'w'.repeat((item.granted.match(/w/g) || []).length),
      },
      d: {
        id: (item.granted.match(/d/g) || []).length + 1,
        rule: 'd'.repeat((item.granted.match(/d/g) || []).length),
      },
    },
  }));
};

export const generatePermissionsApi = (baseUrl) => {
  const instance = getDefaultInstance();

  const getList = async ({ parentId, ...params }) => {
    const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

    const defaultObject = {
      user: false,
    };

    const url = applyTransform(params, [
      merge(getDefaultGetParams()),
      starToSearch('search'),
      (params) => ({
        ...params,
        q: params.search,
      }),
      sanitize(fieldsToSend),
      camelToSnake(),
      generateUrl(`${baseUrl}/${parentId}/${permissionsUrl}`),
    ]);
    try {
      const response = await instance.get(url);
      const { items, next } = applyTransform(response.data, [
        snakeToCamel(),
        merge(getDefaultGetListResponse()),
      ]);
      return {
        items: applyTransform(items, [
          mergeEach(defaultObject),
          handlePermissionsList,
        ]),
        next,
      };
    } catch (err) {
      throw applyTransform(err, [notify]);
    }
  };

  const patch = async ({ changes, id }) => {
    const body = applyTransform(changes, [camelToSnake()]);
    const url = `${baseUrl}/${id}/${permissionsUrl}`;
    try {
      const response = await instance.patch(url, body);
      return applyTransform(response.data, [snakeToCamel()]);
    } catch (err) {
      throw applyTransform(err, [notify]);
    }
  };

  return {
    getPermissionsList: getList,
    patchPermissions: patch,
  };
};
