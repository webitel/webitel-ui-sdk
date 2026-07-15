import { type ComputedRef, computed, type Ref } from 'vue';
import { CrudAction } from '../../../enums';

export type PermissionsUserAccess = Record<CrudAction, boolean>;

export const DEFAULT_PERMISSIONS_USER_ACCESS: PermissionsUserAccess = {
	[CrudAction.Read]: false,
	[CrudAction.Create]: false,
	[CrudAction.Update]: false,
	[CrudAction.Delete]: false,
};

export interface UsePermissionsTabAccessSource {
	hasReadAccess: Ref<boolean>;
	hasCreateAccess: Ref<boolean>;
	hasUpdateAccess: Ref<boolean>;
	hasDeleteAccess: Ref<boolean>;
}

export const usePermissionsTabAccess = (
	accessControl: UsePermissionsTabAccessSource,
): ComputedRef<PermissionsUserAccess> =>
	computed(() => ({
		[CrudAction.Read]: accessControl.hasReadAccess.value,
		[CrudAction.Create]: accessControl.hasCreateAccess.value,
		[CrudAction.Update]: accessControl.hasUpdateAccess.value,
		[CrudAction.Delete]: accessControl.hasDeleteAccess.value,
	}));
