import { CommunicationsAPI } from '@webitel/api-services/api';

/**
 * Communication types moved to `@webitel/api-services`. This module stays as a
 * re-export so the existing `@webitel/ui-sdk/api/clients` import paths keep
 * working; import CommunicationsAPI from `@webitel/api-services/api` in new code.
 */
export default CommunicationsAPI;
