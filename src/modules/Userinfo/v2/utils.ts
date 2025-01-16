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
  // AgentSections,
  // HistorySections,
} from './UserAccess.types.ts';

// backend -> frontend
const castGlobalActionToCrudAction = (globalAction: GlobalAction): CrudAction | null => {
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
  if (!rawGlobalAccess || rawGlobalAccess.length === 0) {
    return new Map();
  }

  return rawGlobalAccess.reduce((map, { id }) => {
    const key = castGlobalActionToCrudAction(id) || id;
    return map.set(key, true);
  }, new Map());
};

export const makeScopeAccessMap = (rawScope: ScopeAccessApiResponseItem[]): ScopeAccessMap => {
  return rawScope.reduce((scopeAccessMap, { class: scopeClass, access }) => {
    const objectAccessMap = access.split('').reduce((scopeObjectAccessMap, token) => {
      if (token === 'r') {
        return scopeObjectAccessMap.set(CrudAction.Read, true);
      } else if (token === 'w') {
        return scopeObjectAccessMap.set(CrudAction.Edit, true);
      } else if (token === 'd') {
        return scopeObjectAccessMap.set(CrudAction.Delete, true);
      } else if (token === 'x') {
        return scopeObjectAccessMap.set(CrudAction.Create, true);
      }
    }, new Map());

    return scopeAccessMap.set(scopeClass, objectAccessMap);
  }, new Map());
};

export const makeAppVisibilityMap = (rawVisibility: VisibilityAccess): AppVisibilityMap => {
  //@ts-ignore
  if (!rawVisibility || rawVisibility.length === 0) {
    return new Map();
  }
  return Object.keys(rawVisibility).reduce((map, app) => {
    return map.set(app, true);
  }, new Map());
};

export const makeSectionVisibilityMap = (rawVisibility: VisibilityAccess): SectionVisibilityMap => {
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

export const castUiSectionToWtObject = (section: UiSection, app: WtApplication): WtObject => {
  const adminSectionsMap = {
    [AdminSections.Licenses]: WtObject.Licenses,
    [AdminSections.Users]: WtObject.Users,
    [AdminSections.Devices]: WtObject.Devices,
    [AdminSections.FlowSchemas]: WtObject.FlowSchemas,
    [AdminSections.Dialplans]: WtObject.Dialplans,
    [AdminSections.Gateways]: WtObject.Gateways,
    [AdminSections.Chatplans]: WtObject.Chatplans,
    [AdminSections.ChatGateways]: WtObject.ChatGateways,
    [AdminSections.AgentSkills]: WtObject.AgentSkills,
    [AdminSections.Buckets]: WtObject.Buckets,
    [AdminSections.Lists]: WtObject.Lists,
    [AdminSections.Locations]: WtObject.Locations,
    [AdminSections.Calendars]: WtObject.Calendars,
    [AdminSections.CommunicationTypes]: WtObject.CommunicationTypes,
    [AdminSections.AgentStatuses]: WtObject.AgentStatuses,
    [AdminSections.MediaFiles]: WtObject.MediaFiles,
    [AdminSections.Agents]: WtObject.Agents,
    [AdminSections.Teams]: WtObject.Teams,
    [AdminSections.Resources]: WtObject.Resources,
    [AdminSections.ResourceGroups]: WtObject.ResourceGroups,
    [AdminSections.Queues]: WtObject.Queues,
    [AdminSections.Storage]: WtObject.Storage,
    [AdminSections.CognitiveProfiles]: WtObject.CognitiveProfiles,
    [AdminSections.EmailProfiles]: WtObject.EmailProfiles,
    [AdminSections.ImportsFromCcvFromFiles]: WtObject.ImportsFromCcvFromFiles,
    [AdminSections.Triggers]: WtObject.Triggers,
    [AdminSections.Roles]: WtObject.Roles,
    [AdminSections.Objects]: WtObject.Objects,
    [AdminSections.ChangeLog]: WtObject.ChangeLog,
    [AdminSections.Configuration]: WtObject.Configuration,
    [AdminSections.GlobalVariables]: WtObject.GlobalVariables,
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
