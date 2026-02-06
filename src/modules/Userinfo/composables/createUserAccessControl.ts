import { computed, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { CrudAction, type WtObject } from '../../../enums';
import { _wtUiLog } from '../../../scripts/logger';
import { createUserAccessStore } from '../stores/accessStore';
import type { UserAccessStore } from '../types/UserAccess.d.ts';

export type UseUserAccessControlComposableOptions =
	| WtObject
	| {
			resource?: WtObject;
			useUpdateAccessAsAllMutableChecksSource?: boolean;
			useGlobalCrudActionAccessAsChecksSource?: boolean;
	  };

export interface UseAccessControlReturn {
	hasReadAccess: Ref<boolean>;
	hasCreateAccess: Ref<boolean>;
	hasUpdateAccess: Ref<boolean>;
	hasDeleteAccess: Ref<boolean>;

	hasSaveActionAccess: Ref<boolean>;
	disableUserInput: Ref<boolean>;
}

export const createUserAccessControlComposable = (
	useUserinfoStore: ReturnType<typeof createUserAccessStore>,
) => {
	const useUserAccessControl = (
		options?: UseUserAccessControlComposableOptions,
	): UseAccessControlReturn => {
		const resource = typeof options === 'string' ? options : options?.resource;
		const useUpdateAccessAsAllMutableChecksSource =
			typeof options === 'object' && options !== null
				? options.useUpdateAccessAsAllMutableChecksSource
				: false;
		const useGlobalCrudActionAccessAsChecksSource =
			typeof options === 'object' && options !== null
				? options.useGlobalCrudActionAccessAsChecksSource
				: false;

		const route = useRoute();
		const object = resource || route?.meta?.WtObject;

		const userinfoStore = useUserinfoStore() as UserAccessStore;

		if (!object) {
			_wtUiLog.error({
				module: 'access control',
				entity: 'useUserAccessControl composable',
			})(
				'No WtObject found in route meta or passed as first param, cannot check access control',
			);
		}

		const hasReadAccess = computed(() => {
			if (useGlobalCrudActionAccessAsChecksSource) {
				return userinfoStore.hasGlobalCrudActionAccess(CrudAction.Read);
			}
			return userinfoStore.hasReadAccess(object);
		});

		const hasUpdateAccess = computed(() => {
			if (useGlobalCrudActionAccessAsChecksSource) {
				return userinfoStore.hasGlobalCrudActionAccess(CrudAction.Update);
			}
			return userinfoStore.hasUpdateAccess(object);
		});

		const hasCreateAccess = computed(() => {
			if (useUpdateAccessAsAllMutableChecksSource) {
				return hasUpdateAccess.value;
			}

			if (useGlobalCrudActionAccessAsChecksSource) {
				return userinfoStore.hasGlobalCrudActionAccess(CrudAction.Create);
			}
			return userinfoStore.hasCreateAccess(object);
		});

		const hasDeleteAccess = computed(() => {
			if (useUpdateAccessAsAllMutableChecksSource) {
				return hasUpdateAccess.value;
			}

			if (useGlobalCrudActionAccessAsChecksSource) {
				return userinfoStore.hasGlobalCrudActionAccess(CrudAction.Delete);
			}
			return userinfoStore.hasDeleteAccess(object);
		});

		const hasSaveActionAccess = computed(() => {
			if (useUpdateAccessAsAllMutableChecksSource) return hasUpdateAccess.value;

			if (route.params.id === 'new') return hasCreateAccess.value;
			return hasUpdateAccess.value;
		});

		const disableUserInput = computed(() => {
			if (useUpdateAccessAsAllMutableChecksSource)
				return !hasUpdateAccess.value;

			if (route.params.id === 'new') return !hasCreateAccess.value;
			return !hasUpdateAccess.value;
		});

		return {
			hasReadAccess,
			hasCreateAccess,
			hasUpdateAccess,
			hasDeleteAccess,

			hasSaveActionAccess,
			disableUserInput,
		};
	};

	return useUserAccessControl;
};
