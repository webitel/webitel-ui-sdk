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
  PlaybackRecordFile: 'playback_record_file',
  ResetActiveAttempts: 'reset_active_attempts',
  TimeLimitedRecordFile: 'time_limited_record_file',
  ManageUserLicense: 'manage_user_license',
  SchemeVariables: 'scheme_variables',
  SystemSetting: 'system_setting',
  ManageUserRoles: 'manage_user_roles',
  ExportDataGrid: 'export_data_grid',
  LimitWorkspaceContacts: 'limit_workspace_contacts',
  ViewCdrPhoneNumbers: 'view_cdr_phone_numbers',
  ChangeUserPassword: 'change_user_password',
  EavesdropCall: 'eavesdrop_call',
  ControlAgentScreen: 'control_agent_screen',
} as const;

export type SpecialGlobalAction =
  (typeof SpecialGlobalAction)[keyof typeof SpecialGlobalAction];
