/**
 * @augments WtApplication.enum
 * represents ui sections in Admin WtApplication
 * without any relation to WtObjects (?)
 */
export enum AdminSections {
  Agents = 'agents',
  Blacklist = 'blacklist',
  Buckets = 'buckets',
  Calendars = 'calendars',
  Changelogs = 'changelogs',
  ChatGateways = 'chat-gateways',
  Chatplan = 'chatplan',
  CognitiveProfiles = 'cognitive-profiles',
  Communications = 'communications',
  Configuration = 'configuration',
  Dialplan = 'dialplan',
  Devices = 'devices',
  EmailProfiles = 'email-profiles',
  Flow = 'flow',
  Gateways = 'gateways',
  GlobalVariables = 'global-variables',
  ImportCsv = 'import-csv',
  License = 'license',
  Media = 'media',
  Members = 'members',
  Objects = 'objects',
  PauseCause = 'pause-cause',
  PauseTemplates = 'pause-templates',
  Queues = 'queues',
  Regions = 'regions',
  ResourceGroups = 'resource-groups',
  Resources = 'resources',
  Roles = 'roles',
  ShiftTemplates = 'shift-templates',
  SingleSignOn = 'single-sign-on',
  Skills = 'skills',
  Storage = 'storage',
  StoragePolicies = 'storage-policies',
  Teams = 'teams',
  Triggers = 'triggers',
  Users = 'users',
  WorkingConditions = 'working-conditions',
}

/**
 * @deprecated
 * default export is for backward compatibility,
 * use ts enum instead (and don't forget to compile it)
 */
export default Object.fromEntries(
  Object.entries(AdminSections).map(([key, value]) => [
    key.toUpperCase(),
    value,
  ]),
);
