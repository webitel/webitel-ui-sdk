import invert from 'lodash/fp/invert';

import {
  AdminSections,
  AuditorSections,
  CrmSections,
  CrudAction,
  SupervisorSections,
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
  // Admin sections
  [AdminSections.Users]: WtObject.User,
  [AdminSections.Agents]: WtObject.Agent,
  [AdminSections.License]: WtObject.License,
  [AdminSections.Devices]: WtObject.Device,
  [AdminSections.Flow]: WtObject.Flow,
  [AdminSections.Dialplan]: WtObject.Dialplan,
  [AdminSections.Gateways]: WtObject.Gateway,
  [AdminSections.Chatplan]: WtObject.Chatplan,
  [AdminSections.ChatGateways]: WtObject.ChatGateway,
  [AdminSections.Skills]: WtObject.Skill,
  [AdminSections.Buckets]: WtObject.Bucket,
  [AdminSections.Blacklist]: WtObject.Blacklist,
  [AdminSections.Regions]: WtObject.Region,
  [AdminSections.Calendars]: WtObject.Calendar,
  [AdminSections.Communications]: WtObject.Communication,
  [AdminSections.PauseCause]: WtObject.PauseCause,
  [AdminSections.Media]: WtObject.Media,
  [AdminSections.Teams]: WtObject.Team,
  [AdminSections.Resources]: WtObject.Resource,
  [AdminSections.ResourceGroups]: WtObject.ResourceGroup,
  [AdminSections.Queues]: WtObject.Queue,
  [AdminSections.Storage]: WtObject.Storage,
  [AdminSections.CognitiveProfiles]: WtObject.CognitiveProfile,
  [AdminSections.EmailProfiles]: WtObject.EmailProfile,
  [AdminSections.ImportCsv]: WtObject.ImportCsv,
  [AdminSections.Triggers]: WtObject.Trigger,
  [AdminSections.Roles]: WtObject.Role,
  [AdminSections.Objects]: WtObject.Object,
  [AdminSections.Changelogs]: WtObject.ChangeLog,
  [AdminSections.Configuration]: WtObject.Configuration,
  [AdminSections.GlobalVariables]: WtObject.GlobalVariable,
  [AdminSections.ShiftTemplates]: WtObject.ShiftTemplate,
  [AdminSections.PauseTemplates]: WtObject.PauseTemplate,
  [AdminSections.WorkingConditions]: WtObject.WorkingCondition,
  [AdminSections.Members]: WtObject.Member,
  // Auditor sections
  [AuditorSections.Scorecards]: WtObject.Scorecard,
  // Crm sections
  [CrmSections.Contacts]: WtObject.Contact,
  [CrmSections.Cases]: WtObject.Cases,
  [CrmSections.Slas]: WtObject.Slas,
  [CrmSections.ServiceCatalogs]: WtObject.ServiceCatalog,
  [CrmSections.CaseSources]: WtObject.CaseSource,
  [CrmSections.CloseReasonGroups]: WtObject.CloseReasonGroup,
  [CrmSections.Priorities]: WtObject.Priorities,
  [CrmSections.Statuses]: WtObject.Status,
  [CrmSections.Sources]: WtObject.Source,
  [CrmSections.ContactGroups]: WtObject.ContactGroup,
  [CrmSections.CustomLookups]: WtObject.CustomLookup,
  // Supervisor sections
  [SupervisorSections.Queues]: WtObject.Queue,
  [SupervisorSections.Agents]: WtObject.Agent,
  [SupervisorSections.ActiveCalls]: WtObject.Communication,
};
export const mapUiSectionToWtObject = invert(mapWtObjectToUiSection);
export const AdminSectionsValues = invert(AdminSections);
export const AuditorSectionsValues = invert(AuditorSections);
export const CrmSectionsValues = invert(CrmSections);
export const SupervisorSectionsValues = invert(SupervisorSections);
//# sourceMappingURL=mappings.js.map
