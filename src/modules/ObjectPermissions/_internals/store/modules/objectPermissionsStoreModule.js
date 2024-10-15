import { AccessMode } from '../../enums/AccessMode.enum.js';
import generateFilters from '../../modules/filters/store/filters.store.js';

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
    const changes = {
      grantee: +item.grantee.id,
      grants: want,
    };
    try {
      await context.dispatch('PATCH_ACCESS_MODE', {
        item,
        changes,
      });
    } finally {
      await context.dispatch('LOAD_DATA_LIST');
    }
  },
  ADD_ROLE_PERMISSIONS: async (context, role) => {
    const changes = {
      grantee: +role.id,
      grants: 'r',
    };
    try {
      await context.dispatch('PATCH_ACCESS_MODE', {
        changes,
      });
    } finally {
      await context.dispatch('LOAD_DATA_LIST');
    }
  },
};

export default () => {
  const filters = generateFilters();

  return {
    actions,
    modules: {
      filters,
    },
  };
};
