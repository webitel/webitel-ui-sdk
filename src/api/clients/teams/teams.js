import { TeamsAPI } from '@webitel/api-services/api';

/**
 * Teams moved to `@webitel/api-services`. This module stays as a
 * re-export so the existing `@webitel/ui-sdk/api/clients` import paths keep
 * working; import TeamsAPI from `@webitel/api-services/api` in new code.
 */
export default TeamsAPI;
