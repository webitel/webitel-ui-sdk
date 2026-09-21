import RolesAPI from '@webitel/ui-sdk/api/clients/roles/roles';
import { WtObject } from '@webitel/ui-sdk/enums';

import { gateFilterSearch } from '../../composables/useFilterReadAccess';

export const searchMethod = gateFilterSearch(WtObject.Role, RolesAPI.getLookup);
