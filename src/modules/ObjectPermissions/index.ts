export { default as PermissionsTabContent } from './components/_internal/permissions-tab-content.vue';
export { default as PermissionsRolePopup } from './components/_internal/permissions-tab-role-popup.vue';
export type { PermissionsUserAccess } from './composables/usePermissionsTabAccess';
export {
	DEFAULT_PERMISSIONS_USER_ACCESS,
	usePermissionsTabAccess,
} from './composables/usePermissionsTabAccess';
export { AccessMode, AccessRuleName } from './enums';
export { headers } from './headers/headers';
export { createObjectPermissionsStoreModule } from './store';
