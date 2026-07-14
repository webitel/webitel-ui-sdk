import PermissionsTab from './components/permissions-tab.vue';

export {
	AccessMode,
	AccessRuleName,
	headers,
	PermissionsRolePopup,
} from '@webitel/ui-sdk/modules/ObjectPermissions';

export { PermissionsApiModule } from './scripts/PermissionsApiModule';
export {
	createPermissionsStore,
	permissionsStoreBody,
} from './stores/createPermissionsStore';
export type { PermissionsPiniaStore } from './stores/createPermissionsStore';
export type {
	PermissionEntity,
	PermissionGrantee,
	PermissionsChange,
	RawPermissionsApiModule,
} from './types/Permission.types';

export { PermissionsTab };
