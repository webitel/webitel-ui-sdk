import { CrudAction } from '../../../enums';
export type PermissionsUserAccess = Record<CrudAction, boolean>;
export declare const DEFAULT_PERMISSIONS_USER_ACCESS: PermissionsUserAccess;
