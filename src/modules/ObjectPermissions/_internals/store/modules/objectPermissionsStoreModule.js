import deepCopy from 'deep-copy';
import { AccessMode } from '../../enums/AccessMode.enum.js';
import generateFilters from '../../modules/filters/store/filters.store.js';
import headers from './headers.js';

const state = {
  headers,
};

const getters = {
  REQUIRED_FIELDS: () => [],
};

const actions = {
  CHANGE_ACCESS_MODE: async (context, { mode, ruleName, item }) => {
    const have = item.access[ruleName];
    let want;
    /*
         has | patch | got
        -----+-------+-----
           - |  w    | w
           w |  w    | -
           - |  ww   | ww
           w |  ww   | ww
          ww |  ww   | w
          ww |  w    | -
     */
    switch (mode.id) {
      case AccessMode.FORBIDDEN:
        want = ruleName;
        break;
      case AccessMode.ALLOW:
        want = have.rule || ruleName;
        break;
      case AccessMode.MANAGE:
        want = `${ruleName}${ruleName}`;
        break;
      default:
        return;
    }
    const changes = [
      {
      grantee: +item.grantee.id,
      grants: want,
      }
    ];
    try {
      await context.dispatch('PATCH_ITEM_API', {
        changes,
        id: context.getters.PARENT_ID,
      });
    } finally {
      await context.dispatch('LOAD_DATA_LIST');
    }
  },
  ADD_ROLE_PERMISSIONS: async (context, role) => {
    console.info(role);
    const changes = [
      {
      grantee: +role.id,
      grants: 'r',
      }
    ];
    try {
      await context.dispatch('PATCH_ITEM_API', {
        changes,
        id: context.getters.PARENT_ID,
      });
    } finally {
      await context.dispatch('LOAD_DATA_LIST');
    }
  },

  GET_LIST_API: (
    context,
    payload,
  ) => context.dispatch('api/GET_OBJECT_PERMISSIONS_LIST', payload),
  PATCH_ITEM_API: (
    context,
    payload,
  ) => context.dispatch('api/PATCH_OBJECT_PERMISSIONS_ITEM', payload),
};

export default () => {
  const filters = generateFilters();

  return {
    state: deepCopy(state),
    getters,
    actions,
    modules: {
      filters,
    },
  };
};
