import PermissionsRoleRow from './components/_internal/permissions-role-row.vue';
import PermissionsRoleSelect from './components/_internal/permissions-role-select.vue';
import PermissionsTabContent from './components/_internal/permissions-tab-content.vue';
import PermissionsRolePopup from './components/_internal/permissions-tab-role-popup.vue';
import PermissionsTab from './components/permissions-tab.vue';

/** [Claude] the acl enums and grants logic live in api-services; re-exported to keep permissions in one place */
export {
	AccessMode,
	AccessRuleColumn,
	AccessRuleName,
} from '@webitel/api-services/enums';
export type { ResolveGrantsParams } from '@webitel/api-services/scripts';
export { resolveGrants } from '@webitel/api-services/scripts';

export { useAccessModeOptions } from './composables/useAccessModeOptions';
export { headers, headersWithCreate } from './stores/_internals/headers';
export type { PermissionsPiniaStore } from './stores/createPermissionsStore';
export {
	createPermissionsStore,
	permissionsStoreBody,
} from './stores/createPermissionsStore';
export type {
	ChangeAccessModePayload,
	PermissionAccessRule,
	PermissionEntity,
	PermissionGrantee,
	PermissionsChange,
	RawPermissionsApiModule,
} from './types/Permission.types';
export type { PermissionsUserAccess } from './types/PermissionsUserAccess';
export { DEFAULT_PERMISSIONS_USER_ACCESS } from './types/PermissionsUserAccess';

export {
	PermissionsRolePopup,
	PermissionsRoleRow,
	PermissionsRoleSelect,
	PermissionsTab,
	PermissionsTabContent,
};
