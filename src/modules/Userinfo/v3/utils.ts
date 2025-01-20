import {
  AppVisibilityMap,
  SectionVisibilityMap,
  CrudAction,
  GlobalAccessApiResponseItem,
  GlobalAccessCrudActionApiResponseItem,
  GlobalAction,
  GlobalActionAccessMap,
  ScopeAccessApiResponseItem,
  ScopeAccessMap,
  VisibilityAccess,
  UiSection,
  WtObject,
  WtApplication,
  AdminSections,
  SupervisorSections,
  AuditSections,
  CrmSections,
  ScopeClass,
  // AgentSections,
  // HistorySections,
} from './UserAccess.types.ts';

const WtObjectToScopeClassMap: Record<WtObject, ScopeClass | undefined> = {
  [WtObject.Licenses]: undefined,
  [WtObject.ShiftTemplates]: undefined,
  [WtObject.PauseTemplates]: undefined,
  [WtObject.WorkingConditions]: undefined,
  [WtObject.Objects]: undefined,
  [WtObject.ChangeLogs]: undefined,
  [WtObject.Configuration]: undefined,
  [WtObject.GlobalVariables]: undefined,
  [WtObject.ActiveCalls]: undefined,
  [WtObject.Scorecards]: undefined,

  [WtObject.Users]: ScopeClass.Users,
  [WtObject.Devices]: ScopeClass.Devices,
  [WtObject.FlowSchemas]: ScopeClass.Schema,
  [WtObject.Dialplans]: ScopeClass.AcrRouting,
  [WtObject.Gateways]: ScopeClass.Gateways,
  [WtObject.Chatplans]: ScopeClass.AcrChatPlan,
  [WtObject.ChatGateways]: ScopeClass.Chats,
  [WtObject.Blacklist]: ScopeClass.CCList,
  [WtObject.Regions]: ScopeClass.Dictionaries,
  [WtObject.Calendars]: ScopeClass.Calendars,
  [WtObject.Communications]: ScopeClass.Dictionaries,
  [WtObject.PauseCause]: ScopeClass.Dictionaries,
  [WtObject.Skills]: ScopeClass.Dictionaries,
  [WtObject.Media]: ScopeClass.MediaFile,
  [WtObject.Agents]: ScopeClass.CCAgent,
  [WtObject.Buckets]: ScopeClass.Dictionaries,
  [WtObject.Queues]: ScopeClass.CCQueue,
  [WtObject.Members]: ScopeClass.CCQueue,
  [WtObject.ResourceGroups]: ScopeClass.CCResourceGroup,
  [WtObject.Resources]: ScopeClass.CCResource,
  [WtObject.Teams]: ScopeClass.CCTeam,
  [WtObject.Storage]: ScopeClass.StorageProfile,
  [WtObject.CognitiveProfiles]: ScopeClass.CognitiveProfile,
  [WtObject.EmailProfiles]: ScopeClass.EmailProfile,
  [WtObject.SingleSignOn]: ScopeClass.SingleSignOn,
  [WtObject.ImportsCsv]: ScopeClass.ImportTemplate,
  [WtObject.Triggers]: ScopeClass.Trigger,
  [WtObject.Roles]: ScopeClass.Role,
  [WtObject.Contacts]: ScopeClass.Contacts,
};

// backend -> frontend
const castGlobalActionToCrudAction = (
  globalAction: GlobalAction,
): CrudAction | null => {
  if (globalAction === GlobalAccessCrudActionApiResponseItem.Write) {
    return CrudAction.Edit;
  } else if (globalAction === GlobalAccessCrudActionApiResponseItem.Read) {
    return CrudAction.Read;
  } else if (globalAction === GlobalAccessCrudActionApiResponseItem.Delete) {
    return CrudAction.Delete;
  } else if (globalAction === GlobalAccessCrudActionApiResponseItem.Add) {
    return CrudAction.Create;
  }

  return null;
};

export const makeGlobalAccessMap = (
  rawGlobalAccess: GlobalAccessApiResponseItem[],
): GlobalActionAccessMap => {
  console.log(rawGlobalAccess);
  if (!rawGlobalAccess || rawGlobalAccess.length === 0) {
    return new Map();
  }

  return rawGlobalAccess.reduce((map, { id }) => {
    const key = castGlobalActionToCrudAction(id) || id;
    return map.set(key, true);
  }, new Map());
};

export const makeScopeAccessMap = (
  rawScope: ScopeAccessApiResponseItem[],
): ScopeAccessMap => {
  return rawScope.reduce((scopeAccessMap, { class: scopeClass, access }) => {
    const matchingWtObjects = Object.entries(WtObjectToScopeClassMap).filter(
      ([_, scopeClassOfMap]) => scopeClass === scopeClassOfMap,
    );
    if (matchingWtObjects.length !== 0) {
      matchingWtObjects.forEach(([wtObject]) => {
        const objectAccessMap = access
          .split('')
          .reduce((scopeObjectAccessMap, token) => {
            if (token === 'r') {
              scopeObjectAccessMap.set(CrudAction.Read, true);
            } else if (token === 'w') {
              scopeObjectAccessMap.set(CrudAction.Edit, true);
            } else if (token === 'd') {
              scopeObjectAccessMap.set(CrudAction.Delete, true);
            } else if (token === 'x') {
              scopeObjectAccessMap.set(CrudAction.Create, true);
            }

            return scopeObjectAccessMap;
          }, new Map<CrudAction, boolean>());

        scopeAccessMap.set(wtObject as WtObject, objectAccessMap);
      });
    }

    return scopeAccessMap;
  }, new Map<WtObject, Map<CrudAction, boolean>>());
};

export const makeAppVisibilityMap = (
  rawVisibility: VisibilityAccess,
): AppVisibilityMap => {
  //@ts-ignore
  if (!rawVisibility || rawVisibility.length === 0) {
    return new Map();
  }
  return Object.keys(rawVisibility).reduce((map, app) => {
    return map.set(app, true);
  }, new Map());
};

export const makeSectionVisibilityMap = (
  rawVisibility: VisibilityAccess,
): SectionVisibilityMap => {
  const resultMap = new Map();
  //@ts-ignore
  if (!rawVisibility || rawVisibility.length === 0) {
    return new Map();
  }

  const traverse = (obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (key.startsWith('_')) return;

      if (typeof value === 'object' && value !== null && '_enabled' in value) {
        resultMap.set(key, true);
      }

      if (typeof value === 'object' && value !== null) {
        traverse(value);
      }
    });
  };

  traverse(rawVisibility);
  return resultMap;
};

// export const getWtAppByUiSection = (section: UiSection): WtApplication => {
//   if (Object.values(AdminSections).includes(section)) {
//     return WtApplication.Admin;
//   } else if (Object.values(SupervisorSections).includes(section)) {
//     return WtApplication.Supervisor;
//   } else if (Object.values(AuditSections).includes(section)) {
//     return WtApplication.Audit;
//   } else if (Object.values(CrmSections).includes(section)) {
//     return WtApplication.CRM;
//   } else if (Object.values(HistorySections).includes(section)) {
//     return WtApplication.History;
//   } else if (Object.values(AgentSections).includes(section)) {
//     return WtApplication.Agent;
//   }

//   return null;
// };

export const castUiSectionToWtObject = (
  section: UiSection,
  app: WtApplication,
): WtObject => {
  const adminSectionsMap = {
    [AdminSections.Licenses]: WtObject.Licenses,
    [AdminSections.Users]: WtObject.Users,
    [AdminSections.Devices]: WtObject.Devices,
    [AdminSections.FlowSchemas]: WtObject.FlowSchemas,
    [AdminSections.Dialplans]: WtObject.Dialplans,
    [AdminSections.Gateways]: WtObject.Gateways,
    [AdminSections.Chatplans]: WtObject.Chatplans,
    [AdminSections.ChatGateways]: WtObject.ChatGateways,
    [AdminSections.Skills]: WtObject.Skills,
    [AdminSections.Buckets]: WtObject.Buckets,
    [AdminSections.Blacklist]: WtObject.Blacklist,
    [AdminSections.Regions]: WtObject.Regions,
    [AdminSections.Calendars]: WtObject.Calendars,
    [AdminSections.Communications]: WtObject.Communications,
    [AdminSections.PauseCause]: WtObject.PauseCause,
    [AdminSections.Media]: WtObject.Media,
    [AdminSections.Agents]: WtObject.Agents,
    [AdminSections.Teams]: WtObject.Teams,
    [AdminSections.Resources]: WtObject.Resources,
    [AdminSections.ResourceGroups]: WtObject.ResourceGroups,
    [AdminSections.Queues]: WtObject.Queues,
    [AdminSections.Storage]: WtObject.Storage,
    [AdminSections.CognitiveProfiles]: WtObject.CognitiveProfiles,
    [AdminSections.EmailProfiles]: WtObject.EmailProfiles,
    [AdminSections.ImportsCsv]: WtObject.ImportsCsv,
    [AdminSections.Triggers]: WtObject.Triggers,
    [AdminSections.Roles]: WtObject.Roles,
    [AdminSections.Objects]: WtObject.Objects,
    [AdminSections.ChangeLogs]: WtObject.ChangeLogs,
    [AdminSections.Configuration]: WtObject.Configuration,
    [AdminSections.GlobalVariables]: WtObject.GlobalVariables,
    [AdminSections.ShiftTemplates]: WtObject.ShiftTemplates,
    [AdminSections.PauseTemplates]: WtObject.PauseTemplates,
    [AdminSections.WorkingConditions]: WtObject.WorkingConditions,
  };

  const supervisorSectionsMap = {
    [SupervisorSections.Queues]: WtObject.Queues,
    [SupervisorSections.Agents]: WtObject.Agents,
    [SupervisorSections.ActiveCalls]: WtObject.ActiveCalls,
  };

  const auditSectionsMap = {
    [AuditSections.Scorecards]: WtObject.Scorecards,
  };

  const crmSectionsMap = {
    [CrmSections.Contacts]: WtObject.Contacts,
  };

  if (app === WtApplication.Admin) {
    return adminSectionsMap[section];
  } else if (app === WtApplication.Supervisor) {
    return supervisorSectionsMap[section];
  } else if (app === WtApplication.Audit) {
    return auditSectionsMap[section];
  } else if (app === WtApplication.CRM) {
    return crmSectionsMap[section];
  }

  return null;
};
