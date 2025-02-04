import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

import { CrudAction } from '../../../../enums';
import {
  castUiSectionToWtObject,
  getWtAppByUiSection,
  makeAppVisibilityMap,
  makeGlobalAccessMap,
  makeScopeAccessMap,
  makeSectionVisibilityMap,
} from '../scripts/utils';

export const createUserAccessStore = ({
  namespace = 'userinfo',
  useManualRouteGuards = false,
} = {}) => {
  return defineStore(`${namespace}/access`, () => {
    const router = useRouter();
    let globalAccess = new Map();
    let scopeAccess = new Map();
    let appVisibilityAccess = new Map();
    let sectionVisibilityAccess = new Map();
    const hasAccess = (action, object) => {
      const allowGlobalAccess = globalAccess.get(action);
      if (allowGlobalAccess) return true;
      const allowScopeAccess = object && scopeAccess.get(object)?.get(action);
      if (allowScopeAccess) return true;
      return false;
    };
    const hasReadAccess = (object) => {
      return hasAccess(CrudAction.Read, object);
    };
    const hasCreateAccess = (object) => {
      return hasAccess(CrudAction.Create, object);
    };
    const hasUpdateAccess = (object) => {
      return hasAccess(CrudAction.Update, object);
    };
    const hasDeleteAccess = (object) => {
      return hasAccess(CrudAction.Delete, object);
    };
    const hasApplicationVisibility = (app) => {
      return hasReadAccess() || appVisibilityAccess.get(app);
    };
    const hasSectionVisibility = (section) => {
      const appOfSection = getWtAppByUiSection(section);
      const objectOfSection = castUiSectionToWtObject(section);
      const hasSectionVisibilityAccess = (section) => {
        return sectionVisibilityAccess.get(section);
      };
      const allowGlobalAccess = hasReadAccess();
      if (allowGlobalAccess) return true;
      const allowAppVisibility = hasApplicationVisibility(appOfSection);
      const allowObjectAccess = hasReadAccess(objectOfSection);
      const allowSectionVisibility = hasSectionVisibilityAccess(section);
      return allowAppVisibility && allowObjectAccess && allowSectionVisibility;
    };
    const setupRouteGuards = () => {
      router.beforeEach((to) => {
        /* find last because "matched" has top=>bottom routes order */
        const uiSection = to.matched
          .reverse()
          .find(({ meta }) => meta.UiSection)?.meta?.UiSection;
        if (uiSection && !hasSectionVisibility(uiSection)) {
          return false;
        }
        return true;
      });
    };
    const initialize = ({
      permissions: rawGlobalAccess,
      scope: rawScopeAccess,
      access: rawVisibilityAccess,
    }) => {
      globalAccess = makeGlobalAccessMap(rawGlobalAccess);
      scopeAccess = makeScopeAccessMap(rawScopeAccess);
      appVisibilityAccess = makeAppVisibilityMap(rawVisibilityAccess);
      sectionVisibilityAccess = makeSectionVisibilityMap(rawVisibilityAccess);
      if (!useManualRouteGuards) {
        setupRouteGuards();
      }
    };
    return {
      initialize,
      setupRouteGuards,
      hasReadAccess,
      hasCreateAccess,
      hasUpdateAccess,
      hasDeleteAccess,
      hasApplicationVisibility,
      hasSectionVisibility,
    };
  });
};
//# sourceMappingURL=accessStore.js.map
