import { AccessMode, headers } from '@webitel/ui-sdk/modules/ObjectPermissions';
import { AccessRuleName } from '@webitel/ui-sdk/modules/ObjectPermissions/enums';
import type { Id } from '@webitel/ui-sdk/src/api/types/ApiModule';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { createDatalistStore } from '../../_shared/createDatalistStore';
import { tableStoreBody } from '../../table/createTableStore.store';
import type { useTableStoreConfig } from '../../types/tableStore.types';
import { PermissionsApiModule } from '../scripts/PermissionsApiModule';
import type {
	ChangeAccessModePayload,
	PermissionEntity,
	RawPermissionsApiModule,
} from '../types/Permission.types';

const resolveModeId = (mode: ChangeAccessModePayload['mode']) =>
	typeof mode === 'number' ? mode : mode?.id;

/*
 has | patch | got
-----+-------+-----
   - |  w    | w
   w |  w    | -
   - |  ww   | ww
   w |  ww   | ww
  ww |  ww   | w
  ww |  w    | -
*/
const resolveGrants = ({
	item,
	ruleName,
	mode,
}: ChangeAccessModePayload): string | null => {
	const have = item.access[ruleName];

	switch (resolveModeId(mode)) {
		case AccessMode.Forbidden:
			return ruleName;
		case AccessMode.Allow:
			return have.rule || ruleName;
		case AccessMode.Manage:
			return `${ruleName}${ruleName}`;
		default:
			return null;
	}
};

export const permissionsStoreBody = (
	namespace: string,
	config: useTableStoreConfig<PermissionEntity>,
) => {
	const tableStore = tableStoreBody<PermissionEntity>(namespace, config);
	const { dataList, selected, error, isLoading } = storeToRefs(tableStore);
	const {
		initialize: tableStoreInitialize,
		loadDataList,
		resetInfiniteScrollTableParamsToDefaults,
	} = tableStore;

	/*
	 * `tableStoreBody` keeps its own `parentId` internally (for `loadDataList`),
	 * but does not expose it in the `tableStore` API. Permissions patches need
	 * the same `parentId`, so this store keeps a local copy and syncs it in
	 * `initialize`.
	 */
	const parentId = ref<Id>();

	const initialize: typeof tableStoreInitialize = (options) => {
		parentId.value = options.parentId;
		return tableStoreInitialize(options);
	};

	const patchPermissions = async (
		changes: {
			grantee: number;
			grants: string;
		}[],
	) => {
		try {
			await config.apiModule.patch({
				id: parentId.value,
				changes,
			});
		} finally {
			await loadDataList();
		}
	};

	const changeAccessMode = async (payload: ChangeAccessModePayload) => {
		const grants = resolveGrants(payload);
		if (!grants) return;

		return patchPermissions([
			{
				grantee: +payload.item.grantee.id,
				grants,
			},
		]);
	};

	const addRolePermissions = async (role: { id: Id }) => {
		return patchPermissions([
			{
				grantee: +role.id,
				grants: AccessRuleName.R,
			},
		]);
	};
	const $reset = () => {
		dataList.value = [];
		selected.value = [];
		error.value = null;
		isLoading.value = false;
		resetInfiniteScrollTableParamsToDefaults();
		parentId.value = null;
	};

	return {
		...tableStore,

		parentId,
		initialize,

		changeAccessMode,
		addRolePermissions,

		$reset,
	};
};

export const createPermissionsStore = (
	namespace: string,
	config: Omit<
		useTableStoreConfig<PermissionEntity>,
		'apiModule' | 'headers'
	> & {
		apiModule: RawPermissionsApiModule;
		headers?: useTableStoreConfig<PermissionEntity>['headers'];
	},
) => {
	const normalizedConfig: useTableStoreConfig<PermissionEntity> = {
		...config,
		apiModule: PermissionsApiModule(config.apiModule),
		headers: config.headers || headers,
	};

	return createDatalistStore({
		storeBody: () => permissionsStoreBody(namespace, normalizedConfig),
		namespace,
		config: normalizedConfig,
	});
};
