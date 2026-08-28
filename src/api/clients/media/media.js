import { MediaAPI } from '@webitel/api-services/api';

/**
 * Media files moved to `@webitel/api-services`. This module stays as a
 * re-export so the existing `@webitel/ui-sdk/api/clients` import paths keep
 * working; import MediaAPI from `@webitel/api-services/api` in new code.
 */
export default MediaAPI;
