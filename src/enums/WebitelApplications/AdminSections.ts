import { WtApplication } from './WtApplication';

/**
 * @augments WtApplication
 * represents ui sections in Admin WtApplication
 * without (!) any relation to WtObjects
 *
 * `WtApplication` prefix is duplicated intentionally
 * for IDE hint previews
 */
export const AdminSections = {
  Blacklist: `${WtApplication.Admin}/blacklist`,
  Buckets: `${WtApplication.Admin}/buckets`,
  Calendars: `${WtApplication.Admin}/calendars`,
  Changelogs: `${WtApplication.Admin}/changelogs`,
  ChatGateways: `${WtApplication.Admin}/chatGateways`,
  Chatplan: `${WtApplication.Admin}/chatplan`,
  CognitiveProfiles: `${WtApplication.Admin}/cognitiveProfiles`,
  Communications: `${WtApplication.Admin}/communications`,
  Configuration: `${WtApplication.Admin}/configuration`,
  Dialplan: `${WtApplication.Admin}/dialplan`,
  Devices: `${WtApplication.Admin}/devices`,
  EmailProfiles: `${WtApplication.Admin}/emailProfiles`,
  Flow: `${WtApplication.Admin}/flow`,
  Gateways: `${WtApplication.Admin}/gateways`,
  GlobalVariables: `${WtApplication.Admin}/globalVariables`,
  ImportCsv: `${WtApplication.Admin}/importCsv`,
  License: `${WtApplication.Admin}/license`,
  Media: `${WtApplication.Admin}/media`,
  Members: `${WtApplication.Admin}/members`,
  Objects: `${WtApplication.Admin}/objects`,
  PauseCause: `${WtApplication.Admin}/pauseCause`,
  PauseTemplates: `${WtApplication.Admin}/pauseTemplates`,
  Queues: `${WtApplication.Admin}/queues`,
  Regions: `${WtApplication.Admin}/regions`,
  ResourceGroups: `${WtApplication.Admin}/resourceGroups`,
  Resources: `${WtApplication.Admin}/resources`,
  Roles: `${WtApplication.Admin}/roles`,
  ShiftTemplates: `${WtApplication.Admin}/shiftTemplates`,
  SingleSignOn: `${WtApplication.Admin}/singleSignOn`,
  Skills: `${WtApplication.Admin}/skills`,
  Storage: `${WtApplication.Admin}/storage`,
  StoragePolicies: `${WtApplication.Admin}/storagePolicies`,
  Teams: `${WtApplication.Admin}/teams`,
  Triggers: `${WtApplication.Admin}/triggers`,
  Users: `${WtApplication.Admin}/users`,
  WorkingConditions: `${WtApplication.Admin}/workingConditions`,
} as const;

export type AdminSections = (typeof AdminSections)[keyof typeof AdminSections];
