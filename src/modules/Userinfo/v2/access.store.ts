import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  AppVisibilityMap,
  CreateUserAccessStoreConfig,
  CreateUserAccessStoreRawAccess,
  CrudAction,
  GlobalActionAccessMap,
  ScopeAccessMap,
  SectionVisibilityMap,
  SpecialGlobalAction,
  UiSection,
  WtApplication,
  WtObject,
} from './UserAccess.types.ts';
import {
  castUiSectionToWtObject,
  // getWtAppByUiSection,
  makeAppVisibilityMap,
  makeGlobalAccessMap,
  makeScopeAccessMap,
  makeSectionVisibilityMap,
} from './utils.ts';

export const createUserAccessStore = (
  app: WtApplication,
  {
    permissions: rawGlobalAccess,
    scope: rawScopeAccess,
    access: rawVisibilityAccess,
  }: CreateUserAccessStoreRawAccess,
  {
    namespace = 'userinfo',
    setupRouteGuards = true,
  }: CreateUserAccessStoreConfig,
) => {
  return defineStore(`${namespace}/access`, () => {
    const globalAccess: Ref<GlobalActionAccessMap> = ref(
      makeGlobalAccessMap(rawGlobalAccess),
    );
    const scopeAccess: Ref<ScopeAccessMap> = ref(
      makeScopeAccessMap(rawScopeAccess),
    );
    const appVisibilityAccess: Ref<AppVisibilityMap> = ref(
      makeAppVisibilityMap(rawVisibilityAccess),
    );
    const sectionVisibilityAccess: Ref<SectionVisibilityMap> = ref(
      makeSectionVisibilityMap(rawVisibilityAccess),
    );

    const hasAccess = (
      action: CrudAction | SpecialGlobalAction,
      object?: WtObject,
    ) => {
      return (
        globalAccess.value.get(action) ||
        (object && scopeAccess.value.get(object).get(action as CrudAction))
      );
    };

    const hasReadAccess = (object?: WtObject) => {
      console.log(object);
      return hasAccess(CrudAction.Read, object);
    };

    const hasCreateAccess = (object?: WtObject) => {
      return hasAccess(CrudAction.Create, object);
    };
    const hasEditAccess = (object?: WtObject) => {
      return hasAccess(CrudAction.Edit, object);
    };
    const hasDeleteAccess = (object?: WtObject) => {
      return hasAccess(CrudAction.Delete, object);
    };

    const hasApplicationVisibility = () => {
      return hasReadAccess() || appVisibilityAccess.value.get(app);
    };

    const hasSectionVisibility = (section: UiSection) => {
      // const appOfSection = getWtAppByUiSection(section);
      console.log(section);
      const objectOfSection = castUiSectionToWtObject(section, app);
      return (
        hasReadAccess() ||
        [
          hasApplicationVisibility(),
          hasReadAccess(objectOfSection),
          sectionVisibilityAccess.value.get(section),
        ].every((v) => v)
      );
    };

    if (setupRouteGuards) {
      console.log('setupRouteGuards');
      const router = useRouter();
      router.beforeEach((to, _from, next) => {
        console.log(to);
        const wtObject = to.meta.WtObject;

        if (wtObject && !hasSectionVisibility(wtObject as UiSection)) {
          return;
        }

        next();
      });
    }

    return {
      hasReadAccess,
      hasCreateAccess,
      hasEditAccess,
      hasDeleteAccess,

      globalAccess,
      scopeAccess,
      appVisibilityAccess,
      sectionVisibilityAccess,
      hasApplicationVisibility,
      hasSectionVisibility,
    };
  });
};
