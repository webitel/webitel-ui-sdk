import { AccessRuleName } from '@webitel/api-services/enums';
import { resolveGrants } from '@webitel/api-services/scripts';
import type { Id } from '@webitel/ui-sdk/src/api/types/ApiModule';
import type { StoreGeneric } from 'pinia';
import { ref } from 'vue';
import {
	createDatalistStore,
	makeThisToRefs,
} from '../../_shared/createDatalistStore';
import { tableStoreBody } from '../../table/createTableStore.store';
import type { useTableStoreConfig } from '../../types/tableStore.types';
import type {
	ChangeAccessModePayload,
	PermissionEntity,
	PermissionsChange,
	RawPermissionsApiModule,
} from '../types/Permission.types';
import { headers } from './_internals/headers';

export const permissionsStoreBody = (
	namespace: string,
	config: useTableStoreConfig<PermissionEntity>,
	/** [Claude] the entity api, whose `patchPermissions` takes acl changes, not a row patch */
	permissionsApi: RawPermissionsApiModule,
) => {
	const tableStore = tableStoreBody<PermissionEntity>(namespace, config);
	const { dataList, selected, error, isLoading } = makeThisToRefs(
		tableStore,
		config.storeType,
	);
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
		parentId.value = options?.parentId;
		return tableStoreInitialize(options);
	};

	const patchPermissions = async (changes: PermissionsChange[]) => {
		if (parentId.value === undefined) return;

		try {
			await permissionsApi.patchPermissions({
				id: parentId.value,
				changes,
			});
		} finally {
			await loadDataList();
		}
	};

	const changeAccessMode = async (payload: ChangeAccessModePayload) => {
		const grants = resolveGrants({
			have: payload.item.access[payload.ruleName],
			ruleName: payload.ruleName,
			mode: payload.mode,
		});
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
		apiModule: RawPermissionsApiModule;
		headers?: useTableStoreConfig<PermissionEntity>['headers'];
	},
) => {
	const normalizedConfig: useTableStoreConfig<PermissionEntity> = {
		/* a fixed 4-column tab: nothing worth persisting, and a `fields` list
		   saved by an older version would keep being sent to the api */
		disablePersistence: true,
		...config,
		/* [Claude] card apis carry their acl as `getPermissionsList`/`patchPermissions` (generatePermissionsApi); the table only lists it */
		apiModule: {
			getList: config.apiModule.getPermissionsList,
		},
		headers: config.headers || headers,
	};

	return createDatalistStore({
		storeBody: () =>
			permissionsStoreBody(namespace, normalizedConfig, config.apiModule),
		namespace,
		config: normalizedConfig,
	});
};

export type PermissionsPiniaStore = StoreGeneric &
	ReturnType<ReturnType<typeof createPermissionsStore>>;
