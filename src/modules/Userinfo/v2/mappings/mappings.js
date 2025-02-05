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
import { CrudGlobalAction, ScopeClass } from '../enums';

export const mapGlobalActionToCrudAction = {
  [CrudGlobalAction.Add]: CrudAction.Create,
  [CrudGlobalAction.Read]: CrudAction.Read,
  [CrudGlobalAction.Write]: CrudAction.Update,
  [CrudGlobalAction.Delete]: CrudAction.Delete,
};
export const mapCrudActionToGlobalAction = invert(mapGlobalActionToCrudAction);
/* one-to-many */
export const mapScopeClassToWtObjects = {
  [ScopeClass.Users]: [WtObject.User],
  [ScopeClass.Devices]: [WtObject.Device],
  [ScopeClass.Schema]: [WtObject.Flow],
  [ScopeClass.AcrRouting]: [WtObject.Dialplan],
  [ScopeClass.Gateways]: [WtObject.Gateway],
  [ScopeClass.AcrChatPlan]: [WtObject.Chatplan],
  [ScopeClass.Chats]: [WtObject.ChatGateway],
  [ScopeClass.Dictionaries]: [
    WtObject.Region,
    WtObject.Bucket,
    WtObject.Communication,
    WtObject.PauseCause,
  ],
  [ScopeClass.List]: [WtObject.Blacklist],
  [ScopeClass.Skills]: [WtObject.Skill],
  [ScopeClass.Calendars]: [WtObject.Calendar],
  [ScopeClass.MediaFile]: [WtObject.Media],
  [ScopeClass.Agent]: [WtObject.Agent],
  [ScopeClass.Queue]: [WtObject.Queue, WtObject.Member],
  [ScopeClass.ResourceGroup]: [WtObject.ResourceGroup],
  [ScopeClass.Resource]: [WtObject.Resource],
  [ScopeClass.Team]: [WtObject.Team],
  [ScopeClass.StorageProfile]: [WtObject.Storage],
  [ScopeClass.CognitiveProfile]: [WtObject.CognitiveProfile],
  [ScopeClass.EmailProfile]: [WtObject.EmailProfile],
  [ScopeClass.SingleSignOn]: [WtObject.SingleSignOn],
  [ScopeClass.ImportTemplate]: [WtObject.ImportCsv],
  [ScopeClass.Trigger]: [WtObject.Trigger],
  [ScopeClass.Role]: [WtObject.Role],
  [ScopeClass.Contacts]: [WtObject.Contact],
  [ScopeClass.Logger]: [WtObject.Logger], // Change log in Admin
  [ScopeClass.Calls]: [WtObject.Call], // Call history
  [ScopeClass.RecordFile]: [WtObject.RecordFile], // Call history
  [ScopeClass.ContactGroups]: [WtObject.ContactGroup], //CRM
  [ScopeClass.ChatBots]: [WtObject.ChatBot], // routing cht_gateway
  [ScopeClass.Cases]: [WtObject.Cases], // CRM
  [ScopeClass.CaseComments]: [WtObject.CaseComment],
};
export const mapScopeClassAccessTokenToCrudAction = {
  r: CrudAction.Read,
  w: CrudAction.Update,
  d: CrudAction.Delete,
  x: CrudAction.Create,
};
export const mapCrudActionToScopeClassAccessToken = invert(
  mapScopeClassAccessTokenToCrudAction,
);
export const mapWtObjectToUiSection = {
  // if we don`t need empty objects we can use  Partial<Record<WtApplication, Partial<Record<WtObject, UiSection>>>>
  [WtApplication.Agent]: {},
  [WtApplication.History]: {},
  [WtApplication.Analytics]: {},
  // Admin sections
  [WtApplication.Admin]: {
    [WtObject.User]: AdminSections.Users,
    [WtObject.Agent]: AdminSections.Agents,
    [WtObject.License]: AdminSections.License,
    [WtObject.Device]: AdminSections.Devices,
    [WtObject.Flow]: AdminSections.Flow,
    [WtObject.Dialplan]: AdminSections.Dialplan,
    [WtObject.Gateway]: AdminSections.Gateways,
    [WtObject.Chatplan]: AdminSections.Chatplan,
    [WtObject.ChatGateway]: AdminSections.ChatGateways,
    [WtObject.Skill]: AdminSections.Skills,
    [WtObject.Bucket]: AdminSections.Buckets,
    [WtObject.Blacklist]: AdminSections.Blacklist,
    [WtObject.Region]: AdminSections.Regions,
    [WtObject.Calendar]: AdminSections.Calendars,
    [WtObject.Communication]: AdminSections.Communications,
    [WtObject.PauseCause]: AdminSections.PauseCause,
    [WtObject.Media]: AdminSections.Media,
    [WtObject.Team]: AdminSections.Teams,
    [WtObject.Resource]: AdminSections.Resources,
    [WtObject.ResourceGroup]: AdminSections.ResourceGroups,
    [WtObject.Queue]: AdminSections.Queues,
    [WtObject.Storage]: AdminSections.Storage,
    [WtObject.CognitiveProfile]: AdminSections.CognitiveProfiles,
    [WtObject.EmailProfile]: AdminSections.EmailProfiles,
    [WtObject.ImportCsv]: AdminSections.ImportCsv,
    [WtObject.Trigger]: AdminSections.Triggers,
    [WtObject.Role]: AdminSections.Roles,
    [WtObject.Object]: AdminSections.Objects,
    [WtObject.ChangeLog]: AdminSections.Changelogs,
    [WtObject.Configuration]: AdminSections.Configuration,
    [WtObject.GlobalVariable]: AdminSections.GlobalVariables,
    [WtObject.ShiftTemplate]: AdminSections.ShiftTemplates,
    [WtObject.PauseTemplate]: AdminSections.PauseTemplates,
    [WtObject.WorkingCondition]: AdminSections.WorkingConditions,
    [WtObject.Member]: AdminSections.Members,
  },
  // Auditor sections
  [WtApplication.Audit]: {
    [WtObject.Scorecard]: AuditorSections.Scorecards,
  },
  // Crm sections
  [WtApplication.Crm]: {
    [WtObject.Contact]: CrmSections.Contacts,
    [WtObject.Cases]: CrmSections.Cases,
    [WtObject.Slas]: CrmSections.Slas,
    [WtObject.ServiceCatalog]: CrmSections.ServiceCatalogs,
    [WtObject.CaseSource]: CrmSections.CaseSources,
    [WtObject.CloseReasonGroup]: CrmSections.CloseReasonGroups,
    [WtObject.Priorities]: CrmSections.Priorities,
    [WtObject.Status]: CrmSections.Statuses,
    [WtObject.Source]: CrmSections.Sources,
    [WtObject.ContactGroup]: CrmSections.ContactGroups,
    [WtObject.CustomLookup]: CrmSections.CustomLookups,
  },
  // Supervisor sections
  [WtApplication.Supervisor]: {
    [WtObject.Queue]: SupervisorSections.Queues,
    [WtObject.Agent]: SupervisorSections.Agents,
    [WtObject.Communication]: SupervisorSections.ActiveCalls,
  },
};
export const mapUiSectionToWtObject = invert(mapWtObjectToUiSection);
export const AdminSectionsValues = invert(AdminSections);
export const AuditorSectionsValues = invert(AuditorSections);
export const CrmSectionsValues = invert(CrmSections);
export const SupervisorSectionsValues = invert(SupervisorSections);
