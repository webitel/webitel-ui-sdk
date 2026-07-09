import { AccessMode, headers } from '@webitel/ui-sdk/modules/ObjectPermissions';
import type { Id } from '@webitel/ui-sdk/src/api/types/ApiModule';
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
import { AccessRuleName } from '@webitel/ui-sdk/modules/ObjectPermissions/enums';
import { storeToRefs } from 'pinia';

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
	 * tableStoreBody keeps its own parentId internally (used for loadDataList),
	 * it isn't exposed on the returned object — permissions patches need it too,
	 * so it's tracked here as well and kept in sync via `initialize`.
	 */
	const parentId = ref<Id>();

	const initialize: typeof tableStoreInitialize = (options = {}) => {
		if (options.parentId) {
			parentId.value = options.parentId;
		}
		return tableStoreInitialize(options);
	};

	const changeAccessMode = async (payload: ChangeAccessModePayload) => {
		const grants = resolveGrants(payload);
		if (grants === null) return;

		try {
			await config.apiModule.patch({
				id: parentId.value,
				changes: [
					{
						grantee: +payload.item.grantee.id,
						grants,
					},
				],
			} as never);
		} finally {
			await loadDataList();
		}
	};

	const addRolePermissions = async (role: { id: Id }) => {
		try {
			await config.apiModule.patch({
				id: parentId.value,
				changes: [
					{
						grantee: +role.id,
						grants: AccessRuleName.R,
					},
				],
			} as never);
		} finally {
			await loadDataList();
		}
	};

	/*
	 * Unlike a dynamically registered Vuex module, this Pinia store is a
	 * singleton — it has to be reset by hand when the tab unmounts, otherwise
	 * the next parent entity's permissions tab would briefly show stale data.
	 */
	const $reset = () => {
		dataList.value = [];
		selected.value = [];
		error.value = null;
		isLoading.value = false;
		resetInfiniteScrollTableParamsToDefaults();
		parentId.value = undefined;
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
		apiModule:
			| useTableStoreConfig<PermissionEntity>['apiModule']
			| RawPermissionsApiModule;
		headers?: useTableStoreConfig<PermissionEntity>['headers'];
	},
) => {
	const normalizedApiModule =
		'getPermissionsList' in config.apiModule &&
		'patchPermissions' in config.apiModule
			? PermissionsApiModule(config.apiModule)
			: config.apiModule;

	const normalizedConfig: useTableStoreConfig<PermissionEntity> = {
		...config,
		apiModule: normalizedApiModule,
		headers: config.headers || headers,
	};

	return createDatalistStore({
		storeBody: () => permissionsStoreBody(namespace, normalizedConfig),
		namespace,
		config: normalizedConfig,
	});
};
