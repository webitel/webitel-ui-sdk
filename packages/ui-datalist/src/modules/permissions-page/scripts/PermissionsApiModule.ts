import type { TableApiModule } from '../../types/tableStore.types';
import type {
	PermissionEntity,
	RawPermissionsApiModule,
} from '../types/Permission.types';

/**
 * Every card API in api-services/ui-sdk already exposes permissions
 * via `...generatePermissionsApi(baseUrl)` under `getPermissionsList`/`patchPermissions`.
 * This adapts that shape to the generic `ApiModule` contract expected by createTableStore,
 * so no parent API module needs to be rewritten to plug into the permissions store.
 */
export const PermissionsApiModule = (
	rawApiModule: RawPermissionsApiModule,
): TableApiModule<PermissionEntity> => {
	return {
		getList: rawApiModule.getPermissionsList,
		patch: rawApiModule.patchPermissions,
	} as unknown as TableApiModule<PermissionEntity>;
};
