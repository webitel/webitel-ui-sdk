export const RolePermissionsId = {
  PlaybackRecordFile: 'playback_record_file',
  ResetActiveAttempts: 'reset_active_attempts',
  TimeLimitedRecordFile: 'time_limited_record_file',
  ManageUserLicense: 'manage_user_license',
  SchemeVariables: 'scheme_variables',
  SystemSetting: 'system_setting',
  Read: 'read',
  Add: 'add',
  ManageUserRoles: 'manage_user_roles',
  Write: 'write',
  ExportDataGrid: 'export_data_grid',
  LimitWorkspaceContacts: 'limit_workspace_contacts',
  ViewCdrPhoneNumbers: 'view_cdr_phone_numbers',
  Delete: 'delete',
  ChangeUserPassword: 'change_user_password',
  EavesdropCall: 'eavesdrop_call',
} as const;

export type RolePermissionsId =
  (typeof RolePermissionsId)[keyof typeof RolePermissionsId];
