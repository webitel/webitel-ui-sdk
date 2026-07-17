import { CrudAction } from '../../../enums';

export type PermissionsUserAccess = Record<CrudAction, boolean>;

export const DEFAULT_PERMISSIONS_USER_ACCESS: PermissionsUserAccess = {
	[CrudAction.Read]: false,
	[CrudAction.Create]: false,
	[CrudAction.Update]: false,
	[CrudAction.Delete]: false,
};
