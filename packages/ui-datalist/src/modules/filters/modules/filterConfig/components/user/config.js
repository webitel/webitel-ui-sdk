import { UsersAPI } from '@webitel/api-services/api';
import { WtObject } from '@webitel/ui-sdk/enums';

import { gateFilterSearch } from '../../composables/useFilterReadAccess';

export const searchMethod = gateFilterSearch(WtObject.User, UsersAPI.getLookup);
