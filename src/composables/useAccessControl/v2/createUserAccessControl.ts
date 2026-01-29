import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { _wtUiLog } from '../../../scripts/logger';
import type {
	CreateUserAccessControlComposableParams,
	UseAccessControlReturn,
	UseUserAccessControlComposableOptions,
} from './types/CreateUserAccessControl';
import { CrudAction } from '../../../enums';

export const createUserAccessControlComposable = (
	useUserinfoStore: CreateUserAccessControlComposableParams,
) => {
	const useUserAccessControl = (
		options?: UseUserAccessControlComposableOptions,
	): UseAccessControlReturn => {
		const resource = typeof options === 'string' ? options : options?.resource;
		const useUpdateAccessAsAllMutableChecksSource =
			options?.useUpdateAccessAsAllMutableChecksSource;
		const useGlobalAccessAsChecksSource =
			options?.useGlobalAccessAsChecksSource;

		const route = useRoute();
		const object = resource || route?.meta?.WtObject;

		const userinfoStore = useUserinfoStore();

		if (!object) {
			_wtUiLog.error({
				module: 'access control',
				entity: 'useUserAccessControl composable',
			})(
				'No WtObject found in route meta or passed as first param, cannot check access control',
			);
		}

		const hasReadAccess = computed(() => {
			if (useGlobalAccessAsChecksSource) {
				return userinfoStore.hasSpecialGlobalActionAccess(CrudAction.Read);
			}
			return userinfoStore.hasReadAccess(object);
		});

		const hasUpdateAccess = computed(() => {
			if (useGlobalAccessAsChecksSource) {
				return userinfoStore.hasGlobalCrudActionAccess(CrudAction.Update);
			}
			return userinfoStore.hasUpdateAccess(object);
		});

		const hasCreateAccess = computed(() => {
			if (useUpdateAccessAsAllMutableChecksSource) {
				return hasUpdateAccess.value;
			}

			if (useGlobalAccessAsChecksSource) {
				return userinfoStore.hasGlobalCrudActionAccess(CrudAction.Create);
			}
			return userinfoStore.hasCreateAccess(object);
		});

		const hasDeleteAccess = computed(() => {
			if (useUpdateAccessAsAllMutableChecksSource) {
				return hasUpdateAccess.value;
			}

			if (useGlobalAccessAsChecksSource) {
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
