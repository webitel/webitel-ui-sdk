import invert from 'lodash/fp/invert';

import {
  AdminSections,
  AuditorSections,
  CrmSections,
  CrudAction,
  SupervisorSections,
  WtApplication,
  WtObject,
} from '../../../../enums';
import { _wtUiLog as wtlog } from '../../../../scripts/logger';
import { CrudGlobalAction } from '../enums';
import {
  AdminSectionsValues, AuditorSectionsValues, CrmSectionsValues,
  mapGlobalActionToCrudAction,
  mapScopeClassAccessTokenToCrudAction,
  mapScopeClassToWtObjects, mapUiSectionToWtObject,
  mapWtObjectToUiSection, SupervisorSectionsValues
} from "../mappings/mappings";
import type {
  AppVisibilityMap,
  GlobalAccessApiResponseItem,
  GlobalAction,
  GlobalActionAccessMap,
  ScopeAccessApiResponseItem,
  ScopeAccessMap,
  SectionVisibilityMap,
  UiSection,
  VisibilityAccess,
} from '../types/UserAccess.d.ts';

/**
 * @internal
 * @description
 * backend -> frontend
 * */
const castGlobalActionToCrudAction = (
  globalAction: GlobalAction,
): CrudAction | null => {
    return mapGlobalActionToCrudAction[globalAction] || null;
};

export const makeGlobalAccessMap = (
  rawGlobalAccess: GlobalAccessApiResponseItem[],
): GlobalActionAccessMap => {
  return rawGlobalAccess.reduce((map, { id }) => {
    const key = castGlobalActionToCrudAction(id) || id;
    return map.set(key, true);
  }, new Map());
};

export const makeScopeAccessMap = (
  rawScope: ScopeAccessApiResponseItem[],
): ScopeAccessMap => {
  const map = new Map();

  rawScope.forEach(({ class: scopeClass, access: scopeAccess }) => {
    const access = scopeAccess.split('').reduce((accessMap, token) => {
        accessMap.set(mapScopeClassAccessTokenToCrudAction[token], true);
        return accessMap;
    }, new Map());

    const scopeClassObjects = mapScopeClassToWtObjects[scopeClass];

    if (!scopeClassObjects) {
      wtlog.error({ module: 'modules/userinfo' })(
        'Unknown scope class to convert to WtObject:',
        scopeClass,
      );
    } else {
      scopeClassObjects.forEach((object) => {
        map.set(object, access);
      });
    }
  });

  return map;
};

export const makeAppVisibilityMap = (
  rawVisibility: VisibilityAccess,
): AppVisibilityMap => {
  const map = new Map();
  Object.entries(rawVisibility).forEach(([app, visibility]) => {
    map.set(app, visibility._enabled);
  });
  return map;
};

export const makeSectionVisibilityMap = (
  rawVisibility: VisibilityAccess,
): SectionVisibilityMap => {
  const map = new Map();

  Object.values(rawVisibility).forEach((appSectionsVisibility) => {
    Object.entries(appSectionsVisibility).forEach(([section, visibility]) => {
      if (section.startsWith('_')) return map; // skip private fields
      map.set(section, visibility._enabled);
    });
  });

  return map;
};

export const castUiSectionToWtObject = (section: UiSection): WtObject => {
  return mapUiSectionToWtObject[section];
};

export const castWtObjectToUiSection = (object: WtObject): UiSection => {
  return mapWtObjectToUiSection[object];
};

export const getWtAppByUiSection = (section: UiSection): WtApplication => {
  /* use inverted maps because UiSection is the enum value, not key */
  if (AdminSectionsValues[section]) {
    return WtApplication.Admin;
  }
  if (AuditorSectionsValues[section]) {
    return WtApplication.Audit;
  }
  if (CrmSectionsValues[section]) {
    return WtApplication.Crm;
  }
  if (SupervisorSectionsValues[section]) {
    return WtApplication.Supervisor;
  }
  wtlog.error({ module: 'modules/userinfo' })('Unknown section:', section);
};
