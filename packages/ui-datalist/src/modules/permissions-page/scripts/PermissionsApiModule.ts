import { AccessRuleName } from '@webitel/ui-sdk/modules/ObjectPermissions/enums';
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
	 * [Claude] The rule columns are keyed by their letter (`r`, `w`, `d`), so
	 * each sorts on its own, but the endpoint has no such attributes in `fields`:
	 * it returns the three rules merged into one `granted` string, asked for once.
	 */
	const toAclFields = (fields?: string[]) => {
		if (!fields) return fields;
		const ruleFields: string[] = [
			AccessRuleName.R,
			AccessRuleName.W,
			AccessRuleName.D,
		];
		return [
			...new Set(
				fields
					.filter((field) => field !== 'id')
					.map((field) => (ruleFields.includes(field) ? 'granted' : field)),
			),
		];
	};

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
			fields: toAclFields(fields),
		});

	return {
		getList,
		patch: rawApiModule.patchPermissions,
	} as unknown as TableApiModule<PermissionEntity>;
};
