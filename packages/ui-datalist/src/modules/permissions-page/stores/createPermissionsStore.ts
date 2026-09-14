import { AccessMode, headers } from '@webitel/ui-sdk/modules/ObjectPermissions';
import { AccessRuleName } from '@webitel/ui-sdk/modules/ObjectPermissions/enums';
import type { Id } from '@webitel/ui-sdk/src/api/types/ApiModule';
import type { StoreGeneric } from 'pinia';
import {
	createDatalistStore,
	makeThisToRefs,
} from '../../_shared/createDatalistStore';
import { createListSession } from '../../table/createListSession';
import type { useTableStoreConfig } from '../../types/tableStore.types';
import { PermissionsApiModule } from '../scripts/PermissionsApiModule';
import type {
	ChangeAccessModePayload,
	PermissionEntity,
	PermissionsChange,
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
	const listSession = createListSession<PermissionEntity>(namespace, config);
	const { dataList, selected, error, isLoading } = makeThisToRefs(
		listSession,
		config.storeType,
	);
	const { parentId, loadDataList, resetInfiniteScrollTableParamsToDefaults } =
		listSession;

	const patchPermissions = async (changes: PermissionsChange[]) => {
		try {
			await (
				config.apiModule.patch as unknown as (payload: {
					id: Id | undefined;
					changes: PermissionsChange[];
				}) => Promise<unknown>
			)({
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
		parentId.value = undefined;
	};

	return {
		...listSession,

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
		apiModule: PermissionsApiModule(config.apiModule),
		headers: config.headers || headers,
	};

	return createDatalistStore({
		storeBody: () => permissionsStoreBody(namespace, normalizedConfig),
		namespace,
		config: normalizedConfig,
	});
};

export type PermissionsPiniaStore = StoreGeneric &
	ReturnType<ReturnType<typeof createPermissionsStore>>;
