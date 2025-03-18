import type { Ref } from 'vue';

import type { WtObject } from '../../../../enums';
import type { createUserAccessStore } from '../../../../modules/Userinfo/v2/stores/accessStore';

export type CreateUserAccessControlComposableParams =
  ReturnType<createUserAccessStore>;

export type UseUserAccessControlComposableOptions =
  | WtObject
  | {
      resource?: WtObject;
      useUpdateAccessAsAllMutableChecksSource?: boolean;
    };

export interface UseAccessControlReturn {
  hasReadAccess: Ref<boolean>;
  hasCreateAccess: Ref<boolean>;
  hasUpdateAccess: Ref<boolean>;
  hasDeleteAccess: Ref<boolean>;

  hasSaveActionAccess: Ref<boolean>;
  disableUserInput: Ref<boolean>;
}
