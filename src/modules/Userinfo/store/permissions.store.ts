import { AdminSections } from '../v2/UserAccess.types.ts';

enum WtObject {
  Agent = 'agent',
  Queue = 'queue',
  Contact = 'contact',
  Regions = 'regions',
}

type UiSection = AdminSections & string;

enum ScopeClass {
  Agent = 'cc_agent',
  Queue = 'cc_queue',
  Dictionaries = 'dictionaries',
  EmailProfile = 'email_profile',
}

enum CrudAction {
  Read = 'read',
  Create = 'create',
  Edit = 'edit',
  Delete = 'delete',
}

type GlobalAccess = {
  [action in CrudAction]: boolean;
  // ... non-crud actions
};
type ScopeAccess = {
  [action in CrudAction]: boolean;
};

interface RolePermission {
  id: string;
  name: string;
}

interface ClassScope {
  // id: number,
  class: ScopeClass;
  access: ScopeAccess;
}

type GlobalAccessMap = Map<GlobalAccess, RolePermission>;
const makeGlobalAccessMap = (
  permissions: RolePermission[],
): GlobalAccessMap => {
  return permissions.reduce(
    (map: GlobalAccessMap, permission: RolePermission) => {
      const globalPermissionToCrudAction = {
        write: CrudAction.Edit,
        add: CrudAction.Create,
        read: CrudAction.Read,
        delete: CrudAction.Delete,
      };
      map.set(
        globalPermissionToCrudAction[permission.id] || permission.id,
        permission,
      );
      return map;
    },
    new Map(),
  );
};
type ScopeAccessMap = Map<WtObject, CrudAction>;
const makeScopeAccessMap = (scope: ClassScope[]): ScopeAccessMap => {
  const map: ScopeAccessMap = new Map();
  scope.forEach((classScope) => {
    Object.keys(classScope.access).forEach((action) => {
      if (classScope.access[action as CrudAction]) {
        map.set(classScope.class as unknown as WtObject, action as CrudAction);
      }
    });
  });
  return map;
};
// utils
const hasActionGlobalAccess = ({
  action,
  permissions,
}: {
  action: CrudAction;
  permissions: GlobalAccessMap;
}): boolean => {
  return permissions.has(action);
};
const hasActionScopeAccess = ({
  action,
  scope,
  object,
}: {
  action: CrudAction;
  scope: ScopeAccessMap;
  object: WtObject;
}): boolean => {
  return scope.has(object) && scope.get(object) === action;
};
type SectionVisibilityAccessMap = Map<UiSection, boolean>;
type ObjectToSectionMap = Map<WtObject, UiSection>;
type SectionToObjectMap = Map<UiSection, WtObject>;
const objectToSectionMap: ObjectToSectionMap = new Map();
const sectionToObjectMap: SectionToObjectMap = new Map(
  [...objectToSectionMap].map(([key, value]) => [value, key]),
);
const hasSectionVisibilityAccess = ({
  visibility,
  section,
}: {
  visibility: SectionVisibilityAccessMap;
  section: UiSection;
}): boolean => {
  return visibility.has(section);
};

interface StoreState {
  scope: ScopeAccessMap;
  sectionVisibility: SectionVisibilityAccessMap;
  permissions: GlobalAccessMap;
}

const state = (): StoreState => ({
  scope: new Map(),
  sectionVisibility: new Map(),
  permissions: new Map(),
});
const getters = {
  // represents object operations access
  ALLOW_READ_ACCESS:
    (state: StoreState) =>
    (object: WtObject): boolean => {
      return [
        hasActionGlobalAccess({
          action: CrudAction.Read,
          permissions: state.permissions,
        }),
        hasActionScopeAccess({
          action: CrudAction.Read,
          scope: state.scope,
          object,
        }),
      ].some((v) => !!v);
    },
  // represents only route access
  SHOW_SECTION:
    (state: StoreState, getters) =>
    (section: UiSection): boolean => {
      return [
        getters.ALLOW_READ_ACCESS(sectionToObjectMap.get(section)),
        hasSectionVisibilityAccess({
          visibility: state.sectionVisibility,
          section,
        }),
      ].some((v) => !!v);
    },
};
const actions = {
  INITIALIZE: ({ commit }, { permissions, scope }) => {
    commit('SET_GLOBAL_ACCESS_MAP', makeGlobalAccessMap(permissions));
    commit('SET_SCOPE_ACCESS_MAP', makeScopeAccessMap(scope));
  },
};
const mutations = {
  SET_GLOBAL_ACCESS_MAP(state: StoreState, globalAccessMap: GlobalAccessMap) {
    state.permissions = globalAccessMap;
  },
  SET_SCOPE_ACCESS_MAP(state: StoreState, scopeAccessMap: ScopeAccessMap) {
    state.scope = scopeAccessMap;
  },
};
export default () => ({
  state: state(),
  getters,
  actions,
  mutations,
});
