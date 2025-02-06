import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { _wtUiLog } from '../../../scripts/logger';
import type {
  CreateUserAccessControlComposableParams,
  UseAccessControlReturn,
  UseUserAccessControlComposableOptions,
} from './types/CreateUserAccessControl';

export const createUserAccessControlComposable = (
  useUserinfoStore: CreateUserAccessControlComposableParams,
) => {
  const useUserAccessControl = (
    options: UseUserAccessControlComposableOptions = {},
  ): UseAccessControlReturn => {
    const route = useRoute();
    const object = options?.resource || route?.meta?.WtObject;

    const userinfoStore = useUserinfoStore();

    if (!object) {
      _wtUiLog.error({
        module: 'access control',
        entity: 'useUserAccessControl composable',
      })(
        'No WtObject found in route meta or passed as { "resource" } param, cannot check access control',
      );
    }

    const hasReadAccess = computed(() => {
      return userinfoStore.hasReadAccess(object);
    });
    const hasCreateAccess = computed(() => {
      return userinfoStore.hasCreateAccess(object);
    });
    const hasUpdateAccess = computed(() => {
      return userinfoStore.hasUpdateAccess(object);
    });
    const hasDeleteAccess = computed(() => {
      return userinfoStore.hasDeleteAccess(object);
    });

    const hasSaveActionAccess = computed(() => {
      if (route.params.id === 'new') return hasCreateAccess.value;
      return hasUpdateAccess.value;
    });

    const disableUserInput = computed(() => {
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
