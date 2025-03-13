/**
 * @internal
 * @description
 * Represents backend response
 * format for Global Access to Crud Actions.
 * Should be converted to {@link CrudAction}
 * */
export const CrudGlobalAction = {
  Read: 'read',
  Write: 'write',
  Delete: 'delete',
  Add: 'add',
} as const;

export type CrudGlobalAction =
  (typeof CrudGlobalAction)[keyof typeof CrudGlobalAction];

/**
 * @description
 * Represents access to global specific actions
 * like downloading files or exporting data
 * */
export const SpecialGlobalAction = {
  PlaybackRecordFile: 'playbackRecordFile',
  ManageUserLicense: 'manageUserLicense',
  SchemeVariables: 'schemeVariables',
  SystemSetting: 'systemSetting',
  ManageUserRoles: 'manageUserRoles',
  ExportDataGrid: 'exportDataGrid',
  ViewCdrPhoneNumbers: 'viewCdrPhoneNumbers',
  ChangeUserPassword: 'changeUserPassword',
  EavesdropCall: 'eavesdropCall',
} as const;

export type SpecialGlobalAction =
  (typeof SpecialGlobalAction)[keyof typeof SpecialGlobalAction];
