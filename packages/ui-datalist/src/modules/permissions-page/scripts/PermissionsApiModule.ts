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
	/**
	 * The table store always asks for `id` (every registry needs it to open or
	 * delete a row), but an access rule has no such attribute and the endpoint
	 * answers `400 app.search.fields.invalid` — a rule is addressed by its
	 * grantee. Rows are patched through the parent id, so nothing here needs it.
	 */
	const getList = ({
		fields,
		...params
	}: {
		fields?: string[];
	} & Record<string, unknown>) =>
		rawApiModule.getPermissionsList?.({
			...params,
			fields: fields?.filter((field) => field !== 'id'),
		});

	return {
		getList,
		patch: rawApiModule.patchPermissions,
	} as unknown as TableApiModule<PermissionEntity>;
};
