//from backend

export enum GlobalPermissionsEnum {
  ADD = 'add',
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
}

export type GlobalPermission = {
  id: GlobalPermissionsEnum;
  name: string; // we don`t need it in calculations
};
