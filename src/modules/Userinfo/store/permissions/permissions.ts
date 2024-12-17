import BaseStoreModule from '../../../../store/BaseStoreModules/BaseStoreModule';
import { CrudAction, GlobalPermission, WtObject } from './enums';
import { RolePermission, ClassScope, StoreState, VisualAccess, GlobalAccessMap, ScopeAccessMap, SectionVisibilityAccessMap } from './types';
import {
    makeGlobalAccessMap,
    makeScopeAccessMap,
    makeVisualAccessMap,
    hasActionGlobalAccess,
    hasActionScopeAccess,
    hasSectionVisibilityAccess,
} from './utils';

const state = (): StoreState => ({
    scope: new Map(),
    sectionVisibility: new Map(),
    permissions: new Map(),
});

const getters = {
    ALLOW_READ_ACCESS:
        (state: StoreState) =>
        (object: WtObject): boolean => {
            return [
                hasActionGlobalAccess({
                    action: GlobalPermission.Read,
                    permissions: state.permissions,
                }),
                hasActionScopeAccess({
                    action: CrudAction.Read,
                    scope: state.scope,
                    object,
                }),
            ].some(Boolean);
        },

    SHOW_SECTION:
        (state: StoreState, getters: any) =>
        (section: WtObject): boolean => {
            return [getters.ALLOW_READ_ACCESS(section), hasSectionVisibilityAccess({ visibility: state.sectionVisibility, section })].some(Boolean);
        },
};

const actions = {
    INITIALIZE: (
        context: { commit: Function },
        { permissions, scopes, access }: { permissions: RolePermission[]; scopes: ClassScope[]; access: VisualAccess },
    ) => {
        context.commit('SET_GLOBAL_ACCESS', makeGlobalAccessMap(permissions));
        context.commit('SET_SCOPE_ACCESS', makeScopeAccessMap(scopes));
        context.commit('SET_SECTION_VISIBILITY', makeVisualAccessMap(access));
    },
};

const mutations = {
    SET_GLOBAL_ACCESS(state: StoreState, accessMap: GlobalAccessMap) {
        state.permissions = accessMap;
    },
    SET_SCOPE_ACCESS(state: StoreState, accessMap: ScopeAccessMap) {
        state.scope = accessMap;
    },
    SET_SECTION_VISIBILITY(state: StoreState, accessMap: SectionVisibilityAccessMap) {
        state.sectionVisibility = accessMap;
    },
};

export default class PermissionsStore extends BaseStoreModule {
    state = { ...state() };
    getters = { ...getters };
    actions = { ...actions };
    mutations = { ...mutations };
}
