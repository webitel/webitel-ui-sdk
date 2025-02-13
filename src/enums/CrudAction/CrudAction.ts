export const CrudAction = {
  Read: 'read',
  Create: 'create',
  Update: 'update',
  Delete: 'delete',
} as const;

export type CrudAction = (typeof CrudAction)[keyof typeof CrudAction];
